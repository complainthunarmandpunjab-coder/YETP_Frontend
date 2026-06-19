import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import logoUrl from "@/assets/yetp.png";
import { login as loginApi, forgotPassword, ApiError } from "@/lib/api/auth";
import { getProfile } from "@/lib/api/user";
import { setSession } from "@/lib/auth-session";

export const Route = createFileRoute("/candidate-login")({
  head: () => ({ meta: [{ title: "Candidate Login — YETP" }] }),
  component: CandidateLoginPage,
});

type View = "login" | "forgot";

function CandidateLoginPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [sent, setSent] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetUrl, setResetUrl] = useState("");
  const [loginError, setLoginError] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoading(true);
    try {
      const res = await loginApi({ email, password });
      setSession({ token: res.token, user: res.user });
      const profileRes = await getProfile(res.token);
      const types: string[] = profileRes.data.user.admissionType ?? [];
      const isPhysical = types.includes("physical") && !types.includes("online");
      const testDone = profileRes.data.user.testScore !== null;
      if (isPhysical || testDone) {
        navigate({ to: "/admission-result" });
      } else {
        navigate({ to: "/admission-test" });
      }
    } catch (err) {
      setLoginError(err instanceof ApiError ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    setForgotError("");
    setLoading(true);
    try {
      const res = await forgotPassword(forgotEmail);
      setResetUrl(res.resetUrl || "");
      setSent(true);
    } catch (err) {
      setForgotError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        .login-outer {
          background-color: #052b1c;
          background-image: url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000&auto=format&fit=crop');
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
          background: linear-gradient(to bottom, rgba(5,43,28,0.7), rgba(3,24,15,0.85));
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

        /* ══ Responsive ≤ 860px ══ */
        @media (max-width: 860px) {
          .login-outer {
            padding: 0;
            background: #ffffff;
            background-image: none !important;
            display: block;
          }
          .login-overlay { display: none; }
          
          .login-inner {
            flex-direction: column;
            flex-wrap: nowrap !important;
            align-items: stretch !important;
            gap: 0;
            min-height: 100vh;
            height: auto;
            max-width: 100%;
          }
          
          .login-left {
            position: relative;
            flex: 1 !important;
            width: 100% !important;
            padding: 90px 20px 32px !important;
            background-image: url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000&auto=format&fit=crop');
            background-size: cover;
            background-position: center top;
            max-width: 100% !important;
            justify-content: center !important;
          }
          .login-left::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(5,43,28,0.5) 0%, rgba(3,24,15,0.8) 50%, rgba(5,19,11,0.95) 100%);
            z-index: 1;
          }
          .login-left > * { position: relative; z-index: 2; }
          
          .login-left img { 
            width: 70px !important; height: 70px !important; 
            margin-bottom: 12px !important; border-width: 2px !important; 
          }
          .login-left h1 { font-size: 1.8rem !important; margin-bottom: 8px !important; }
          .login-left p { font-size: 0.83rem !important; max-width: 300px !important; }

          .login-card {
            max-width: 100%;
            border-radius: 30px 30px 0 0;
            background: #ffffff;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            padding: 32px 24px 50px;
            border: none;
            border-top: 1px solid #e2e8f0;
            box-shadow: 0 -12px 40px rgba(0,0,0,0.08);
          }
          .login-card h2 { color: #0f172a; font-size: 1.45rem; }
          .login-card .subtitle { color: #64748b; margin-bottom: 24px; }
          
          .login-label { color: #475569; font-weight: 700; }
          .login-input { 
            background: #ffffff;
            border: 1px solid #cbd5e1;
            color: #0f172a;
          }
          .login-input:focus {
            border-color: #0B5D3B;
            background: #ffffff;
          }
          .login-input::placeholder { color: #94a3b8; }
          
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-text-fill-color: #0f172a !important;
            transition: background-color 5000s ease-in-out 0s !important;
          }

          .login-btn {
            background: #0B5D3B;
            color: #ffffff;
            padding: 14px 16px;
          }
          .login-row label { color: #64748b !important; }
          .login-row button { color: #0B5D3B !important; }
        }
        
        /* ── Small mobile ≤ 420px ══ */
        @media (max-width: 420px) {
          .login-left { padding: 80px 16px 28px !important; }
          .login-left img { width: 60px !important; height: 60px !important; }
          .login-left h1 { font-size: 1.6rem !important; }
          .login-left p { font-size: 0.80rem !important; }
          .login-card { padding: 28px 18px 46px; border-radius: 24px 24px 0 0; }
          .login-card h2 { font-size: 1.3rem; }
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
              <form className="login-form" onSubmit={handleLogin}>

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

                {loginError && <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#ff8a8a", margin: 0 }}>{loginError}</p>}

                <button type="submit" className="login-btn" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Logging in..." : "Log in"}
                </button>

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
                    {resetUrl ? (
                      <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.6, marginBottom: 20, wordBreak: "break-all" }}>
                        Email isn't wired up yet (dev mode) — use this link directly:<br />
                        <a href={resetUrl} style={{ color: "white", fontWeight: 700 }}>{resetUrl}</a>
                      </p>
                    ) : (
                      <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.6, marginBottom: 20 }}>
                        Reset instructions sent to <strong style={{ color: "white" }}>{forgotEmail}</strong>. Check your inbox.
                      </p>
                    )}
                    <button onClick={() => { setView("login"); setSent(false); setForgotEmail(""); setResetUrl(""); }}
                      style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.75)", background: "none", border: "none", cursor: "pointer" }}>
                      ← Back to Login
                    </button>
                  </div>
                ) : (
                  <form className="login-form" onSubmit={handleForgot}>
                    <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0 }}>
                      Enter your registered email and we'll send you a link to reset your password.
                    </p>
                    <div>
                      <label className="login-label">Registered E-mail</label>
                      <input className="login-input" type="email" required value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="Enter your e-mail" />
                    </div>
                    {forgotError && <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#ff8a8a", margin: 0 }}>{forgotError}</p>}
                    <button type="submit" className="login-btn" disabled={loading}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: loading ? 0.7 : 1 }}>
                      {loading ? "Sending..." : "Send Reset Link"} <FiArrowRight size={15} />
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
