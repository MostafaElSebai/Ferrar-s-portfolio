# Ahmed Morsi portfolio

A local Next.js + blank Payload project using the supplied portfolio artwork. No cloud deployment has been created.

## Run locally

Use Node 24 and install with `npm ci` on a fresh checkout. The current `.env` is configured for Atlas and Vercel Blob, and the 22 portfolio projects have been imported. For a fresh setup, copy `.env.example` and configure your database, secret, and Blob token. To test in your own Chrome, run:

```sh
npm run dev
```

Open `http://127.0.0.1:3000` and `/admin`. `npm run dev` refreshes the Payload import map before startup, including the Blob client upload component. Stop the server with Ctrl+C when finished. Agent testing must also stop its own servers before handing control back. Create your first editor account in the admin screen. No default credentials are seeded. The initial local database at `/tmp/ahmed-mongo` on port 27018 was used only for the first implementation test; it is not required for the current Atlas configuration. Uploaded files are stored in ignored `media/` during local development. Seed source images are retained under `public/portfolio`.

Projects, images, About, and Contact are editable in Payload. Contact has email, Behance, and an optional **full WhatsApp URL**. Add the real link later; it starts blank. Public reads use `/api/projects`, `/api/media`, `/api/globals/about`, and `/api/globals/contact`. Changes require an authenticated editor. Draft projects are hidden from visitors.

`npm run seed` skips if projects already exist so it cannot overwrite editorial changes. Initial import groups repeated PDF client pages into 22 projects. Unnamed print/key visual work uses descriptive titles instead of invented client names.

## Checks

```sh
npm run check
npm run build
npm run start
# With the local production server running:
npm run payload -- run scripts/verify.ts
```

The integration check creates and removes a temporary editor and draft, verifies public read/authenticated edit behavior, restores Contact values, and checks all project routes. Run only against a local development database; it expects the initial 22-project import.

`npm run generate:types` refreshes CMS types after schema changes. `npm run generate:importmap` updates Payload's import map.

## Artwork preparation

The extracted assets are already included. To re-extract, install Python Pillow and Poppler (`pdfimages`, `pdftoppm`), then run `python3 scripts/extract-assets.py`. Print mockups are rendered from their final visible composition because the PDF contains hidden Illustrator objects. The original PDF is unchanged. Embedded Poppins subsets are not reused; full Poppins fonts come from Fontsource.

## Vercel deployment (later)

Use MongoDB Atlas for `DATABASE_URL`, set a long random `PAYLOAD_SECRET`, and connect a Vercel Blob store with `BLOB_READ_WRITE_TOKEN`. Set `NEXT_PUBLIC_SERVER_URL` to the final HTTPS origin for metadata. Contact links stay in Payload, not environment variables. The official Blob adapter enables authenticated client uploads and disables local upload storage. Production needs Blob configured; Vercel's filesystem is not durable.

Run the seed against the intended cloud database **after** Blob is configured to upload the initial images to Blob, or import media through Payload. The local database and `media/` are not automatically migrated to Atlas/Blob. Keep preview data separate from production. Complete admin setup before exposing a new deployment. Email recovery requires configuring a real email adapter; local development only logs email.

Dependency audit: Sharp, Undici, and DOMPurify were updated to patched releases during implementation. Remaining audit findings are in the transitive `braces` dependency used by Payload's Sass/file-discovery tooling. A patched compatible upstream release was not available at review; do not blindly force a Payload downgrade. Recheck before deployment.
