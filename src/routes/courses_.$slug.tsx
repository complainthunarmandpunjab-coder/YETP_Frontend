import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { courses } from "@/data/yetp";
import { Container } from "@/components/yetp/primitives";
import {
  FiArrowLeft, FiCheck, FiClock, FiChevronDown, FiChevronUp,
  FiTag, FiAward, FiLayers, FiPhone,
} from "react-icons/fi";
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

function CourseDetailPage() {
  const { course } = Route.useLoaderData();
  const [openModule, setOpenModule] = useState<number | null>(0);

  return (
    <div className="min-h-screen" style={{ background: "#f5f7f5" }}>

      {/* ── HERO ── */}
      <div style={{ background: "#0B5D3B" }}>
        <Container className="py-8">
          {/* Back link */}
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 transition-colors hover:text-white mb-6"
          >
            <FiArrowLeft className="size-3.5" /> Back to All Courses
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* Left: title + meta */}
            <div className="flex-1">
              {/* Tags */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest"
                  style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}
                >
                  <FiTag className="size-3" /> {course.category}
                </span>
                {course.internship && (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest"
                    style={{ background: "#C9A227", color: "#073d27" }}
                  >
                    <FiAward className="size-3" /> Includes Internship
                  </span>
                )}
                <span
                  className="inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest"
                  style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
                >
                  <FiLayers className="size-3" /> {course.level}
                </span>
              </div>

              {/* Icon + Title row */}
              <div className="flex items-center gap-4 mb-3">
                <div
                  className="grid size-14 shrink-0 place-items-center rounded-sm text-white"
                  style={{ background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  <course.icon className="size-7" />
                </div>
                <h1 className="font-display text-3xl font-extrabold text-white leading-tight sm:text-4xl">
                  {course.title}
                </h1>
              </div>

              <p className="text-sm leading-relaxed text-white/75 max-w-2xl">
                {course.description}
              </p>

              {/* Key stats */}
              <div className="mt-5 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="grid size-6 place-items-center rounded-full" style={{ background: "#C9A227" }}>
                    <FiClock className="size-3 text-white" />
                  </span>
                  <span className="font-semibold">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="grid size-6 place-items-center rounded-full" style={{ background: "#C9A227" }}>
                    <FiLayers className="size-3 text-white" />
                  </span>
                  <span className="font-semibold">{course.modules.length} Modules</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="grid size-6 place-items-center rounded-full" style={{ background: "#C9A227" }}>
                    <FiCheck className="size-3 text-white" />
                  </span>
                  <span className="font-semibold">{course.whatYouLearn.length} Learning Outcomes</span>
                </div>
              </div>
            </div>

            {/* Right: quick enroll card (desktop hero) */}
            <div
              className="hidden lg:flex flex-col gap-3 shrink-0 rounded-sm p-5 min-w-[200px]"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <div className="text-xs font-extrabold uppercase tracking-widest text-white/50">Quick Enroll</div>
              <Link
                to="/enroll"
                className="block py-3 text-center text-sm font-extrabold uppercase tracking-widest transition-opacity hover:opacity-90"
                style={{ background: "#C9A227", color: "#073d27" }}
              >
                Apply Now
              </Link>
              <a
                href="tel:+923029898082"
                className="flex items-center justify-center gap-2 py-2.5 text-center text-xs font-bold text-white/80 transition-colors hover:text-white"
                style={{ border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <FiPhone className="size-3.5" /> 0302-9898082
              </a>
            </div>
          </div>
        </Container>

        {/* Gold accent bar */}
        <div style={{ height: 3, background: "#C9A227" }} />
      </div>

      {/* ── BODY ── */}
      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">

          {/* LEFT */}
          <div className="space-y-8">

            {/* What You'll Learn */}
            <div
              className="rounded-sm overflow-hidden"
              style={{ background: "#fff", border: "1px solid #dde8e2" }}
            >
              <div
                className="px-6 py-4 flex items-center gap-3"
                style={{ borderBottom: "1px solid #dde8e2", background: "#f8fcf9" }}
              >
                <div className="h-5 w-1 rounded-full" style={{ background: "#C9A227" }} />
                <h2 className="font-display text-lg font-extrabold" style={{ color: "#073d27" }}>
                  What You'll Learn
                </h2>
              </div>
              <div className="grid gap-3 p-6 sm:grid-cols-2">
                {course.whatYouLearn.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full"
                      style={{ background: "#0B5D3B" }}
                    >
                      <FiCheck className="size-3 text-white" strokeWidth={3} />
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: "#333" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Modules */}
            <div
              className="rounded-sm overflow-hidden"
              style={{ background: "#fff", border: "1px solid #dde8e2" }}
            >
              <div
                className="px-6 py-4 flex items-center gap-3"
                style={{ borderBottom: "1px solid #dde8e2", background: "#f8fcf9" }}
              >
                <div className="h-5 w-1 rounded-full" style={{ background: "#C9A227" }} />
                <h2 className="font-display text-lg font-extrabold" style={{ color: "#073d27" }}>
                  Course Modules
                </h2>
                <span
                  className="ml-auto rounded-sm px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest"
                  style={{ background: "#eef7f1", color: "#0B5D3B" }}
                >
                  {course.modules.length} Modules
                </span>
              </div>

              <div className="divide-y" style={{ borderColor: "#eef0ee" }}>
                {course.modules.map((mod, idx) => (
                  <div key={idx}>
                    <button
                      onClick={() => setOpenModule(openModule === idx ? null : idx)}
                      className="flex w-full items-center gap-4 px-6 py-4 text-left transition-colors"
                      style={{
                        background: openModule === idx ? "#0B5D3B" : "#fff",
                      }}
                    >
                      <span
                        className="grid size-7 shrink-0 place-items-center rounded-sm text-xs font-extrabold"
                        style={{
                          background: openModule === idx ? "rgba(255,255,255,0.18)" : "#eef7f1",
                          color: openModule === idx ? "#C9A227" : "#0B5D3B",
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span
                        className="flex-1 text-sm font-bold"
                        style={{ color: openModule === idx ? "#fff" : "#073d27" }}
                      >
                        {mod.title.replace(/^Module \d+: /, "")}
                      </span>
                      <span style={{ color: openModule === idx ? "#C9A227" : "#0B5D3B" }}>
                        {openModule === idx
                          ? <FiChevronUp className="size-4" />
                          : <FiChevronDown className="size-4" />}
                      </span>
                    </button>

                    {openModule === idx && (
                      <div className="px-6 pb-5 pt-3" style={{ background: "#f8fcf9" }}>
                        <ul className="space-y-2.5">
                          {mod.topics.map((topic) => (
                            <li key={topic} className="flex items-center gap-3 text-sm" style={{ color: "#444" }}>
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

            {/* Bottom CTA mobile */}
            <div
              className="lg:hidden rounded-sm p-5 text-center"
              style={{ background: "#0B5D3B" }}
            >
              <div className="font-display text-base font-extrabold text-white mb-1">
                Ready to Enroll?
              </div>
              <p className="text-xs text-white/65 mb-4">Limited seats — apply before they fill up.</p>
              <Link
                to="/enroll"
                className="block py-3 text-sm font-extrabold uppercase tracking-widest transition-opacity hover:opacity-90"
                style={{ background: "#C9A227", color: "#073d27" }}
              >
                Apply Now
              </Link>
            </div>
          </div>

          {/* RIGHT — sticky sidebar */}
          <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start space-y-4">

            {/* Details card */}
            <div
              className="overflow-hidden rounded-sm"
              style={{ border: "2px solid #0B5D3B" }}
            >
              <div
                className="flex items-center gap-3 p-4"
                style={{ background: "#0B5D3B" }}
              >
                <div
                  className="grid size-10 place-items-center rounded-sm"
                  style={{ background: "rgba(255,255,255,0.13)" }}
                >
                  <course.icon className="size-5 text-white" />
                </div>
                <div>
                  <div className="text-[9px] font-extrabold uppercase tracking-widest text-white/50">
                    Course Details
                  </div>
                  <div className="text-sm font-bold text-white leading-tight">{course.title}</div>
                </div>
              </div>

              <div style={{ background: "#fff" }}>
                {[
                  { label: "Level", value: course.level },
                  { label: "Duration", value: course.duration },
                  { label: "Category", value: course.category },
                  { label: "Internship", value: course.internship ? "Included ✓" : "Not included" },
                  { label: "Modules", value: `${course.modules.length} Modules` },
                ].map(({ label, value }, i, arr) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-4 py-3"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid #eef0ee" : "none" }}
                  >
                    <span className="text-xs font-semibold" style={{ color: "#888" }}>{label}</span>
                    <span className="text-xs font-extrabold text-right max-w-[55%]" style={{ color: "#073d27" }}>{value}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 space-y-2" style={{ background: "#f8fcf9", borderTop: "1px solid #dde8e2" }}>
                <Link
                  to="/enroll"
                  className="block w-full py-3.5 text-center text-sm font-extrabold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
                  style={{ background: "#0B5D3B" }}
                >
                  Enroll Now
                </Link>
                <a
                  href="tel:+923029898082"
                  className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold transition-colors hover:bg-white"
                  style={{ border: "2px solid #0B5D3B", color: "#0B5D3B" }}
                >
                  <FiPhone className="size-3.5" /> Call for Enquiry
                </a>
                <p className="text-center text-[10px] pt-1" style={{ color: "#aaa" }}>
                  Limited seats — apply early.
                </p>
              </div>
            </div>

            {/* Counselor card */}
            <div
              className="rounded-sm p-4"
              style={{ background: "#fff8e6", border: "1px solid #e8d08a" }}
            >
              <div className="text-xs font-extrabold uppercase tracking-widest mb-1" style={{ color: "#9a7a1a" }}>
                Not sure which course?
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "#666" }}>
                Our counselors will help you pick the right career path.
              </p>
              <a
                href="tel:+923029898082"
                className="inline-flex items-center gap-1.5 text-xs font-bold"
                style={{ color: "#0B5D3B" }}
              >
                <FiPhone className="size-3" /> 0302-9898082 →
              </a>
            </div>

            {/* Other courses */}
            <div
              className="rounded-sm p-4"
              style={{ background: "#fff", border: "1px solid #dde8e2" }}
            >
              <div className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: "#0B5D3B" }}>
                Other Courses
              </div>
              <div className="space-y-2">
                {courses
                  .filter((c) => c.slug !== course.slug)
                  .slice(0, 4)
                  .map((c) => (
                    <Link
                      key={c.slug}
                      to="/courses/$slug"
                      params={{ slug: c.slug }}
                      className="flex items-center gap-2.5 rounded-sm px-3 py-2 text-xs font-semibold transition-colors hover:bg-[#f8fcf9]"
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
