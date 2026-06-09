import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { courses } from "@/data/yetp";
import { Container } from "@/components/yetp/primitives";
import { FiArrowLeft, FiCheck, FiClock, FiChevronDown, FiChevronUp, FiPhone } from "react-icons/fi";
import { useState } from "react";

export const Route = createFileRoute("/courses_/$slug")({
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
          ← Back to all courses
        </Link>
      </div>
    </div>
  ),
});

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "#444" }}>
          <FiCheck className="mt-0.5 size-4 shrink-0" style={{ color: "#0B5D3B" }} strokeWidth={3} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h2 className="text-xl font-extrabold font-display" style={{ color: "#073d27" }}>
        {children}
      </h2>
      <div className="mt-1.5 h-0.5 w-12" style={{ background: "#C9A227" }} />
    </div>
  );
}

function CourseDetailPage() {
  const { course } = Route.useLoaderData();
  const [openModule, setOpenModule] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">

      {/* ── NAV BAR ── */}
      <div style={{ background: "#0B5D3B", borderBottom: "3px solid #C9A227" }}>
        <Container>
          <div className="flex h-12 items-center justify-between">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.3)" }}
            >
              <FiArrowLeft className="size-3.5" /> Back to Courses
            </Link>
            <span
              className="rounded-sm px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest"
              style={{ background: "#C9A227", color: "#073d27" }}
            >
              {course.level}
            </span>
          </div>
        </Container>
      </div>

      {/* ── MAIN ── */}
      <Container className="py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">

          {/* ── LEFT COLUMN ── */}
          <div>

            {/* Title + description */}
            <div className="mb-8">
              {/* Badges */}
              <div className="mb-3 flex flex-wrap gap-2">
                <span
                  className="rounded-sm px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest"
                  style={{ background: "#eef7f1", color: "#0B5D3B" }}
                >
                  {course.category}
                </span>
                {course.internship && (
                  <span
                    className="rounded-sm px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest"
                    style={{ background: "#fff8e6", color: "#9a7a1a" }}
                  >
                    Includes Internship
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl font-extrabold sm:text-4xl" style={{ color: "#073d27" }}>
                {course.title}
              </h1>
              <p className="mt-3 text-base leading-relaxed" style={{ color: "#555" }}>
                {course.description}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#0B5D3B" }}>
                <span
                  className="grid size-5 place-items-center rounded-full"
                  style={{ background: "#0B5D3B" }}
                >
                  <FiClock className="size-3 text-white" />
                </span>
                {course.duration}
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="mb-10">
              <SectionTitle>What You'll Learn</SectionTitle>
              <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {course.whatYouLearn.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <span
                      className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full"
                      style={{ background: "#0B5D3B" }}
                    >
                      <FiCheck className="size-3 text-white" strokeWidth={3} />
                    </span>
                    <span className="text-sm" style={{ color: "#333" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Modules */}
            <div className="mb-10">
              <SectionTitle>Course Modules</SectionTitle>
              <div className="space-y-2">
                {course.modules.map((mod, idx) => {
                  const isOpen = openModule === idx;
                  return (
                    <div
                      key={idx}
                      className="overflow-hidden rounded-sm"
                      style={{ border: "1px solid #d0e8d8" }}
                    >
                      <button
                        onClick={() => setOpenModule(isOpen ? null : idx)}
                        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors"
                        style={{ background: isOpen ? "#073d27" : "#f8fcf9" }}
                      >
                        <span
                          className="shrink-0 text-[10px] font-extrabold uppercase tracking-widest"
                          style={{ color: isOpen ? "#C9A227" : "#0B5D3B", minWidth: 64 }}
                        >
                          Module {idx + 1}:
                        </span>
                        <span
                          className="flex-1 text-sm font-bold"
                          style={{ color: isOpen ? "#fff" : "#073d27" }}
                        >
                          {mod.title.replace(/^Module \d+: /, "")}
                        </span>
                        {isOpen
                          ? <FiChevronUp className="size-4 shrink-0" style={{ color: "#C9A227" }} />
                          : <FiChevronDown className="size-4 shrink-0" style={{ color: "#0B5D3B" }} />
                        }
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-3" style={{ background: "#fff", borderTop: "1px solid #d0e8d8" }}>
                          <ul className="space-y-2">
                            {mod.topics.map((t) => (
                              <li key={t} className="flex items-center gap-2.5 text-sm" style={{ color: "#444" }}>
                                <span className="size-1.5 shrink-0 rounded-full" style={{ background: "#C9A227" }} />
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prerequisites */}
            <div className="mb-10">
              <SectionTitle>Prerequisites</SectionTitle>
              <CheckList items={course.prerequisites} />
            </div>

            {/* Tools & Technologies */}
            <div className="mb-6">
              <SectionTitle>Tools &amp; Technologies</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {course.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-sm px-3 py-1.5 text-xs font-semibold"
                    style={{ background: "#f0f6f2", border: "1px solid #c5dece", color: "#0B5D3B" }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">

            {/* Course Details card */}
            <div
              className="overflow-hidden rounded-sm"
              style={{ border: "1px solid #c5dece" }}
            >
              {/* Card header */}
              <div
                className="flex items-center gap-3 px-4 py-4"
                style={{ background: "#0B5D3B" }}
              >
                <div
                  className="grid size-10 shrink-0 place-items-center rounded-sm"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <course.icon className="size-5 text-white" />
                </div>
                <div>
                  <div className="text-[9px] font-extrabold uppercase tracking-widest text-white/50">
                    Course Details
                  </div>
                  <div className="text-sm font-bold text-white">{course.title}</div>
                </div>
              </div>

              {/* Rows */}
              <div style={{ background: "#fff" }}>
                {[
                  { label: "Level", value: course.level },
                  { label: "Duration", value: course.duration },
                  { label: "Category", value: course.category },
                  { label: "Internship", value: course.internship ? "Included" : "Not included" },
                ].map(({ label, value }, i) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-4 py-3 text-sm"
                    style={{ borderBottom: i < 3 ? "1px solid #eef2ee" : "none" }}
                  >
                    <span style={{ color: "#777" }}>{label}</span>
                    <span className="font-bold text-right max-w-[55%]" style={{ color: "#073d27" }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Enroll CTA */}
              <div className="px-4 pb-4 pt-3" style={{ background: "#f8fcf9", borderTop: "1px solid #eef2ee" }}>
                <Link
                  to="/enroll"
                  className="block w-full py-3 text-center text-sm font-extrabold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
                  style={{ background: "#0B5D3B" }}
                >
                  Enroll Now — Free Counseling
                </Link>
                <a
                  href="tel:+923029898082"
                  className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 text-sm font-bold transition-colors hover:bg-white"
                  style={{ border: "2px solid #0B5D3B", color: "#0B5D3B" }}
                >
                  <FiPhone className="size-3.5" /> Call for Enquiry
                </a>
                <p className="mt-2 text-center text-[10px]" style={{ color: "#aaa" }}>
                  Limited seats — apply early.
                </p>
              </div>
            </div>

            {/* Counselor box */}
            <div
              className="rounded-sm p-4"
              style={{ background: "#fff8e6", border: "1px solid #e8d08a" }}
            >
              <div className="text-xs font-extrabold uppercase tracking-widest mb-1" style={{ color: "#9a7a1a" }}>
                Not sure which course?
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "#666" }}>
                Our counselors will help you choose the right career path.
              </p>
              <a href="tel:+923029898082" className="inline-flex items-center gap-1.5 text-xs font-bold" style={{ color: "#0B5D3B" }}>
                <FiPhone className="size-3" /> 0302-9898082 →
              </a>
            </div>

            {/* Other courses */}
            <div
              className="rounded-sm p-4"
              style={{ background: "#fff", border: "1px solid #e0e8e3" }}
            >
              <div className="mb-3 text-xs font-extrabold uppercase tracking-widest" style={{ color: "#0B5D3B" }}>
                Other Courses
              </div>
              <div className="space-y-1.5">
                {courses
                  .filter((c) => c.slug !== course.slug)
                  .map((c) => (
                    <Link
                      key={c.slug}
                      to="/courses/$slug"
                      params={{ slug: c.slug }}
                      className="flex items-center gap-2 rounded-sm px-3 py-2 text-xs font-medium transition-colors hover:bg-[#f0f6f2]"
                      style={{ color: "#333", border: "1px solid #eee" }}
                    >
                      <c.icon className="size-3.5 shrink-0" style={{ color: "#0B5D3B" }} />
                      {c.title}
                    </Link>
                  ))}
              </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
