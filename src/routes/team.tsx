import { createFileRoute } from "@tanstack/react-router";
import { Container, FadeIn } from "@/components/yetp/primitives";
import { PageHero } from "@/components/yetp/PageHero";
import { FiLinkedin, FiMail } from "react-icons/fi";

export const Route = createFileRoute("/team")({
  head: () => ({ meta: [{ title: "Our Team — YETP" }] }),
  component: TeamPage,
});

const leadership = [
  {
    name: "Engr. Waqar Rao",
    role: "Chief Executive Officer (CEO)",
    dept: "Leadership",
    bio: "Visionary leader and IT entrepreneur with 10+ years of experience in software engineering and youth skill development. Founded YETP to bridge Pakistan's digital skills gap.",
    initials: "WR",
  },
  {
    name: "Engr. Umair Iftikhar",
    role: "Chief Operating Officer (COO)",
    dept: "Leadership",
    bio: "Operations strategist and education innovator. Oversees all training programs, partnerships, and student experience at YETP.",
    initials: "UI",
  },
];

const trainers = [
  { name: "Muhammad Bilal", role: "Web Development Trainer", dept: "Training", initials: "MB", exp: "5 Years Industry Exp." },
  { name: "Sana Khalid", role: "Graphic Design & UI/UX Trainer", dept: "Training", initials: "SK", exp: "4 Years Industry Exp." },
  { name: "Awais Ahmed", role: "Digital Marketing Trainer", dept: "Training", initials: "AA", exp: "6 Years Industry Exp." },
  { name: "Fatima Noor", role: "Amazon & E-Commerce Trainer", dept: "Training", initials: "FN", exp: "3 Years Industry Exp." },
  { name: "Hassan Raza", role: "React & Node.js Trainer", dept: "Training", initials: "HR", exp: "5 Years Industry Exp." },
  { name: "Zara Malik", role: "Video Editing Trainer", dept: "Training", initials: "ZM", exp: "4 Years Industry Exp." },
];

const admin = [
  { name: "Ayesha Tariq", role: "Admissions Coordinator", dept: "Admin", initials: "AT" },
  { name: "Omar Farooq", role: "Student Affairs Officer", dept: "Admin", initials: "OF" },
  { name: "Nadia Hussain", role: "HR & Operations", dept: "Admin", initials: "NH" },
  { name: "Talha Arshad", role: "Marketing Executive", dept: "Admin", initials: "TA" },
];

function MemberCard({ name, role, dept, bio, initials, exp }: {
  name: string; role: string; dept: string; bio?: string; initials: string; exp?: string;
}) {
  return (
    <div className="group flex h-full flex-col bg-white transition-all hover:-translate-y-1 hover:shadow-xl overflow-hidden"
      style={{ border: "1px solid #e5e5e5" }}>
      {/* Avatar area */}
      <div className="relative flex flex-col items-center justify-center py-10 text-white"
        style={{ background: "linear-gradient(145deg, #073d27 0%, #0B5D3B 100%)" }}>
        <div className="grid size-20 place-items-center rounded-full font-display text-2xl font-extrabold border-4"
          style={{ background: "rgba(255,255,255,0.13)", borderColor: "#C9A227", color: "#fff" }}>
          {initials}
        </div>
        <div className="mt-3 font-display text-base font-bold text-white">{name}</div>
        <div className="text-[10px] font-extrabold uppercase tracking-widest mt-0.5" style={{ color: "#C9A227" }}>{role}</div>
        {exp && <div className="mt-1 text-[10px] text-white/50">{exp}</div>}
      </div>
      <div style={{ height: 2, background: "#C9A227" }} />
      {/* Body */}
      <div className="flex flex-1 flex-col items-center justify-between p-5 text-center">
        <div>
          <span className="rounded-sm px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider"
            style={{ background: "#f0f8f4", color: "#0B5D3B", border: "1px solid #c8e6d4" }}>
            {dept}
          </span>
          {bio && <p className="mt-3 text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>{bio}</p>}
        </div>
        <div className="mt-4 flex gap-2">
          <button className="grid size-8 place-items-center text-white transition-opacity hover:opacity-80"
            style={{ background: "#0B5D3B" }}>
            <FiLinkedin className="size-3.5" />
          </button>
          <button className="grid size-8 place-items-center text-white transition-opacity hover:opacity-80"
            style={{ background: "#C9A227" }}>
            <FiMail className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function TeamPage() {
  return (
    <div>
      <PageHero
        title="Our Team"
        subtitle="Meet the passionate professionals behind Pakistan's No.1 IT Training Institute."
        breadcrumb="Our Team"
      />

      <div className="bg-white py-14">
        <Container>

          {/* Leadership */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-4 w-1 rounded" style={{ background: "#C9A227" }} />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.28em]" style={{ color: "#0B5D3B" }}>Founders</span>
            </div>
            <h2 className="font-display text-2xl font-extrabold mb-8" style={{ color: "#073d27" }}>Leadership Team</h2>
            <div className="grid gap-6 sm:grid-cols-2 max-w-2xl">
              {leadership.map((m, i) => (
                <FadeIn key={m.name} delay={i * 0.08}>
                  <MemberCard {...m} />
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Trainers */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-4 w-1 rounded" style={{ background: "#C9A227" }} />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.28em]" style={{ color: "#0B5D3B" }}>Instructors</span>
            </div>
            <h2 className="font-display text-2xl font-extrabold mb-8" style={{ color: "#073d27" }}>Our Trainers</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trainers.map((m, i) => (
                <FadeIn key={m.name} delay={i * 0.06}>
                  <MemberCard {...m} />
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Admin */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-4 w-1 rounded" style={{ background: "#C9A227" }} />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.28em]" style={{ color: "#0B5D3B" }}>Staff</span>
            </div>
            <h2 className="font-display text-2xl font-extrabold mb-8" style={{ color: "#073d27" }}>Administrative Team</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {admin.map((m, i) => (
                <FadeIn key={m.name} delay={i * 0.05}>
                  <MemberCard {...m} />
                </FadeIn>
              ))}
            </div>
          </div>

        </Container>
      </div>
    </div>
  );
}
