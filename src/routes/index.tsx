import { createFileRoute } from "@tanstack/react-router";
import { HeroSection, CoursesSection, WhyYETP, MissionVisionSection, TestimonialsSection, PartnersSection, CTASection } from "@/components/yetp/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YETP — Build Your Dream Big. Start Today." },
      { name: "description", content: "Pakistan's #1 youth empowerment IT institute. Premium courses, real internships and global career pathways." },
      { property: "og:title", content: "YETP — Build Your Dream Big. Start Today." },
      { property: "og:description", content: "Premium courses, real internships and global career pathways for Pakistan's youth." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <HeroSection />
      <CoursesSection />
      <WhyYETP />
      <MissionVisionSection />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
    </>
  );
}
