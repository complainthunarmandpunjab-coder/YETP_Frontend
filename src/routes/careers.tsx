import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Container, FadeIn } from "@/components/yetp/primitives";
import { PageHero } from "@/components/yetp/PageHero";
import { FiMapPin, FiClock, FiArrowRight, FiCheck, FiUser, FiMail, FiPhone, FiBook, FiUpload } from "react-icons/fi";
import { HiOutlineBriefcase } from "react-icons/hi2";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [{ title: "Careers — YETP" }],
  }),
  component: CareersPage,
});

const openings = [
  {
    id: 1,
    title: "Senior IT Trainer — Web Development",
    type: "Full-Time",
    location: "Lahore (On-Site)",
    dept: "Training & Education",
    desc: "We are looking for an experienced Web Development trainer to teach HTML/CSS, React, Node.js and related technologies. Minimum 3 years of industry experience required.",
    skills: ["React / Next.js", "Node.js / Express", "3+ years industry experience", "Strong communication skills"],
  },
  {
    id: 2,
    title: "Graphic Design & UI/UX Trainer",
    type: "Full-Time",
    location: "Lahore (On-Site)",
    dept: "Training & Education",
    desc: "Seeking a creative professional to teach Adobe Photoshop, Illustrator, Figma and UI/UX design principles to students pursuing careers in digital design.",
    skills: ["Adobe Creative Suite", "Figma / XD", "Portfolio of design work", "2+ years teaching or industry exp."],
  },
  {
    id: 3,
    title: "Admissions Counselor",
    type: "Full-Time",
    location: "Lahore (On-Site)",
    dept: "Admissions",
    desc: "Handle student inquiries, guide applicants through enrollment, coordinate with trainers, and support the admissions team in achieving enrollment targets.",
    skills: ["Excellent communication", "Sales or counseling experience", "MS Office proficiency", "Urdu + English fluency"],
  },
  {
    id: 4,
    title: "Digital Marketing Executive",
    type: "Full-Time",
    location: "Lahore / Remote",
    dept: "Marketing",
    desc: "Manage YETP's social media channels, run digital campaigns, create content, and support student outreach across Facebook, Instagram, YouTube and LinkedIn.",
    skills: ["Facebook & Google Ads", "Social media management", "Content creation", "Basic graphic design"],
  },
];

const perks = [
  "Competitive salary packages",
  "Professional development & training",
  "Collaborative, mission-driven team",
  "Flexible working arrangements",
  "Health & wellness benefits",
  "Career growth opportunities",
];

function CareersPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "", qualification: "", message: "" });

  const opening = openings.find((o) => o.id === selected);

  return (
    <div>
      <PageHero
        title="Careers at YETP"
        subtitle="Join Pakistan's No.1 IT Training Institute. We are building a team that empowers the next generation."
        breadcrumb="Careers"
      />

      <div className="bg-white py-14">
        <Container>

          {/* Why join us */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-4 w-1 rounded" style={{ background: "#C9A227" }} />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.28em]" style={{ color: "#0B5D3B" }}>
                Why YETP
              </span>
            </div>
            <h2 className="font-display text-2xl font-extrabold mb-2" style={{ color: "#073d27" }}>Why Work With Us?</h2>
            <p className="text-sm mb-7" style={{ color: "#6b6b6b" }}>
              At YETP we believe our team is our greatest asset. We offer an environment where talent grows and impact is felt.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {perks.map((p, i) => (
                <FadeIn key={p} delay={i * 0.05}>
                  <div className="flex items-center gap-3 bg-white p-4"
                    style={{ border: "1px solid #e5e5e5", borderLeft: "3px solid #0B5D3B" }}>
                    <div className="grid size-7 shrink-0 place-items-center rounded-full text-white text-xs"
                      style={{ background: "#0B5D3B" }}>
                      <FiCheck className="size-3.5" />
                    </div>
                    <span className="text-sm font-medium" style={{ color: "#333" }}>{p}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Open positions */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-4 w-1 rounded" style={{ background: "#C9A227" }} />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.28em]" style={{ color: "#0B5D3B" }}>
                Open Positions
              </span>
            </div>
            <h2 className="font-display text-2xl font-extrabold mb-8" style={{ color: "#073d27" }}>Current Vacancies</h2>
            <div className="space-y-4">
              {openings.map((job, i) => (
                <FadeIn key={job.id} delay={i * 0.06}>
                  <div className="bg-white" style={{ border: "1px solid #e5e5e5", borderLeft: "4px solid #0B5D3B" }}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 p-6">
                      <div className="flex items-start gap-4">
                        <div className="grid size-11 shrink-0 place-items-center text-white"
                          style={{ background: "#0B5D3B" }}>
                          <HiOutlineBriefcase className="size-5" />
                        </div>
                        <div>
                          <h3 className="font-display text-base font-bold" style={{ color: "#073d27" }}>{job.title}</h3>
                          <div className="mt-1.5 flex flex-wrap gap-3 text-xs" style={{ color: "#6b6b6b" }}>
                            <span className="flex items-center gap-1">
                              <HiOutlineBriefcase className="size-3.5" /> {job.dept}
                            </span>
                            <span className="flex items-center gap-1">
                              <FiMapPin className="size-3.5" /> {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <FiClock className="size-3.5" /> {job.type}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed" style={{ color: "#555" }}>{job.desc}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {job.skills.map((s) => (
                              <span key={s} className="rounded-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                                style={{ background: "#f0f8f4", color: "#0B5D3B", border: "1px solid #c8e6d4" }}>
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => { setSelected(job.id); setSubmitted(false); window.scrollTo({ top: 9999, behavior: "smooth" }); }}
                        className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
                        style={{ background: "#0B5D3B", borderRadius: 2 }}>
                        Apply <FiArrowRight />
                      </button>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Application form */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-4 w-1 rounded" style={{ background: "#C9A227" }} />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.28em]" style={{ color: "#0B5D3B" }}>
                Apply Now
              </span>
            </div>
            <h2 className="font-display text-2xl font-extrabold mb-8" style={{ color: "#073d27" }}>
              {opening ? `Apply for: ${opening.title}` : "Submit Your Application"}
            </h2>

            {submitted ? (
              <div
                className="flex flex-col items-center justify-center py-16 text-center bg-white"
                style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}
              >
                <div className="grid size-16 place-items-center rounded-full text-white mb-4" style={{ background: "#0B5D3B" }}>
                  <FiCheck className="size-7" />
                </div>
                <h3 className="font-display text-2xl font-extrabold" style={{ color: "#073d27" }}>Application Submitted!</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed" style={{ color: "#6b6b6b" }}>
                  Thank you for applying to YETP. Our HR team will review your application and contact you within 3–5 business days.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="bg-white"
                style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}
              >
                <div className="px-8 py-4 border-b flex items-center gap-3"
                  style={{ borderColor: "#f0f0f0", background: "#f9fcfb" }}>
                  <HiOutlineBriefcase className="size-5" style={{ color: "#0B5D3B" }} />
                  <span className="font-bold text-sm" style={{ color: "#073d27" }}>Career Application Form</span>
                </div>
                <div className="p-8 space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { label: "Full Name", key: "name", icon: FiUser, type: "text" },
                      { label: "Email Address", key: "email", icon: FiMail, type: "email" },
                      { label: "Phone Number", key: "phone", icon: FiPhone, type: "tel" },
                      { label: "Highest Qualification", key: "qualification", icon: FiBook, type: "text" },
                    ].map(({ label, key, icon: Icon, type }) => (
                      <div key={key}>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                          {label} <span style={{ color: "#C9A227" }}>*</span>
                        </label>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                            <Icon className="size-4" style={{ color: "#0B5D3B" }} />
                          </div>
                          <input
                            required
                            type={type}
                            value={form[key as keyof typeof form] as string}
                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                            className="w-full rounded-sm border bg-white py-2.5 pl-10 pr-4 text-sm outline-none"
                            style={{ border: "1px solid #d5e8dc" }}
                            onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(11,93,59,0.1)"; }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = "#d5e8dc"; e.currentTarget.style.boxShadow = "none"; }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                      Position Applying For <span style={{ color: "#C9A227" }}>*</span>
                    </label>
                    <select
                      required
                      value={form.role || (opening ? String(opening.id) : "")}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className="w-full rounded-sm border bg-white px-4 py-2.5 text-sm outline-none"
                      style={{ border: "1px solid #d5e8dc" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#d5e8dc"; }}
                    >
                      <option value="">— Select a position —</option>
                      {openings.map((o) => (
                        <option key={o.id} value={o.id}>{o.title}</option>
                      ))}
                      <option value="general">General Application (Any Suitable Role)</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                      Cover Letter / Why YETP? <span style={{ color: "#C9A227" }}>*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about yourself and why you want to join YETP..."
                      className="w-full resize-none rounded-sm border bg-white px-4 py-2.5 text-sm outline-none"
                      style={{ border: "1px solid #d5e8dc" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#d5e8dc"; }}
                    />
                  </div>

                  <div className="flex items-center gap-3 rounded-sm p-4"
                    style={{ background: "#f9fcfb", border: "1px dashed #c8e6d4" }}>
                    <FiUpload className="size-5 shrink-0" style={{ color: "#0B5D3B" }} />
                    <div className="text-sm" style={{ color: "#555" }}>
                      <strong style={{ color: "#073d27" }}>CV / Resume:</strong> Email your CV to{" "}
                      <a href="mailto:hr@yetp.pk" className="font-bold hover:underline" style={{ color: "#0B5D3B" }}>hr@yetp.pk</a>{" "}
                      with subject: <em>"Application — [Position Name]"</em>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
                    style={{ background: "#0B5D3B", borderRadius: 2 }}
                  >
                    Submit Application <FiArrowRight />
                  </button>
                </div>
              </form>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
