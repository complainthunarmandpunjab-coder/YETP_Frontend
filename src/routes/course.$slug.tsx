import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { courses } from "@/data/yetp";
import { Container } from "@/components/yetp/primitives";
import { FiArrowLeft, FiCheck, FiClock, FiChevronDown, FiChevronUp, FiPhone, FiBookOpen } from "react-icons/fi";
import { useState } from "react";
import courseUpdates from "../../tmp_course_updates.json";

export const Route = createFileRoute("/course/$slug")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    const extendedData = (courseUpdates as any)[course.slug] || null;
    return { course, extendedData };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.course?.title} — YETP` }],
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
  const { course, extendedData } = Route.useLoaderData();

  // Map data
  const description = extendedData?.description || course.description;
  const whatYouLearn = extendedData?.whatYouLearn || course.outcomes;
  const requirements = extendedData?.requirements || course.prerequisites;
  const materialIncludes = extendedData?.materialIncludes || course.tools;
  const whoCanJoin = extendedData ? {
    intro: extendedData.whoCanJoinIntro,
    items: extendedData.whoCanJoinItems,
    note: extendedData.whoCanJoinNote
  } : null;

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: 100 }}>

      {/* ── BREADCRUMB BAR ── */}
      <div style={{ background: "#f0f6f2", borderBottom: "1px solid #c8dfd0" }}>
        <Container>
          <div className="flex h-11 items-center justify-between">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-xs font-bold transition-colors hover:underline"
              style={{ color: "#0B5D3B" }}
            >
              <FiArrowLeft className="size-3.5" /> Back to Courses
            </Link>
            <span
              className="rounded-sm px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest"
              style={{ background: "#0B5D3B", color: "#fff" }}
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
              
              <div className="mt-4 prose prose-sm max-w-none leading-relaxed" style={{ color: "#555" }}>
                {description.split('\n\n').map((p: string, i: number) => (
                  <p key={i} className="mb-3 text-base">{p}</p>
                ))}
              </div>
              
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
                {whatYouLearn.map((item: string) => (
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

            {/* Who Can Join */}
            {whoCanJoin && (
              <div className="mb-10">
                <SectionTitle>Who Can Join This Course?</SectionTitle>
                <div className="rounded-sm p-6" style={{ background: "#f8fcf9", border: "1px solid #d0e8d8" }}>
                  <p className="mb-4 text-sm font-bold" style={{ color: "#073d27" }}>
                    {whoCanJoin.intro}
                  </p>
                  <ul className="mb-4 space-y-2">
                    {whoCanJoin.items.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm" style={{ color: "#444" }}>
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: "#C9A227" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 border-t pt-4" style={{ borderColor: "#d0e8d8" }}>
                    <p className="text-xs font-bold" style={{ color: "#0B5D3B" }}>
                      {whoCanJoin.note}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Requirements */}
            <div className="mb-10">
              <SectionTitle>Requirements</SectionTitle>
              <CheckList items={requirements} />
            </div>

            {/* Material Includes */}
            <div className="mb-6">
              <SectionTitle>Material Includes</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {materialIncludes.map((mat: string) => (
                  <span
                    key={mat}
                    className="rounded-sm px-3 py-1.5 text-xs font-semibold"
                    style={{ background: "#f0f6f2", border: "1px solid #c5dece", color: "#0B5D3B" }}
                  >
                    {mat}
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
                  { label: "Completion Certificate", value: "Yes" },
                  { label: "Training Evaluation", value: "Yes" },
                  { label: "Language", value: "Urdu / English" },
                  { label: "Fee", value: "Ask for Fee" },
                ].map(({ label, value }, i) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-4 py-3 text-sm"
                    style={{ borderBottom: "1px solid #eef2ee" }}
                  >
                    <span style={{ color: "#777" }}>{label}</span>
                    <span className="font-bold text-right max-w-[55%]" style={{ color: "#073d27" }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Enroll CTA */}
              <div className="px-4 pb-4 pt-3" style={{ background: "#f8fcf9" }}>
                <Link
                  to="/enroll"
                  className="block w-full py-3 text-center text-sm font-extrabold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
                  style={{ background: "#0B5D3B" }}
                >
                  Enroll Now
                </Link>
                <a
                  href="tel:+923029898082"
                  className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 text-sm font-bold transition-colors hover:bg-white"
                  style={{ border: "2px solid #0B5D3B", color: "#0B5D3B" }}
                >
                  <FiPhone className="size-3.5" /> Call for Enquiry
                </a>
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

          </div>
        </div>
      </Container>
    </div>
  );
}
