import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  FiCheck, FiAlertCircle, FiCopy, FiDownload,
  FiArrowRight, FiFileText, FiCreditCard, FiUser, FiAward,
} from "react-icons/fi";
import { courses as yetp_courses } from "@/data/yetp";
import { getProfile, generateChallan, type Profile, type ChallanInfo } from "@/lib/api/user";
import { getSession } from "@/lib/auth-session";
import { API_URL } from "@/lib/api/auth";
import logoUrl from "@/assets/yetp.png";

export const Route = createFileRoute("/admission-result")({
  head: () => ({ meta: [{ title: "Admission Result — YETP" }] }),
  component: AdmissionResultPage,
});

const PAYMENT_DEADLINE = "July 31, 2026";
const FEE_AMOUNT = "PKR 3,250";
type PayMethod = "psid" | "challan";
type SubTab = "banking" | "jazzcash" | "easypaisa";

const paymentSteps: Record<SubTab, string[]> = {
  banking: [
    "Open your bank's mobile app (HBL, Meezan, UBL, Bank Alfalah, etc.)",
    "Log in with your credentials (MPIN, fingerprint, or face ID)",
    'Go to "Bill Payments" or "Payments"',
    'Select "1Bill" under "Add Biller" or "Pay Bill"',
    "Enter your Consumer Number / PSID shown below",
    "Verify the name, amount and service details",
    'Tap "Pay" or "Confirm" and enter your PIN / OTP',
    "Save the confirmation receipt or SMS",
  ],
  jazzcash: [
    "Open the JazzCash mobile app",
    "Log in with your JazzCash credentials",
    'Tap "Pay Bills" from the home screen',
    'Select "1Bill" from the biller list',
    "Enter your Consumer Number / PSID shown below",
    "Verify the bill details displayed",
    "Enter your MPIN to confirm payment",
    "Receive SMS confirmation of your payment",
  ],
  easypaisa: [
    "Open the EasyPaisa mobile app",
    "Log in with your EasyPaisa account",
    'Tap "Bill Payments" from the main menu',
    'Select "1Bill" as the biller',
    "Enter your Consumer Number / PSID shown below",
    "Review the amount and beneficiary details",
    "Confirm payment using your MPIN or OTP",
    "Save or screenshot the confirmation for your records",
  ],
};

export default function AdmissionResultPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [challans, setChallans] = useState<ChallanInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingScore, setProcessingScore] = useState(false);
  const [activePayMethod, setActivePayMethod] = useState<PayMethod>("psid");
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("banking");
  const [copied, setCopied] = useState(false);
  const [generatingPsid, setGeneratingPsid] = useState(false);

  useEffect(() => {
    // Warm up Render backend immediately so Generate PSID button is instant
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}),
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const session = getSession();
    if (!session) { navigate({ to: "/candidate-login" }); return; }

    const poll = (retries = 0) => {
      getProfile(session.token)
        .then((res) => {
          const user = res.data.user;
          const existingChallans = res.data.challans?.challans ?? [];

          // If score not yet saved but we know it's pending, retry for up to 30s
          const pending = sessionStorage.getItem("yetp_pending_score");
          if (user.testScore === null && pending && retries < 10) {
            setProcessingScore(true);
            setTimeout(() => poll(retries + 1), 3000);
            return;
          }
          sessionStorage.removeItem("yetp_pending_score");
          setProcessingScore(false);
          setProfile(user);
          setChallans(existingChallans);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };
    poll();
  }, [navigate]);

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleGeneratePsid() {
    const session = getSession();
    if (!session) return;
    setGeneratingPsid(true);
    try {
      await generateChallan(session.token);
      const updated = await getProfile(session.token);
      setChallans(updated.data.challans?.challans ?? []);
    } catch {/* ignore */} finally {
      setGeneratingPsid(false);
    }
  }

  if (loading || processingScore) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f7f5", paddingTop: 90 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 48, height: 48, border: "4px solid #e8f0eb", borderTop: "4px solid #0B5D3B", borderRadius: "50%", animation: "spin 0.9s linear infinite", margin: "0 auto 14px" }} />
          <div style={{ color: "#0B5D3B", fontWeight: 700, fontSize: 15 }}>
            {processingScore ? "Saving your results..." : "Loading your results..."}
          </div>
          {processingScore && <div style={{ color: "#aaa", fontSize: 12, marginTop: 6 }}>This may take a few seconds</div>}
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  const testScore = profile?.testScore ?? 0;
  const testTaken = profile?.testScore !== null && profile?.testScore !== undefined;
  const testPassed = profile?.testPassed ?? false;
  const totalMcqs = 20;
  const correctAnswers = Math.round((testScore / 100) * totalMcqs);
  const challan = challans[0] ?? null;
  const isPhysical = (profile?.admissionType ?? []).includes("physical") &&
                     !(profile?.admissionType ?? []).includes("online");

  // Always produce a correct 15-digit PSID regardless of what's stored
  const psidDisplay = challan
    ? (() => {
        const stored = challan.psid;
        if (stored && stored.length === 15) return stored;
        const idStr = String(challan.challanId);
        // Sequential ID (≤8 digits): pad to 8. Timestamp ID (>8 digits): take last 8.
        const part = idStr.length <= 8 ? idStr.padStart(8, "0") : idStr.slice(-8);
        return "1000000" + part;
      })()
    : null;

  // Online students who haven't taken test yet
  if (!testTaken && !isPhysical) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f7f5", padding: "90px 16px 40px" }}>
        <div style={{ width: "100%", maxWidth: 400, background: "#fff", borderRadius: 20, padding: "36px 32px", textAlign: "center", border: "1px solid #e8f0eb", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <FiAlertCircle style={{ width: 44, height: 44, color: "#C9A227", margin: "0 auto 14px" }} />
          <h2 style={{ fontWeight: 800, fontSize: "1.1rem", color: "#073d27", margin: "0 0 8px" }}>Test Not Attempted</h2>
          <p style={{ fontSize: 13, color: "#888", margin: "0 0 22px", lineHeight: 1.6 }}>You haven't taken the admission test yet. Complete the test to view your results.</p>
          <a href="/admission-test" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0B5D3B", color: "#fff", padding: "11px 22px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
            Start Test Now <FiArrowRight />
          </a>
        </div>
      </div>
    );
  }

  // Online students who failed
  if (!testPassed && !isPhysical) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f7f5", padding: "90px 16px 40px" }}>
        <div style={{ width: "100%", maxWidth: 400, background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #e8f0eb", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <div style={{ background: "linear-gradient(135deg, #7b1c1c, #c0392b)", padding: "24px 28px", textAlign: "center" }}>
            <FiAlertCircle style={{ width: 40, height: 40, color: "#fff", margin: "0 auto 10px" }} />
            <h2 style={{ fontWeight: 800, fontSize: "1.15rem", color: "#fff", margin: "0 0 4px" }}>Test Not Passed</h2>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", margin: 0 }}>You need 40% or above to qualify</p>
          </div>
          <div style={{ padding: "24px 28px", textAlign: "center" }}>
            <div style={{ display: "inline-flex", gap: 20, background: "#fdf5f5", border: "1px solid #f5c6c6", borderRadius: 12, padding: "12px 24px", marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.08em" }}>Your Score</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#c0392b" }}>{testScore}%</div>
              </div>
              <div style={{ width: 1, background: "#f0c0c0" }} />
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.08em" }}>Required</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#888" }}>40%</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#888", margin: "0 0 20px", lineHeight: 1.6 }}>
              You scored <strong style={{ color: "#c0392b" }}>{correctAnswers} out of {totalMcqs}</strong> questions correctly. You can retake the test to qualify.
            </p>
            <a href="/admission-test" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0B5D3B", color: "#fff", padding: "11px 22px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              Retake Test <FiArrowRight />
            </a>
          </div>
        </div>
      </div>
    );
  }

  const pageRespCss = `
    .ar-score-strip { display:inline-flex; align-items:center; gap:24px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); border-radius:100px; padding:10px 28px; backdrop-filter:blur(8px); }
    .ar-deadline { background:#fffbf0; border:1px solid #f0c040; border-radius:14px; padding:14px 22px; margin-bottom:20px; display:flex; align-items:center; flex-wrap:wrap; gap:10px; }
    .ar-deadline-right { margin-left:auto; display:flex; align-items:center; gap:8px; }
    .ar-pay-footer { display:flex; align-items:center; justify-content:space-between; padding:14px 24px; border-top:1px solid #f0f4f1; }
    .ar-paid-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px; }
    @media (max-width:480px) {
      .ar-score-strip { gap:16px; padding:8px 16px; }
      .ar-score-strip .ar-sep { display:none; }
      .ar-deadline { flex-direction:column; align-items:flex-start; gap:6px; }
      .ar-deadline-right { margin-left:0; }
      .ar-pay-footer { flex-direction:column; align-items:flex-start; gap:8px; padding:12px 16px; }
      .ar-paid-grid { grid-template-columns:1fr; }
    }
  `;

  return (
    <div style={{ background: "#f0f4f1", minHeight: "100vh", paddingBottom: 60, fontFamily: "'Outfit', 'Poppins', sans-serif" }}>
      <style>{pageRespCss}</style>

      {/* ══ HERO BANNER ══ */}
      <div style={{ background: "linear-gradient(135deg, #052b1c 0%, #0B5D3B 100%)", borderBottom: "4px solid #C9A227", padding: "28px 24px", paddingTop: "calc(90px + 28px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(201,162,39,0.18)", border: "2px solid rgba(201,162,39,0.6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <FiAward style={{ width: 32, height: 32, color: "#C9A227" }} />
          </div>

          {isPhysical ? (
            <>
              <h1 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(1.4rem,3.5vw,2rem)", margin: "0 0 12px", lineHeight: 1.3 }}>
                Congratulations!<br />Your Application Has Been Submitted
              </h1>
              <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 14, margin: "0 0 16px", lineHeight: 1.6 }}>
                You have successfully applied for <strong style={{ color: "#C9A227" }}>Physical / Onsite</strong> enrollment at YETP.<br />
                Complete your application fee payment to confirm your seat.
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 100, padding: "8px 22px" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C9A227" }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Status: Application Received</span>
              </div>
            </>
          ) : (
            <>
              <h1 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(1.4rem,3.5vw,2rem)", margin: "0 0 12px", lineHeight: 1.3 }}>
                Congratulations! You've Passed<br />the Admission Test
              </h1>
              <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 14, margin: "0 0 16px", lineHeight: 1.6 }}>
                You are now eligible for the YETP Scholarship Card.<br />
                Complete your application fee payment to confirm your seat.
              </p>
              <div className="ar-score-strip">
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Score</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#C9A227", lineHeight: 1.2 }}>{testScore}%</div>
                </div>
                <div className="ar-sep" style={{ width: 1, height: 32, background: "rgba(255,255,255,0.2)" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Correct</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>{correctAnswers}/{totalMcqs}</div>
                </div>
                <div className="ar-sep" style={{ width: 1, height: 32, background: "rgba(255,255,255,0.2)" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Result</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", background: "#0B5D3B", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "2px 14px", lineHeight: 1.8 }}>PASS</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ══ CONTENT ══ */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "36px 16px 0" }}>

        {/* Row 1: Student card + Benefits + Courses — hidden for physical students */}
        {!isPhysical && <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 20 }}>

          {/* Student info */}
          <div style={{ background: "#fff", borderRadius: 18, overflow: "hidden", border: "1px solid #e4ede8", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ background: "#0B5D3B", padding: "14px 20px", display: "flex", alignItems: "center", gap: 8 }}>
              <FiUser style={{ color: "#C9A227", width: 15, height: 15 }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase" }}>Student Result Card</span>
            </div>
            <div style={{ padding: "4px 0" }}>
              {[
                { label: "Student Name", value: profile?.fullName || "—" },
                { label: "Roll Number", value: profile?.rollNumber || "—" },
                { label: "Total MCQs", value: String(totalMcqs) },
                { label: "Marks Obtained", value: String(correctAnswers) },
                { label: "Percentage", value: `${testScore}%` },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "11px 20px", borderBottom: "1px solid #f3f7f4", background: i % 2 === 0 ? "#fafdfc" : "#fff" }}>
                  <span style={{ fontSize: 13, color: "#666", fontWeight: 500 }}>{row.label}</span>
                  <span style={{ fontSize: 13, color: "#073d27", fontWeight: 700 }}>{row.value}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 20px" }}>
                <span style={{ fontSize: 13, color: "#666", fontWeight: 500 }}>Result</span>
                <span style={{ background: "#0B5D3B", color: "#fff", padding: "3px 16px", borderRadius: 100, fontSize: 11, fontWeight: 800 }}>PASS</span>
              </div>
            </div>
          </div>

          {/* Benefits + Programs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#fff", borderRadius: 18, padding: "18px 20px", border: "1px solid #e4ede8", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#C9A227", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>⚡ Scholarship Card Benefits</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {["Access to Advanced IT Courses", "Laptop Scheme Eligibility", "Hands-On Global Curriculum", "Career Guidance & Freelancing", "Guaranteed Internship"].map((b) => (
                  <li key={b} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#073d27", fontWeight: 500 }}>
                    <FiCheck style={{ color: "#0B5D3B", width: 13, height: 13, flexShrink: 0 }} />{b}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: "#fff", borderRadius: 18, padding: "18px 20px", border: "1px solid #e4ede8", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#0B5D3B", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Selected Programs</div>
              {(profile?.courses ?? []).length > 0 ? (
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 7 }}>
                  {profile!.courses.map((slug, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#073d27", fontWeight: 600 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A227", flexShrink: 0 }} />
                      {yetp_courses.find((c) => c.slug === slug)?.title || slug}
                    </li>
                  ))}
                </ul>
              ) : <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>No courses selected</p>}
            </div>
          </div>
        </div>}

        {/* Fee deadline banner */}
        <div className="ar-deadline">
          <div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#5a3e00" }}>⏰ Last Date to Pay Processing Fee: </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>{PAYMENT_DEADLINE}</span>
          </div>
          <div className="ar-deadline-right">
            <span style={{ fontSize: 14, fontWeight: 800, color: "#0B5D3B" }}>{FEE_AMOUNT}</span>
            <span style={{ fontSize: 11, fontWeight: 800, padding: "3px 12px", borderRadius: 100, background: challan?.paid ? "#0B5D3B" : "#f0c040", color: challan?.paid ? "#fff" : "#5a3e00" }}>
              {challan?.paid ? "✓ PAID" : "PENDING"}
            </span>
          </div>
        </div>

        {/* Payment Card */}
        <div style={{ background: "#fff", borderRadius: 18, overflow: "hidden", border: `1px solid ${challan?.paid ? "#c8e6d4" : "#e4ede8"}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>

          {/* Header */}
          <div style={{ padding: "20px 24px 18px", borderBottom: "1px solid #f0f4f1", background: challan?.paid ? "linear-gradient(90deg, #073d27, #0B5D3B)" : "#fff" }}>
            {challan?.paid ? (
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <FiCheck style={{ width: 22, height: 22, color: "#C9A227" }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontWeight: 800, fontSize: "1rem", color: "#fff" }}>Application Fee Paid</h3>
                  <p style={{ margin: "3px 0 0", fontSize: 12, color: "rgba(255,255,255,0.65)" }}>
                    Your seat has been confirmed · Amount paid: <strong style={{ color: "#C9A227" }}>{FEE_AMOUNT}</strong>
                  </p>
                </div>
              </div>
            ) : (
              <>
                <h3 style={{ margin: 0, fontWeight: 800, fontSize: "1.05rem", color: "#073d27" }}>Pay Application Processing Fee</h3>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "#888" }}>
                  One step away from confirming your Scholarship Card · Fee: <strong style={{ color: "#0B5D3B" }}>{FEE_AMOUNT}</strong>
                </p>
              </>
            )}
          </div>

          {/* If fee is paid — show confirmation details instead of payment options */}
          {challan?.paid && (
            <div style={{ padding: "22px 24px" }}>
              <div className="ar-paid-grid">
                {[
                  { label: "Challan ID", value: challan.challanId },
                  { label: "Amount Paid", value: `Rs. ${challan.amount}` },
                  { label: "Transaction ID", value: challan.txnId ? String(challan.txnId) : "—" },
                  { label: "Branch Code", value: challan.branchCode ? String(challan.branchCode) : "—" },
                ].map((row, i) => (
                  <div key={i} style={{ background: "#f8fdf9", borderRadius: 10, padding: "12px 14px", border: "1px solid #e4ede8" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase" as const, letterSpacing: "0.07em", marginBottom: 4 }}>{row.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#073d27" }}>{row.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#f0f9f4", border: "1px solid #c8e6d4", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#073d27", display: "flex", alignItems: "center", gap: 10 }}>
                <FiCheck style={{ width: 16, height: 16, color: "#0B5D3B", flexShrink: 0 }} />
                Your enrollment is <strong style={{ color: "#0B5D3B" }}> confirmed</strong>. You will receive further details via email.
              </div>
            </div>
          )}

          {/* Method toggle + Instructions — only if NOT paid */}
          {!challan?.paid && (<>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, padding: "16px 16px 14px", borderBottom: "1px solid #f0f4f1" }}>
              {([
                { key: "psid" as PayMethod, Icon: FiCreditCard, title: "PSID / Consumer No.", sub: "Pay via JazzCash, EasyPaisa or banking app (1Bill)" },
                { key: "challan" as PayMethod, Icon: FiFileText, title: "Bank Challan (BOP)", sub: "Download & pay at any Bank of Punjab branch" },
              ]).map(({ key, Icon, title, sub }) => (
                <button key={key} type="button" onClick={() => setActivePayMethod(key)}
                  style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", borderRadius: 12, border: `2px solid ${activePayMethod === key ? "#0B5D3B" : "#e4ede8"}`, background: activePayMethod === key ? "#f0f9f4" : "#fafcfb", cursor: "pointer", textAlign: "left", transition: "all 0.18s" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: activePayMethod === key ? "#0B5D3B" : "#f0f4f1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon style={{ width: 16, height: 16, color: activePayMethod === key ? "#fff" : "#0B5D3B" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#073d27" }}>{title}</div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 2, lineHeight: 1.4 }}>{sub}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Instructions */}
            <div style={{ padding: "16px 14px 20px" }}>

            {activePayMethod === "psid" && (
              <>
                {/* Sub-tabs */}
                <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                  {(["banking", "jazzcash", "easypaisa"] as SubTab[]).map((tab) => (
                    <button key={tab} type="button" onClick={() => setActiveSubTab(tab)}
                      style={{ padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: `1px solid ${activeSubTab === tab ? "#0B5D3B" : "#e4ede8"}`, background: activeSubTab === tab ? "#0B5D3B" : "#fff", color: activeSubTab === tab ? "#fff" : "#555", transition: "all 0.15s" }}>
                      {tab === "banking" ? "Banking App" : tab === "jazzcash" ? "JazzCash" : "EasyPaisa"}
                    </button>
                  ))}
                </div>

                <ol style={{ margin: "0 0 20px", padding: 0, listStyle: "none", background: "#f9fcfa", borderRadius: 12, border: "1px solid #e8f2ec", overflow: "hidden" }}>
                  {paymentSteps[activeSubTab].map((step, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "11px 18px", borderBottom: i < paymentSteps[activeSubTab].length - 1 ? "1px solid #eef4f0" : "none", fontSize: 13, color: "#444" }}>
                      <span style={{ minWidth: 22, height: 22, borderRadius: "50%", background: "#0B5D3B", color: "#fff", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1, flexShrink: 0 }}>{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>

                {challan ? (
                  <>
                    <div style={{ background: "linear-gradient(135deg, #f0f9f4, #e8f5ee)", border: "1.5px solid #0B5D3B", borderRadius: 14, padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 800, color: "#888", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Your PSID / Consumer Number</div>
                        <div style={{ fontSize: "clamp(18px, 4.5vw, 26px)", fontWeight: 900, color: "#0B5D3B", letterSpacing: "0.06em", wordBreak: "break-all", fontVariantNumeric: "tabular-nums" }}>{psidDisplay}</div>
                      </div>
                      <button type="button" onClick={() => handleCopy(psidDisplay ?? "")}
                        style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 10, border: "1.5px solid #0B5D3B", background: copied ? "#0B5D3B" : "#fff", color: copied ? "#fff" : "#0B5D3B", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.18s" }}>
                        <FiCopy style={{ width: 13, height: 13 }} />{copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <button disabled style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 10, border: "none", background: "#0B5D3B", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "not-allowed", opacity: 0.75, width: "100%", justifyContent: "center" }}>
                      <FiCheck style={{ width: 15, height: 15 }} /> PSID Already Generated
                    </button>
                  </>
                ) : (
                  <button type="button" onClick={handleGeneratePsid} disabled={generatingPsid}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "13px 22px", borderRadius: 10, border: "none", background: generatingPsid ? "#aaa" : "#0B5D3B", color: "#fff", fontWeight: 800, fontSize: 14, cursor: generatingPsid ? "not-allowed" : "pointer", transition: "all 0.18s" }}>
                    <FiDownload style={{ width: 15, height: 15 }} />
                    {generatingPsid ? "Generating..." : "Generate PSID"}
                  </button>
                )}
              </>
            )}

            {activePayMethod === "challan" && (
              <>
                <ol style={{ margin: "0 0 20px", padding: 0, listStyle: "none", background: "#f9fcfa", borderRadius: 12, border: "1px solid #e8f2ec", overflow: "hidden" }}>
                  {["Download your challan PDF using the button below", "Take a printout (or show on phone at branch)", "Visit any nearest Bank of Punjab (BOP) branch", "Submit the challan to the teller with Rs. 3,250 cash", "Keep the bank-stamped copy for your records", "Payment confirmation will update within 24–48 hours"].map((step, i, arr) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "11px 18px", borderBottom: i < arr.length - 1 ? "1px solid #eef4f0" : "none", fontSize: 13, color: "#444" }}>
                      <span style={{ minWidth: 22, height: 22, borderRadius: "50%", background: "#0B5D3B", color: "#fff", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1, flexShrink: 0 }}>{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>

                {challan ? (
                  <a href={`${API_URL}/uploads/challan-${challan.challanId}.pdf`} target="_blank" rel="noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, background: "#0B5D3B", color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                    <FiDownload style={{ width: 15, height: 15 }} />Download Bank Challan
                  </a>
                ) : (
                  <div style={{ padding: "14px 18px", borderRadius: 12, background: "#f9fcfa", border: "1px dashed #c8e6d4", fontSize: 13, color: "#888" }}>
                    Your challan is being processed — please check back shortly.
                  </div>
                )}
              </>
            )}
          </div>
          </>)}

          {/* Footer */}
          <div className="ar-pay-footer">
            <span style={{ fontSize: 12, color: "#aaa" }}>
              Need help? <a href="/contact" style={{ color: "#0B5D3B", fontWeight: 700 }}>Contact Support</a>
            </span>
            <button type="button" onClick={() => navigate({ to: "/dashboard" })}
              style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#0B5D3B", background: "none", border: "none", cursor: "pointer" }}>
              Go to Dashboard <FiArrowRight style={{ width: 13, height: 13 }} />
            </button>
          </div>
        </div>

        {/* Student Card — always visible, locked until fee is paid */}
        {profile && (
          <StudentCard profile={profile} challan={challan} paid={true} />
        )}

      </div>
    </div>
  );
}

// Pre-rendered circles — canvas guarantees perfect centering, no html2canvas CSS issues
const BULLET_CIRCLES: string[] = (() => {
  if (typeof document === "undefined") return [];
  return [1, 2, 3, 4, 5].map(n => {
    const c = document.createElement("canvas");
    c.width = 80; c.height = 80;
    const ctx = c.getContext("2d")!;
    ctx.beginPath(); ctx.arc(40, 40, 37, 0, Math.PI * 2);
    ctx.fillStyle = "#0B5D3B"; ctx.fill();
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 6; ctx.stroke();
    ctx.fillStyle = "#C9A227";
    ctx.font = "bold 38px Arial"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(String(n), 40, 41);
    return c.toDataURL("image/png");
  });
})();

function StudentCard({ profile, challan, paid }: { profile: Profile; challan: ChallanInfo | null; paid: boolean }) {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const fmt = (d: Date) => d.toLocaleDateString("en-PK", { day: "2-digit", month: "long", year: "numeric" });
  const baseDate = challan?.txnDate
    ? new Date(challan.txnDate)
    : challan ? new Date(challan.createdAt)
    : profile.createdAt ? new Date(profile.createdAt)
    : new Date();

  const joinDate   = fmt(baseDate);
  const expireDate = fmt(new Date(new Date(baseDate).setFullYear(baseDate.getFullYear() + 1)));

  const formatCourse = (s: string) => s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  async function handleDownload() {
    if (!frontRef.current || !backRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      const capture = async (el: HTMLElement) => {
        const prev = { radius: el.style.borderRadius, shadow: el.style.boxShadow };
        el.style.borderRadius = "0";
        el.style.boxShadow = "none";
        const canvas = await html2canvas(el, { scale: 8, useCORS: true, backgroundColor: null, logging: false });
        el.style.borderRadius = prev.radius;
        el.style.boxShadow = prev.shadow;
        return canvas;
      };

      // Capture first — page size derived from actual rendered card, no overflow ever
      const frontCanvas = await capture(frontRef.current);
      const backCanvas  = await capture(backRef.current);

      const CW_MM = 137.5;
      const MX = 8, GAP = 6;
      const PAGE_W = MX + CW_MM + GAP + CW_MM + MX; // = 297mm
      const CH_MM = Math.max(
        CW_MM * (frontCanvas.height / frontCanvas.width),
        CW_MM * (backCanvas.height  / backCanvas.width)
      );
      const HEADER_H = 20, FOOTER_H = 8;
      const PAGE_H = Math.ceil(HEADER_H + CH_MM + FOOTER_H);
      const CARD_Y = HEADER_H;

      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [PAGE_W, PAGE_H] });

      // Background
      pdf.setFillColor(245, 248, 245);
      pdf.rect(0, 0, PAGE_W, PAGE_H, "F");

      // Top gold bar
      pdf.setFillColor(201, 162, 39);
      pdf.rect(0, 0, PAGE_W, 2.5, "F");

      // Header — perfectly centered
      const cx = PAGE_W / 2;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(7, 61, 39);
      pdf.text("YOUTH EMPOWERMENT TRAINING PROGRAM", cx, 8.5, { align: "center" });
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7.5);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Official Student Identity Card  ·  ${profile.rollNumber}`, cx, 14, { align: "center" });

      // Gold line under header
      pdf.setDrawColor(201, 162, 39);
      pdf.setLineWidth(0.4);
      pdf.line(MX, 17, PAGE_W - MX, 17);

      const R = 3; // corner radius mm
      const frontData = frontCanvas.toDataURL("image/png");
      const backData  = backCanvas.toDataURL("image/png");
      const frontX = MX, backX = MX + CW_MM + GAP;

      // Rounded clip + shadow effect for front card
      pdf.setFillColor(220, 220, 220);
      pdf.roundedRect(frontX + 0.5, CARD_Y + 0.5, CW_MM, CH_MM, R, R, "F");
      pdf.addImage(frontData, "PNG", frontX, CARD_Y, CW_MM, CH_MM);

      // Rounded clip + shadow effect for back card
      pdf.setFillColor(220, 220, 220);
      pdf.roundedRect(backX + 0.5, CARD_Y + 0.5, CW_MM, CH_MM, R, R, "F");
      pdf.addImage(backData, "PNG", backX, CARD_Y, CW_MM, CH_MM);

      // Bottom gold bar
      pdf.setFillColor(201, 162, 39);
      pdf.rect(0, PAGE_H - 2, PAGE_W, 2, "F");

      pdf.save(`YETP-StudentCard-${profile.rollNumber}.pdf`);
    } finally {
      setDownloading(false);
    }
  }

  const photoUrl = profile.photo ? `${API_URL}${profile.photo}` : null;
  const CW = 400, CH = 252;
  const cardCss = `
    .sc-wrap { overflow-x: auto; margin: 0 -16px; padding: 0 16px 16px; -webkit-overflow-scrolling: touch; }
    .sc-row  { display: flex; gap: 20px; width: max-content; }
  `;

  return (
    <div style={{ marginTop: 28, marginBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h3 style={{ margin: 0, fontWeight: 800, fontSize: "1rem", color: "#073d27" }}>Your Student ID Card</h3>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: "#888" }}>Official YETP Student Identity Card</p>
        </div>
        {paid ? (
          <button onClick={handleDownload} disabled={downloading}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 10, background: "#0B5D3B", color: "#fff", fontWeight: 700, fontSize: 13, border: "none", cursor: downloading ? "not-allowed" : "pointer", opacity: downloading ? 0.7 : 1 }}>
            <FiDownload style={{ width: 14, height: 14 }} />
            {downloading ? "Generating..." : "Download Card (PDF)"}
          </button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 10, background: "#f0f9f4", border: "1.5px solid #c8e6d4", fontSize: 12, fontWeight: 700, color: "#0B5D3B" }}>
            🔒 Pay fee to unlock
          </div>
        )}
      </div>

      <style>{cardCss}</style>
      <div className="sc-wrap">
      <div className="sc-row">

        {/* ══ FRONT ══ */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          {!paid && (
            <div style={{ position: "absolute", inset: 0, zIndex: 10, borderRadius: 10, backdropFilter: "blur(6px)", background: "rgba(7,61,39,0.55)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <div style={{ fontSize: 28 }}>🔒</div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 13 }}>Pay fee to unlock</div>
            </div>
          )}
          <div ref={frontRef} style={{ width: CW, height: CH, background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 6px 28px rgba(0,0,0,0.14)", fontFamily: "Arial,sans-serif", display: "flex", flexDirection: "column" }}>

            {/* Header */}
            <div style={{ background: "linear-gradient(135deg,#041f14 0%,#073d27 100%)", borderBottom: "3px solid #C9A227", padding: "8px 14px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", border: "2px solid #C9A227", padding: 2, background: "#fff", flexShrink: 0 }}>
                <img src={logoUrl} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} crossOrigin="anonymous" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#C9A227", fontWeight: 900, fontSize: 10.5, letterSpacing: "0.05em", textTransform: "uppercase" }}>Youth Empowerment Training Program</div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 7.5, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 1.5 }}>Student Identity Card  ·  Lahore, Pakistan</div>
              </div>
            </div>

            {/* Body */}
            <div style={{ flex: 1, display: "flex", padding: "8px 13px", gap: 12, overflow: "hidden" }}>
              {/* Photo */}
              <div style={{ flexShrink: 0 }}>
                <div style={{ padding: 2.5, background: "#C9A227", borderRadius: "5px 5px 0 0" }}>
                  <div style={{ width: 74, height: 90, background: "#eaf0eb", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 3 }}>
                    {photoUrl
                      ? <img src={photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} crossOrigin="anonymous" />
                      : <FiUser style={{ width: 30, height: 30, color: "#aaa" }} />}
                  </div>
                </div>
                <div style={{ background: "#073d27", color: "#C9A227", padding: "3px 0", borderRadius: "0 0 4px 4px", fontSize: 7, fontWeight: 900, letterSpacing: "0.04em", textAlign: "center" }}>
                  {profile.rollNumber}
                </div>
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 8.5, fontWeight: 800, color: "#073d27", textTransform: "uppercase", letterSpacing: "0.08em", paddingBottom: 2, marginBottom: 3, borderBottom: "1.5px solid #C9A227" }}>
                  Student Information
                </div>
                {[
                  { label: "Name",     value: profile.fullName },
                  { label: "Father",   value: profile.fatherName },
                  { label: "CNIC",     value: profile.cnic },
                  { label: "Mobile",   value: profile.mobile },
                  { label: "City",     value: profile.city ?? "—" },
                  ...(() => {
                    const isPhys = (profile.admissionType ?? []).includes("physical");
                    const list = isPhys
                      ? (profile.physicalCourses?.length ? profile.physicalCourses : profile.courses ?? [])
                      : (profile.courses ?? []);
                    return list.map((c, i) => ({
                      label: list.length > 1 ? `Course ${i + 1}` : "Course",
                      value: formatCourse(c),
                    }));
                  })(),
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", alignItems: "flex-start", marginBottom: 2, paddingBottom: 2, borderBottom: "1px solid #f0f5f1" }}>
                    <span style={{ color: "#0B5D3B", fontWeight: 800, fontSize: 9.5, minWidth: 42, flexShrink: 0 }}>{label}</span>
                    <span style={{ color: "#999", fontSize: 9.5, marginRight: 4, marginTop: 1 }}>:</span>
                    <span style={{ color: "#1a1a1a", fontSize: 10, fontWeight: 600, lineHeight: 1.3, wordBreak: "break-word", minWidth: 0 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div style={{ background: "#073d27", borderTop: "2.5px solid #C9A227", padding: "6px 14px", display: "flex", justifyContent: "space-between", flexShrink: 0 }}>
              <div style={{ fontSize: 8, color: "rgba(255,255,255,0.75)", lineHeight: 1 }}><span style={{ color: "#C9A227", fontWeight: 800 }}>Issue Date: </span>{joinDate}</div>
              <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", lineHeight: 1 }}>www.yetp.pk</div>
              <div style={{ fontSize: 8, color: "rgba(255,255,255,0.75)", lineHeight: 1 }}><span style={{ color: "#C9A227", fontWeight: 800 }}>Expires: </span>{expireDate}</div>
            </div>
          </div>
        </div>

        {/* ══ BACK ══ */}
        <div ref={backRef} style={{ width: CW, height: CH, background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 6px 28px rgba(0,0,0,0.14)", fontFamily: "Arial,sans-serif", flexShrink: 0, display: "flex", flexDirection: "column" }}>

          {/* Header */}
          <div style={{ background: "linear-gradient(135deg,#041f14 0%,#073d27 100%)", borderBottom: "3px solid #C9A227", padding: "8px 14px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", border: "2px solid #C9A227", padding: 2, background: "#fff", flexShrink: 0 }}>
              <img src={logoUrl} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} crossOrigin="anonymous" />
            </div>
            <div>
              <div style={{ color: "#C9A227", fontWeight: 900, fontSize: 10.5, letterSpacing: "0.05em", textTransform: "uppercase" }}>Youth Empowerment Training Program</div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 7.5, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 1.5 }}>Terms &amp; Conditions</div>
            </div>
          </div>

          {/* Body */}
          <div style={{ flex: 1, padding: "10px 14px", overflow: "hidden" }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: "#073d27", textTransform: "uppercase", letterSpacing: "0.08em", paddingBottom: 4, marginBottom: 8, borderBottom: "1.5px solid #C9A227" }}>
              Card Usage Policy
            </div>
            {[
              "This card is YETP property; return it when requested.",
              "Cardholder is responsible for all activities under this card.",
              "Non-transferable; valid only for the enrolled student.",
              "Report any loss to YETP administration immediately.",
              "YETP may cancel this card in case of misconduct.",
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 9, marginBottom: 7, alignItems: "flex-start" }}>
                <img src={BULLET_CIRCLES[i]} width={20} height={20} style={{ flexShrink: 0, display: "block", marginTop: 1 }} />
                <span style={{ fontSize: 10.5, color: "#333", lineHeight: 1.4, wordBreak: "break-word", paddingTop: 2 }}>{t}</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ background: "#073d27", borderTop: "2.5px solid #C9A227", padding: "6px 14px", display: "flex", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ fontSize: 8, color: "rgba(255,255,255,0.75)", lineHeight: 1 }}><span style={{ color: "#C9A227", fontWeight: 800 }}>Join Date: </span>{joinDate}</div>
            <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", lineHeight: 1 }}>www.yetp.pk</div>
            <div style={{ fontSize: 8, color: "rgba(255,255,255,0.75)", lineHeight: 1 }}><span style={{ color: "#C9A227", fontWeight: 800 }}>Expires: </span>{expireDate}</div>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
}
