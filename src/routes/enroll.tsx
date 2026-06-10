import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Container } from "@/components/yetp/primitives";
import { courses } from "@/data/yetp";
import {
  FiArrowRight, FiUser, FiMail, FiPhone, FiMapPin,
  FiBook, FiCheck, FiLock, FiEye, FiEyeOff, FiChevronRight, FiLogIn
} from "react-icons/fi";
import { HiOutlineAcademicCap, HiOutlineSparkles, HiOutlineUserPlus } from "react-icons/hi2";
import logoUrl from "@/assets/logo-yetp.png";

export const Route = createFileRoute("/enroll")({
  head: () => ({ meta: [{ title: "Admissions Portal — YETP" }] }),
  component: EnrollPage,
});

type View = "portal" | "register" | "login" | "forgot" | "success";

const benefits = [
  "Industry-expert trainers",
  "100% Hands-On lab training",
  "Guaranteed internships",
  "Global job readiness",
  "Lifetime alumni network",
];

function Field({ label, value, onChange, type = "text", icon: Icon, required = true, placeholder = "" }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; icon?: React.ElementType; required?: boolean; placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  const isPass = type === "password";
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
        {label} {required && <span style={{ color: "#C9A227" }}>*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <Icon className="size-4" style={{ color: "#0B5D3B" }} />
          </div>
        )}
        <input
          type={isPass ? (show ? "text" : "password") : type}
          required={required} value={value} placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none transition-all"
          style={{ border: "1.5px solid #e0ede7", paddingLeft: Icon ? "2.5rem" : "1rem", paddingRight: isPass ? "2.5rem" : "1rem" }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(11,93,59,0.1)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "#e0ede7"; e.currentTarget.style.boxShadow = "none"; }}
        />
        {isPass && (
          <button type="button" onClick={() => setShow(s => !s)}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5">
            {show ? <FiEyeOff className="size-4" style={{ color: "#999" }} /> : <FiEye className="size-4" style={{ color: "#999" }} />}
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Shared left panel ───────────────────────────── */
function LeftPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between p-8 text-white"
      style={{ background: "linear-gradient(160deg, #052b1c 0%, #0B5D3B 100%)" }}>
      <div>
        <img src={logoUrl} alt="YETP" className="size-12 rounded-full object-contain mb-4"
          style={{ border: "2px solid #C9A227", padding: 2, background: "rgba(255,255,255,0.08)" }} />
        <h2 className="font-display text-2xl font-extrabold leading-snug" style={{ color: "#ffffff" }}>
          YETP<br />Admissions<br />Portal
        </h2>
        <p className="mt-2 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
          Pakistan's No.1 IT Training Institute — Empowering youth since 2021.
        </p>
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <HiOutlineSparkles className="size-3.5" style={{ color: "#C9A227" }} />
          <span className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: "#C9A227" }}>Why YETP?</span>
        </div>
        <div className="space-y-2">
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-2 text-[11px]" style={{ color: "rgba(255,255,255,0.65)" }}>
              <div className="grid size-3.5 shrink-0 place-items-center rounded-full" style={{ background: "rgba(201,162,39,0.2)" }}>
                <FiCheck className="size-2" style={{ color: "#C9A227" }} />
              </div>
              {b}
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>Need help?</div>
          <a href="tel:+923029898082" className="text-sm font-bold text-white hover:text-[#C9A227]">0302-9898082</a>
        </div>
      </div>
    </div>
  );
}

function ForgotForm({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center text-center py-4">
        <div className="grid size-14 place-items-center rounded-full text-white mb-4"
          style={{ background: "#0B5D3B" }}>
          <FiMail className="size-6" />
        </div>
        <div className="font-display text-base font-extrabold" style={{ color: "#073d27" }}>Email Sent!</div>
        <p className="mt-1 text-xs leading-relaxed mb-5" style={{ color: "#888" }}>
          Password reset instructions have been sent to <strong>{email}</strong>. Check your inbox.
        </p>
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold hover:text-[#0B5D3B] hover:underline transition-colors"
          style={{ color: "#999" }}>
          ← Back to Login
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
      <p className="text-xs leading-relaxed" style={{ color: "#888" }}>
        Enter your registered email address and we will send you a link to reset your password.
      </p>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#666" }}>
          Registered Email
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <FiMail className="size-4" style={{ color: "#0B5D3B" }} />
          </div>
          <input type="email" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border bg-white py-2.5 pl-10 pr-4 text-sm outline-none"
            style={{ border: "1.5px solid #e0ede7" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(11,93,59,0.1)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#e0ede7"; e.currentTarget.style.boxShadow = "none"; }} />
        </div>
      </div>

      <button type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-extrabold text-white transition-opacity hover:opacity-90"
        style={{ background: "linear-gradient(90deg, #073d27, #0B5D3B)" }}>
        Send Reset Link <FiArrowRight />
      </button>

      <button type="button" onClick={onBack}
        className="flex w-full items-center justify-center gap-1.5 text-xs font-semibold transition-colors hover:text-[#0B5D3B] hover:underline"
        style={{ color: "#999" }}>
        ← Back to Login
      </button>
    </form>
  );
}

/* ══════════════════════════════════════════════════ */
function EnrollPage() {
  const [view, setView] = useState<View>("portal");
  const [reg, setReg] = useState({
    name: "", father: "", email: "", phone: "", cnic: "",
    city: "", qualification: "", course: courses[0].slug,
    message: "",
  });
  const [login, setLogin] = useState({ email: "", password: "" });

  /* ── Portal ── */
  if (view === "portal") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10"
        style={{ background: "linear-gradient(135deg, #052b1c 0%, #0B5D3B 60%, #094831 100%)", paddingTop: 80 }}>
        <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl md:grid-cols-[40%_60%]">

          {/* Left — 40% */}
          <div className="flex flex-col justify-between py-10 px-8 text-white"
            style={{ background: "linear-gradient(180deg, #052b1c 0%, #0B5D3B 100%)" }}>
            <div className="flex flex-col items-center text-center">
              <img src={logoUrl} alt="YETP" className="size-16 rounded-full object-contain mb-5"
                style={{ border: "2.5px solid #C9A227", padding: 3, background: "rgba(255,255,255,0.08)" }} />
              <div className="font-display text-xl font-extrabold leading-snug" style={{ color: "#ffffff" }}>
                YETP Admissions Portal
              </div>
              <div className="mt-2 text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Pakistan's No.1<br />IT Training Institute
              </div>
            </div>
            <div className="text-center mt-8">
              <div className="inline-flex items-center gap-1.5 mb-3">
                <HiOutlineSparkles className="size-3.5" style={{ color: "#C9A227" }} />
                <span className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: "#C9A227" }}>Scholarship</span>
              </div>
              <div className="font-display text-2xl font-extrabold text-white">Rs.100K</div>
              <div className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>Available for deserving students</div>
              <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="text-[10px] mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>Need help?</div>
                <a href="tel:+923029898082" className="text-xs font-bold text-white hover:text-[#C9A227]">0302-9898082</a>
              </div>
            </div>
          </div>

          {/* Right — 60% */}
          <div className="bg-white py-10 px-6 sm:px-10">
            <h3 className="font-display text-2xl font-extrabold" style={{ color: "#073d27" }}>Select Action</h3>
            <p className="mt-1 mb-6 text-xs" style={{ color: "#aaa" }}>Choose how you want to proceed today</p>

            <div className="space-y-3">
              {[
                { icon: HiOutlineUserPlus, label: "New Registration", sub: "Apply for a new batch — 2026", action: () => setView("register") },
                { icon: FiLogIn, label: "Candidate Login", sub: "Access your existing application", action: () => setView("login") },
              ].map((item) => (
                <button key={item.label} onClick={item.action}
                  className="group flex w-full items-center gap-4 rounded-xl p-4 text-left transition-all hover:shadow-md"
                  style={{ border: "1.5px solid #e8f5ee" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; e.currentTarget.style.background = "#f7fdf9"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e8f5ee"; e.currentTarget.style.background = "white"; }}>
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg" style={{ background: "#f0f9f4" }}>
                    <item.icon className="size-5" style={{ color: "#0B5D3B" }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm" style={{ color: "#073d27" }}>{item.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#bbb" }}>{item.sub}</div>
                  </div>
                  <FiChevronRight className="size-4 transition-transform group-hover:translate-x-1" style={{ color: "#ccc" }} />
                </button>
              ))}
            </div>

            <p className="mt-4 text-center text-xs" style={{ color: "#bbb" }}>
              Need support?{" "}
              <a href="/contact" className="font-semibold" style={{ color: "#0B5D3B" }}>Contact us</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ── Candidate Login ── */
  if (view === "login") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #052b1c 0%, #0B5D3B 60%, #094831 100%)", paddingTop: 80 }}>
        <div className="w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl bg-white">

          {/* Top green header */}
          <div className="flex flex-col items-center py-5 px-8 text-white"
            style={{ background: "linear-gradient(160deg, #052b1c 0%, #0B5D3B 100%)" }}>
            <img src={logoUrl} alt="YETP" className="size-14 rounded-full object-contain mb-3"
              style={{ border: "2px solid #C9A227", padding: 2, background: "rgba(255,255,255,0.1)" }} />
            <div className="font-display text-lg font-extrabold text-white">YETP Admission Portal</div>
            <div className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Candidate Login</div>
          </div>

          {/* Form */}
          <div className="px-8 py-5">
            <form onSubmit={(e) => { e.preventDefault(); window.open("https://lms.yetp.pk", "_blank"); }}
              className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#666" }}>
                  Email / Username
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <FiMail className="size-4" style={{ color: "#0B5D3B" }} />
                  </div>
                  <input type="email" required value={login.email}
                    onChange={(e) => setLogin({ ...login, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border bg-white py-2.5 pl-10 pr-4 text-sm outline-none"
                    style={{ border: "1.5px solid #e0ede7" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(11,93,59,0.1)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#e0ede7"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
              </div>

              <Field label="Password" value={login.password} onChange={(v) => setLogin({ ...login, password: v })}
                icon={FiLock} type="password" placeholder="Enter your password" required={false} />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: "#888" }}>
                  <input type="checkbox" className="size-3.5" style={{ accentColor: "#0B5D3B" }} />
                  Remember me
                </label>
                <button type="button" onClick={() => setView("forgot")}
                  className="text-xs font-semibold hover:underline" style={{ color: "#0B5D3B" }}>
                  Forgot password?
                </button>
              </div>

              <button type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-extrabold text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(90deg, #073d27, #0B5D3B)" }}>
                Login <FiArrowRight />
              </button>
            </form>

            <p className="mt-5 text-center text-xs" style={{ color: "#bbb" }}>
              Don't have an account?{" "}
              <button onClick={() => setView("register")} className="font-bold hover:underline" style={{ color: "#0B5D3B" }}>
                Sign Up
              </button>
            </p>

            <button onClick={() => setView("portal")}
              className="mt-3 flex w-full items-center justify-center gap-1.5 text-xs font-semibold transition-colors hover:text-[#0B5D3B] hover:underline"
              style={{ color: "#999" }}>
              ← Back to Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Forgot Password ── */
  if (view === "forgot") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #052b1c 0%, #0B5D3B 60%, #094831 100%)", paddingTop: 80 }}>
        <div className="w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl bg-white">

          {/* Top green header */}
          <div className="flex flex-col items-center py-5 px-8 text-white"
            style={{ background: "linear-gradient(160deg, #052b1c 0%, #0B5D3B 100%)" }}>
            <img src={logoUrl} alt="YETP" className="size-14 rounded-full object-contain mb-3"
              style={{ border: "2px solid #C9A227", padding: 2, background: "rgba(255,255,255,0.1)" }} />
            <div className="font-display text-lg font-extrabold text-white">YETP Admission Portal</div>
            <div className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Reset Your Password</div>
          </div>

          {/* Form */}
          <div className="px-8 py-5">
            <ForgotForm onBack={() => setView("login")} />
          </div>
        </div>
      </div>
    );
  }

  /* ── Success ── */
  if (view === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #052b1c 0%, #0B5D3B 100%)", paddingTop: 90 }}>
        <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl p-10 text-center">
          <div className="grid size-20 place-items-center rounded-full text-white mx-auto mb-5"
            style={{ background: "#0B5D3B" }}>
            <FiCheck className="size-9" />
          </div>
          <h3 className="font-display text-2xl font-extrabold" style={{ color: "#073d27" }}>Application Submitted!</h3>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6b6b6b" }}>
            Thank you for applying to YETP. Our admissions team will contact you within 24 hours with your batch details.
          </p>
          <div className="mt-6 p-4 rounded-lg" style={{ background: "#f0f9f4" }}>
            <div className="text-xs font-bold" style={{ color: "#0B5D3B" }}>What's next?</div>
            <p className="text-xs mt-1" style={{ color: "#555" }}>Check your email and phone — our team will confirm your seat and send payment details.</p>
          </div>
          <button onClick={() => setView("portal")}
            className="mt-6 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white"
            style={{ background: "#0B5D3B" }}>
            Back to Portal <FiArrowRight />
          </button>
        </div>
      </div>
    );
  }

  /* ── Registration Form ── */
  return (
    <div className="min-h-screen" style={{ background: "#f5f7f5", paddingTop: 90 }}>
      <div className="mx-auto max-w-6xl px-4 py-10">

        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <button onClick={() => setView("portal")}
            className="flex items-center gap-1.5 text-sm font-semibold hover:text-[#0B5D3B] transition-colors"
            style={{ color: "#666" }}>
            ← Back to Portal
          </button>
          <div className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full"
            style={{ background: "#f0f9f4", color: "#0B5D3B", border: "1px solid #c8e6d4" }}>
            <HiOutlineSparkles className="size-3.5" /> Limited Seats
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* Form card */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm" style={{ border: "1px solid #e8f0eb" }}>
            {/* Header */}
            <div className="px-8 py-5 flex items-center gap-3"
              style={{ background: "linear-gradient(90deg, #073d27, #0B5D3B)", borderBottom: "3px solid #C9A227" }}>
              <div className="grid size-10 place-items-center rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
                <HiOutlineAcademicCap className="size-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">Online Application Form</div>
                <div className="text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Batch 2026 — Limited Seats</div>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setView("success"); }} className="p-8 space-y-7">

              {/* Personal */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2" style={{ borderBottom: "1.5px solid #f0f5f2" }}>
                  <div className="grid size-6 place-items-center rounded-full text-white text-[10px] font-extrabold" style={{ background: "#0B5D3B" }}>1</div>
                  <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "#0B5D3B" }}>Personal Information</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name" value={reg.name} onChange={(v) => setReg({ ...reg, name: v })} icon={FiUser} placeholder="Muhammad Ali" />
                  <Field label="Father's Name" value={reg.father} onChange={(v) => setReg({ ...reg, father: v })} icon={FiUser} placeholder="Muhammad Aslam" />
                  <Field label="CNIC / B-Form" value={reg.cnic} onChange={(v) => setReg({ ...reg, cnic: v })} placeholder="35201-XXXXXXX-X" />
                  <Field label="City / District" value={reg.city} onChange={(v) => setReg({ ...reg, city: v })} icon={FiMapPin} placeholder="Lahore" />
                </div>
              </div>

              {/* Contact */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2" style={{ borderBottom: "1.5px solid #f0f5f2" }}>
                  <div className="grid size-6 place-items-center rounded-full text-white text-[10px] font-extrabold" style={{ background: "#0B5D3B" }}>2</div>
                  <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "#0B5D3B" }}>Contact Details</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone Number" value={reg.phone} onChange={(v) => setReg({ ...reg, phone: v })} icon={FiPhone} type="tel" placeholder="0302-XXXXXXX" />
                  <Field label="Email Address" value={reg.email} onChange={(v) => setReg({ ...reg, email: v })} icon={FiMail} type="email" placeholder="you@example.com" />
                </div>
              </div>

              {/* Academic */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2" style={{ borderBottom: "1.5px solid #f0f5f2" }}>
                  <div className="grid size-6 place-items-center rounded-full text-white text-[10px] font-extrabold" style={{ background: "#0B5D3B" }}>3</div>
                  <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "#0B5D3B" }}>Academic & Program</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Qualification" value={reg.qualification} onChange={(v) => setReg({ ...reg, qualification: v })} icon={FiBook} placeholder="Intermediate / B.Sc." />
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                      Select Program <span style={{ color: "#C9A227" }}>*</span>
                    </label>
                    <select value={reg.course} onChange={(e) => setReg({ ...reg, course: e.target.value })}
                      className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none"
                      style={{ border: "1.5px solid #e0ede7" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#e0ede7"; }}>
                      {courses.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>Additional Message (Optional)</label>
                <textarea rows={3} value={reg.message}
                  onChange={(e) => setReg({ ...reg, message: e.target.value })}
                  placeholder="Any questions or additional information..."
                  className="w-full resize-none rounded-lg border bg-white px-4 py-2.5 text-sm outline-none"
                  style={{ border: "1.5px solid #e0ede7" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#e0ede7"; }} />
              </div>

              <button type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(90deg, #073d27, #0B5D3B)" }}>
                Submit Application <FiArrowRight />
              </button>
              <p className="text-center text-xs" style={{ color: "#aaa" }}>Our team will contact you within 24 hours.</p>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-6" style={{ border: "1px solid #e8f0eb" }}>
              <div className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: "#0B5D3B" }}>Why YETP?</div>
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-2.5 py-1.5 text-sm" style={{ color: "#444" }}>
                  <div className="grid size-5 shrink-0 place-items-center rounded-full" style={{ background: "#f0f9f4" }}>
                    <FiCheck className="size-3" style={{ color: "#0B5D3B" }} />
                  </div>
                  {b}
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-5 text-center" style={{ background: "#073d27" }}>
              <div className="text-xs text-white/50 mb-1">Help & Support</div>
              <a href="tel:+923029898082" className="block font-bold text-white hover:text-[#C9A227]">0302-9898082</a>
              <a href="tel:+923249881887" className="block text-sm text-white/60 hover:text-white mt-0.5">0324-9881887</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
