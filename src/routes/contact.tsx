import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Container } from "@/components/yetp/primitives";
import { PageHero } from "@/components/yetp/PageHero";
import { FiMail, FiPhone, FiMapPin, FiClock, FiArrowRight, FiUser, FiMessageSquare } from "react-icons/fi";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [{ title: "Contact Us — YETP" }],
  }),
  component: ContactPage,
});

function Field({ label, value, onChange, type = "text", icon: Icon }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; icon?: React.ElementType;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <Icon className="size-4" style={{ color: "#0B5D3B" }} />
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-sm border bg-white px-4 py-2.5 text-sm outline-none transition-all"
          style={{ border: "1px solid #d5e8dc", paddingLeft: Icon ? "2.5rem" : "1rem" }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(11,93,59,0.1)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "#d5e8dc"; e.currentTarget.style.boxShadow = "none"; }}
        />
      </div>
    </div>
  );
}

const API_URL = import.meta.env.VITE_API_URL as string;

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div>
      <PageHero
        title="Contact Us"
        subtitle="Admissions, partnerships and enquiries — reach out and our team will respond within 24 hours."
        breadcrumb="Contact Us"
      />

      <div className="bg-white py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">

            {/* Contact info */}
            <div className="space-y-4">
              {[
                {
                  icon: FiPhone, title: "Call Us",
                  lines: ["0302-9898082", "0324-9881887"],
                  links: ["tel:+923029898082", "tel:+923249881887"],
                },
                {
                  icon: FiMail, title: "Email Us",
                  lines: ["info@yetp.pk", "contact@yetp.pk"],
                  links: ["mailto:info@yetp.pk", "mailto:contact@yetp.pk"],
                },
                {
                  icon: FiMapPin, title: "Our Address",
                  lines: ["Building No 30, Tariq Block,", "Usmani Rd, New Garden Town,", "Lahore, Pakistan"],
                  links: [],
                },
                {
                  icon: FiClock, title: "Office Hours",
                  lines: ["Monday – Sunday", "10:00 AM – 6:00 PM"],
                  links: [],
                },
              ].map((c) => (
                <div key={c.title} className="flex items-start gap-4 bg-white p-5"
                  style={{ border: "1px solid #e5e5e5", borderLeft: "3px solid #0B5D3B" }}>
                  <div className="grid size-10 shrink-0 place-items-center text-white"
                    style={{ background: "#0B5D3B" }}>
                    <c.icon className="size-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-widest mb-1" style={{ color: "#0B5D3B" }}>
                      {c.title}
                    </div>
                    {c.lines.map((line, i) => (
                      c.links[i]
                        ? <a key={i} href={c.links[i]} className="block text-sm font-medium hover:text-[#0B5D3B]" style={{ color: "#333" }}>{line}</a>
                        : <div key={i} className="text-sm" style={{ color: "#555" }}>{line}</div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="p-5 text-center text-white" style={{ background: "#0B5D3B" }}>
                <div className="text-sm font-bold mb-1">Ready to enroll?</div>
                <p className="text-xs text-white/70 mb-3">Apply now and our team will guide you through the admission process.</p>
                <a href="/enroll"
                  className="inline-flex items-center gap-2 rounded-sm px-5 py-2 text-xs font-bold text-[#073d27]"
                  style={{ background: "#C9A227" }}>
                  Apply Now <FiArrowRight />
                </a>
              </div>
            </div>

            {/* Contact form */}
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-white"
                style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}>
                <div className="grid size-16 place-items-center rounded-full text-white mb-4" style={{ background: "#0B5D3B" }}>
                  <FiMail className="size-7" />
                </div>
                <h3 className="font-display text-2xl font-extrabold" style={{ color: "#073d27" }}>Message Sent!</h3>
                <p className="mt-2 text-sm" style={{ color: "#6b6b6b" }}>
                  Thank you for contacting YETP. We will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={async (e) => {
                e.preventDefault();
                setError(""); setLoading(true);
                try {
                  const res = await fetch(`${API_URL}/api/contact`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, subject: form.subject, message: form.message }),
                  });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.message || "Failed to send message.");
                  setSent(true);
                } catch (err) {
                  setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
                } finally { setLoading(false); }
              }}
                className="bg-white"
                style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}>
                <div className="px-8 py-4 border-b flex items-center gap-3"
                  style={{ borderColor: "#f0f0f0", background: "#f9fcfb" }}>
                  <FiMessageSquare className="size-5" style={{ color: "#0B5D3B" }} />
                  <span className="font-bold text-sm" style={{ color: "#073d27" }}>Send Us a Message</span>
                </div>
                <div className="p-8 space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} icon={FiUser} />
                    <Field label="Email Address" value={form.email} onChange={(v) => setForm({ ...form, email: v })} icon={FiMail} type="email" />
                    <Field label="Phone Number" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} icon={FiPhone} />
                    <Field label="Subject" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>Message</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full resize-none rounded-sm border bg-white px-4 py-2.5 text-sm outline-none"
                      style={{ border: "1px solid #d5e8dc" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#d5e8dc"; }}
                    />
                  </div>
                  {error && <p className="text-xs font-semibold" style={{ color: "#c0392b" }}>{error}</p>}
                  <button type="submit" disabled={loading}
                    className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                    style={{ background: "#0B5D3B", borderRadius: 2 }}>
                    {loading ? "Sending..." : <><span>Send Message</span><FiArrowRight /></>}
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
