import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*"],
    imageSizes: [{ name: "card", width: 1000, withoutEnlargement: true }],
    adminThumbnail: "card",
  },
  fields: [{ name: "alt", type: "text", required: true }],
};
