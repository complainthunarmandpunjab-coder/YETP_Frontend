import { motion } from "framer-motion";
import { FiArrowRight, FiPhone, FiCheck, FiStar } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { Container, FadeIn, LinkButton, SectionHeading } from "./primitives";
import { courses, features, founders, partners, pillars, stats, testimonials } from "@/data/yetp";
import { useState } from "react";

/* ---------------- Hero ---------------- */
export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28">
      {/* floating background */}
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-40" />
      <motion.div
        aria-hidden
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-32 top-24 -z-10 size-[28rem] rounded-full bg-brand/30 blur-[120px]"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 size-[26rem] rounded-full bg-gold/20 blur-[120px]"
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs"
            >
              <HiOutlineSparkles className="text-gold" />
              <span className="text-white/90">Build Your Dream Big · 3 Years of Undefeated Success</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-6 text-5xl font-bold leading-[0.95] sm:text-6xl md:text-7xl"
            >
              Vision Got <span className="text-gradient-brand">Bigger.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
            >
              Welcome to the Youth Empowerment Training Program (YETP). We fill the skill gap
              and produce future entrepreneurs and self-employees through Premium Diplomas
              and Freelancing Courses — at the minimum fee under one roof.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <LinkButton to="/enroll" variant="primary">
                Apply Now <FiArrowRight />
              </LinkButton>
              <LinkButton to="/contact" variant="outline">Contact Us</LinkButton>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className={`relative overflow-hidden rounded-2xl border border-white/8 bg-card/60 p-5 backdrop-blur ${i === 4 ? "col-span-2" : ""}`}
                >
                  <div className="absolute -right-6 -top-6 size-20 rounded-full bg-brand-light/20 blur-2xl" />
                  <div className="font-display text-3xl font-bold sm:text-4xl">
                    <span className="text-gradient-brand">{s.value}</span>
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Scholarship Banner ---------------- */
export function ScholarshipBanner() {
  return (
    <section className="relative my-12">
      <div className="relative overflow-hidden bg-gradient-to-r from-gold via-[oklch(0.82_0.14_82)] to-gold">
        <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay grid-bg" />
        <Container className="flex flex-col items-center justify-between gap-4 py-5 text-ink md:flex-row">
          <div className="flex items-center gap-3">
            <HiOutlineSparkles className="size-5" />
            <p className="text-sm font-semibold sm:text-base">
              Rs.100,000 scholarship now open for deserving youth — limited seats.
            </p>
          </div>
          <LinkButton to="/enroll" size="md" variant="ghost" className="border border-ink/20 text-ink hover:bg-ink hover:text-gold">
            Apply for Scholarship <FiArrowRight />
          </LinkButton>
        </Container>
      </div>
    </section>
  );
}

/* ---------------- Why YETP ---------------- */
export function WhyYETP() {
  return (
    <section className="section-light relative py-24">
      <div className="gov-rule absolute inset-x-0 top-0" />
      <Container>
        <SectionHeading
          eyebrow="Why YETP"
          title={<>The platform built for <span className="text-gradient-deep">unfair advantage.</span></>}
          description="Every detail engineered so a hungry student in Karachi can compete with talent in Karāchi, Lahore or London."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-black/8 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
                <div className="absolute -right-10 -top-10 size-32 rounded-full bg-brand/10 blur-3xl" />
                <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-light text-white">
                  <f.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Courses ---------------- */
export function CoursesSection({ limit }: { limit?: number }) {
  const list = typeof limit === "number" ? courses.slice(0, limit) : courses;
  return (
    <section className="section-deep relative py-24">
      <div className="gov-rule absolute inset-x-0 top-0" />
      <Container>
        <SectionHeading
          eyebrow="Programs"
          title={<>Premium courses. <span className="text-gradient-brand">Real outcomes.</span></>}
          description="Every track ships with hands-on projects, mentorship and a guaranteed internship pipeline."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <FadeIn key={c.slug} delay={i * 0.05}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-card/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-light/60 hover:glow-brand">
                <div className="flex items-start justify-between">
                  <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-light text-white">
                    <c.icon className="size-5" />
                  </div>
                  {c.internship && (
                    <span className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold">
                      Internship
                    </span>
                  )}
                </div>
                <h3 className="mt-5 text-xl font-semibold">{c.title}</h3>
                <div className="mt-1 text-xs uppercase tracking-wider text-brand-light">{c.duration}</div>
                <p className="mt-3 text-sm text-muted-foreground">{c.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {c.outcomes.map((o) => (
                    <li key={o} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <FiCheck className="size-3.5 text-brand-light" /> {o}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4">
                  <LinkButton to="/enroll" size="md" variant="outline" className="w-full">
                    Enroll <FiArrowRight />
                  </LinkButton>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Founders ---------------- */
export function FoundersSection() {
  return (
    <section className="section-cream relative py-24">
      <div className="gov-rule absolute inset-x-0 top-0" />
      <Container>
        <SectionHeading
          eyebrow="Founders"
          title={<>Engineers behind the <span className="text-gradient-deep">movement.</span></>}
          description="Builders, not bureaucrats. YETP is run by people who ship."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {founders.map((f, i) => (
            <FadeIn key={f.name} delay={i * 0.1}>
              <div className="group relative overflow-hidden rounded-3xl border border-black/8 bg-white p-8 shadow-sm transition-all duration-500 hover:border-brand/40 hover:shadow-xl">
                <div className="absolute -right-20 -top-20 size-60 rounded-full bg-brand/10 blur-3xl" />
                <div className="flex items-start gap-5">
                  <div className="grid size-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-light font-display text-2xl font-bold text-white">
                    {f.name.split(" ").slice(-2).map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">{f.name}</h3>
                    <div className="mt-1 text-sm font-medium text-brand">{f.role}</div>
                    <p className="mt-3 text-sm text-muted-foreground">{f.bio}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Mission / Vision / Pillars ---------------- */
export function MissionVisionSection() {
  return (
    <section className="section-light relative py-24">
      <div className="gov-rule absolute inset-x-0 top-0" />
      <Container>
        <SectionHeading
          eyebrow="LEARN, LEAD, and CHANGE"
          title={<>Thrive in business today — with a plan to <span className="text-gradient-deep">LEAD, LEARN, CHANGE</span>.</>}
          description="YETP is the name of LEARN, LEAD & CHANGE — built to empower Pakistan's youth through skills, opportunity and entrepreneurship."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <FadeIn>
            <div className="h-full rounded-3xl border-l-4 border-brand bg-white p-8 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Our Mission</div>
              <p className="mt-3 text-2xl font-medium leading-tight text-foreground">
                Train <span className="text-gradient-deep">1 Million</span> youth of Pakistan in
                emerging technologies — creating employment, empowering entrepreneurship and
                contributing to the 4.0 Industrial Revolution.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="h-full rounded-3xl border-l-4 border-gold bg-white p-8 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:oklch(0.55_0.14_80)]">Our Vision</div>
              <p className="mt-3 text-2xl font-medium leading-tight text-foreground">
                Reduce unemployment and empower Pakistan's youth — every skilled graduate
                ready for opportunities in the <span className="text-gradient-deep">global market</span>.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <blockquote className="mt-10 rounded-3xl bg-gradient-to-br from-brand to-[oklch(0.32_0.08_165)] p-10 text-center text-white">
            <div className="font-display text-2xl leading-relaxed sm:text-3xl">
              “We don't train students. We <span className="text-gold">manufacture careers</span>.”
            </div>
            <div className="mt-4 text-sm text-white/70">— YETP Founding Team</div>
          </blockquote>
        </FadeIn>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
                <div className="font-display text-3xl font-bold text-gradient-deep">0{i + 1}</div>
                <h4 className="mt-3 text-lg font-semibold text-foreground">{p.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Partners ---------------- */
export function PartnersSection() {
  return (
    <section className="section-cream relative py-20">
      <div className="gov-rule absolute inset-x-0 top-0" />
      <Container>
        <SectionHeading
          eyebrow="Trust and Worth"
          title={<>Our <span className="text-gradient-deep">Supporting Partners</span></>}
          description="Industry partners powering YETP internships, mentorship and hiring pipelines."
        />
        <div className="mt-12 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.04}>
              <div className="grid h-28 place-items-center rounded-2xl border border-black/8 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <img src={p.logo} alt={p.name} loading="lazy" className="max-h-16 w-auto object-contain" />
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
export function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Students"
          title={<>Receipts from the <span className="text-gradient-brand">field.</span></>}
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <FadeIn className="lg:col-span-3">
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative h-full overflow-hidden rounded-3xl border border-white/8 bg-card/60 p-8 sm:p-10"
            >
              <div className="absolute -right-16 -top-16 size-48 rounded-full bg-gold/10 blur-3xl" />
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FiStar key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-5 font-display text-xl leading-relaxed sm:text-2xl">"{t.quote}"</p>
              <div className="mt-7 flex items-center gap-4">
                <div className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-light font-semibold text-white">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.course}</div>
                </div>
              </div>
            </motion.div>
          </FadeIn>

          <div className="grid gap-3 lg:col-span-2">
            {testimonials.map((x, i) => (
              <button
                key={x.name}
                onClick={() => setIdx(i)}
                className={`group rounded-2xl border bg-card/60 p-4 text-left transition-all ${i === idx ? "border-brand-light glow-brand" : "border-white/8 hover:border-white/20"}`}
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-light text-xs font-semibold text-white">
                    {x.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{x.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{x.course}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- CTA ---------------- */
export function CTASection() {
  return (
    <section className="py-24">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-gradient-to-br from-card to-ink p-10 sm:p-16">
            <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-brand-light/30 blur-[110px]" />
            <div className="pointer-events-none absolute -bottom-20 -right-10 size-72 rounded-full bg-gold/20 blur-[110px]" />
            <div className="relative max-w-2xl">
              <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
                Ready to <span className="text-gradient-brand">Build Your Dream?</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Join 3,000+ students already on their path. Seats per cohort are intentionally limited.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton to="/enroll" variant="primary">Enroll Now <FiArrowRight /></LinkButton>
                <LinkButton to="tel:+923000000000" variant="outline"><FiPhone /> Call Us</LinkButton>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
