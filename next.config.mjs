import { withPayload } from "@payloadcms/next/withPayload";

export default withPayload({
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
});
