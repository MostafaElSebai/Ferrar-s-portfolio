import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import sharp from "sharp";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Projects } from "./collections/Projects";
import { About } from "./globals/About";
import { Contact } from "./globals/Contact";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
    meta: { titleSuffix: " — Ahmed Morsi" },
  },
  collections: [Users, Projects, Media],
  globals: [About, Contact],
  secret: process.env.PAYLOAD_SECRET!,
  db: mongooseAdapter({ url: process.env.DATABASE_URL! }),
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  plugins: process.env.BLOB_READ_WRITE_TOKEN
    ? [
        vercelBlobStorage({
          collections: { media: true },
          token: process.env.BLOB_READ_WRITE_TOKEN,
          clientUploads: true,
        }),
      ]
    : [],
});
