import type { GlobalConfig } from "payload";

export const About: GlobalConfig = {
  slug: "about",
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    {
      name: "headline",
      type: "text",
      required: true,
      defaultValue: "I bring brands to life.",
    },
    { name: "bio", type: "textarea", required: true },
    { name: "portrait", type: "upload", relationTo: "media" },
  ],
};
