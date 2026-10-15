import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="wrap not-found">
      <span className="eyebrow">404 / NOT FOUND</span>
      <h1>
        This page stepped
        <br />
        out of frame.
      </h1>
      <Link href="/#work" className="text-link">
        Back to the work ↗
      </Link>
    </main>
  );
}
