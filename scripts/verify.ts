import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { getPayload } from "payload";
import config from "../src/payload.config";

if (
  !/^mongodb:\/\/(127\.0\.0\.1|localhost)(:|\/)/.test(
    process.env.DATABASE_URL || "",
  )
) {
  throw new Error(
    "This verification creates temporary records. Run it only against a local test database, never Atlas.",
  );
}
const payload = await getPayload({ config });
const origin = "http://127.0.0.1:3000";
const json = { "Content-Type": "application/json" };
const before = await payload.findGlobal({ slug: "contact" });
const password = randomBytes(24).toString("hex");
const email = `verify-${Date.now()}@example.invalid`;
const editor = await payload.create({
  collection: "users",
  data: { email, password },
});
let draftID: string | undefined;
try {
  const projects = await payload.find({
    collection: "projects",
    limit: 100,
    depth: 0,
  });
  assert.equal(projects.totalDocs, 22);
  const publicContact = await fetch(`${origin}/api/globals/contact`);
  assert.equal(publicContact.status, 200);
  assert.equal((await publicContact.json()).behance, before.behance);
  const denied = await fetch(`${origin}/api/globals/contact`, {
    method: "POST",
    headers: json,
    body: JSON.stringify({ whatsapp: "https://wa.me/" }),
  });
  assert.equal(denied.status, 403);
  const login = await fetch(`${origin}/api/users/login`, {
    method: "POST",
    headers: json,
    body: JSON.stringify({ email, password }),
  });
  assert.equal(login.status, 200);
  const { token } = await login.json();
  assert.ok(token);
  const headers = { ...json, Authorization: `JWT ${token}` };
  const update = await fetch(`${origin}/api/globals/contact`, {
    method: "POST",
    headers,
    body: JSON.stringify({ whatsapp: "https://wa.me/?text=Portfolio" }),
  });
  assert.equal(update.status, 200);
  const changed = await (await fetch(`${origin}/api/globals/contact`)).json();
  assert.equal(changed.whatsapp, "https://wa.me/?text=Portfolio");
  const home = await (await fetch(origin)).text();
  assert.ok(home.includes("https://wa.me/?text=Portfolio"));
  const sample = projects.docs[0];
  const draft = await payload.create({
    collection: "projects",
    data: {
      title: "Verification draft",
      slug: "verification-draft",
      categories: ["social"],
      cover: sample.cover,
      gallery: sample.gallery,
      _status: "draft",
    },
  });
  draftID = draft.id;
  const publicProjects = await (
    await fetch(`${origin}/api/projects?limit=100`)
  ).json();
  assert.ok(
    !publicProjects.docs.some((doc: { id: string }) => doc.id === draft.id),
  );
  assert.equal(
    (await fetch(`${origin}/projects/verification-draft`)).status,
    404,
  );
  const create = await fetch(`${origin}/api/projects`, {
    method: "POST",
    headers: json,
    body: JSON.stringify({ title: "Unauthorized" }),
  });
  assert.equal(create.status, 403);
  for (const project of projects.docs) {
    assert.equal(
      (await fetch(`${origin}/projects/${project.slug}`)).status,
      200,
      project.slug,
    );
  }
  console.log(
    "PASS: 22 project pages, contact API read/edit, login, anonymous write protection, draft visibility, and contact changes in the frontend.",
  );
} finally {
  await payload.updateGlobal({
    slug: "contact",
    data: {
      email: before.email || "",
      whatsapp: before.whatsapp || "",
      behance: before.behance,
    },
  });
  if (draftID) await payload.delete({ collection: "projects", id: draftID });
  await payload.delete({ collection: "users", id: editor.id });
  await payload.destroy();
}
