import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FiArrowRight, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import logoUrl from "@/assets/logo-yetp.png";

export const Route = createFileRoute("/candidate-login")({
  head: () => ({ meta: [{ title: "Candidate Login — YETP" }] }),
  component: CandidateLoginPage,
});

type View = "login" | "forgot";

function CandidateLoginPage() {
  const [view, setView]     = useState<View>("login");
  const [email, setEmail]   = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [sent, setSent]     = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #052b1c 0%, #0B5D3B 60%, #094831 100%)",
        paddingTop: 80,
      }}
    >
      <div className="w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl bg-white">

        {/* Green header */}
        <div
          className="flex flex-col items-center py-6 px-8 text-white"
          style={{ background: "linear-gradient(160deg, #052b1c 0%, #0B5D3B 100%)" }}
        >
          <img
            src={logoUrl} alt="YETP"
            className="size-14 rounded-full object-contain mb-3"
            style={{ border: "2px solid #C9A227", padding: 2, background: "rgba(255,255,255,0.1)" }}
          />
          <div className="font-display text-lg font-extrabold text-white">YETP Admission Portal</div>
          <div className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
            {view === "login" ? "Candidate Login" : "Reset Your Password"}
          </div>
        </div>

        {/* Form area */}
        <div className="px-8 py-6">

          {/* ── LOGIN VIEW ── */}
          {view === "login" && (
            <>
              <form
                onSubmit={(e) => { e.preventDefault(); window.open("https://lms.yetp.pk", "_blank"); }}
                className="space-y-4"
              >
                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#666" }}>
                    Email / Username
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                      <FiMail className="size-4" style={{ color: "#0B5D3B" }} />
                    </div>
                    <input
                      type="email" required value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border bg-white py-2.5 pl-10 pr-4 text-sm outline-none"
                      style={{ border: "1.5px solid #e0ede7" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(11,93,59,0.1)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#e0ede7"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#666" }}>
                    Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                      <FiLock className="size-4" style={{ color: "#0B5D3B" }} />
                    </div>
                    <input
                      type={showPass ? "text" : "password"} value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-lg border bg-white py-2.5 pl-10 pr-10 text-sm outline-none"
                      style={{ border: "1.5px solid #e0ede7" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(11,93,59,0.1)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#e0ede7"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                    <button
                      type="button" onClick={() => setShowPass((s) => !s)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5"
                    >
                      {showPass
                        ? <FiEyeOff className="size-4" style={{ color: "#999" }} />
                        : <FiEye className="size-4" style={{ color: "#999" }} />}
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: "#888" }}>
                    <input type="checkbox" className="size-3.5" style={{ accentColor: "#0B5D3B" }} />
                    Remember me
                  </label>
                  <button
                    type="button" onClick={() => setView("forgot")}
                    className="text-xs font-semibold hover:underline" style={{ color: "#0B5D3B" }}
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-extrabold text-white transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(90deg, #073d27, #0B5D3B)" }}
                >
                  Login <FiArrowRight />
                </button>
              </form>

              <p className="mt-5 text-center text-xs" style={{ color: "#bbb" }}>
                Don't have an account?{" "}
                <a href="/enroll" className="font-bold hover:underline" style={{ color: "#0B5D3B" }}>
                  Register Here
                </a>
              </p>

              <a
                href="/enroll"
                className="mt-3 flex w-full items-center justify-center gap-1.5 text-xs font-semibold transition-colors hover:text-[#0B5D3B] hover:underline"
                style={{ color: "#999" }}
              >
                ← Back to Portal
              </a>
            </>
          )}

          {/* ── FORGOT VIEW ── */}
          {view === "forgot" && (
            <>
              {sent ? (
                <div className="flex flex-col items-center text-center py-4">
                  <div
                    className="grid size-14 place-items-center rounded-full text-white mb-4"
                    style={{ background: "#0B5D3B" }}
                  >
                    <FiMail className="size-6" />
                  </div>
                  <div className="font-display text-base font-extrabold" style={{ color: "#073d27" }}>Email Sent!</div>
                  <p className="mt-1 text-xs leading-relaxed mb-5" style={{ color: "#888" }}>
                    Password reset instructions sent to <strong>{forgotEmail}</strong>. Check your inbox.
                  </p>
                  <button
                    onClick={() => { setView("login"); setSent(false); setForgotEmail(""); }}
                    className="flex items-center gap-1.5 text-xs font-semibold hover:text-[#0B5D3B] hover:underline transition-colors"
                    style={{ color: "#999" }}
                  >
                    ← Back to Login
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  className="space-y-4"
                >
                  <p className="text-xs leading-relaxed" style={{ color: "#888" }}>
                    Enter your registered email and we'll send you a link to reset your password.
                  </p>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#666" }}>
                      Registered Email
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                        <FiMail className="size-4" style={{ color: "#0B5D3B" }} />
                      </div>
                      <input
                        type="email" required value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-lg border bg-white py-2.5 pl-10 pr-4 text-sm outline-none"
                        style={{ border: "1.5px solid #e0ede7" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(11,93,59,0.1)"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "#e0ede7"; e.currentTarget.style.boxShadow = "none"; }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-extrabold text-white transition-opacity hover:opacity-90"
                    style={{ background: "linear-gradient(90deg, #073d27, #0B5D3B)" }}
                  >
                    Send Reset Link <FiArrowRight />
                  </button>

                  <button
                    type="button" onClick={() => setView("login")}
                    className="flex w-full items-center justify-center gap-1.5 text-xs font-semibold transition-colors hover:text-[#0B5D3B] hover:underline"
                    style={{ color: "#999" }}
                  >
                    ← Back to Login
                  </button>
                </form>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
