import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Container } from "@/components/yetp/primitives";
import { PageHero } from "@/components/yetp/PageHero";
import { FiArrowRight, FiUser, FiPhone, FiMail, FiCheck, FiZap } from "react-icons/fi";
import { courses } from "@/data/yetp";

export const Route = createFileRoute("/fast-track")({
  head: () => ({ meta: [{ title: "Fast Track Apply — YETP" }] }),
  component: FastTrackPage,
});

function FastTrackPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", course: courses[0].slug });
  const [sent, setSent] = useState(false);

  return (
    <div>
      <PageHero
        title="Fast Track Apply Form"
        subtitle="Fill in 4 quick fields and our admissions team will call you back within 2 hours to confirm your seat."
        breadcrumb="Fast Track Apply"
      />

      <div className="bg-white py-14">
        <Container>
          <div className="mx-auto max-w-2xl">

            {/* Badge */}
            <div className="mb-8 flex items-center gap-3 p-4 rounded-sm"
              style={{ background: "#f0f9f4", border: "1px solid #a8d5b5" }}>
              <FiZap className="size-5 shrink-0" style={{ color: "#0B5D3B" }} />
              <p className="text-sm" style={{ color: "#073d27" }}>
                <strong>Fast Track</strong> — Submit this short form and our team will contact you within 2 hours to confirm your batch and seat.
              </p>
            </div>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-white"
                style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}>
                <div className="grid size-16 place-items-center rounded-full text-white mb-4" style={{ background: "#0B5D3B" }}>
                  <FiCheck className="size-7" />
                </div>
                <h3 className="font-display text-2xl font-extrabold" style={{ color: "#073d27" }}>Request Submitted!</h3>
                <p className="mt-2 text-sm" style={{ color: "#6b6b6b" }}>
                  Our admissions team will call you back within 2 hours to confirm your seat.
                </p>
                <a href="/" className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white"
                  style={{ background: "#0B5D3B", borderRadius: 2 }}>
                  Back to Home <FiArrowRight />
                </a>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="bg-white" style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}>
                <div className="px-8 py-4 border-b flex items-center gap-3" style={{ borderColor: "#f0f0f0", background: "#f9fcfb" }}>
                  <FiZap className="size-5" style={{ color: "#0B5D3B" }} />
                  <span className="font-bold text-sm" style={{ color: "#073d27" }}>Fast Track Application — Batch 2026</span>
                </div>
                <div className="p-8 space-y-5">
                  {[
                    { label: "Full Name", key: "name", type: "text", icon: FiUser, placeholder: "Enter your full name" },
                    { label: "Phone Number", key: "phone", type: "tel", icon: FiPhone, placeholder: "03XX-XXXXXXX" },
                    { label: "Email Address", key: "email", type: "email", icon: FiMail, placeholder: "you@example.com" },
                  ].map(({ label, key, type, icon: Icon, placeholder }) => (
                    <div key={key}>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                        {label} <span style={{ color: "#C9A227" }}>*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                          <Icon className="size-4" style={{ color: "#0B5D3B" }} />
                        </div>
                        <input required type={type} placeholder={placeholder}
                          value={form[key as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                          className="w-full rounded-sm border bg-white py-2.5 pl-10 pr-4 text-sm outline-none"
                          style={{ border: "1px solid #d5e8dc" }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(11,93,59,0.1)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "#d5e8dc"; e.currentTarget.style.boxShadow = "none"; }}
                        />
                      </div>
                    </div>
                  ))}

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                      Course of Interest <span style={{ color: "#C9A227" }}>*</span>
                    </label>
                    <select required value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                      className="w-full rounded-sm border bg-white px-4 py-2.5 text-sm outline-none"
                      style={{ border: "1px solid #d5e8dc" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#d5e8dc"; }}>
                      {courses.map((c) => (
                        <option key={c.slug} value={c.slug}>{c.title}</option>
                      ))}
                    </select>
                  </div>

                  <button type="submit"
                    className="flex w-full items-center justify-center gap-2 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white hover:opacity-90"
                    style={{ background: "#0B5D3B", borderRadius: 2 }}>
                    Submit Fast Track Request <FiArrowRight />
                  </button>
                  <p className="text-center text-xs" style={{ color: "#aaa" }}>
                    We will call you back within 2 hours during office hours.
                  </p>
                </div>
              </form>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
