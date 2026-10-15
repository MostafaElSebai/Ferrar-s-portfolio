import Link from "next/link";
import { getContact } from "@/lib/content";

export function Header() {
  return (
    <header className="site-header wrap">
      <Link href="/" className="wordmark" aria-label="Ahmed Morsi home">
        AHMED MORSI
        <span className="brand-dot" aria-hidden="true">
          ●
        </span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/#work">
          Work <span>↗</span>
        </Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact" className="nav-contact">
          Let’s talk <span>↗</span>
        </Link>
      </nav>
    </header>
  );
}
export async function Footer() {
  const contact = await getContact();
  return (
    <footer id="contact" className="contact-section wrap">
      <div className="eyebrow">
        <span className="blue-dot" /> HAVE SOMETHING IN MIND?
      </div>
      <div className="contact-heading">
        <h2>
          Let’s make
          <br />
          <span>an impact.</span>
        </h2>
        <a
          className="circle-link"
          href={contact.email ? `mailto:${contact.email}` : contact.behance}
          aria-label={
            contact.email ? "Email Ahmed Morsi" : "See Ahmed Morsi on Behance"
          }
        >
          ↗
        </a>
      </div>
      <div className="contact-links">
        {contact.email && <a href={`mailto:${contact.email}`}>Email ↗</a>}
        {contact.whatsapp ? (
          <a href={contact.whatsapp}>WhatsApp ↗</a>
        ) : (
          <span className="unavailable" aria-disabled="true">
            WhatsApp — coming soon
          </span>
        )}
        <a href={contact.behance} target="_blank" rel="noreferrer">
          Behance ↗
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Ahmed Morsi</span>
        <span>DESIGNED TO MAKE A DIFFERENCE.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
