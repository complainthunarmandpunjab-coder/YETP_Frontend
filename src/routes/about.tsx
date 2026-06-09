import { createFileRoute } from "@tanstack/react-router";
import { Container, FadeIn } from "@/components/yetp/primitives";
import { PageHero } from "@/components/yetp/PageHero";
import { features, pillars, stats } from "@/data/yetp";
import { FiArrowRight } from "react-icons/fi";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [{ title: "About Us — YETP" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <PageHero
        title="About YETP"
        subtitle="Youth Empowerment Training Program — Pakistan's No.1 IT Training Institute. Learn, Lead and Change."
        breadcrumb="About Us"
      />

      {/* Stats bar */}
      <div style={{ background: "#073d27" }}>
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-5 divide-x divide-white/10">
            {stats.map((s, i) => (
              <div key={s.label} className="py-5 text-center px-3">
                <div className="font-display text-2xl font-extrabold text-white">{s.value}</div>
                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <div className="bg-white py-14">
        <Container>

          {/* About intro */}
          <div className="grid gap-10 lg:grid-cols-2 mb-16">
            <FadeIn>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-4 w-1 rounded" style={{ background: "#C9A227" }} />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.28em]" style={{ color: "#0B5D3B" }}>Who We Are</span>
              </div>
              <h2 className="font-display text-3xl font-extrabold leading-tight" style={{ color: "#073d27" }}>
                Pakistan's No.1 IT<br />Training Institute
              </h2>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "#555" }}>
                Welcome to Youth Empowerment Training Program (YETP). YETP focuses on youth empowerment by filling the skill gap and aims to produce future entrepreneurs and self-employees.
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#555" }}>
                YETP provides a wide range of <strong>Premium Diplomas</strong> and <strong>Freelancing Courses</strong> at the minimum fee as compared to other institutes under one roof.
              </p>
              <a href="/enroll" className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white"
                style={{ background: "#0B5D3B", borderRadius: 2 }}>
                Join YETP Today <FiArrowRight />
              </a>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: "2021", l: "Year Established" },
                  { v: "Lahore", l: "Headquarters" },
                  { v: "26+", l: "Active Programs" },
                  { v: "100%", l: "Hands-On Training" },
                ].map((s) => (
                  <div key={s.l} className="p-5 text-center bg-white"
                    style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}>
                    <div className="font-display text-2xl font-extrabold" style={{ color: "#0B5D3B" }}>{s.v}</div>
                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide" style={{ color: "#888" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Mission & Vision */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-4 w-1 rounded" style={{ background: "#C9A227" }} />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.28em]" style={{ color: "#0B5D3B" }}>Mission & Vision</span>
            </div>
            <h2 className="font-display text-2xl font-extrabold mb-8" style={{ color: "#073d27" }}>LEARN, LEAD and CHANGE</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <FadeIn>
                <div className="h-full bg-white p-7" style={{ border: "1px solid #e5e5e5", borderLeft: "4px solid #0B5D3B" }}>
                  <div className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "#0B5D3B" }}>01. Mission of YETP</div>
                  <div className="mt-2 h-0.5 w-10" style={{ background: "#0B5D3B" }} />
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "#555" }}>
                    The mission of YETP is to create employment and empower the youth to contribute their services to change Pakistan's Technology, Government, Industrial and educational sectors. Our mission is to train <strong style={{ color: "#073d27" }}>1 Million youth</strong> of Pakistan in emerging technologies to provide professionally skilled talent for the 4.0 Industrial Revolution at the National level.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="h-full bg-white p-7" style={{ border: "1px solid #e5e5e5", borderLeft: "4px solid #C9A227" }}>
                  <div className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "#a6841b" }}>02. Vision of YETP</div>
                  <div className="mt-2 h-0.5 w-10" style={{ background: "#C9A227" }} />
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "#555" }}>
                    A Pakistan where <strong style={{ color: "#073d27" }}>talent — not background</strong> — decides how far a young person can go. YETP empowers youth with emerging technologies for sustainable development contributing to Pakistan's Progress and Economy Growth by adopting 4.0 Industrial Revolution innovative technologies.
                  </p>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.15}>
              <div className="mt-5 p-7 text-center text-white" style={{ background: "#0B5D3B" }}>
                <div className="font-display text-xl font-extrabold">
                  "YETP is the name of <span style={{ color: "#C9A227" }}>LEARN &nbsp;·&nbsp; LEAD &nbsp;·&nbsp; CHANGE</span>"
                </div>
                <div className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Pakistan's 1st IT Institute &nbsp;·&nbsp; Over 4,500+ Alumni since 2021
                </div>
              </div>
            </FadeIn>
          </div>

          {/* 4 Pillars */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-4 w-1 rounded" style={{ background: "#C9A227" }} />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.28em]" style={{ color: "#0B5D3B" }}>Our Pillars</span>
            </div>
            <h2 className="font-display text-2xl font-extrabold mb-8" style={{ color: "#073d27" }}>What YETP Stands For</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((p, i) => (
                <FadeIn key={p.title} delay={i * 0.06}>
                  <div className="h-full bg-white p-6 transition-shadow hover:shadow-md"
                    style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #C9A227" }}>
                    <div className="font-display text-3xl font-extrabold" style={{ color: "#0B5D3B" }}>0{i + 1}</div>
                    <h4 className="mt-3 font-display text-sm font-bold" style={{ color: "#073d27" }}>{p.title}</h4>
                    <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>{p.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Why YETP */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-4 w-1 rounded" style={{ background: "#C9A227" }} />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.28em]" style={{ color: "#0B5D3B" }}>Why YETP</span>
            </div>
            <h2 className="font-display text-2xl font-extrabold mb-8" style={{ color: "#073d27" }}>Why Choose YETP?</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <FadeIn key={f.title} delay={i * 0.06}>
                  <div className="group flex h-full flex-col gap-4 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                    style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}>
                    <div className="grid size-12 place-items-center text-white" style={{ background: "#0B5D3B" }}>
                      <f.icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold" style={{ color: "#073d27" }}>{f.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "#6b6b6b" }}>{f.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

        </Container>
      </div>
    </div>
  );
}
