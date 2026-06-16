import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import logoUrl from "@/assets/yetp.png";

export const Route = createFileRoute("/candidate-login")({
  head: () => ({ meta: [{ title: "Candidate Login — YETP" }] }),
  component: CandidateLoginPage,
});

type View = "login" | "forgot";

function CandidateLoginPage() {
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [sent, setSent] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  return (
    <>
      <style>{`
        .login-outer {
          background-color: #052b1c;
          background-image: url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          width: 100%;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 110px 40px 60px 40px;
          box-sizing: border-box;
          min-height: 100vh;
        }
        .login-overlay {
          position: absolute;
          inset: 0;
          background: rgba(2, 24, 15, 0.68);
          pointer-events: none;
        }
        .login-inner {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1080px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
          flex-wrap: wrap;
        }
        .login-left h1 {
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 300;
          line-height: 1.2;
          margin: 0 0 18px 0;
          color: #ffffff !important;
          text-shadow: 0 2px 20px rgba(0,0,0,0.8);
          letter-spacing: 0.5px;
        }
        .login-left p {
          font-size: 1rem;
          color: #ffffff !important;
          line-height: 1.7;
          max-width: 400px;
          text-shadow: 0 1px 10px rgba(0,0,0,0.7);
          margin: 0;
          text-align: center;
        }
        .login-card {
          width: 100%;
          max-width: 400px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 18px;
          padding: 32px 34px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.45);
          flex-shrink: 0;
          box-sizing: border-box;
        }
        .login-card h2 {
          font-size: 1.6rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 4px 0;
        }
        .login-card .subtitle {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.65);
          margin: 0 0 22px 0;
        }
        .login-form { display: flex; flex-direction: column; gap: 15px; }
        .login-label {
          display: block;
          font-size: 0.71rem;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          margin-bottom: 5px;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }
        .login-input {
          width: 100%;
          box-sizing: border-box;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 9px;
          padding: 11px 14px;
          font-size: 0.85rem;
          color: white;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .login-input:focus {
          border-color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.14);
        }
        .login-input::placeholder { color: rgba(255,255,255,0.35); }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          transition: background-color 5000s ease-in-out 0s !important;
          -webkit-text-fill-color: white !important;
        }
        .login-btn {
          width: 100%;
          background: white;
          color: #052b1c;
          border: none;
          border-radius: 9px;
          padding: 13px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 6px;
          transition: opacity 0.2s;
        }
        .login-btn:hover { opacity: 0.9; }
        .login-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      `}</style>

      <div className="login-outer">
        <div className="login-overlay" />
        <div className="login-inner">

          {/* Left */}
          <div className="login-left" style={{ flex: 1, minWidth: 260, maxWidth: 480, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <img
              src={logoUrl}
              alt="YETP"
              style={{
                width: 110, height: 110,
                objectFit: "cover",
                borderRadius: "50%",
                marginBottom: 22,
                border: "3px solid rgba(201,162,39,0.8)",
                display: "block",
              }}
            />
            <h1>Welcome to<br />YETP Portal</h1>
            <p>Official Candidate Portal. Access your dashboard, track your applications, and manage your learning journey with the Government of Punjab.</p>
          </div>

          {/* Card */}
          <div className="login-card">
            <h2>Welcome back</h2>
            <p className="subtitle">
              {view === "login" ? "Please enter your details." : "Reset your portal password."}
            </p>

            {/* LOGIN */}
            {view === "login" && (
              <form className="login-form"
                onSubmit={(e) => { e.preventDefault(); window.open("https://lms.yetp.pk", "_blank"); }}>

                <div>
                  <label className="login-label">E-mail</label>
                  <input className="login-input" type="email" required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your e-mail" />
                </div>

                <div>
                  <label className="login-label">Password</label>
                  <div style={{ position: "relative" }}>
                    <input className="login-input"
                      type={showPass ? "text" : "password"} value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{ paddingRight: 40, letterSpacing: "0.15em" }} />
                    <button type="button" onClick={() => setShowPass((s) => !s)}
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", display: "flex", padding: 0 }}>
                      {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="login-row" style={{ marginTop: 2 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "0.75rem", color: "rgba(255,255,255,0.75)", cursor: "pointer" }}>
                    <input type="checkbox" style={{ accentColor: "#0B5D3B", width: 13, height: 13 }} />
                    Remember me
                  </label>
                  <button type="button" onClick={() => setView("forgot")}
                    style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.75)", background: "none", border: "none", cursor: "pointer" }}>
                    Forgot your password?
                  </button>
                </div>

                <button type="submit" className="login-btn">Log in</button>

                <p style={{ textAlign: "center", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", margin: "4px 0 0" }}>
                  Don't have an account?{" "}
                  <a href="/enroll?view=register" style={{ color: "white", fontWeight: 700 }}>Register here</a>
                </p>
              </form>
            )}

            {/* FORGOT */}
            {view === "forgot" && (
              <>
                {sent ? (
                  <div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: 8 }}>Email Sent!</div>
                    <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.6, marginBottom: 20 }}>
                      Reset instructions sent to <strong style={{ color: "white" }}>{forgotEmail}</strong>. Check your inbox.
                    </p>
                    <button onClick={() => { setView("login"); setSent(false); setForgotEmail(""); }}
                      style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.75)", background: "none", border: "none", cursor: "pointer" }}>
                      ← Back to Login
                    </button>
                  </div>
                ) : (
                  <form className="login-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                    <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0 }}>
                      Enter your registered email and we'll send you a link to reset your password.
                    </p>
                    <div>
                      <label className="login-label">Registered E-mail</label>
                      <input className="login-input" type="email" required value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="Enter your e-mail" />
                    </div>
                    <button type="submit" className="login-btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      Send Reset Link <FiArrowRight size={15} />
                    </button>
                    <button type="button" onClick={() => setView("login")}
                      style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.75)", background: "none", border: "none", cursor: "pointer", textAlign: "center" }}>
                      ← Back to Login
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
