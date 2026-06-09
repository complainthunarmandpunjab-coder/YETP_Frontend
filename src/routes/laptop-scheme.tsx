import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Container, FadeIn } from "@/components/yetp/primitives";
import { PageHero } from "@/components/yetp/PageHero";
import { FiArrowRight, FiCheckCircle, FiAlertCircle, FiPhone, FiMail } from "react-icons/fi";
import { HiOutlineComputerDesktop } from "react-icons/hi2";

export const Route = createFileRoute("/laptop-scheme")({
  head: () => ({ meta: [{ title: "Laptop Scheme — YETP" }] }),
  component: LaptopSchemePage,
});

const eligibility = [
  "Currently enrolled or completed a YETP course",
  "Minimum 85% attendance during the program",
  "Passed the final assessment with 70% or above",
  "Submitted a valid CNIC / B-Form copy",
  "Below 30 years of age at time of application",
  "From a low-income or deserving background",
];

const specs = [
  ["Processor", "Intel Core i5 / AMD Ryzen 5 (10th Gen+)"],
  ["RAM", "8 GB DDR4"],
  ["Storage", "256 GB SSD"],
  ["Display", '15.6" Full HD (1920×1080)'],
  ["OS", "Windows 11 Home"],
  ["Battery", "Up to 8 hours"],
  ["Warranty", "1 Year Manufacturer Warranty"],
];

const steps = [
  { n: "01", title: "Check Eligibility", desc: "Review the eligibility criteria and confirm you meet the requirements for the Laptop Scheme." },
  { n: "02", title: "Submit Application", desc: "Fill out the Laptop Scheme Application Form below with your CNIC, course enrollment details, and income proof." },
  { n: "03", title: "Review Process", desc: "YETP's selection committee reviews applications within 7–10 working days and contacts shortlisted candidates." },
  { n: "04", title: "Receive Laptop", desc: "Selected students receive their laptop at the YETP campus after signing the laptop agreement form." },
];

type FormState = "idle" | "submitted";

function LaptopSchemePage() {
  const [form, setForm] = useState({ name: "", cnic: "", course: "", phone: "", reason: "" });
  const [state, setState] = useState<FormState>("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitted");
  }

  return (
    <div>
      <PageHero
        title="YETP Laptop Scheme"
        subtitle="YETP provides free laptops to deserving students who complete their training with excellence. Empowering youth with the tools they need."
      />

      {/* Intro banner */}
      <div style={{ background: "#073d27" }}>
        <Container className="py-6">
          <div className="flex items-center gap-4">
            <HiOutlineComputerDesktop className="size-10 shrink-0" style={{ color: "#C9A227" }} />
            <div>
              <div className="font-display text-lg font-extrabold text-white">
                Free Laptops for Deserving YETP Students
              </div>
              <p className="text-xs text-white/60 mt-0.5">
                Under YETP's Student Empowerment Initiative, eligible graduates receive a laptop to launch their freelancing or tech career.
              </p>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-white py-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

            {/* Left */}
            <div className="space-y-10">

              {/* How it works */}
              <FadeIn>
                <div className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.3em]" style={{ color: "#C9A227" }}>
                  Process
                </div>
                <h2 className="font-display text-xl font-extrabold mb-6" style={{ color: "#073d27" }}>
                  How the Laptop Scheme Works
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {steps.map((s) => (
                    <div
                      key={s.n}
                      className="flex items-start gap-4 p-5 bg-white"
                      style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}
                    >
                      <div
                        className="font-display text-2xl font-extrabold shrink-0"
                        style={{ color: "#0B5D3B" }}
                      >
                        {s.n}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm mb-1" style={{ color: "#073d27" }}>{s.title}</h4>
                        <p className="text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* Application Form */}
              <FadeIn delay={0.08}>
                <div className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.3em]" style={{ color: "#C9A227" }}>
                  Apply
                </div>
                <h2 className="font-display text-xl font-extrabold mb-6" style={{ color: "#073d27" }}>
                  Laptop Scheme Application
                </h2>

                {state === "submitted" ? (
                  <div
                    className="flex items-start gap-4 p-6 rounded-sm"
                    style={{ background: "#f0f9f4", border: "1px solid #a8d5b5" }}
                  >
                    <FiCheckCircle className="mt-0.5 size-6 shrink-0" style={{ color: "#0B5D3B" }} />
                    <div>
                      <div className="font-bold" style={{ color: "#073d27" }}>Application Submitted!</div>
                      <p className="mt-1 text-sm leading-relaxed" style={{ color: "#555" }}>
                        Thank you, <strong>{form.name}</strong>. Your Laptop Scheme application has been received. Our team will review it within 7–10 working days and contact you on <strong>{form.phone}</strong>.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white space-y-5 p-7"
                    style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                          Full Name <span style={{ color: "#C9A227" }}>*</span>
                        </label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full rounded-sm px-4 py-2.5 text-sm outline-none"
                          style={{ border: "1px solid #d5e8dc" }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "#d5e8dc"; }}
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                          CNIC Number <span style={{ color: "#C9A227" }}>*</span>
                        </label>
                        <input
                          required
                          value={form.cnic}
                          onChange={(e) => setForm({ ...form, cnic: e.target.value })}
                          placeholder="35201-1234567-1"
                          className="w-full rounded-sm px-4 py-2.5 text-sm outline-none"
                          style={{ border: "1px solid #d5e8dc" }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "#d5e8dc"; }}
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                          Course Completed <span style={{ color: "#C9A227" }}>*</span>
                        </label>
                        <select
                          required
                          value={form.course}
                          onChange={(e) => setForm({ ...form, course: e.target.value })}
                          className="w-full rounded-sm px-4 py-2.5 text-sm outline-none bg-white"
                          style={{ border: "1px solid #d5e8dc" }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "#d5e8dc"; }}
                        >
                          <option value="">Select your course</option>
                          {[
                            "Web Development",
                            "Digital Marketing",
                            "Graphic Design & UI/UX",
                            "Video Editing",
                            "Amazon VA",
                            "E-Commerce",
                            "React & Node.js",
                            "Other",
                          ].map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                          Phone Number <span style={{ color: "#C9A227" }}>*</span>
                        </label>
                        <input
                          required
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="03XX-XXXXXXX"
                          className="w-full rounded-sm px-4 py-2.5 text-sm outline-none"
                          style={{ border: "1px solid #d5e8dc" }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "#d5e8dc"; }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                        Why do you deserve this laptop? <span style={{ color: "#C9A227" }}>*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.reason}
                        onChange={(e) => setForm({ ...form, reason: e.target.value })}
                        placeholder="Briefly describe your financial background and how a laptop will help you start your freelancing career..."
                        className="w-full rounded-sm px-4 py-2.5 text-sm outline-none resize-none"
                        style={{ border: "1px solid #d5e8dc" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "#d5e8dc"; }}
                      />
                    </div>

                    <div
                      className="flex items-start gap-3 p-4 text-xs"
                      style={{ background: "#fffbeb", border: "1px solid #f5e4a0" }}
                    >
                      <FiAlertCircle className="mt-0.5 size-4 shrink-0" style={{ color: "#a6841b" }} />
                      <span style={{ color: "#7a5a00" }}>
                        Applications are reviewed by a committee. Providing false information will result in disqualification and may affect future enrollment at YETP.
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity"
                      style={{ background: "#0B5D3B", borderRadius: 2 }}
                    >
                      Submit Application <FiArrowRight />
                    </button>
                  </form>
                )}
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <FadeIn delay={0.05}>
                <div className="bg-white p-6" style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #C9A227" }}>
                  <div className="text-xs font-extrabold uppercase tracking-wider mb-4" style={{ color: "#0B5D3B" }}>
                    Laptop Specifications
                  </div>
                  <div className="divide-y" style={{ borderColor: "#f0f0f0" }}>
                    {specs.map(([k, v]) => (
                      <div key={k} className="flex justify-between py-2.5 text-xs">
                        <span className="font-bold" style={{ color: "#073d27" }}>{k}</span>
                        <span style={{ color: "#555" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[10px] leading-relaxed" style={{ color: "#999" }}>
                    * Specifications may vary based on availability. Final specs confirmed at the time of award.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.07}>
                <div className="bg-white p-6" style={{ border: "1px solid #e5e5e5", borderLeft: "3px solid #0B5D3B" }}>
                  <div className="text-xs font-extrabold uppercase tracking-wider mb-4" style={{ color: "#0B5D3B" }}>
                    Eligibility Criteria
                  </div>
                  <ul className="space-y-2">
                    {eligibility.map((e) => (
                      <li key={e} className="flex items-start gap-2 text-xs" style={{ color: "#444" }}>
                        <FiCheckCircle className="mt-0.5 size-3.5 shrink-0" style={{ color: "#0B5D3B" }} />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.09}>
                <div className="bg-white p-6" style={{ border: "1px solid #e5e5e5" }}>
                  <div className="text-xs font-extrabold uppercase tracking-wider mb-3" style={{ color: "#0B5D3B" }}>
                    Contact for Queries
                  </div>
                  <div className="space-y-2.5">
                    <a href="tel:+923029898082" className="flex items-center gap-2 text-sm hover:text-[#0B5D3B]" style={{ color: "#555" }}>
                      <FiPhone className="size-4 text-[#C9A227]" /> 0302-9898082
                    </a>
                    <a href="mailto:info@yetp.pk" className="flex items-center gap-2 text-sm hover:text-[#0B5D3B]" style={{ color: "#555" }}>
                      <FiMail className="size-4 text-[#C9A227]" /> info@yetp.pk
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </Container>
      </div>
    </div>
  );
}
