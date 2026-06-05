import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Container, SectionHeading, Button } from "@/components/yetp/primitives";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — YETP" },
      { name: "description", content: "Talk to YETP — admissions, partnerships, scholarships and program advising." },
      { property: "og:title", content: "Contact — YETP" },
      { property: "og:description", content: "Talk to YETP — admissions, partnerships and scholarships." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  return (
    <div className="pt-36 pb-24">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title={<>Let's <span className="text-gradient-brand">talk.</span></>}
          description="Admissions, partnerships, scholarships — we read every message."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {[
              { icon: FiMapPin, title: "Visit", value: "Karachi, Pakistan" },
              { icon: FiPhone, title: "Call", value: "+92 300 0000000" },
              { icon: FiMail, title: "Email", value: "hello@yetp.pk" },
            ].map((c) => (
              <div key={c.title} className="flex items-start gap-4 rounded-2xl border border-white/8 bg-card/60 p-5">
                <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-light text-white">
                  <c.icon className="size-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.title}</div>
                  <div className="mt-0.5 text-base font-medium">{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); console.log("contact submit", form); }}
            className="space-y-4 rounded-3xl border border-white/8 bg-card/60 p-6 sm:p-8 lg:col-span-3"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            </div>
            <Field label="Subject" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} />
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-light"
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto">Send Message</Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-white/10 bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-light"
      />
    </div>
  );
}
