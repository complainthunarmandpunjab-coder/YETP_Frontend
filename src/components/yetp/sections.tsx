import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  FiArrowRight, FiPhone, FiCheck, FiStar, FiMapPin,
  FiMail, FiUsers, FiBookOpen, FiAward, FiUserCheck, FiClock,
} from "react-icons/fi";
import { HiOutlineAcademicCap, HiOutlineSparkles } from "react-icons/hi2";
import { Container, FadeIn } from "./primitives";
import { courses, features, partners, pillars, testimonials } from "@/data/yetp";
import { useState } from "react";
import logoUrl from "@/assets/logo-yetp.png";

/* ── Section heading ─────────────────────────────────────── */
function SecHeading({
  label,
  title,
  subtitle,
  center = false,
  light = false,
}: {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}) {
  const textColor = light ? "#fff" : "#073d27";
  const mutedColor = light ? "rgba(255,255,255,0.65)" : "#6b6b6b";
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <div className={`flex items-center gap-2 mb-3 ${center ? "justify-center" : ""}`}>
        <div className="h-4 w-1" style={{ background: "#C9A227", borderRadius: 2 }} />
        <span
          className="text-[11px] font-extrabold uppercase tracking-[0.28em]"
          style={{ color: light ? "rgba(255,255,255,0.65)" : "#0B5D3B" }}
        >
          {label}
        </span>
      </div>
      <h2
        className="font-display text-3xl font-extrabold sm:text-4xl leading-tight"
        style={{ color: textColor }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed" style={{ color: mutedColor }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
export function HeroSection() {
  return (
    <section
      className="relative overflow-x-hidden"
      style={{
        background: "linear-gradient(145deg, #052b1c 0%, #094831 40%, #0B5D3B 100%)",
        paddingTop: 122,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Background decorations ── */}
      {/* Big glow top-right */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "-15%", right: "-10%",
          width: 700, height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(11,93,59,0.7) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Gold glow bottom-left */}
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: "-10%", left: "-8%",
          width: 500, height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,162,39,0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Diagonal stripe accent */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-55deg, white 0, white 1px, transparent 0, transparent 50%)",
          backgroundSize: "24px 24px",
        }}
      />

      <Container className="relative flex flex-1 items-center py-10 lg:py-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_420px]">

          {/* ── LEFT ─────────────────────────────────────── */}
          <div>
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-sm font-bold uppercase tracking-[0.25em]"
              style={{ color: "#C9A227" }}
            >
              Build Your Dream Big
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-2 font-display font-extrabold uppercase leading-[1.05] text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 2.9rem)" }}
            >
              Vision Got<br />
              <span style={{ color: "#C9A227" }}>Bigger.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="mt-3 max-w-lg text-[13px] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.78)" }}
            >
              Welcome to Youth Empowerment Training Program (YETP). YETP focuses on
              youth empowerment by filling the skill gap and aims to produce future
              entrepreneurs and self-employees. YETP provides Premium Diplomas and
              Freelancing Courses at <strong className="text-white">minimum fee</strong> under one roof.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-5 flex flex-wrap gap-3"
            >
              <a
                href="/enroll"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition-all hover:opacity-90"
                style={{ background: "#0B5D3B", border: "2px solid rgba(255,255,255,0.5)", borderRadius: 4 }}
              >
                Apply Now
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide transition-all hover:bg-white/10"
                style={{ border: "2px solid rgba(255,255,255,0.5)", color: "white", borderRadius: 4 }}
              >
                Contact Us
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 flex flex-wrap gap-5"
            >
              {[
                { v: "9,288+", l: "Students Enrolled" },
                { v: "5,326+", l: "Alumni" },
                { v: "26+",    l: "Courses" },
                { v: "30+",    l: "Trainers" },
              ].map((s, i) => (
                <div key={s.l} className="flex items-center gap-3">
                  {i > 0 && <div className="h-8 w-px" style={{ background: "rgba(255,255,255,0.2)" }} />}
                  <div>
                    <div className="font-display text-2xl font-extrabold text-white">{s.v}</div>
                    <div className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.55)" }}>{s.l}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: visual emblem ────────────────────── */}
          <div className="relative hidden lg:flex items-center justify-center">

            {/* Outer glow */}
            <div className="pointer-events-none absolute" style={{
              width: 420, height: 420, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,162,39,0.18) 0%, transparent 65%)",
              filter: "blur(32px)",
            }} />

            {/* Spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute"
              style={{
                width: 300, height: 300, borderRadius: "50%",
                border: "1px dashed rgba(201,162,39,0.35)",
              }}
            />
            {/* Second ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute"
              style={{
                width: 230, height: 230, borderRadius: "50%",
                border: "1px dashed rgba(255,255,255,0.12)",
              }}
            />

            {/* Center emblem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.3 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex flex-col items-center"
              >
                {/* Logo circle */}
                <div className="relative flex size-[130px] items-center justify-center rounded-full"
                  style={{
                    background: "linear-gradient(145deg, #073d27, #0B5D3B)",
                    border: "3px solid rgba(201,162,39,0.6)",
                    boxShadow: "0 0 0 8px rgba(201,162,39,0.08), 0 24px 60px rgba(0,0,0,0.5)",
                  }}>
                  <img src={logoUrl} alt="YETP" className="size-20 object-contain" />
                </div>
                <div className="mt-4 text-center">
                  <div className="font-display text-2xl font-extrabold text-white tracking-wide">YETP</div>
                  <div className="text-xs font-bold uppercase tracking-[0.22em] mt-1" style={{ color: "#C9A227" }}>
                    Learn · Lead · Change
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating badge — top left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="absolute"
              style={{ top: "8%", left: "2%" }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 shadow-lg"
                style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <FiUsers className="size-4 text-[#C9A227]" />
                <div>
                  <div className="font-display text-base font-extrabold text-white">9,288+</div>
                  <div className="text-[9px] font-semibold uppercase tracking-wide text-white/60">Students</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating badge — top right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="absolute"
              style={{ top: "8%", right: "2%" }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 shadow-lg"
                style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <FiAward className="size-4 text-[#C9A227]" />
                <div>
                  <div className="font-display text-base font-extrabold text-white">5,326+</div>
                  <div className="text-[9px] font-semibold uppercase tracking-wide text-white/60">Alumni</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating badge — bottom left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="absolute"
              style={{ bottom: "10%", left: "2%" }}
            >
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 shadow-lg"
                style={{ background: "rgba(201,162,39,0.18)", backdropFilter: "blur(12px)", border: "1px solid rgba(201,162,39,0.35)" }}
              >
                <FiBookOpen className="size-4 text-[#C9A227]" />
                <div>
                  <div className="font-display text-base font-extrabold text-white">26+</div>
                  <div className="text-[9px] font-semibold uppercase tracking-wide text-white/60">Courses</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating badge — bottom right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="absolute"
              style={{ bottom: "10%", right: "2%" }}
            >
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 shadow-lg"
                style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <FiUserCheck className="size-4 text-[#C9A227]" />
                <div>
                  <div className="font-display text-base font-extrabold text-white">30+</div>
                  <div className="text-[9px] font-semibold uppercase tracking-wide text-white/60">Trainers</div>
                </div>
              </motion.div>
            </motion.div>

          </div>

        </div>
      </Container>
    </section>
  );
}

/* ── Stats Row ────────────────────────────────────────────── */
export function StatsRow() {
  return (
    <section style={{ background: "#ffffff", borderTop: "1px solid #e8e8e8", borderBottom: "1px solid #e8e8e8" }}>
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {[
            { value: "9,288+", label: "Enrolled Students" },
            { value: "5,326+", label: "No. of Alumni" },
            { value: "26+", label: "Available Courses" },
            { value: "30+", label: "Available Trainers" },
          ].map((s, i, arr) => (
            <FadeIn key={s.label} delay={i * 0.07}>
              <div
                className="flex flex-col items-center justify-center py-8 px-4 text-center"
                style={{ borderRight: i < arr.length - 1 ? "1px solid #ebebeb" : "none" }}
              >
                <div className="font-display text-4xl font-extrabold" style={{ color: "#0B5D3B" }}>
                  {s.value}
                </div>
                <div className="mt-1 text-[11px] font-bold uppercase tracking-widest" style={{ color: "#888" }}>
                  {s.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ── Why YETP ─────────────────────────────────────────────── */
export function WhyYETP() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SecHeading
          label="Why YETP"
          title={<>Why Choose <span style={{ color: "#0B5D3B" }}>YETP?</span></>}
          subtitle="Pakistan's No.1 IT Training Institute — Hands-On Training with Minimal Fee Structure."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.06}>
              <div
                className="group flex h-full flex-col gap-4 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}
              >
                <div
                  className="grid size-12 place-items-center text-white"
                  style={{ background: "#0B5D3B" }}
                >
                  <f.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold" style={{ color: "#073d27" }}>
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "#6b6b6b" }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ── Courses ──────────────────────────────────────────────── */
export function CoursesSection({ limit }: { limit?: number }) {
  const list = typeof limit === "number" ? courses.slice(0, limit) : courses;
  return (
    <section style={{ background: "#f5f9f7" }} className="py-20">
      <Container>
        <SecHeading
          label="Training Programs"
          title={<>Available <span style={{ color: "#0B5D3B" }}>Programs</span></>}
          subtitle="Wide range of Premium Diplomas and Freelancing Courses at minimum fee — 100% Hands-On Training."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <FadeIn key={c.slug} delay={i * 0.06}>
              <article
                className="flex h-full flex-col overflow-hidden bg-white transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ border: "1px solid #e5e5e5" }}
              >
                <div style={{ background: "#0B5D3B" }} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className="grid size-12 place-items-center text-white"
                      style={{ background: "rgba(255,255,255,0.13)" }}
                    >
                      <c.icon className="size-6" />
                    </div>
                    {c.internship && (
                      <span
                        className="rounded-sm px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide"
                        style={{ background: "#C9A227", color: "#073d27" }}
                      >
                        + Internship
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-white">{c.title}</h3>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/60">
                    {c.duration}
                  </div>
                </div>
                <div style={{ background: "#C9A227", height: 2 }} />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm leading-relaxed" style={{ color: "#6b6b6b" }}>
                    {c.description}
                  </p>
                  <div
                    className="mt-4 text-[10px] font-extrabold uppercase tracking-widest"
                    style={{ color: "#0B5D3B" }}
                  >
                    Career Outcomes
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {c.outcomes.map((o) => (
                      <li key={o} className="flex items-center gap-2 text-xs" style={{ color: "#6b6b6b" }}>
                        <FiCheck className="size-3.5 shrink-0" style={{ color: "#0B5D3B" }} /> {o}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex gap-2 pt-5">
                    <Link
                      to="/course/$slug"
                      params={{ slug: c.slug }}
                      className="flex-1 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-[#0B5D3B] transition-all hover:bg-[#0B5D3B] hover:text-white hover:border-[#0B5D3B]"
                      style={{ border: "2px solid #0B5D3B" }}
                    >
                      Details
                    </Link>
                    <a
                      href="/enroll"
                      className="flex-1 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
                      style={{ background: "#0B5D3B" }}
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
        {typeof limit === "number" && (
          <div className="mt-10 text-center">
            <a
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-[#0B5D3B] transition-colors hover:bg-[#0B5D3B] hover:text-white"
              style={{ border: "2px solid #0B5D3B" }}
            >
              View All Programs <FiArrowRight />
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}

/* ── Mission / Vision / Pillars ──────────────────────────── */
export function MissionVisionSection() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SecHeading
          label="About YETP"
          title={<>LEARN, LEAD <span style={{ color: "#0B5D3B" }}>and CHANGE</span></>}
          subtitle="YETP is the name of Learn, Lead and Change — Pakistan's No.1 IT Training Institute."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <FadeIn>
            <div
              className="h-full bg-white p-7"
              style={{ border: "1px solid #e5e5e5", borderLeft: "4px solid #0B5D3B" }}
            >
              <div className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "#0B5D3B" }}>
                01. Mission of YETP
              </div>
              <div className="mt-2 h-0.5 w-10" style={{ background: "#0B5D3B" }} />
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "#555" }}>
                The mission of YETP is to create employment and empower the youth to contribute their services to change Pakistan's Technology, Government, Industrial and educational sectors. Our mission is to train{" "}
                <strong style={{ color: "#073d27" }}>1 Million youth</strong> of Pakistan in emerging technologies to provide professionally skilled talent for the 4.0 Industrial Revolution.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div
              className="h-full bg-white p-7"
              style={{ border: "1px solid #e5e5e5", borderLeft: "4px solid #C9A227" }}
            >
              <div className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "#a6841b" }}>
                02. Vision of YETP
              </div>
              <div className="mt-2 h-0.5 w-10" style={{ background: "#C9A227" }} />
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "#555" }}>
                A Pakistan where <strong style={{ color: "#073d27" }}>talent — not background</strong> — decides how far a young person can go. YETP empowers youth with emerging technologies for sustainable development contributing to Pakistan's Progress and Economy Growth by adopting 4.0 Industrial Revolution technologies.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <div
            className="mt-6 p-8 text-center text-white"
            style={{ background: "#0B5D3B" }}
          >
            <div className="text-[10px] font-extrabold uppercase tracking-[0.3em] mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
              Official Statement
            </div>
            <div className="font-display text-xl font-extrabold sm:text-2xl">
              "YETP is the name of{" "}
              <span style={{ color: "#C9A227" }}>LEARN &nbsp;·&nbsp; LEAD &nbsp;·&nbsp; CHANGE</span>"
            </div>
            <div className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              Pakistan's 1st IT Institute &nbsp;·&nbsp; Over 4,500+ Alumni since 2021
            </div>
          </div>
        </FadeIn>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.06}>
              <div
                className="h-full bg-white p-6 transition-shadow hover:shadow-md"
                style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #C9A227" }}
              >
                <div className="font-display text-3xl font-extrabold" style={{ color: "#0B5D3B" }}>
                  0{i + 1}
                </div>
                <h4 className="mt-3 font-display text-sm font-bold" style={{ color: "#073d27" }}>
                  {p.title}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>
                  {p.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}


/* ── Testimonials ─────────────────────────────────────────── */
export function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];
  return (
    <section className="bg-white py-20">
      <Container>
        <SecHeading
          label="Student Reviews"
          title={<>What Our <span style={{ color: "#0B5D3B" }}>Students Say</span></>}
        />
        <div className="grid gap-6 lg:grid-cols-5">
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col bg-white p-8 shadow-md lg:col-span-3"
            style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}
          >
            <div
              className="inline-flex items-center gap-2 self-start px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
              style={{ background: "#0B5D3B" }}
            >
              <HiOutlineAcademicCap className="size-3.5" /> {t.course}
            </div>
            <div className="mt-4 flex gap-1" style={{ color: "#C9A227" }}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <FiStar key={i} className="size-4 fill-current" />
              ))}
            </div>
            <p className="mt-4 flex-1 text-base leading-relaxed italic" style={{ color: "#1a1a1a" }}>
              "{t.quote}"
            </p>
            <div
              className="mt-6 flex items-center gap-3 pt-5"
              style={{ borderTop: "1px solid #e5e5e5" }}
            >
              <div
                className="grid size-12 place-items-center font-bold text-white"
                style={{ background: "#0B5D3B" }}
              >
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div className="font-bold" style={{ color: "#073d27" }}>{t.name}</div>
                <div className="text-xs" style={{ color: "#6b6b6b" }}>
                  {t.course} &nbsp;·&nbsp; Student Review
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-3 lg:col-span-2">
            {testimonials.map((x, i) => (
              <button
                key={x.name}
                onClick={() => setIdx(i)}
                className="text-left transition-all p-4"
                style={{
                  border: "1px solid " + (i === idx ? "#0B5D3B" : "#e5e5e5"),
                  borderLeft: "4px solid " + (i === idx ? "#0B5D3B" : "transparent"),
                  background: i === idx ? "#f0f8f4" : "#fff",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="grid size-10 shrink-0 place-items-center text-xs font-bold text-white"
                    style={{ background: "#0B5D3B" }}
                  >
                    {x.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: "#073d27" }}>{x.name}</div>
                    <div className="text-xs" style={{ color: "#6b6b6b" }}>{x.course}</div>
                  </div>
                </div>
              </button>
            ))}
            <a
              href="/success-story"
              className="mt-auto py-2.5 text-center text-sm font-bold uppercase tracking-wide transition-colors text-[#0B5D3B] hover:bg-[#0B5D3B] hover:text-white"
              style={{ border: "2px solid #0B5D3B" }}
            >
              View More Reviews
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── Partners ─────────────────────────────────────────────── */
export function PartnersSection() {
  return (
    <section style={{ background: "#f5f9f7" }} className="py-16">
      <Container>
        <div className="mb-10 text-center">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1" style={{ background: "#e0ede8" }} />
            <span
              className="text-[11px] font-extrabold uppercase tracking-[0.28em]"
              style={{ color: "#0B5D3B" }}
            >
              Trusted Partners
            </span>
            <div className="h-px flex-1" style={{ background: "#e0ede8" }} />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex h-14 min-w-[140px] items-center justify-center bg-white px-6 text-sm font-bold transition-all hover:shadow-md"
              style={{ border: "1px solid #e0ede8", borderTop: "3px solid #0B5D3B", color: "#073d27" }}
            >
              {p.name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ── CTA ──────────────────────────────────────────────────── */
export function CTASection() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <FadeIn>
          <div
            className="relative overflow-hidden p-10 text-white shadow-xl sm:p-14"
            style={{ background: "#0B5D3B" }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg,white 0 1px,transparent 1px 40px),repeating-linear-gradient(180deg,white 0 1px,transparent 1px 40px)",
              }}
            />
            {/* Gold top accent */}
            <div className="absolute inset-x-0 top-0 h-1" style={{ background: "#C9A227" }} />

            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div
                  className="inline-block px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.3em] mb-4"
                  style={{ background: "rgba(201,162,39,0.2)", color: "#C9A227" }}
                >
                  Registration Open
                </div>
                <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
                  Start Your Journey.<br />
                  <span style={{ color: "#C9A227" }}>Apply Today.</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                  Join 9,000+ students already on their path. Limited seats per cohort — apply early to secure your spot.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <a
                  href="/enroll"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-extrabold uppercase tracking-wide hover:opacity-90 transition-opacity"
                  style={{ background: "#C9A227", color: "#073d27" }}
                >
                  Apply Now <FiArrowRight />
                </a>
                <a
                  href="tel:+923029898082"
                  className="inline-flex items-center justify-center gap-2 border-2 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-white/10 transition-colors"
                  style={{ borderColor: "rgba(255,255,255,0.35)" }}
                >
                  <FiPhone /> 0302-9898082
                </a>
              </div>
            </div>

            <div
              className="relative mt-8 flex flex-wrap gap-5 pt-5 text-xs"
              style={{ borderTop: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)" }}
            >
              <span className="flex items-center gap-1.5"><FiMapPin className="size-3" /> New Garden Town, Lahore</span>
              <span className="flex items-center gap-1.5"><FiMail className="size-3" /> info@yetp.pk</span>
              <span className="flex items-center gap-1.5"><FiPhone className="size-3" /> 0302-9898082 | 0324-9881887</span>
              <span className="flex items-center gap-1.5"><FiClock className="size-3" /> Mon - Sun, 10:00 AM - 6:00 PM</span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
