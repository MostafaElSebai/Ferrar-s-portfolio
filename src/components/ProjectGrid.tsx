"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/payload-types";
import { categoryLabels, media } from "@/lib/media";

const filters = [
  { value: "all", label: "All work" },
  { value: "social", label: "Social Media" },
  { value: "key-visual", label: "Key Visual" },
  { value: "print", label: "Print Design" },
];
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("all");
  const visible = projects.filter(
    (project) =>
      active === "all" ||
      project.categories.includes(active as "social" | "key-visual" | "print"),
  );
  return (
    <>
      <div className="work-toolbar">
        <div className="filters" aria-label="Filter projects">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter.value}
              aria-pressed={active === filter.value}
              onClick={() => setActive(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <span className="work-count" aria-live="polite">
          {String(visible.length).padStart(2, "0")} PROJECTS
        </span>
      </div>
      <div className="project-grid">
        {visible.map((project, index) => {
          const image = media(project.cover);
          return (
            <Link
              className="project-card"
              href={`/projects/${project.slug}`}
              key={project.id}
            >
              <div className="card-image">
                {image?.url && (
                  <Image
                    src={image.sizes?.card?.url || image.url}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 700px) 100vw, 50vw"
                    priority={index < 2}
                  />
                )}
                <span className="card-open" aria-hidden="true">
                  ↗
                </span>
              </div>
              <div className="card-info">
                <h3>{project.title}</h3>
                <span>
                  {project.categories.map((c) => categoryLabels[c]).join(" / ")}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      {visible.length === 0 && (
        <p className="empty-state">New work is on its way.</p>
      )}
    </>
  );
}
