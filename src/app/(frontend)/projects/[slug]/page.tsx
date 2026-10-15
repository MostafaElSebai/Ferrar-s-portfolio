import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { media, categoryLabels } from "@/lib/media";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getProjects()).find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  const cover = media(project.cover);
  return {
    title: project.title,
    description:
      project.description ||
      `${project.title} — selected design work by Ahmed Morsi.`,
    openGraph: {
      title: project.title,
      ...(cover?.url ? { images: [cover.url] } : {}),
    },
  };
}
export default async function Project({ params }: Props) {
  const { slug } = await params;
  const projects = await getProjects();
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return (
    <main id="main" className="project-page wrap">
      <Link href="/#work" className="back-link">
        ← All work
      </Link>
      <div className="project-title">
        <span className="eyebrow">
          {project.categories.map((c) => categoryLabels[c]).join(" / ")}
        </span>
        <h1>
          {project.title}
          <span>.</span>
        </h1>
        {project.description && <p>{project.description}</p>}
        {project.videoUrl && (
          <a
            className="video-link"
            href={project.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch project video <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
      <div className="project-gallery">
        {project.gallery.map((item, index) => {
          const image = media(item.image);
          return image?.url ? (
            <figure key={item.id || index}>
              <Image
                src={image.url}
                alt={image.alt}
                width={image.width || 1200}
                height={image.height || 1200}
                sizes="(max-width: 700px) 100vw, 80vw"
                priority={index === 0}
              />
            </figure>
          ) : null;
        })}
      </div>
      {next && next.id !== project.id && (
        <Link className="next-project" href={`/projects/${next.slug}`}>
          <span className="eyebrow">NEXT PROJECT</span>
          <span>
            {next.title} <span className="next-arrow">↗</span>
          </span>
        </Link>
      )}
    </main>
  );
}
