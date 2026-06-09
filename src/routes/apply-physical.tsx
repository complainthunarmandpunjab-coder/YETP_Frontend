import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Container } from "@/components/yetp/primitives";
import { PageHero } from "@/components/yetp/PageHero";
import { FiMapPin, FiClock, FiPhone, FiArrowRight, FiUser, FiCheck } from "react-icons/fi";
import { HiOutlineAcademicCap } from "react-icons/hi2";

export const Route = createFileRoute("/apply-physical")({
  head: () => ({ meta: [{ title: "Apply Physical — YETP" }] }),
  component: ApplyPhysicalPage,
});

const steps = [
  { n: "01", title: "Visit Our Campus", desc: "Walk in to the YETP office at New Garden Town, Lahore during office hours." },
  { n: "02", title: "Collect Form", desc: "Pick up the physical admission form from the front desk — free of cost." },
  { n: "03", title: "Fill & Submit", desc: "Fill in your details and submit with CNIC copy and passport-size photos." },
  { n: "04", title: "Fee & Confirmation", desc: "Submit the fee and receive your batch schedule from the admissions team." },
];

function ApplyPhysicalPage() {
  const [form, setForm] = useState({ name: "", phone: "", course: "", date: "" });
  const [sent, setSent] = useState(false);

  return (
    <div>
      <PageHero
        title="Apply Physical"
        subtitle="Visit the YETP campus and complete your admission in person. Our team will guide you every step of the way."
        breadcrumb="Apply Physical"
      />

      <div className="bg-white py-14">
        <Container>

          {/* Steps */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-4 w-1 rounded" style={{ background: "#C9A227" }} />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.28em]" style={{ color: "#0B5D3B" }}>Walk-In Process</span>
            </div>
            <h2 className="font-display text-2xl font-extrabold mb-8" style={{ color: "#073d27" }}>How Physical Admission Works</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <div key={s.n} className="bg-white p-6" style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}>
                  <div className="font-display text-4xl font-extrabold" style={{ color: "rgba(11,93,59,0.1)" }}>{s.n}</div>
                  <h3 className="mt-2 font-display text-base font-bold" style={{ color: "#073d27" }}>{s.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-white p-6" style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #C9A227" }}>
                <div className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: "#0B5D3B" }}>Campus Location</div>
                <div className="flex items-start gap-3 mb-3">
                  <FiMapPin className="mt-0.5 size-4 shrink-0" style={{ color: "#C9A227" }} />
                  <div className="text-sm" style={{ color: "#444" }}>Building No 30, Tariq Block, Usmani Rd, New Garden Town, Lahore, Pakistan</div>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <FiClock className="size-4 shrink-0" style={{ color: "#C9A227" }} />
                  <div className="text-sm" style={{ color: "#444" }}>Mon - Sun &nbsp;|&nbsp; 10:00 AM – 6:00 PM</div>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone className="size-4 shrink-0" style={{ color: "#C9A227" }} />
                  <a href="tel:+923029898082" className="text-sm hover:text-[#0B5D3B]" style={{ color: "#444" }}>0302-9898082</a>
                </div>
              </div>

              <div className="bg-white p-6" style={{ border: "1px solid #e5e5e5", borderLeft: "3px solid #0B5D3B" }}>
                <div className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: "#0B5D3B" }}>What to Bring</div>
                {["Original CNIC / B-Form", "2 Passport-size photographs", "Latest educational certificate (copy)", "Parent/Guardian CNIC (if under 18)"].map((i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5 text-sm" style={{ color: "#444" }}>
                    <FiCheck className="size-3.5 shrink-0" style={{ color: "#0B5D3B" }} /> {i}
                  </div>
                ))}
              </div>
            </div>

            {/* Appointment form */}
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-white"
                style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}>
                <div className="grid size-16 place-items-center rounded-full text-white mb-4" style={{ background: "#0B5D3B" }}>
                  <FiCheck className="size-7" />
                </div>
                <h3 className="font-display text-2xl font-extrabold" style={{ color: "#073d27" }}>Appointment Booked!</h3>
                <p className="mt-2 text-sm" style={{ color: "#6b6b6b" }}>Our team will confirm your appointment via call within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="bg-white" style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}>
                <div className="px-8 py-4 border-b flex items-center gap-3" style={{ borderColor: "#f0f0f0", background: "#f9fcfb" }}>
                  <HiOutlineAcademicCap className="size-5" style={{ color: "#0B5D3B" }} />
                  <span className="font-bold text-sm" style={{ color: "#073d27" }}>Book a Campus Visit Appointment</span>
                </div>
                <div className="p-8 space-y-5">
                  {[
                    { label: "Full Name", key: "name", type: "text", icon: FiUser },
                    { label: "Phone Number", key: "phone", type: "tel", icon: FiPhone },
                    { label: "Preferred Course", key: "course", type: "text", icon: HiOutlineAcademicCap },
                    { label: "Preferred Visit Date", key: "date", type: "date", icon: FiClock },
                  ].map(({ label, key, type, icon: Icon }) => (
                    <div key={key}>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                        {label} <span style={{ color: "#C9A227" }}>*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                          <Icon className="size-4" style={{ color: "#0B5D3B" }} />
                        </div>
                        <input required type={type}
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
                  <button type="submit"
                    className="flex w-full items-center justify-center gap-2 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white hover:opacity-90"
                    style={{ background: "#0B5D3B", borderRadius: 2 }}>
                    Book Appointment <FiArrowRight />
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
