import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { courses } from "@/data/yetp";
import { Container } from "@/components/yetp/primitives";
import { FiArrowLeft, FiCheck, FiClock, FiChevronDown, FiChevronUp, FiTag, FiAward } from "react-icons/fi";
import { useState } from "react";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.course.title} — YETP` }],
  }),
  component: CourseDetailPage,
  notFoundComponent: () => (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold" style={{ color: "#073d27" }}>Course not found</h1>
        <Link to="/courses" className="mt-4 inline-block text-sm font-semibold underline" style={{ color: "#0B5D3B" }}>
          Back to all courses
        </Link>
      </div>
    </div>
  ),
});

function CourseDetailPage() {
  const { course } = Route.useLoaderData();
  const [openModule, setOpenModule] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div style={{ background: "#0B5D3B", borderBottom: "3px solid #C9A227" }} className="py-3">
        <Container>
          <div className="flex items-center justify-between">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-sm border px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.35)" }}
            >
              <FiArrowLeft className="size-3.5" />
              Back to Courses
            </Link>
            <span
              className="rounded-sm px-3 py-1 text-xs font-extrabold uppercase tracking-widest"
              style={{ background: "#C9A227", color: "#073d27" }}
            >
              {course.level}
            </span>
          </div>
        </Container>
      </div>

      <Container className="py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* LEFT — main content */}
          <div>
            {/* Title block */}
            <div className="mb-8">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest"
                  style={{ background: "#eef7f1", color: "#0B5D3B" }}
                >
                  <FiTag className="size-3" />
                  {course.category}
                </span>
                {course.internship && (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest"
                    style={{ background: "#fff8e6", color: "#9a7a1a" }}
                  >
                    <FiAward className="size-3" />
                    Includes Internship
                  </span>
                )}
              </div>
              <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: "#073d27" }}>
                {course.title}
              </h1>
              <p className="mt-3 text-base leading-relaxed" style={{ color: "#555" }}>
                {course.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold" style={{ color: "#0B5D3B" }}>
                <span
                  className="grid size-5 place-items-center rounded-full"
                  style={{ background: "#C9A227" }}
                >
                  <FiClock className="size-3 text-white" />
                </span>
                {course.duration}
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="mb-10">
              <div className="mb-1 flex items-center gap-2">
                <div className="h-5 w-1 rounded-full" style={{ background: "#C9A227" }} />
                <h2 className="font-display text-xl font-extrabold" style={{ color: "#073d27" }}>
                  What You'll Learn
                </h2>
              </div>
              <div
                className="mt-4 grid gap-3 rounded-sm p-6 sm:grid-cols-2"
                style={{ background: "#f8fcf9", border: "1px solid #d0eadb" }}
              >
                {course.whatYouLearn.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "#333" }}>
                    <span
                      className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full"
                      style={{ background: "#0B5D3B" }}
                    >
                      <FiCheck className="size-2.5 text-white" strokeWidth={3} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Course Modules */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-5 w-1 rounded-full" style={{ background: "#C9A227" }} />
                <h2 className="font-display text-xl font-extrabold" style={{ color: "#073d27" }}>
                  Course Modules
                </h2>
              </div>
              <div className="space-y-2">
                {course.modules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-sm"
                    style={{ border: "1px solid #d0eadb" }}
                  >
                    <button
                      onClick={() => setOpenModule(openModule === idx ? null : idx)}
                      className="flex w-full items-center justify-between p-4 text-left transition-colors"
                      style={{
                        background: openModule === idx ? "#0B5D3B" : "#f8fcf9",
                        color: openModule === idx ? "#fff" : "#073d27",
                      }}
                    >
                      <span className="text-sm font-bold">
                        <span
                          className="mr-2 text-[10px] font-extrabold uppercase tracking-widest"
                          style={{ color: openModule === idx ? "#C9A227" : "#0B5D3B" }}
                        >
                          Module {idx + 1}:
                        </span>
                        {mod.title.replace(/^Module \d+: /, "")}
                      </span>
                      {openModule === idx
                        ? <FiChevronUp className="size-4 shrink-0" />
                        : <FiChevronDown className="size-4 shrink-0" />
                      }
                    </button>
                    {openModule === idx && (
                      <div className="px-4 pb-4 pt-3" style={{ background: "#fff" }}>
                        <ul className="space-y-2">
                          {mod.topics.map((topic) => (
                            <li key={topic} className="flex items-center gap-2 text-sm" style={{ color: "#444" }}>
                              <span
                                className="size-1.5 shrink-0 rounded-full"
                                style={{ background: "#C9A227" }}
                              />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — sticky sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div
              className="overflow-hidden rounded-sm"
              style={{ border: "2px solid #0B5D3B" }}
            >
              {/* Header */}
              <div style={{ background: "#0B5D3B" }} className="p-5">
                <div className="flex items-center gap-3">
                  <div
                    className="grid size-11 place-items-center rounded-sm text-white"
                    style={{ background: "rgba(255,255,255,0.13)" }}
                  >
                    <course.icon className="size-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-white/60">
                      Course Details
                    </div>
                    <div className="text-sm font-bold text-white">{course.title}</div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="divide-y p-0" style={{ borderColor: "#e5f0ea" }}>
                {[
                  { label: "Level", value: course.level },
                  { label: "Duration", value: course.duration },
                  { label: "Category", value: course.category },
                  { label: "Internship", value: course.internship ? "Included" : "Not included" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between px-5 py-3.5" style={{ borderColor: "#e5f0ea", borderBottomWidth: 1 }}>
                    <span className="text-xs font-semibold" style={{ color: "#666" }}>{label}</span>
                    <span className="text-xs font-extrabold" style={{ color: "#073d27" }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="p-5 pt-3">
                <Link
                  to="/enroll"
                  className="block w-full py-3.5 text-center text-sm font-extrabold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
                  style={{ background: "#0B5D3B" }}
                >
                  Enroll Now
                </Link>
                <a
                  href="tel:+923029898082"
                  className="mt-2 block w-full py-3 text-center text-sm font-bold uppercase tracking-wide transition-colors hover:bg-[#f8fcf9]"
                  style={{ border: "2px solid #0B5D3B", color: "#0B5D3B" }}
                >
                  Call for Enquiry
                </a>
                <p className="mt-3 text-center text-[11px]" style={{ color: "#888" }}>
                  Limited seats available. Apply early.
                </p>
              </div>
            </div>

            {/* Related courses hint */}
            <div className="mt-5 rounded-sm p-4" style={{ background: "#fff8e6", border: "1px solid #e8d08a" }}>
              <div className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "#9a7a1a" }}>
                Not sure which course?
              </div>
              <p className="mt-1 text-xs" style={{ color: "#666" }}>
                Talk to our counselors — they'll help you pick the right career path.
              </p>
              <a
                href="tel:+923029898082"
                className="mt-2 block text-xs font-bold"
                style={{ color: "#0B5D3B" }}
              >
                0302-9898082 →
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
