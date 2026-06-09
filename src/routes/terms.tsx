import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/yetp/primitives";
import { PageHero } from "@/components/yetp/PageHero";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms & Conditions — YETP" }] }),
  component: TermsPage,
});

const sections = [
  {
    title: "1. Enrollment & Admission",
    body: `By enrolling in any YETP program, the student agrees to abide by all institute rules, policies, and academic standards. Admission is subject to availability of seats and management approval. YETP reserves the right to reject any application without providing a reason. Students must provide accurate and truthful information on the application form. Providing false information is grounds for immediate cancellation of admission.`,
  },
  {
    title: "2. Fee Policy",
    body: `Course fees must be paid in full at the time of enrollment unless a written installment agreement has been made with management. Once submitted, fees are non-refundable after the commencement of classes. In case of a batch cancellation by YETP, a full refund will be issued.`,
  },
  {
    title: "3. Attendance Policy",
    body: `Regular attendance is mandatory. A minimum of 75% attendance is required to be eligible for the completion certificate and internship placement. Students with attendance below 75% will not be issued a certificate. Three consecutive absences without prior notice may result in removal from the batch. Students are encouraged to inform the instructor or admin in advance in case of unavoidable absence.`,
  },
  {
    title: "4. Code of Conduct",
    body: `All students are expected to maintain a respectful, professional, and inclusive environment. Harassment, bullying, discrimination, or any disruptive behavior towards fellow students, trainers, or staff will result in immediate suspension or expulsion from the program without refund. Use of mobile phones during live sessions is discouraged and may be restricted by the instructor.`,
  },
  {
    title: "5. Intellectual Property",
    body: `All course materials, lectures, notes, videos, and resources provided by YETP are the intellectual property of Youth Empowerment Training Program. Students are not permitted to record, copy, distribute, or sell any YETP content without prior written permission. Violation of this policy may result in legal action and expulsion from the program.`,
  },
  {
    title: "6. Certification",
    body: `A YETP completion certificate will be issued only upon successful completion of the program requirements including attendance, assignments, and final assessments. Certificates are issued within 30 days of course completion. Lost certificates may be reissued upon request for a nominal fee. YETP certificates are recognized by our partner organizations and industry affiliates.`,
  },
  {
    title: "7. Internship Placement",
    body: `Internship opportunities are provided for eligible programs and are subject to the student's attendance, performance, and professional behavior throughout the training period. YETP will make reasonable efforts to place eligible students with partner companies. However, internship placement is not guaranteed and is subject to availability and partner requirements.`,
  },
  {
    title: "8. Privacy & Data",
    body: `YETP collects personal information (name, CNIC, contact details, educational background) for enrollment and administrative purposes only. This information will not be shared with third parties without the student's consent, except where required by law. Students may request access to or deletion of their personal data by contacting the YETP admin office.`,
  },
  {
    title: "9. Amendments",
    body: `YETP reserves the right to amend these Terms & Conditions at any time without prior notice. The latest version of this document will be published on the official YETP website (yetp.pk). Continued enrollment in the program after any amendments constitutes acceptance of the revised terms.`,
  },
  {
    title: "10. Governing Law",
    body: `These Terms & Conditions are governed by the laws of the Islamic Republic of Pakistan. Any disputes arising from enrollment or participation in YETP programs shall be subject to the jurisdiction of the courts of Lahore, Pakistan.`,
  },
];

function TermsPage() {
  return (
    <div>
      <PageHero
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before enrolling in any YETP program."
        breadcrumb="Terms & Conditions"
      />

      <div className="bg-white py-14">
        <Container>
          <div className="mx-auto max-w-4xl">

            <div className="mb-8 rounded-sm p-5" style={{ background: "#f9fcfb", border: "1px solid #d5e8dc" }}>
              <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                <strong style={{ color: "#073d27" }}>Last Updated: June 2026</strong> — These Terms & Conditions govern the relationship between Youth Empowerment Training Program (YETP) and its students, applicants, and website visitors. By enrolling or using YETP services, you agree to these terms.
              </p>
            </div>

            <div className="space-y-6">
              {sections.map((s) => (
                <div key={s.title} className="bg-white p-7" style={{ border: "1px solid #e5e5e5", borderLeft: "4px solid #0B5D3B" }}>
                  <h3 className="font-display text-base font-extrabold mb-3" style={{ color: "#073d27" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{s.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 text-center text-white" style={{ background: "#0B5D3B" }}>
              <div className="text-sm font-bold mb-1">Questions about our Terms?</div>
              <p className="text-xs text-white/65 mb-3">Contact our admin team at info@yetp.pk or call 0302-9898082.</p>
              <a href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold"
                style={{ background: "#C9A227", color: "#073d27", borderRadius: 2 }}>
                Contact Us
              </a>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
