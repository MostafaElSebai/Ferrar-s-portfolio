import Image from "next/image";
import { getAbout, getProjects } from "@/lib/content";
import { media } from "@/lib/media";
import { ProjectGrid } from "@/components/ProjectGrid";

export const dynamic = "force-dynamic";
export default async function Home() {
  const [projects, about] = await Promise.all([getProjects(), getAbout()]);
  const portrait = media(about.portrait);
  return (
    <main id="main">
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-topline">
          <span className="eyebrow">
            <span className="blue-dot" /> GRAPHIC DESIGNER & VISUAL STORYTELLER
          </span>
          <span className="hero-index">PORTFOLIO / SELECTED WORK</span>
        </div>
        <div className="hero-intro">
          <span className="hero-rule" />
          <h1 id="hero-title">
            Hello!
            <br />
            <span>This is Ahmed Morsi.</span>
          </h1>
          <a
            href="#work"
            className="hero-down"
            aria-label="Explore selected work"
          >
            ↓
          </a>
        </div>
        <div className="portfolio-type" aria-hidden="true">
          PORTFOLIO<span>PORTFOLIO</span>
        </div>
        <div className="hero-bottom">
          <p>
            I elevate brands by creating
            <br />
            visually compelling designs.
          </p>
          <a href="#work" className="text-link">
            Explore my work <span>↘</span>
          </a>
          <span className="hero-note">
            A LITTLE STRATEGY.
            <br />A LOT OF CREATIVITY.
          </span>
        </div>
      </section>
      <section
        id="work"
        className="work-section wrap"
        aria-labelledby="work-title"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow section-number">01 / THE WORK</span>
            <h2 id="work-title">
              Selected <span>work.</span>
            </h2>
          </div>
          <p>
            A collection of ideas brought to life.
            <br />
            Different brands. Distinct perspectives.
          </p>
        </div>
        <ProjectGrid projects={projects} />
      </section>
      <section
        id="about"
        className="about-section"
        aria-labelledby="about-title"
      >
        <div className="wrap about-inner">
          <div className="portrait-composition">
            <svg
              className="portrait-ring"
              viewBox="0 0 400 400"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="circle-text"
                  d="M200,200m-169,0a169,169 0 1,1 338,0a169,169 0 1,1 -338,0"
                />
              </defs>
              <text>
                <textPath href="#circle-text" textLength="1062">
                  AHMED MORSI · GRAPHIC DESIGNER · AHMED MORSI · GRAPHIC
                  DESIGNER ·{" "}
                </textPath>
              </text>
            </svg>
            <div className="portrait-disc">
              {portrait?.url && (
                <Image
                  src={portrait.url}
                  alt={portrait.alt}
                  fill
                  sizes="(max-width:700px) 80vw, 360px"
                />
              )}
            </div>
            <span className="portrait-star" aria-hidden="true">
              ✳
            </span>
          </div>
          <div className="about-copy">
            <span className="eyebrow section-number">02 / THE DESIGNER</span>
            <h2 id="about-title">{about.headline}</h2>
            <p>{about.bio}</p>
            <div className="skill-list">
              <span>Graphic design</span>
              <span>Social media</span>
              <span>Key visuals</span>
              <span>Print design</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
