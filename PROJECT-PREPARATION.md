# Ahmed Morsi portfolio preparation

Prepared 2026-10-15. Study only; no application implemented or cloud resources created.

## Agreed scope

- Designer: Ahmed Morsi. Source: `Ahmed Morsi Portfolio-02.pdf` (44 A4 landscape pages, ~8.17 MB).
- Home: brief introduction, about, project cards, contact. One reusable project detail presentation.
- Faithful, polished design drawing on the PDF; simple clear maintainable code. Avoid generic design, elaborate abstractions, generic page builders, or unnecessary defensive logic.
- Start from Payload **blank**, never the website template. Projects and Media are the primary editable content; one small About global if needed. Authentication collection for CMS editors.
- Deployment eventually Vercel, media Vercel Blob, database MongoDB Atlas. No deployment, credentials, resource creation, or implementation authorized in this preparation task.
- User manages all images through Payload admin. Use the official Payload Blob adapter with client uploads where appropriate; direct-upload transport is an internal implementation choice, not a separate user-facing workflow or question.
- Confirmed on user return: English ONLY, matching the PDF. Include ONLY PDF work in version one; no motion/video work. No new originals supplied; use PDF assets.
- Final clarification after voice: public contact details (email, WhatsApp, Behance) DO belong in the Payload dashboard and API. The user’s `.env` preference referred to MongoDB/Blob backend connection settings and secrets, not human contact links. Add a small Contact global. Keep WhatsApp empty/inactive until a real number is provided. This supersedes the misunderstood voice correction.
- Do not explain code structure unless the user explicitly asks after implementation.

## Visual review

All 44 pages reviewed through contact sheets. Near-black textured background with subtle blue glow, electric blue accent, white oversized type, blue vertical/horizontal rules, outlined oversized PORTFOLIO lettering. Poppins Black/Bold/Medium/Regular are embedded subsets. Use proper licensed full webfont files rather than embedded subsets. Circular monochrome portrait over blue with circular lettering. Script lettering in section dividers appears as artwork; do not assume a reusable script font is available.

Preserve this character with live accessible text and responsive layout, generous project imagery, restrained motion. Do not make the entire site images of PDF pages. Rebuild framing/typography; extract artwork separately. Cards should use selected work crops, and project galleries should preserve original artwork proportions. Choose consistent mobile spacing and readable type independently of the PDF's slide scale.

## Content inventory (PDF page numbers)

| Pages | Content / grouping |
| --- | --- |
| 1–3 | Intro, About, Projects introduction |
| 4 | Key Visual section divider |
| 5 | Ford Expedition 2020 key visual; project title provisional |
| 6 | Cinematic food delivery / scooter composition; client/title unidentified |
| 7 | Social Media section divider |
| 8–10 | Aqua Delta |
| 11–13 | Maxi |
| 14 | Wash Thru |
| 15–16 | 4 Swapp |
| 17–18 | Nayashin (spelling from PDF label; confirm preferred brand spelling) |
| 19–20 | Roxy Plast |
| 21 | Diamond Clinic |
| 22–23 | Nasaaem Hospital |
| 24–25 | Tabarak Hospital |
| 26–27 | Brinsova |
| 28 | Egyptian Nile Tours |
| 29 | Al-Arrab Pure |
| 30 | Hotelizeit |
| 31 | Proscan |
| 32 | Aso2lak |
| 33 | Cookin Aboud |
| 34 | Rabat Foundation |
| 35 | Print section divider |
| 36–38 | Green hospital rollups and desk calendar; same visual identity, client name needs confirmation |
| 39 | Roxy Plast brochure (combine with Roxy Plast project) |
| 40 | Aqua Delta billboard (combine with Aqua Delta project) |
| 41 | Maxi posters (combine with Maxi project) |
| 42 | Corporate / construction brochure; client needs confirmation |
| 43 | Mixed feather flags; multiple identities, do not assume one client |
| 44 | Thank-you closing |

18 named social-media clients across 27 pages, plus 2 key visuals and 8 print pages. 37 artwork pages total. Page count is not project count. Client grouping is the initial recommendation, with print examples included in the corresponding client gallery. Unidentified/mixed print work may be a curated print collection until attribution is clarified.

Intro positions Ahmed as graphic designer, motion graphics artist and video editor. About claims 9+ years (source PDF created July 2025; confirm current wording rather than increment automatically). Skills: Photoshop, Illustrator, After Effects, Premiere Pro. PDF supplies Behance `https://www.behance.net/ahmedmorcy20`; no confirmed email/phone/contact destination. No motion/video deliverables supplied. Avoid inventing project outcomes, dates, roles, or campaign details.

## Reusable assets

`PDF-ASSET-INVENTORY.csv` records every embedded image placement and mask by page/object/dimensions. 216 image placements + 14 soft masks; 72 distinct image objects. Repeated background and decorative elements are included in those counts, so this is not 72 project artworks.

- Repeated textured background: object 394, 842×595. Good reference; modest resolution for full-screen use.
- Portrait: object 5, 761×1710 with alpha mask. Extract with mask composition before use; do not discard transparency.
- Ford composition: object 19, 1920×1285.
- Most social artworks are embedded individually (e.g. page 8 has two 1200×1200 images), making clean extraction practical without PDF headers/footers.
- Print includes full mockup composites (e.g. Aqua Delta page 40 at 1920×1139). Inspect individual bounds and transparency before selection.
- Original export/source images would help especially for large desktop presentation, but the PDF is a workable starting source. Extract originals rather than upscale contact sheets; sharpness must be checked on final sizes.
- No assets have yet been imported, published, or seeded into an app. Review images/text intermediates reside only in `/tmp/ahmed-prep` and need not persist.

## Recommended implementation sequence (later)

1. Apply confirmed English-only, PDF-only content scope and editable contact settings. Use neutral factual titles for unidentified work; settle covers and ordering without blocking implementation.
2. Initialize blank Payload with compatible Next.js and MongoDB adapter. Keep packages from the Payload family on matching versions and lock resolved versions. Minimal Projects fields: title, slug, category/categories, cover, short description, ordered gallery, order, publish status; client only if different from title. Media: image and alt. Add fields only when content needs them.
3. Extract and review artwork, merge client groups, select covers, prepare concise factual copy. Preserve PDF intact.
4. Build responsive homepage and project template from the actual visual language. Prefer simple CSS and server-rendered content; animation only where it adds value.
5. Verify content editing, draft/public permissions, gallery ordering, mobile/desktop presentation, keyboard use, image loading and metadata, then production build. Later configure the approved cloud services and smoke-test persistence/upload behavior.

## Current compatibility / deployment research

Verified official docs on 2026-10-15; recheck supported versions when implementation begins.

- Payload installation lists Node >=20.9 and supported Next ranges: 15.2.9–15.2.x, 15.3.9–15.3.x, 15.4.11–15.4.x, 16.2.6+. Choose a supported patched release rather than independently choosing latest Next. https://payloadcms.com/docs/getting-started/installation
- Payload runs within Next and can deploy on Vercel. A durable DB and external file storage are required for this setup. https://payloadcms.com/docs/production/deployment
- MongoDB uses the official `@payloadcms/db-mongodb` mongoose adapter and connection URL. https://payloadcms.com/docs/database/mongodb
- Blob uses `@payloadcms/storage-vercel-blob`, `BLOB_READ_WRITE_TOKEN`, and the Media collection slug; adapter disables local storage. Enable authenticated client uploads for larger originals. https://payloadcms.com/docs/upload/storage-adapters
- Vercel Functions have a 4.5 MB request/response body cap; direct client Blob uploads bypass the upload body bottleneck. Do not assume this also eliminates server image-processing resource limits. https://vercel.com/docs/functions/limitations
- Atlas/Vercel integration documents dynamic Vercel IPs and an all-IP Atlas access entry in that integration flow. Decide network configuration at deployment, use an appropriate app database user, and place app/database close geographically. No network changes made. Integration supplies `MONGODB_URI`; map consistently to the config variable (`DATABASE_URL` in Payload examples), rather than assuming names match. https://www.mongodb.com/docs/atlas/reference/partner-integrations/vercel/
- Later environment configuration: Payload secret, Mongo connection URL, Blob token, and public/server origin if used. Keep secrets private; preview should not mutate production content. No secrets requested now.
- Next official installation: https://nextjs.org/docs/app/getting-started/installation
- Vercel currently lists Node 24.x (default) and 22.x. Recommend pinning 24.x locally and in deployment, then verifying the resolved Payload dependencies in the production build. Payload's minimum alone is not the deployment version choice. https://vercel.com/docs/functions/runtimes/node-js/node-js-versions

## Readiness after user return

No essential pre-implementation question remains. Language, content source/scope, and contact editability are confirmed above. Use the recorded client grouping, choose strong covers, retain source wording for experience, and use neutral titles where client attribution is unknown. Do not invent missing facts. Real WhatsApp details and optional additional contact links can be added through Payload later; they are not implementation blockers. Cloud configuration and domain decisions are needed only at deployment. User subsequently explicitly authorized implementation (“يلا بينا” and “كمل شغل”). Implementation is now in progress; deployment remains a later phase.

Routine decisions to resolve without asking: responsive behavior, restrained transitions, grouping repeated client pages, artwork extraction method, simple CMS fields, basic SEO/accessibility, and compatible version pinning. Domain and cloud account details can wait until deployment.

## Implementation update

Local implementation authorized and completed in this chat, pending final visual checks. Next.js 16.4.1 + Payload 3.90.2 blank configuration, MongoDB on local port 27018, official optional Blob adapter, Projects/Media/Users plus About/Contact globals. All 22 grouped projects imported. Public contact details are dashboard-managed, with an optional full WhatsApp URL exposed by `/api/globals/contact`; no real link needed to finish. Environment variables contain only service configuration/secrets and site origin. Final production build, TypeScript, and API integration checks passed. Desktop/mobile visual checks and filters passed. Curated galleries now use 65 retained source images; hidden/mismatched Illustrator objects were excluded. Local preview is running at http://127.0.0.1:3000 and admin at /admin. No cloud deployment created. See README for run/verification/deployment notes. A request to create a local editor account was received from another chat; automatic approval review requires direct user confirmation here before creation. An asynchronous question is pending; do not create that account without a direct answer. Never save its password in project files.
