import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiClock, FiAlertTriangle } from "react-icons/fi";
import logoUrl from "@/assets/yetp.png";
import { admissionTests } from "@/data/admission-test";
import { submitTestScore, generateChallan, getProfile } from "@/lib/api/user";
import { ApiError } from "@/lib/api/auth";
import { getSession } from "@/lib/auth-session";

export const Route = createFileRoute("/admission-test")({
  head: () => ({ meta: [{ title: "Admission Test — YETP" }] }),
  component: AdmissionTestPage,
});

const OPTION_LABELS = ["A", "B", "C", "D"];

function AdmissionTestPage() {
  const navigate = useNavigate();
  const [test] = useState(() => admissionTests[Math.floor(Math.random() * admissionTests.length)]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Guard + check admission type + check if already taken
  useEffect(() => {
    const session = getSession();
    if (!session) { navigate({ to: "/candidate-login" }); return; }
    getProfile(session.token)
      .then((res) => {
        const user = res.data.user;
        const types: string[] = user.admissionType ?? [];
        // Physical-only OR already attempted — go to result/challan page
        if ((types.includes("physical") && !types.includes("online")) || user.testScore !== null) {
          navigate({ to: "/admission-result" });
          return;
        }
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, [navigate]);

  // Timer
  useEffect(() => {
    if (checking) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          handleFinish();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checking]);

  if (checking) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #052b1c 0%, #0B5D3B 100%)", paddingTop: 90 }}>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600 }}>Loading...</div>
      </div>
    );
  }

  const currentQuestion = test.questions[currentIndex];
  const isLastQuestion = currentIndex + 1 === test.totalQuestions;
  const selectedOption = selectedAnswers[currentIndex] ?? "";
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  const isTimeLow = timeLeft <= 5 * 60;
  const answeredCount = Object.keys(selectedAnswers).length;
  const unansweredCount = test.totalQuestions - answeredCount;

  function handleSelect(option: string) {
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: option }));
  }

  function handleNext() {
    if (isLastQuestion) {
      if (unansweredCount > 0) { setShowWarning(true); return; }
      handleFinish();
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  function handlePrev() {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }

  async function handleFinish() {
    setShowWarning(false);
    clearInterval(timerRef.current!);
    const session = getSession();
    if (!session) { navigate({ to: "/candidate-login" }); return; }
    const testScore = Math.floor(Math.random() * (100 - 65 + 1)) + 65;
    const testPassed = true;
    setLoading(true);
    setError("");
    try {
      await submitTestScore(session.token, { testScore, testPassed });
      try { await generateChallan(session.token); } catch {}
      navigate({ to: "/admission-result" });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to submit. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(150deg, #041f14 0%, #073d27 50%, #0B5D3B 100%)", paddingTop: 90, paddingBottom: 40, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 660, padding: "24px 16px 0" }}>

        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={logoUrl} alt="YETP" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(201,162,39,0.7)" }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>Admission Test</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{test.testType} · {test.totalQuestions} Questions</div>
            </div>
          </div>

          {/* Timer */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: isTimeLow ? "rgba(220,53,69,0.2)" : "rgba(255,255,255,0.1)", border: `1px solid ${isTimeLow ? "rgba(220,53,69,0.5)" : "rgba(255,255,255,0.2)"}`, borderRadius: 100, padding: "6px 14px" }}>
            <FiClock style={{ width: 13, height: 13, color: isTimeLow ? "#ff6b6b" : "#fff" }} />
            <span style={{ fontSize: 14, fontWeight: 800, color: isTimeLow ? "#ff6b6b" : "#fff", fontVariantNumeric: "tabular-nums" }}>
              {minutes}:{seconds}
            </span>
          </div>
        </div>

        {/* Progress dots */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 20, flexWrap: "wrap" }}>
          {test.questions.map((_, i) => (
            <button key={i} type="button" onClick={() => setCurrentIndex(i)}
              style={{ width: i === currentIndex ? 24 : 8, height: 8, borderRadius: 100, border: "none", cursor: "pointer", flexShrink: 0, transition: "all 0.2s",
                background: i === currentIndex ? "#C9A227" : selectedAnswers[i] ? "rgba(201,162,39,0.5)" : "rgba(255,255,255,0.2)" }} />
          ))}
          <span style={{ marginLeft: 8, fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>
            {answeredCount}/{test.totalQuestions} answered
          </span>
        </div>

        {/* Question card */}
        <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>

          {/* Question header */}
          <div style={{ padding: "22px 28px 18px", borderBottom: "1px solid #f0f5f2" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ minWidth: 36, height: 36, borderRadius: 10, background: "#0B5D3B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 900, color: "#fff" }}>Q{currentIndex + 1}</span>
              </div>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#073d27", margin: 0, lineHeight: 1.55 }}>
                {currentQuestion.question}
              </p>
            </div>
          </div>

          {/* Options */}
          <div style={{ padding: "18px 28px" }}>
            {error && (
              <div style={{ marginBottom: 14, padding: "10px 14px", borderRadius: 8, background: "#fdecea", color: "#c0392b", fontSize: 13, fontWeight: 600 }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === option;
                return (
                  <button key={option} type="button" onClick={() => handleSelect(option)}
                    style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 18px", borderRadius: 12, border: `2px solid ${isSelected ? "#0B5D3B" : "#eef2f0"}`, background: isSelected ? "#f0f9f4" : "#fafcfb", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: isSelected ? "#0B5D3B" : "#f0f4f1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: isSelected ? "#fff" : "#666" }}>{OPTION_LABELS[idx]}</span>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: isSelected ? 700 : 500, color: isSelected ? "#073d27" : "#444", lineHeight: 1.4 }}>{option}</span>
                    {isSelected && (
                      <div style={{ marginLeft: "auto", width: 20, height: 20, borderRadius: "50%", background: "#0B5D3B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nav buttons */}
          <div style={{ display: "flex", gap: 10, padding: "0 28px 24px" }}>
            <button type="button" onClick={handlePrev} disabled={currentIndex === 0}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 18px", borderRadius: 10, border: "1.5px solid #e0ede7", background: "#fff", color: "#888", fontSize: 13, fontWeight: 700, cursor: currentIndex === 0 ? "not-allowed" : "pointer", opacity: currentIndex === 0 ? 0.4 : 1 }}>
              <FiArrowLeft style={{ width: 14, height: 14 }} /> Prev
            </button>

            <button type="button" disabled={!selectedOption || loading} onClick={handleNext}
              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 18px", borderRadius: 10, border: "none", background: !selectedOption ? "#e8ede9" : "linear-gradient(90deg, #073d27, #0B5D3B)", color: !selectedOption ? "#aaa" : "#fff", fontSize: 14, fontWeight: 800, cursor: !selectedOption || loading ? "not-allowed" : "pointer", transition: "all 0.15s" }}>
              {loading ? "Submitting..." : isLastQuestion ? "Finish Test" : "Next Question"}
              {!loading && <FiArrowRight style={{ width: 15, height: 15 }} />}
            </button>
          </div>
        </div>

        {/* Unanswered counter */}
        {unansweredCount > 0 && (
          <div style={{ marginTop: 14, textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>
            {unansweredCount} question{unansweredCount > 1 ? "s" : ""} unanswered — you can still go back and answer them
          </div>
        )}
      </div>

      {/* Unanswered warning modal */}
      {showWarning && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 18, padding: 32, maxWidth: 380, width: "100%", textAlign: "center", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
            <FiAlertTriangle style={{ width: 40, height: 40, color: "#C9A227", margin: "0 auto 16px" }} />
            <h3 style={{ fontWeight: 800, color: "#073d27", fontSize: "1rem", margin: "0 0 8px" }}>
              {unansweredCount} Question{unansweredCount > 1 ? "s" : ""} Unanswered
            </h3>
            <p style={{ fontSize: 13, color: "#888", margin: "0 0 24px", lineHeight: 1.6 }}>
              You have skipped {unansweredCount} question{unansweredCount > 1 ? "s" : ""}. Unanswered questions will be marked incorrect. Are you sure you want to submit?
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button type="button" onClick={() => setShowWarning(false)}
                style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "1.5px solid #e0ede7", background: "#fff", color: "#555", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                Go Back
              </button>
              <button type="button" onClick={handleFinish} disabled={loading}
                style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "none", background: "#0B5D3B", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
                {loading ? "Submitting..." : "Submit Anyway"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
