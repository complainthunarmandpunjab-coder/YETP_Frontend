import { createFileRoute } from "@tanstack/react-router";
import { CoursesSection, CTASection } from "@/components/yetp/sections";
import { Container, SectionHeading } from "@/components/yetp/primitives";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — YETP" },
      { name: "description", content: "Six premium, hands-on tracks with guaranteed internships and global career outcomes." },
      { property: "og:title", content: "Courses — YETP" },
      { property: "og:description", content: "Six premium, hands-on tracks with guaranteed internships and global career outcomes." },
      { property: "og:url", content: "/courses" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: () => (
    <div className="pt-36">
      <Container>
        <SectionHeading
          eyebrow="Programs"
          title={<>Pick your <span className="text-gradient-brand">unfair advantage.</span></>}
          description="Every track ships with mentorship, real projects and a guaranteed internship pipeline."
        />
      </Container>
      <CoursesSection />
      <CTASection />
    </div>
  ),
});
