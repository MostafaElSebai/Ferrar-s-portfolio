import { readFile } from "node:fs/promises";
import path from "node:path";
import { getPayload } from "payload";
import config from "../src/payload.config";
import projects from "./projects.json";

const payload = await getPayload({ config });
const existing = await payload.count({ collection: "projects" });
if (existing.totalDocs > 0) {
  console.log("Projects already exist. Seed skipped to preserve edits.");
  process.exit(0);
}
const uploads = new Map<string, string>();
async function upload(src: string, alt: string) {
  const prior = uploads.get(src);
  if (prior) return prior;
  const filePath = path.join(process.cwd(), "public", src);
  const data = await readFile(filePath);
  const doc = await payload.create({
    collection: "media",
    data: { alt },
    file: {
      data,
      name: path.basename(src),
      mimetype: "image/webp",
      size: data.length,
    },
  });
  uploads.set(src, doc.id);
  return doc.id;
}
for (const [order, project] of projects.entries()) {
  const gallery = [];
  for (const [index, src] of project.gallery.entries()) {
    gallery.push({
      image: await upload(src, `${project.title} — design ${index + 1}`),
    });
  }
  await payload.create({
    collection: "projects",
    data: {
      title: project.title,
      slug: project.slug,
      categories: project.categories as ("social" | "key-visual" | "print")[],
      cover: gallery[0].image,
      gallery,
      order,
      _status: "published",
    },
  });
  console.log(`Added ${project.title}`);
}
await payload.updateGlobal({
  slug: "about",
  data: {
    headline: "I bring brands to life.",
    bio: "I’m Ahmed Morsi, a graphic designer with over 9 years of experience bringing ideas to life through dynamic designs and compelling visuals.\n\nFrom social media to print, I approach each project with creativity and a deep understanding of the brand’s vision. My goal is to help brands enhance their visual presence, engage their audience, and stand out.",
    portrait: await upload(
      "/portfolio/portrait.webp",
      "Ahmed Morsi, graphic designer",
    ),
  },
});
console.log(
  "Portfolio seeded. Open /admin to create your first editor account.",
);
await payload.updateGlobal({
  slug: "contact",
  data: {
    behance: "https://www.behance.net/ahmedmorcy20",
    email: "",
    whatsapp: "",
  },
});
await payload.destroy();
