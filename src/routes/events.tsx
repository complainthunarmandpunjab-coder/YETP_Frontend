import { createFileRoute } from "@tanstack/react-router";
import { Container, FadeIn } from "@/components/yetp/primitives";
import { PageHero } from "@/components/yetp/PageHero";
import { FiCalendar, FiMapPin, FiClock, FiArrowRight, FiUsers } from "react-icons/fi";

export const Route = createFileRoute("/events")({
  head: () => ({ meta: [{ title: "Events — YETP" }] }),
  component: EventsPage,
});

const upcomingEvents = [
  {
    id: 1,
    badge: "Upcoming",
    badgeColor: "#0B5D3B",
    title: "New Batch Orientation — Web Development",
    date: "June 15, 2026",
    time: "11:00 AM – 1:00 PM",
    venue: "YETP Campus, New Garden Town, Lahore",
    desc: "Join us for the orientation session of the new Web Development batch. Meet your trainer, fellow students, and get a walkthrough of the LMS portal and course roadmap.",
    seats: "Limited seats",
    icon: "🖥️",
  },
  {
    id: 2,
    badge: "Upcoming",
    badgeColor: "#0B5D3B",
    title: "Digital Marketing Workshop — Free Session",
    date: "June 22, 2026",
    time: "2:00 PM – 5:00 PM",
    venue: "YETP Campus, New Garden Town, Lahore",
    desc: "A free introductory workshop on Digital Marketing covering SEO, Social Media Marketing, Google Ads, and freelancing strategies for beginners.",
    seats: "Open registration",
    icon: "📢",
  },
  {
    id: 4,
    badge: "Upcoming",
    badgeColor: "#0B5D3B",
    title: "Amazon VA & E-Commerce Batch Launch",
    date: "July 12, 2026",
    time: "10:30 AM – 12:00 PM",
    venue: "YETP Campus, New Garden Town, Lahore",
    desc: "New batch starting for Amazon Virtual Assistant and E-Commerce program. This 3-month course covers Amazon FBA, product hunting, listing optimization, and Shopify store setup.",
    seats: "25 seats available",
    icon: "🛒",
  },
];

const pastEvents = [
  {
    title: "YETP Annual Certification Ceremony 2025",
    date: "December 20, 2025",
    desc: "Over 200 students received their completion certificates and internship letters at the Annual YETP Ceremony in Lahore.",
    icon: "🏆",
  },
  {
    title: "Youth IT Skills Expo — Lahore",
    date: "October 10, 2025",
    desc: "YETP participated in the Youth IT Skills Expo where our alumni demonstrated live projects to industry representatives.",
    icon: "🌐",
  },
  {
    title: "Freelancing Masterclass with Industry Experts",
    date: "August 5, 2025",
    desc: "A sold-out masterclass by top Pakistani freelancers on Upwork, Fiverr, and direct client outreach strategies.",
    icon: "💼",
  },
];

function EventCard({
  event,
  index,
}: {
  event: (typeof upcomingEvents)[number];
  index: number;
}) {
  return (
    <FadeIn delay={index * 0.07}>
      <div
        className="flex flex-col h-full bg-white overflow-hidden"
        style={{ border: "1px solid #e5e5e5", borderTop: "4px solid #0B5D3B" }}
      >
        <div className="p-6 flex-1">
          <div className="flex items-start justify-between gap-3 mb-4">
            <span className="text-3xl">{event.icon}</span>
            <span
              className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1"
              style={{ background: event.badgeColor, color: "white" }}
            >
              {event.badge}
            </span>
          </div>
          <h3
            className="font-display text-[17px] font-extrabold leading-snug mb-3"
            style={{ color: "#073d27" }}
          >
            {event.title}
          </h3>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "#666" }}>
            {event.desc}
          </p>
          <ul className="space-y-2 text-xs font-semibold" style={{ color: "#555" }}>
            <li className="flex items-center gap-2">
              <FiCalendar className="size-3.5 shrink-0" style={{ color: "#0B5D3B" }} />
              {event.date}
            </li>
            <li className="flex items-center gap-2">
              <FiClock className="size-3.5 shrink-0" style={{ color: "#0B5D3B" }} />
              {event.time}
            </li>
            <li className="flex items-start gap-2">
              <FiMapPin className="size-3.5 shrink-0 mt-0.5" style={{ color: "#0B5D3B" }} />
              {event.venue}
            </li>
            <li className="flex items-center gap-2">
              <FiUsers className="size-3.5 shrink-0" style={{ color: "#C9A227" }} />
              <span style={{ color: "#a6841b" }}>{event.seats}</span>
            </li>
          </ul>
        </div>
        <div className="px-6 pb-5">
          <a
            href="/enroll"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide transition-all hover:opacity-90"
            style={{ background: "#C9A227", color: "#073d27" }}
          >
            Register / Enquire <FiArrowRight />
          </a>
        </div>
      </div>
    </FadeIn>
  );
}

function EventsPage() {
  return (
    <div>
      <PageHero
        title="Events & Announcements"
        subtitle="Stay updated with upcoming batches, workshops, and ceremonies at YETP."
      />

      {/* Upcoming Events */}
      <div className="bg-white py-14">
        <Container>
          <FadeIn>
            <div className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.3em]" style={{ color: "#C9A227" }}>
              What's On
            </div>
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl mb-1" style={{ color: "#073d27" }}>
              Upcoming Events
            </h2>
            <div className="mb-8 h-1 w-12" style={{ background: "#C9A227" }} />
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {upcomingEvents.map((ev, i) => (
              <EventCard key={ev.id} event={ev} index={i} />
            ))}
          </div>
        </Container>
      </div>

      {/* Notice / CTA */}
      <div style={{ background: "#f9fcfb", borderTop: "1px solid #d5e8dc", borderBottom: "1px solid #d5e8dc" }}>
        <Container className="py-10">
          <div
            className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between p-7"
            style={{ background: "#0B5D3B" }}
          >
            <div>
              <div className="font-display text-xl font-extrabold text-white mb-1">
                Want to attend or register for an event?
              </div>
              <p className="text-sm text-white/65">
                Call us at <strong className="text-white">0302-9898082</strong> or visit our campus in New Garden Town, Lahore.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-extrabold uppercase tracking-wide hover:opacity-90"
                style={{ background: "#C9A227", color: "#073d27" }}
              >
                Contact Us <FiArrowRight />
              </a>
              <a
                href="/enroll"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-extrabold uppercase tracking-wide border hover:bg-white/10 transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.35)", color: "white" }}
              >
                Apply Now
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Past Events */}
      <div className="bg-white py-14">
        <Container>
          <FadeIn>
            <div className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.3em]" style={{ color: "#C9A227" }}>
              Archive
            </div>
            <h2 className="font-display text-2xl font-extrabold mb-1" style={{ color: "#073d27" }}>
              Past Events
            </h2>
            <div className="mb-8 h-1 w-12" style={{ background: "#C9A227" }} />
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-3">
            {pastEvents.map((ev, i) => (
              <FadeIn key={ev.title} delay={i * 0.07}>
                <div
                  className="p-6 bg-white"
                  style={{ border: "1px solid #e5e5e5", borderLeft: "4px solid #C9A227" }}
                >
                  <span className="text-2xl mb-3 block">{ev.icon}</span>
                  <h4 className="font-display text-sm font-extrabold mb-1" style={{ color: "#073d27" }}>
                    {ev.title}
                  </h4>
                  <div className="text-[11px] font-semibold mb-2" style={{ color: "#a6841b" }}>
                    {ev.date}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#666" }}>{ev.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
