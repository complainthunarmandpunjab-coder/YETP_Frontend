import { createFileRoute } from "@tanstack/react-router";
import { Container, FadeIn } from "@/components/yetp/primitives";
import { PageHero } from "@/components/yetp/PageHero";
import { FiExternalLink, FiBook, FiVideo, FiMonitor, FiUsers, FiArrowRight, FiCheck, FiLock } from "react-icons/fi";
import { HiOutlineAcademicCap } from "react-icons/hi2";

export const Route = createFileRoute("/lms")({
  head: () => ({
    meta: [{ title: "LMS Portal — YETP" }],
  }),
  component: LmsPage,
});

const lmsFeatures = [
  { icon: FiVideo, title: "Video Lectures", desc: "Access recorded lectures anytime, rewatch at your own pace and never miss a session." },
  { icon: FiBook, title: "Course Materials", desc: "Download notes, assignments, and resources for all your enrolled programs." },
  { icon: FiMonitor, title: "Live Sessions", desc: "Join live instructor-led classes with real-time Q&A and interaction." },
  { icon: FiUsers, title: "Student Community", desc: "Collaborate with fellow students in discussion forums and group projects." },
];

const steps = [
  { n: "01", title: "Register / Login", desc: "Use your YETP student credentials to log in to the LMS portal." },
  { n: "02", title: "Select Your Course", desc: "Navigate to your enrolled program from the dashboard." },
  { n: "03", title: "Start Learning", desc: "Access lectures, assignments, and track your progress in real-time." },
];

function LmsPage() {
  return (
    <div>
      <PageHero
        title="LMS Portal"
        subtitle="Access your course materials, video lectures, assignments and live sessions — all in one place."
        breadcrumb="LMS Portal"
      />

      <div className="bg-white py-14">
        <Container>

          {/* Login CTA */}
          <FadeIn>
            <div
              className="mb-14 flex flex-col items-center justify-between gap-6 p-8 text-white sm:flex-row"
              style={{ background: "#0B5D3B", borderTop: "3px solid #C9A227" }}
            >
              <div className="flex items-center gap-4">
                <div className="grid size-14 place-items-center" style={{ background: "rgba(255,255,255,0.12)" }}>
                  <HiOutlineAcademicCap className="size-7" />
                </div>
                <div>
                  <div className="font-display text-xl font-extrabold">Access Your LMS Portal</div>
                  <p className="mt-0.5 text-sm text-white/65">
                    Current YETP students can log in using their registered credentials.
                  </p>
                </div>
              </div>
              <a
                href="https://lms.yetp.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 px-8 py-3 text-sm font-extrabold uppercase tracking-wide transition-opacity hover:opacity-90"
                style={{ background: "#C9A227", color: "#073d27" }}
              >
                Login to LMS <FiExternalLink />
              </a>
            </div>
          </FadeIn>

          {/* Features */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-4 w-1 rounded" style={{ background: "#C9A227" }} />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.28em]" style={{ color: "#0B5D3B" }}>
                LMS Features
              </span>
            </div>
            <h2 className="font-display text-2xl font-extrabold mb-8" style={{ color: "#073d27" }}>
              Everything You Need to Learn
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {lmsFeatures.map((f, i) => (
                <FadeIn key={f.title} delay={i * 0.07}>
                  <div
                    className="h-full bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                    style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}
                  >
                    <div className="grid size-11 place-items-center text-white" style={{ background: "#0B5D3B" }}>
                      <f.icon className="size-5" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold" style={{ color: "#073d27" }}>{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "#6b6b6b" }}>{f.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* How to access */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-4 w-1 rounded" style={{ background: "#C9A227" }} />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.28em]" style={{ color: "#0B5D3B" }}>
                Getting Started
              </span>
            </div>
            <h2 className="font-display text-2xl font-extrabold mb-8" style={{ color: "#073d27" }}>
              How to Access the Portal
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {steps.map((s, i) => (
                <FadeIn key={s.n} delay={i * 0.08}>
                  <div
                    className="relative bg-white p-7"
                    style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #C9A227" }}
                  >
                    <div className="font-display text-4xl font-extrabold" style={{ color: "rgba(11,93,59,0.1)" }}>
                      {s.n}
                    </div>
                    <h3 className="mt-2 font-display text-base font-bold" style={{ color: "#073d27" }}>{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "#6b6b6b" }}>{s.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Two columns: credentials info + enroll */}
          <div className="grid gap-6 lg:grid-cols-2">
            <FadeIn>
              <div className="h-full bg-white p-8" style={{ border: "1px solid #e5e5e5", borderLeft: "4px solid #0B5D3B" }}>
                <div className="flex items-center gap-3 mb-5">
                  <FiLock className="size-5" style={{ color: "#0B5D3B" }} />
                  <h3 className="font-display text-lg font-bold" style={{ color: "#073d27" }}>
                    Login Credentials
                  </h3>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#555" }}>
                  Your LMS credentials are provided upon successful enrollment and fee submission. Use the email and password sent to you by the admissions team.
                </p>
                {[
                  "Credentials emailed after enrollment",
                  "Use your registered email ID",
                  "Contact admin to reset password",
                  "One account per enrolled student",
                ].map((l) => (
                  <div key={l} className="flex items-center gap-2 py-1.5 text-sm" style={{ color: "#444" }}>
                    <FiCheck className="size-3.5 shrink-0" style={{ color: "#0B5D3B" }} /> {l}
                  </div>
                ))}
                <div className="mt-5 pt-4" style={{ borderTop: "1px solid #f0f0f0" }}>
                  <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#0B5D3B" }}>
                    LMS Support
                  </div>
                  <a href="mailto:info@yetp.pk" className="text-sm hover:text-[#0B5D3B]" style={{ color: "#555" }}>
                    info@yetp.pk
                  </a>
                  <span className="mx-2 text-gray-300">|</span>
                  <a href="tel:+923029898082" className="text-sm hover:text-[#0B5D3B]" style={{ color: "#555" }}>
                    0302-9898082
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div
                className="h-full p-8 text-center text-white flex flex-col items-center justify-center"
                style={{ background: "linear-gradient(135deg, #052b1c 0%, #0B5D3B 100%)" }}
              >
                <div className="font-display text-2xl font-extrabold">Not Enrolled Yet?</div>
                <p className="mt-2 text-sm text-white/65 max-w-xs leading-relaxed">
                  Enroll in any YETP program to get access to our world-class LMS platform and start learning today.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a href="/enroll"
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold"
                    style={{ background: "#C9A227", color: "#073d27", borderRadius: 2 }}>
                    Apply Now <FiArrowRight />
                  </a>
                  <a href="/courses"
                    className="inline-flex items-center gap-2 border-2 border-white/30 px-6 py-2.5 text-sm font-bold text-white hover:bg-white/10"
                    style={{ borderRadius: 2 }}>
                    View Courses
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </div>
    </div>
  );
}
