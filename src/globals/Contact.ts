import type { GlobalConfig } from "payload";

export const Contact: GlobalConfig = {
  slug: "contact",
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: "email", type: "email", label: "Email address" },
    {
      name: "whatsapp",
      type: "text",
      label: "WhatsApp URL",
      admin: {
        description:
          "Optional full WhatsApp link, for example https://wa.me/… . You can add it later.",
      },
      validate: (value: unknown) => {
        if (!value) return true;
        try {
          const url = new URL(String(value));
          return (
            (url.protocol === "https:" &&
              [
                "wa.me",
                "api.whatsapp.com",
                "www.whatsapp.com",
                "chat.whatsapp.com",
              ].includes(url.hostname)) ||
            "Enter a full HTTPS WhatsApp link, or leave empty."
          );
        } catch {
          return "Enter a full HTTPS WhatsApp link, or leave empty.";
        }
      },
    },
    {
      name: "behance",
      type: "text",
      label: "Behance URL",
      required: true,
      defaultValue: "https://www.behance.net/ahmedmorcy20",
      validate: (value: unknown) => {
        if (typeof value !== "string") return "Enter an HTTPS URL.";
        try {
          return new URL(value).protocol === "https:" || "Use an HTTPS URL.";
        } catch {
          return "Enter a valid HTTPS URL.";
        }
      },
    },
  ],
};
