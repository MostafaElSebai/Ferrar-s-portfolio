import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "categories", "order", "_status"],
  },
  defaultSort: "order",
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      validate: (value: unknown) =>
        (typeof value === "string" &&
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) ||
        "Use lowercase words separated by hyphens.",
    },
    {
      name: "categories",
      type: "select",
      hasMany: true,
      required: true,
      options: [
        { label: "Social Media", value: "social" },
        { label: "Key Visual", value: "key-visual" },
        { label: "Print Design", value: "print" },
      ],
    },
    { name: "cover", type: "upload", relationTo: "media", required: true },
    { name: "description", type: "textarea" },
    {
      name: "videoUrl",
      type: "text",
      label: "Video link",
      admin: {
        description: "Optional HTTPS link to a video for this project.",
      },
      validate: (value: unknown) => {
        if (!value) return true;
        try {
          return new URL(String(value)).protocol === "https:" || "Enter an HTTPS video URL, or leave empty.";
        } catch {
          return "Enter a valid HTTPS video URL, or leave empty.";
        }
      },
    },
    {
      name: "gallery",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        { name: "image", type: "upload", relationTo: "media", required: true },
      ],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
  ],
};
