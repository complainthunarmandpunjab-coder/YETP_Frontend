import { createFileRoute, Link } from "@tanstack/react-router";
import { Container, FadeIn } from "@/components/yetp/primitives";
import { PageHero } from "@/components/yetp/PageHero";
import { courses } from "@/data/yetp";
import { FiCheck, FiArrowRight, FiClock, FiBookOpen } from "react-icons/fi";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [{ title: "Our Courses — YETP" }],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  return (
    <div>
      <PageHero
        title="Our Training Programs"
        subtitle="26+ Premium Diploma and Freelancing Courses — 100% Hands-On Training with Labs and Guaranteed Internships."
        breadcrumb="Our Courses"
      />

      <div className="bg-white py-14">
        <Container>
          {/* Section header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-4 w-1 rounded" style={{ background: "#C9A227" }} />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.28em]" style={{ color: "#0B5D3B" }}>
                Available Programs
              </span>
            </div>
            <h2 className="font-display text-2xl font-extrabold" style={{ color: "#073d27" }}>
              Choose Your Career Path
            </h2>
            <p className="mt-2 text-sm" style={{ color: "#6b6b6b" }}>
              All programs include real project work, mentorship from industry experts and internship placement.
            </p>
          </div>

          {/* Courses grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c, i) => (
              <FadeIn key={c.slug} delay={i * 0.06}>
                <article
                  className="flex h-full flex-col overflow-hidden bg-white transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{ border: "1px solid #e5e5e5" }}
                >
                  {/* Header */}
                  <div style={{ background: "#0B5D3B" }} className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className="grid size-12 place-items-center text-white"
                        style={{ background: "rgba(255,255,255,0.13)" }}
                      >
                        <c.icon className="size-6" />
                      </div>
                      {c.internship && (
                        <span className="rounded-sm px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide"
                          style={{ background: "#C9A227", color: "#073d27" }}>
                          + Internship
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold text-white">{c.title}</h3>
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-white/60">
                      <FiClock className="size-3" /> {c.duration}
                    </div>
                  </div>
                  <div style={{ height: 2, background: "#C9A227" }} />
                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-sm leading-relaxed" style={{ color: "#6b6b6b" }}>{c.description}</p>
                    <div className="mt-4 text-[10px] font-extrabold uppercase tracking-widest" style={{ color: "#0B5D3B" }}>
                      Career Outcomes
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {c.outcomes.map((o) => (
                        <li key={o} className="flex items-center gap-2 text-xs" style={{ color: "#555" }}>
                          <FiCheck className="size-3.5 shrink-0" style={{ color: "#0B5D3B" }} /> {o}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-col gap-2 pt-5">
                      <Link
                        to="/course/$slug"
                        params={{ slug: c.slug }}
                        className="flex items-center justify-center gap-2 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
                        style={{ background: "#0B5D3B" }}
                      >
                        <FiBookOpen className="size-3.5" /> View Details
                      </Link>
                      <div className="flex gap-2">
                        <a href="/enroll"
                          className="flex-1 py-2 text-center text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
                          style={{ background: "#C9A227" }}>
                          Apply Now
                        </a>
                        <a href="/contact"
                          className="flex-1 py-2 text-center text-xs font-bold uppercase tracking-wide text-[#0B5D3B] transition-all hover:bg-[#0B5D3B] hover:text-white"
                          style={{ border: "2px solid #0B5D3B" }}>
                          Enquire
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-14 p-10 text-center text-white"
            style={{ background: "#0B5D3B", borderTop: "3px solid #C9A227" }}
          >
            <div className="font-display text-2xl font-extrabold">Not sure which program to choose?</div>
            <p className="mt-2 text-sm text-white/70">
              Call us and our counselors will help you pick the right career path.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <a href="tel:+923029898082"
                className="inline-flex items-center gap-2 rounded-sm px-6 py-2.5 text-sm font-bold text-[#073d27] transition-opacity hover:opacity-90"
                style={{ background: "#C9A227" }}>
                0302-9898082
              </a>
              <a href="/enroll"
                className="inline-flex items-center gap-2 rounded-sm border-2 border-white/40 px-6 py-2.5 text-sm font-bold text-white hover:bg-white/10">
                Apply Now <FiArrowRight />
              </a>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
