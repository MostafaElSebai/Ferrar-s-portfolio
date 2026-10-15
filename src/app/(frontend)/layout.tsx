import type { Metadata } from "next";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/900.css";
import "./styles.css";
import { Header, Footer } from "@/components/Chrome";

export const metadata: Metadata = {
  title: {
    default: "Ahmed Morsi — Graphic Designer",
    template: "%s — Ahmed Morsi",
  },
  description:
    "Graphic design, key visuals, social media and print. Selected work by Ahmed Morsi.",
  ...(process.env.NEXT_PUBLIC_SERVER_URL
    ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL) }
    : {}),
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
