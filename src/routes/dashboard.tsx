import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  FiCheck, FiUser, FiPhone, FiArrowRight, FiAlertCircle, FiClock, FiDownload,
} from "react-icons/fi";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import logoUrl from "@/assets/yetp.png";
import { courses } from "@/data/yetp";
import { getProfile, type Profile, type ChallanInfo } from "@/lib/api/user";
import { getSession, clearSession } from "@/lib/auth-session";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Candidate Dashboard — YETP" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [challans, setChallans] = useState<ChallanInfo[]>([]);
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const session = getSession();
    if (!session) {
      navigate({ to: "/candidate-login" });
      return;
    }
    setFullName(session.user.fullName);
    getProfile(session.token)
      .then((res) => {
        setProfile(res.data.user);
        setChallans(res.data.challans?.challans ?? []);
      })
      .catch(() => setError("Could not load your profile. Please try logging in again."));
  }, [navigate]);

  function handleLogout() {
    clearSession();
    navigate({ to: "/candidate-login" });
  }

  return (
    <div className="min-h-screen" style={{ background: "#f5f7f5", paddingTop: 90 }}>
      <div className="mx-auto max-w-6xl px-4 py-10">

        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={logoUrl} alt="YETP" className="size-9 rounded-full object-cover" style={{ border: "2px solid #C9A227" }} />
            <span className="font-display text-sm font-extrabold" style={{ color: "#073d27" }}>Candidate Dashboard</span>
          </div>
          <button onClick={handleLogout}
            className="rounded-full px-4 py-2 text-xs font-bold transition-colors"
            style={{ border: "1.5px solid #f0c6c6", color: "#c0392b" }}>
            Log Out
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg px-4 py-3 text-sm font-semibold" style={{ background: "#fdecea", color: "#c0392b" }}>
            {error}
          </div>
        )}

        {/* Welcome banner */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl px-6 py-5"
          style={{ background: "#f0f9f4", border: "1px solid #c8e6d4" }}>
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-full text-white" style={{ background: "#0B5D3B" }}>
              <FiCheck className="size-4" />
            </div>
            <div>
              <div className="font-display text-base font-extrabold" style={{ color: "#073d27" }}>Welcome Back, {fullName}!</div>
              <p className="text-xs" style={{ color: "#557" }}>Your candidate portal is active. Manage your profile and track your admission status here.</p>
            </div>
          </div>
          <div className="rounded-xl bg-white px-5 py-2.5 text-center" style={{ border: "1px solid #c8e6d4" }}>
            <div className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#888" }}>Roll Number</div>
            <div className="font-display text-sm font-extrabold" style={{ color: "#0B5D3B" }}>{profile?.rollNumber || "—"}</div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            {/* Admission Evaluation Status */}
            <div className="rounded-2xl bg-white p-6" style={{ border: "1px solid #e8f0eb" }}>
              <div className="mb-4 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest" style={{ color: "#0B5D3B" }}>
                <HiOutlineAcademicCap className="size-4" /> Admission Evaluation Status
              </div>

              {!profile ? (
                <p className="text-sm" style={{ color: "#888" }}>Loading...</p>
              ) : profile.testScore === null ? (
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-full" style={{ background: "#fdf6e3" }}>
                      <FiClock className="size-5" style={{ color: "#C9A227" }} />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold" style={{ color: "#073d27" }}>Admission test not attempted yet</div>
                      <p className="text-xs" style={{ color: "#888" }}>Take your online admission test to confirm your seat.</p>
                    </div>
                  </div>
                  <a href="/admission-test"
                    className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white"
                    style={{ background: "#0B5D3B" }}>
                    Start Test <FiArrowRight />
                  </a>
                </div>
              ) : profile.testPassed ? (
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-full" style={{ background: "#f0f9f4" }}>
                      <FiCheck className="size-5" style={{ color: "#0B5D3B" }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-extrabold" style={{ color: "#073d27" }}>Congratulations! You have passed the test.</div>
                        <span className="rounded-full px-2.5 py-0.5 text-[10px] font-extrabold text-white" style={{ background: "#0B5D3B" }}>PASS</span>
                      </div>
                      <p className="text-xs" style={{ color: "#888" }}>You scored <strong style={{ color: "#0B5D3B" }}>{profile.testScore}%</strong> in the admission test.</p>
                    </div>
                  </div>
                  <a href="/admission-result"
                    className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white"
                    style={{ background: "#0B5D3B" }}>
                    View Result &amp; Pay Fee <FiArrowRight />
                  </a>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-full" style={{ background: "#fdecea" }}>
                      <FiAlertCircle className="size-5" style={{ color: "#c0392b" }} />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold" style={{ color: "#073d27" }}>You scored {profile.testScore}% — below the passing mark.</div>
                      <p className="text-xs" style={{ color: "#888" }}>You can retake the admission test to qualify.</p>
                    </div>
                  </div>
                  <a href="/admission-test"
                    className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white"
                    style={{ background: "#0B5D3B" }}>
                    Retake Test <FiArrowRight />
                  </a>
                </div>
              )}
            </div>

            {/* Challan Card — shown when testPassed and challan exists */}
            {profile?.testPassed && challans.length > 0 && (
              <div className="rounded-2xl bg-white p-6" style={{ border: "1px solid #e8f0eb" }}>
                <div className="mb-4 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest" style={{ color: "#0B5D3B" }}>
                  <FiDownload className="size-4" /> Fee Challan
                </div>
                {challans.map((ch) => (
                  <div key={ch.challanId} className="flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold" style={{ color: "#073d27" }}>Challan No: {ch.challanId}</span>
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${ch.paid ? "text-white" : "text-white"}`}
                          style={{ background: ch.paid ? "#0B5D3B" : "#C9A227", color: ch.paid ? "#fff" : "#073d27" }}>
                          {ch.paid ? "PAID" : "UNPAID"}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: "#888" }}>
                        Amount: <strong style={{ color: "#073d27" }}>Rs. {ch.amount.toLocaleString()}</strong>
                        {" · "}Issued: {new Date(ch.createdAt).toLocaleDateString("en-PK", { day: "2-digit", month: "short", year: "numeric" })}
                      </p>
                    </div>
                    <a
                      href={`${import.meta.env.VITE_API_URL || "http://localhost:3001"}/uploads/challan-${ch.challanId}.pdf`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white"
                      style={{ background: "#0B5D3B" }}>
                      Download <FiDownload />
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* Laptop Scheme — only once passed */}
            {profile?.testPassed && (
              <div className="overflow-hidden rounded-2xl p-6 text-white" style={{ background: "#073d27" }}>
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest" style={{ color: "#C9A227" }}>
                  Laptop Scheme
                </div>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                  Having passed your admission test, you're now eligible to apply for YETP's Laptop Scheme to support your learning journey.
                </p>
                <a href="/laptop-scheme"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-extrabold"
                  style={{ background: "#C9A227", color: "#073d27" }}>
                  Apply for Laptop Scheme <FiArrowRight />
                </a>
              </div>
            )}
          </div>

          {/* Candidate Profile sidebar */}
          <div className="rounded-2xl bg-white p-6" style={{ border: "1px solid #e8f0eb" }}>
            <div className="mb-4 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest" style={{ color: "#0B5D3B" }}>
              <FiUser className="size-4" /> Candidate Profile
            </div>
            {profile && (
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#999" }}>Full Name</div>
                  <div className="font-bold" style={{ color: "#073d27" }}>{profile.fullName}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#999" }}>Father Name</div>
                  <div className="font-bold" style={{ color: "#073d27" }}>{profile.fatherName}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#999" }}>CNIC Number</div>
                  <div className="font-bold" style={{ color: "#073d27" }}>{profile.cnic}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#999" }}>Mobile Number</div>
                  <div className="flex items-center gap-1.5 font-bold" style={{ color: "#073d27" }}>
                    <FiPhone className="size-3.5" style={{ color: "#0B5D3B" }} /> {profile.mobile}
                  </div>
                </div>
                {profile.courses?.length > 0 && (
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#999" }}>Selected Programs</div>
                    <ul className="mt-1 space-y-1">
                      {profile.courses.map((slug) => (
                        <li key={slug} className="flex items-start gap-1.5 font-bold" style={{ color: "#073d27" }}>
                          <span className="mt-1.5 size-1 shrink-0 rounded-full" style={{ background: "#C9A227" }} />
                          {courses.find((c) => c.slug === slug)?.title || slug}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
