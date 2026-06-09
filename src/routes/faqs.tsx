import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Container, FadeIn } from "@/components/yetp/primitives";
import { PageHero } from "@/components/yetp/PageHero";
import { FiChevronDown, FiArrowRight } from "react-icons/fi";

export const Route = createFileRoute("/faqs")({
  head: () => ({ meta: [{ title: "FAQ's — YETP" }] }),
  component: FaqsPage,
});

const categories = [
  {
    label: "Admissions",
    items: [
      { q: "How can I apply to YETP?", a: "You can apply online through our website, visit our campus in person (Apply Physical), or use the Fast Track Apply Form for a quick callback. Our admissions team is available Mon–Sun 10am–6pm." },
      { q: "What are the eligibility requirements?", a: "Most YETP programs are open to anyone aged 16 and above. A Matric (10th grade) or Intermediate pass is preferred but not mandatory. We welcome students from all educational backgrounds." },
      { q: "When do new batches start?", a: "New batches start every month. Contact us or check our website for the exact date of the upcoming batch for your preferred course." },
      { q: "How many seats are available per batch?", a: "Each batch is limited to 20–25 students to ensure quality training and individual attention from the instructor." },
    ],
  },
  {
    label: "Fees & Scholarship",
    items: [
      { q: "What is the fee for YETP courses?", a: "Course fees vary by program (typically PKR 8,000–25,000 for the full duration). Visit our office or contact us for the exact fee structure of your chosen program." },
      { q: "Is there any scholarship available?", a: "Yes! YETP offers a Rs.100,000 scholarship for deserving students based on financial need and merit. Apply and check the scholarship box on the application form to be considered." },
      { q: "What payment methods are accepted?", a: "We accept HBL bank transfer, Bank Alfalah, JazzCash (0302-9898082), EasyPaisa (0302-9898082), and cash payment at our Lahore office." },
      { q: "Can I pay the fee in installments?", a: "Installment plans are available for select programs. Please discuss this with our admissions team at the time of enrollment. Approval is subject to management discretion." },
    ],
  },
  {
    label: "Courses & Training",
    items: [
      { q: "What courses does YETP offer?", a: "YETP offers 26+ programs including Web Development, Digital Marketing, Graphic & UI/UX Design, Video Editing, Amazon VA, E-Commerce, React & Node.js, and more. All courses are practical and lab-based." },
      { q: "Are the courses online or in-person?", a: "YETP primarily offers in-person, hands-on training at our Lahore campus. Online/hybrid options may be available for select programs — contact us for the latest details." },
      { q: "Do I get a certificate after completion?", a: "Yes. All students receive a YETP completion certificate upon successful course completion. The certificate is recognized by our industry partners." },
      { q: "Is there an internship included?", a: "Many YETP programs include a 1-month guaranteed internship with our partner companies. Programs with internship are clearly marked on the Courses page." },
    ],
  },
  {
    label: "LMS & Support",
    items: [
      { q: "How do I access the LMS portal?", a: "Login credentials are provided via email after enrollment and fee confirmation. Visit lms.yetp.pk and use your registered email and password to log in." },
      { q: "What if I miss a class?", a: "Recorded lectures are available on the LMS portal so you can catch up at your own pace. We recommend attending live sessions for best results." },
      { q: "How can I contact YETP support?", a: "Call us at 0302-9898082 or 0324-9881887 (Mon–Sun, 10am–6pm), or email info@yetp.pk. You can also visit our campus in New Garden Town, Lahore." },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b last:border-0" style={{ borderColor: "#f0f0f0" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm font-bold leading-snug" style={{ color: open ? "#0B5D3B" : "#073d27" }}>{q}</span>
        <FiChevronDown
          className="mt-0.5 size-4 shrink-0 transition-transform duration-200"
          style={{ color: "#0B5D3B", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <div className="pb-4 pr-8 text-sm leading-relaxed" style={{ color: "#6b6b6b" }}>{a}</div>
      )}
    </div>
  );
}

function FaqsPage() {
  return (
    <div>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about YETP admissions, fees, courses, scholarships, and more."
        breadcrumb="FAQ's"
      />

      <div className="bg-white py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[240px_1fr]">

            {/* Category nav */}
            <div className="space-y-2">
              {categories.map((c) => (
                <a key={c.label} href={`#${c.label}`}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors hover:text-white hover:bg-[#0B5D3B]"
                  style={{ border: "1px solid #e5e5e5", color: "#333" }}>
                  <span className="size-1.5 rounded-full shrink-0" style={{ background: "#C9A227" }} />
                  {c.label}
                </a>
              ))}
              <div className="mt-6 p-5 text-white" style={{ background: "#0B5D3B" }}>
                <div className="text-sm font-bold mb-1">Still have questions?</div>
                <p className="text-xs text-white/65 mb-3 leading-relaxed">Our team is available Mon–Sun to help you.</p>
                <a href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold"
                  style={{ background: "#C9A227", color: "#073d27", borderRadius: 2 }}>
                  Contact Us <FiArrowRight />
                </a>
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-8">
              {categories.map((cat, i) => (
                <FadeIn key={cat.label} delay={i * 0.05}>
                  <div id={cat.label} className="bg-white" style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}>
                    <div className="px-6 py-3 border-b text-xs font-extrabold uppercase tracking-widest"
                      style={{ borderColor: "#f0f0f0", color: "#0B5D3B", background: "#f9fcfb" }}>
                      {cat.label}
                    </div>
                    <div className="px-6">
                      {cat.items.map((item) => (
                        <FaqItem key={item.q} {...item} />
                      ))}
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
