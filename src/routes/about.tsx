import { createFileRoute } from "@tanstack/react-router";
import { MissionVisionSection, FoundersSection, WhyYETP, CTASection } from "@/components/yetp/sections";
import { Container, SectionHeading } from "@/components/yetp/primitives";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — YETP" },
      { name: "description", content: "YETP is a non-profit IT institute on a mission to empower 1 million Pakistani youth with global career pathways." },
      { property: "og:title", content: "About — YETP" },
      { property: "og:description", content: "A non-profit on a mission to empower 1 million Pakistani youth." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: () => (
    <div className="pt-36">
      <Container>
        <SectionHeading
          eyebrow="About YETP"
          title={<>Built to <span className="text-gradient-brand">manufacture careers.</span></>}
          description="A non-profit IT institute reshaping how Pakistani youth enter the global economy."
        />
      </Container>
      <MissionVisionSection />
      <WhyYETP />
      <FoundersSection />
      <CTASection />
    </div>
  ),
});
