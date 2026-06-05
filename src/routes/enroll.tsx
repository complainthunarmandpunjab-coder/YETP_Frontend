import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Container, SectionHeading, Button } from "@/components/yetp/primitives";
import { courses } from "@/data/yetp";
import { FiCheck } from "react-icons/fi";

export const Route = createFileRoute("/enroll")({
  head: () => ({
    meta: [
      { title: "Enroll — YETP" },
      { name: "description", content: "Apply to YETP. Seats per cohort are limited. Scholarships available for deserving applicants." },
      { property: "og:title", content: "Enroll — YETP" },
      { property: "og:description", content: "Apply to YETP. Seats per cohort are limited." },
      { property: "og:url", content: "/enroll" },
    ],
    links: [{ rel: "canonical", href: "/enroll" }],
  }),
  component: EnrollPage,
});

function EnrollPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", city: "", course: courses[0].slug, scholarship: false, note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-36 pb-24">
      <Container>
        <SectionHeading
          eyebrow="Enroll"
          title={<>Lock in your <span className="text-gradient-brand">seat.</span></>}
          description="Submit your application in under 60 seconds. Our team reaches out within 24 hours."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/10 to-transparent p-6">
              <div className="text-xs uppercase tracking-wider text-gold">Scholarship</div>
              <h3 className="mt-2 font-display text-2xl font-bold">Rs.100,000 awarded per cohort.</h3>
              <p className="mt-2 text-sm text-muted-foreground">Tick the scholarship box on the form to be considered.</p>
            </div>
            <div className="rounded-3xl border border-white/8 bg-card/60 p-6">
              <div className="text-xs uppercase tracking-wider text-brand-light">What you get</div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {["Industry-expert mentorship", "Hands-on project portfolio", "Guaranteed internship", "Global job readiness", "Lifetime alumni network"].map((x) => (
                  <li key={x} className="flex items-center gap-2"><FiCheck className="size-4 text-brand-light" /> {x}</li>
                ))}
              </ul>
            </div>
          </div>

          {submitted ? (
            <div className="grid place-items-center rounded-3xl border border-brand-light/40 bg-card/60 p-10 text-center lg:col-span-3 glow-brand">
              <div className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-light text-white">
                <FiCheck className="size-7" />
              </div>
              <h3 className="mt-4 text-2xl font-bold">Application received.</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Our admissions team will reach out within 24 hours with next steps and cohort details.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); console.log("enroll submit", form); setSubmitted(true); }}
              className="space-y-4 rounded-3xl border border-white/8 bg-card/60 p-6 sm:p-8 lg:col-span-3"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Course</label>
                <select
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-light"
                >
                  {courses.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Anything else?</label>
                <textarea
                  rows={4}
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-light"
                />
              </div>
              <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-background/60 p-4 text-sm">
                <input
                  type="checkbox"
                  checked={form.scholarship}
                  onChange={(e) => setForm({ ...form, scholarship: e.target.checked })}
                  className="size-4 accent-[var(--brand-light)]"
                />
                I want to be considered for the Rs.100,000 scholarship.
              </label>
              <Button type="submit" className="w-full">Submit Application</Button>
            </form>
          )}
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
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-white/10 bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-light"
      />
    </div>
  );
}
