import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";

export const cms = cache(() => getPayload({ config }));
export const getProjects = cache(
  async () =>
    (
      await (
        await cms()
      ).find({
        collection: "projects",
        limit: 100,
        depth: 1,
        sort: "order",
        overrideAccess: false,
      })
    ).docs,
);
export const getAbout = cache(async () =>
  (await cms()).findGlobal({ slug: "about", depth: 1 }),
);
export const getContact = cache(async () =>
  (await cms()).findGlobal({ slug: "contact" }),
);
