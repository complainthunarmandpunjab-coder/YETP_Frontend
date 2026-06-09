import { createFileRoute } from "@tanstack/react-router";
import { Container, FadeIn } from "@/components/yetp/primitives";
import { PageHero } from "@/components/yetp/PageHero";
import { FiArrowRight, FiStar } from "react-icons/fi";

export const Route = createFileRoute("/success-story")({
  head: () => ({ meta: [{ title: "Our Success Story — YETP" }] }),
  component: SuccessStoryPage,
});

const stories = [
  {
    name: "Muhammad Hamza",
    course: "Web Development",
    batch: "Batch 2023",
    location: "Lahore",
    income: "PKR 80,000/mo",
    platform: "Fiverr & Upwork",
    quote: "Before YETP I didn't know the first thing about coding. Within 4 months of completing Web Development, I landed my first international client on Fiverr and now earn over Rs.80,000 per month from the comfort of my home.",
    rating: 5,
    emoji: "👨‍💻",
  },
  {
    name: "Iqra Shahzad",
    course: "Digital Marketing",
    batch: "Batch 2023",
    location: "Lahore",
    income: "PKR 60,000/mo",
    platform: "Freelancer.com",
    quote: "YETP gave me real skills — not just theory. I completed the Digital Marketing diploma and immediately started working with local businesses as a social media manager. I now run my own small agency.",
    rating: 5,
    emoji: "📊",
  },
  {
    name: "Ali Raza",
    course: "Amazon VA",
    batch: "Batch 2024",
    location: "Lahore",
    income: "PKR 1,20,000/mo",
    platform: "Direct Clients (USA)",
    quote: "The Amazon Virtual Assistant course at YETP was a life-changer. My trainer had real Upwork experience and taught us practical skills. I got my first US client within 2 weeks of graduating.",
    rating: 5,
    emoji: "🛒",
  },
  {
    name: "Sara Bibi",
    course: "Graphic Design & UI/UX",
    batch: "Batch 2023",
    location: "Lahore",
    income: "PKR 70,000/mo",
    platform: "Fiverr",
    quote: "As a girl from a middle-class family, I couldn't afford expensive courses. YETP's scholarship program changed my life. I completed Graphic Design and now earn more than most office workers — from home.",
    rating: 5,
    emoji: "🎨",
  },
  {
    name: "Usman Tariq",
    course: "Video Editing",
    batch: "Batch 2024",
    location: "Lahore",
    income: "PKR 90,000/mo",
    platform: "YouTube + Clients",
    quote: "I learned professional video editing with Adobe Premiere and After Effects at YETP. Now I edit for international YouTube channels and earn in dollars. YETP trainers are industry professionals — not just teachers.",
    rating: 5,
    emoji: "🎬",
  },
  {
    name: "Fatima Noor",
    course: "E-Commerce",
    batch: "Batch 2024",
    location: "Lahore",
    income: "PKR 1,50,000/mo",
    platform: "Shopify + Amazon",
    quote: "I had zero knowledge of online business before joining YETP. After completing E-Commerce, I launched my own Shopify store and an Amazon FBA product. YETP's mentorship was exceptional.",
    rating: 5,
    emoji: "💼",
  },
];

const milestones = [
  { v: "9,288+", l: "Students Trained" },
  { v: "5,326+", l: "Alumni" },
  { v: "85%",    l: "Employment Rate" },
  { v: "4+", l: "Years of Excellence" },
  { v: "26+",    l: "Courses Offered" },
  { v: "30+",    l: "Expert Trainers" },
];

function StarRating({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <FiStar key={i} className="size-3.5 fill-current" style={{ color: "#f59e0b" }} />
      ))}
    </div>
  );
}

function SuccessStoryPage() {
  return (
    <div>
      <PageHero
        title="Our Success Story"
        subtitle="Real students. Real results. See how YETP is transforming the lives of Pakistani youth through skills and employment."
      />

      {/* Milestones bar */}
      <div style={{ background: "#073d27" }}>
        <Container>
          <div className="grid grid-cols-3 sm:grid-cols-6 divide-x divide-white/10">
            {milestones.map((s) => (
              <div key={s.l} className="py-5 text-center px-2">
                <div className="font-display text-xl font-extrabold text-white">{s.v}</div>
                <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Alumni Stories */}
      <div className="bg-white py-14">
        <Container>
          <FadeIn>
            <div className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.3em]" style={{ color: "#C9A227" }}>
              Alumni Voices
            </div>
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl mb-1" style={{ color: "#073d27" }}>
              Student Success Stories
            </h2>
            <div className="mb-10 h-1 w-12" style={{ background: "#C9A227" }} />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((s, i) => (
              <FadeIn key={s.name} delay={i * 0.07}>
                <div
                  className="flex flex-col h-full bg-white p-6"
                  style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{s.emoji}</span>
                    <StarRating n={s.rating} />
                  </div>
                  <p className="text-sm leading-relaxed italic flex-1 mb-5" style={{ color: "#555" }}>
                    "{s.quote}"
                  </p>
                  <div style={{ borderTop: "1px solid #f0f0f0" }} className="pt-4">
                    <div className="font-display text-sm font-extrabold" style={{ color: "#073d27" }}>{s.name}</div>
                    <div className="text-[11px] font-semibold mt-0.5" style={{ color: "#0B5D3B" }}>{s.course} — {s.batch}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span
                        className="px-2 py-0.5 text-[10px] font-bold"
                        style={{ background: "#f0f9f4", color: "#0B5D3B", border: "1px solid #d5e8dc" }}
                      >
                        {s.income}
                      </span>
                      <span
                        className="px-2 py-0.5 text-[10px] font-bold"
                        style={{ background: "#fffbeb", color: "#a6841b", border: "1px solid #f5e4a0" }}
                      >
                        {s.platform}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </div>

      {/* CTA */}
      <div style={{ background: "#f5f9f7", borderTop: "1px solid #d5e8dc" }}>
        <Container className="py-12">
          <FadeIn>
            <div
              className="flex flex-col items-center gap-5 md:flex-row md:items-center md:justify-between p-8"
              style={{ background: "#0B5D3B" }}
            >
              <div>
                <div className="font-display text-xl font-extrabold text-white mb-1">
                  Your success story starts here.
                </div>
                <p className="text-sm text-white/65">
                  Join 9,000+ students who've already transformed their lives with YETP.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <a
                  href="/enroll"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-extrabold uppercase tracking-wide hover:opacity-90"
                  style={{ background: "#C9A227", color: "#073d27" }}
                >
                  Apply Now <FiArrowRight />
                </a>
                <a
                  href="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-extrabold uppercase tracking-wide border hover:bg-white/10 transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.35)", color: "white" }}
                >
                  View Courses
                </a>
              </div>
            </div>
          </FadeIn>
        </Container>
      </div>
    </div>
  );
}
