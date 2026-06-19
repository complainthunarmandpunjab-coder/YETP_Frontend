import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { Container } from "@/components/yetp/primitives";
import { courses } from "@/data/yetp";
import {
  FiArrowRight, FiUser, FiMail, FiPhone, FiMapPin,
  FiBook, FiCheck, FiLock, FiEye, FiEyeOff, FiChevronRight, FiLogIn, FiUpload,
  FiWifi, FiMapPin as FiLocation
} from "react-icons/fi";
import { HiOutlineAcademicCap, HiOutlineSparkles, HiOutlineUserPlus, HiOutlineBuildingOffice2 } from "react-icons/hi2";
import logoUrl from "@/assets/yetp.png";
import portalBg from "@/assets/yetpoffice.png";
import { signup, login as loginApi, forgotPassword, ApiError } from "@/lib/api/auth";
import { getProfile } from "@/lib/api/user";
import { setSession } from "@/lib/auth-session";

export const Route = createFileRoute("/enroll")({
  head: () => ({ meta: [{ title: "Admissions Portal — YETP" }] }),
  component: EnrollPage,
  validateSearch: (search: Record<string, unknown>) => ({
    view: (search.view as string) || "portal",
  }),
});

type View = "portal" | "register" | "login" | "forgot" | "success";

const benefits = [
  "Industry-expert trainers",
  "100% Hands-On lab training",
  "Guaranteed internships",
  "Global job readiness",
  "Lifetime alumni network",
];

function Field({ label, value, onChange, type = "text", icon: Icon, required = true, placeholder = "", className = "" }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; icon?: React.ElementType; required?: boolean; placeholder?: string; className?: string;
}) {
  const [show, setShow] = useState(false);
  const isPass = type === "password";
  return (
    <div className={className}>
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
  const [resetUrl, setResetUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center text-center py-4">
        <div className="grid size-14 place-items-center rounded-full text-white mb-4"
          style={{ background: "#0B5D3B" }}>
          <FiMail className="size-6" />
        </div>
        <div className="font-display text-base font-extrabold" style={{ color: "#073d27" }}>Email Sent!</div>
        {resetUrl ? (
          <p className="mt-1 text-xs leading-relaxed mb-5" style={{ color: "#888" }}>
            Email isn't wired up yet (dev mode) — use this link directly:<br />
            <a href={resetUrl} className="font-semibold break-all" style={{ color: "#0B5D3B" }}>{resetUrl}</a>
          </p>
        ) : (
          <p className="mt-1 text-xs leading-relaxed mb-5" style={{ color: "#888" }}>
            Password reset instructions have been sent to <strong>{email}</strong>. Check your inbox.
          </p>
        )}
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold hover:text-[#0B5D3B] hover:underline transition-colors"
          style={{ color: "#999" }}>
          ← Back to Login
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);
      try {
        const res = await forgotPassword(email);
        setResetUrl(res.resetUrl || "");
        setSent(true);
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }} className="space-y-4">
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

      {error && <p className="text-xs font-semibold" style={{ color: "#c0392b" }}>{error}</p>}

      <button type="submit" disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-extrabold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: "linear-gradient(90deg, #073d27, #0B5D3B)" }}>
        {loading ? "Sending..." : "Send Reset Link"} <FiArrowRight />
      </button>

      <button type="button" onClick={onBack}
        className="flex w-full items-center justify-center gap-1.5 text-xs font-semibold transition-colors hover:text-[#0B5D3B] hover:underline"
        style={{ color: "#999" }}>
        ← Back to Login
      </button>
    </form>
  );
}

function formatCnic(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 13);
  if (d.length <= 5) return d;
  if (d.length <= 12) return `${d.slice(0, 5)}-${d.slice(5)}`;
  return `${d.slice(0, 5)}-${d.slice(5, 12)}-${d.slice(12)}`;
}

/* ══════════════════════════════════════════════════ */
function EnrollPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/enroll" });
  const initialView: View = (search.view as View) === "register" ? "register" : "portal";
  const [view, setView] = useState<View>(initialView);
  const [reg, setReg] = useState({
    name: "", father: "", email: "", phone: "", cnic: "",
    city: "", qualification: "", course: "",
    password: "", dateOfBirth: "", gender: "", permanentAddress: "",
    secondCourse: "", referralCode: "",
  });
  const [enrollmentType, setEnrollmentType] = useState<"online" | "physical">("online");
  const [cnicFront, setCnicFront] = useState<File | null>(null);
  const [cnicBack, setCnicBack] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [rollNumber, setRollNumber] = useState("");
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  const [login, setLogin] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await loginApi(login);
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
      setLoginLoading(false);
    }
  }

  function handlePhotoSelect(file: File | null) {
    if (!file) { setPhoto(null); setPhotoPreview(null); return; }
    // Resize to passport ratio (400×490) and compress to JPEG ≤150KB
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const TARGET_W = 400, TARGET_H = 490;
      const canvas = document.createElement("canvas");
      canvas.width = TARGET_W; canvas.height = TARGET_H;
      const ctx = canvas.getContext("2d")!;
      // Cover-fit: crop center
      const srcRatio = img.width / img.height;
      const tgtRatio = TARGET_W / TARGET_H;
      let sx = 0, sy = 0, sw = img.width, sh = img.height;
      if (srcRatio > tgtRatio) { sw = img.height * tgtRatio; sx = (img.width - sw) / 2; }
      else { sh = img.width / tgtRatio; sy = (img.height - sh) / 2; }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, TARGET_W, TARGET_H);
      URL.revokeObjectURL(url);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      setPhotoPreview(dataUrl);
      // Convert to File
      canvas.toBlob((blob) => {
        if (blob) setPhoto(new File([blob], "photo.jpg", { type: "image/jpeg" }));
      }, "image/jpeg", 0.85);
    };
    img.src = url;
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegError("");
    if (reg.secondCourse && reg.course === reg.secondCourse) {
      setRegError("First and second course must be different.");
      return;
    }
    if (enrollmentType === "online") {
      if (!cnicFront || !cnicBack) {
        setRegError("Please upload both CNIC / B-Form front and back images.");
        return;
      }
      if (!photo) {
        setRegError("Please upload your passport-size photo.");
        return;
      }
      if (cnicFront.size > MAX_FILE_SIZE || cnicBack.size > MAX_FILE_SIZE || photo.size > MAX_FILE_SIZE) {
        setRegError("Files must be 2MB or smaller.");
        return;
      }
    } else {
      if (!photo) {
        setRegError("Please upload your passport-size photo.");
        return;
      }
      if (photo.size > MAX_FILE_SIZE) {
        setRegError("Photo must be 2MB or smaller.");
        return;
      }
    }
    if (!agreedToTerms) {
      setRegError("Please agree to the declaration before submitting.");
      return;
    }
    setRegLoading(true);
    try {
      const fd = new FormData();
      fd.append("email", reg.email);
      fd.append("password", reg.password);
      fd.append("fullName", reg.name);
      fd.append("fatherName", reg.father);
      fd.append("cnic", reg.cnic.replace(/\D/g, ""));
      fd.append("mobile", reg.phone.replace(/\D/g, ""));
      fd.append("dateOfBirth", reg.dateOfBirth);
      fd.append("gender", reg.gender);
      fd.append("qualification", reg.qualification);
      fd.append("permanentAddress", reg.permanentAddress);
      fd.append("city", reg.city);
      fd.append("firstCourse", reg.course);
      if (reg.secondCourse) fd.append("secondCourse", reg.secondCourse);
      if (reg.referralCode) fd.append("referralCode", reg.referralCode);
      fd.append("form", enrollmentType === "physical" ? "admission" : "signup");
      if (enrollmentType === "online") {
        fd.append("cnicFront", cnicFront!);
        fd.append("cnicBack", cnicBack!);
      }
      fd.append("photo", photo!);
      const res = await signup(fd);
      setRollNumber(res.user.rollNumber);
      setView("success");
    } catch (err) {
      setRegError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setRegLoading(false);
    }
  }

  /* ── Portal ── */
  if (view === "portal") {
    return (
      <>
        <style>{`
          .p-wrap {
            position: relative;
            width: 100%;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            padding: 100px 40px 56px;
            box-sizing: border-box;
          }
          /* photo: full image visible, centered */
          .p-bg {
            position: absolute;
            inset: 0;
            width: 100%; height: 100%;
            object-fit: cover;
            object-position: center top;
            display: block;
          }
          .p-ov {
            position: absolute;
            inset: 0;
            background: rgba(3,14,8,0.52);
            pointer-events: none;
          }
          /* mobile overlay: top very light, bottom dark for card */
          @media (max-width: 820px) {
            .p-bg { object-position: center top; }
            .p-ov {
              background: linear-gradient(
                to bottom,
                rgba(3,14,8,0.15) 0%,
                rgba(3,14,8,0.30) 55%,
                rgba(3,14,8,0.90) 100%
              );
            }
          }
          /* row: card left, branding text right */
          .p-row {
            position: relative;
            z-index: 5;
            width: 100%;
            max-width: 1060px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 52px;
          }
          /* ── card (left) ── */
          .p-card {
            flex-shrink: 0;
            width: 100%;
            max-width: 370px;
            background: rgba(5,20,12,0.60);
            backdrop-filter: blur(28px);
            -webkit-backdrop-filter: blur(28px);
            border: 1px solid rgba(255,255,255,0.14);
            border-radius: 20px;
            padding: 32px 28px;
            box-shadow: 0 20px 56px rgba(0,0,0,0.55);
            box-sizing: border-box;
          }
          .p-card-logo {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
          }
          .p-card-logo img {
            width: 36px; height: 36px;
            border-radius: 50%;
            border: 1.5px solid rgba(201,162,39,0.8);
            object-fit: contain;
            background: rgba(255,255,255,0.05);
          }
          .p-card-logo span {
            font-size: 0.67rem;
            font-weight: 800;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.6);
          }
          .p-card h2 {
            font-size: 1.48rem;
            font-weight: 800;
            color: #fff;
            margin: 0 0 3px;
          }
          .p-card .p-sub {
            font-size: 0.73rem;
            color: rgba(255,255,255,0.42);
            margin: 0 0 20px;
          }
          .p-btn {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 13px;
            padding: 14px 15px;
            border-radius: 13px;
            border: 1px solid rgba(255,255,255,0.12);
            background: rgba(255,255,255,0.07);
            cursor: pointer;
            text-align: left;
            transition: all 0.2s;
            margin-bottom: 10px;
            box-sizing: border-box;
          }
          .p-btn:last-of-type { margin-bottom: 0; }
          .p-btn:hover {
            background: rgba(255,255,255,0.14);
            border-color: rgba(201,162,39,0.4);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
          }
          .p-btn-icon {
            width: 42px; height: 42px;
            border-radius: 10px;
            background: rgba(201,162,39,0.13);
            border: 1px solid rgba(201,162,39,0.26);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
          }
          .p-btn-title { font-size: 0.88rem; font-weight: 700; color: #fff; margin-bottom: 2px; }
          .p-btn-sub   { font-size: 0.68rem; color: rgba(255,255,255,0.43); line-height: 1.3; }
          .p-card-foot {
            margin-top: 18px;
            padding-top: 14px;
            border-top: 1px solid rgba(255,255,255,0.09);
            text-align: center;
            font-size: 0.7rem;
            color: rgba(255,255,255,0.34);
          }
          .p-card-foot a { color: rgba(255,255,255,0.6); font-weight: 700; text-decoration: none; }
          .p-card-foot a:hover { color: #C9A227; }

          /* ── branding text (right, centred) ── */
          /* desktop: p-hero is transparent wrapper, background-image ignored */
          .p-hero {
            flex: 1 1 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          /* mobile hero bg img: hidden on desktop */
          .p-hero-bg, .p-hero-ov { display: none; }
          .p-brand {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .p-brand img {
            width: 84px; height: 84px;
            border-radius: 50%;
            border: 3px solid rgba(201,162,39,0.85);
            object-fit: contain;
            background: rgba(255,255,255,0.06);
            margin-bottom: 16px;
          }
          .p-brand h1 {
            font-size: clamp(1.75rem, 3.4vw, 2.7rem);
            font-weight: 800;
            color: #fff;
            line-height: 1.2;
            margin: 0 0 10px;
            text-shadow: 0 2px 18px rgba(0,0,0,0.65);
          }
          .p-brand h1 em { font-style: normal; color: #C9A227; }
          .p-brand p {
            font-size: 0.88rem;
            color: rgba(255,255,255,0.92);
            line-height: 1.65;
            max-width: 300px;
            margin: 0 0 20px;
            text-shadow: 0 1px 12px rgba(0,0,0,0.85), 0 2px 24px rgba(0,0,0,0.7);
            font-weight: 500;
          }
          .p-pills {
            display: flex; flex-wrap: wrap; gap: 7px; justify-content: center;
          }
          .p-pill {
            display: inline-flex; align-items: center; gap: 5px;
            background: rgba(255,255,255,0.09);
            border: 1px solid rgba(255,255,255,0.15);
            backdrop-filter: blur(8px);
            border-radius: 100px;
            padding: 5px 12px;
            font-size: 0.67rem; font-weight: 700;
            color: rgba(255,255,255,0.78);
            white-space: nowrap;
          }
          .p-dot {
            width: 5px; height: 5px; border-radius: 50%;
            background: #C9A227; flex-shrink: 0;
          }

          /* ══ Responsive ≤ 860px ══ */
          @media (max-width: 860px) {

            /* Override ALL desktop flex centering */
            .p-wrap {
              display: block;
              padding: 0;
              overflow: visible;
              background: #ffffff; /* Light theme background */
              min-height: 100vh;
            }

            /* hide global bg on mobile */
            .p-bg, .p-ov { display: none; }

            /* p-row becomes THE full-screen flex container */
            .p-row {
              display: flex;
              flex-direction: column-reverse;
              align-items: stretch;
              justify-content: flex-start;
              gap: 0;
              width: 100%;
              min-height: 100vh;
              max-width: 100%;
              position: static;
            }

            /* on mobile, p-hero uses its inline style backgroundImage */
            .p-hero {
              background-image: var(--portal-bg) !important;
            }

            /* ── HERO (top image section) ── */
            .p-hero {
              position: relative;
              flex: 1;
              min-height: 50vh;
              overflow: hidden;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 90px 20px 32px; /* Increased to clear fixed navbar */
            }
            /* show the hero bg img on mobile */
            .p-hero-bg {
              display: block;
              position: absolute !important;
              inset: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center top;
              z-index: 0 !important;
            }
            .p-hero-ov {
              display: block;
              position: absolute !important;
              inset: 0;
              z-index: 1 !important;
              pointer-events: none;
              background: linear-gradient(
                to bottom,
                rgba(3,12,7,0.1) 0%,
                rgba(3,12,7,0.50) 50%,
                rgba(5,19,11,0.95) 100%
              );
            }

            .p-brand {
              position: relative;
              z-index: 2;
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              width: 100%;
            }
            .p-brand img  { width: 68px; height: 68px; margin-bottom: 12px; }
            .p-brand h1   { font-size: 1.8rem; margin-bottom: 8px; }
            .p-brand p    { font-size: 0.83rem; max-width: 300px; margin-bottom: 14px; }
            .p-pills      { gap: 6px; }
            .p-pill       { font-size: 0.64rem; padding: 5px 10px; }

            /* ── CARD (flush at bottom, no gap) ── */
            .p-card {
              flex-shrink: 0;
              max-width: 100%;
              width: 100%;
              border-radius: 30px 30px 0 0;
              border: none;
              border-top: 1px solid #e2e8f0;
              background: #ffffff;
              backdrop-filter: none;
              -webkit-backdrop-filter: none;
              padding: 32px 24px 50px;
              box-shadow: 0 -12px 40px rgba(0,0,0,0.08);
              box-sizing: border-box;
            }
            .p-card h2        { font-size: 1.45rem; color: #0f172a; }
            .p-card .p-sub    { color: #64748b; }
            .p-card-logo span { color: #0f172a; }
            
            .p-btn { 
              padding: 14px 16px; 
              background: #f8fafc;
              border: 1px solid #e2e8f0;
            }
            .p-btn:hover { background: #f1f5f9; border-color: #cbd5e1; box-shadow: none; transform: translateY(0); }
            .p-btn-title { color: #0f172a; font-weight: 700; }
            .p-btn-sub   { color: #64748b; }
            
            .p-card-foot { border-top-color: #e2e8f0; color: #64748b; }
            .p-card-foot a { color: #0B5D3B; }
          }

          /* ── Small mobile ≤ 420px ══ */
          @media (max-width: 420px) {
            .p-hero          { min-height: 48vh; padding: 80px 16px 28px; }
            .p-brand img     { width: 60px; height: 60px; }
            .p-brand h1      { font-size: 1.6rem; }
            .p-brand p       { font-size: 0.80rem; }
            .p-card          { padding: 28px 18px 46px; border-radius: 24px 24px 0 0; }
            .p-card h2       { font-size: 1.3rem; }
            .p-btn           { padding: 12px 14px; }
            .p-btn-icon      { width: 38px; height: 38px; }
          }
        `}</style>

        <div className="p-wrap">
          <img src={portalBg} alt="YETP Office" className="p-bg" />
          <div className="p-ov" />

          <div className="p-row">

            {/* LEFT — card */}
            <div className="p-card">
              <div className="p-card-logo">
                <img src={logoUrl} alt="YETP" />
                <span>YETP Portal</span>
              </div>
              <h2>Select Action</h2>
              <p className="p-sub">Choose how you want to proceed today</p>

              <button className="p-btn" onClick={() => setView("register")}>
                <div className="p-btn-icon"><HiOutlineUserPlus size={19} color="#C9A227" /></div>
                <div style={{ flex: 1 }}>
                  <div className="p-btn-title">New Registration</div>
                  <div className="p-btn-sub">Apply for a new batch — 2026</div>
                </div>
                <FiChevronRight size={15} color="rgba(255,255,255,0.35)" />
              </button>

              <button className="p-btn" onClick={() => window.location.href = "/candidate-login"}>
                <div className="p-btn-icon"><FiLogIn size={19} color="#C9A227" /></div>
                <div style={{ flex: 1 }}>
                  <div className="p-btn-title">Candidate Login</div>
                  <div className="p-btn-sub">Access your existing application</div>
                </div>
                <FiChevronRight size={15} color="rgba(255,255,255,0.35)" />
              </button>

              <div className="p-card-foot">
                Need support? <a href="/contact">Contact us</a>
              </div>
            </div>

            {/* RIGHT / TOP — mobile hero with its own background */}
            <div className="p-hero">
              <img src={portalBg} alt="" className="p-hero-bg" aria-hidden="true" />
              <div className="p-hero-ov" />
              <div className="p-brand">
                <img src={logoUrl} alt="YETP" />
                <h1>Welcome to<br /><em>YETP</em> Portal</h1>
                <p>Official Admissions Portal. Apply for new batches or access your existing candidate dashboard.</p>
                <div className="p-pills">
                  {["Free IT Training", "Laptop Scheme", "Internships", "Batch 2026"].map((t) => (
                    <span key={t} className="p-pill"><span className="p-dot" />{t}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </>
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
            <form onSubmit={handleLogin} className="space-y-4">
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
                icon={FiLock} type="password" placeholder="Enter your password" required={true} />

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

              {loginError && <p className="text-xs font-semibold" style={{ color: "#c0392b" }}>{loginError}</p>}

              <button type="submit" disabled={loginLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-extrabold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ background: "linear-gradient(90deg, #073d27, #0B5D3B)" }}>
                {loginLoading ? "Logging in..." : "Login"} <FiArrowRight />
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
      <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "linear-gradient(150deg, #041f14 0%, #073d27 60%, #0a4a2e 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
        <div style={{ width: "100%", maxWidth: 420, borderRadius: 20, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.55)" }}>

          {/* Header */}
          <div style={{ background: enrollmentType === "physical" ? "linear-gradient(135deg, #041f14, #073d27)" : "linear-gradient(135deg, #041f14, #073d27)", borderBottom: "3px solid #C9A227", padding: "24px 28px 20px", textAlign: "center" }}>
            <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
              <div style={{ position: "absolute", width: 70, height: 70, borderRadius: "50%", border: "1.5px solid rgba(201,162,39,0.2)" }} />
              <div style={{ width: 50, height: 50, borderRadius: "50%", background: "linear-gradient(135deg, #0B5D3B, #0d7048)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 2.5px rgba(201,162,39,0.45)" }}>
                <FiCheck style={{ width: 22, height: 22, color: "#C9A227" }} />
              </div>
            </div>
            <h2 style={{ margin: "0 0 4px", fontSize: "1.25rem", fontWeight: 900, color: "#fff", lineHeight: 1.3 }}>
              Congratulations, <span style={{ color: "#C9A227" }}>{reg.name.split(" ")[0]}!</span>
            </h2>
            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
              Registration successful · Welcome to YETP
            </p>
          </div>

          {/* Body */}
          <div style={{ background: "#fff", padding: "22px 28px 26px" }}>

            {/* Step tracker */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
              {(enrollmentType === "physical" ? [
                { n: "✓", label: "Registration", done: true, active: false },
                { n: "2", label: "Visit Institute", done: false, active: true },
                { n: "3", label: "Enrollment", done: false, active: false },
              ] : [
                { n: "✓", label: "Registration", done: true, active: false },
                { n: "2", label: "Admission Test", done: false, active: true },
                { n: "3", label: "Enrollment", done: false, active: false },
              ] as const).map((s, i, arr) => (
                <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, flex: 1 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: s.done ? "#0B5D3B" : s.active ? "#C9A227" : "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: s.done || s.active ? "#fff" : "#ccc", boxShadow: s.active ? "0 3px 10px rgba(201,162,39,0.4)" : "none" }}>
                      {s.n}
                    </div>
                    <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.05em", color: s.done ? "#0B5D3B" : s.active ? "#C9A227" : "#ccc", textAlign: "center" as const }}>
                      {s.label}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ flex: "0 0 24px", height: 2, background: s.done ? "#0B5D3B" : "#eee", marginBottom: 18, borderRadius: 2 }} />
                  )}
                </div>
              ))}
            </div>

            {/* Info box */}
            <div style={{ background: enrollmentType === "physical" ? "#f0f9f4" : "#f8fdf9", border: `1px solid ${enrollmentType === "physical" ? "#c8e6d4" : "#d4eede"}`, borderRadius: 10, padding: "12px 14px", marginBottom: 18 }}>
              <p style={{ margin: 0, fontSize: 12, color: "#555", lineHeight: 1.6 }}>
                {enrollmentType === "physical"
                  ? <>Your physical enrollment application has been submitted. Visit our institute with your original documents to complete the enrollment process.</>
                  : <>Your application has been registered. Log in with your email and password to start your <strong style={{ color: "#0B5D3B" }}>Admission Test</strong> and complete enrollment.</>
                }
              </p>
            </div>

            {/* CTA */}
            <a href="/candidate-login" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 0", borderRadius: 10, background: enrollmentType === "physical" ? "linear-gradient(90deg, #073d27, #0B5D3B)" : "linear-gradient(90deg, #073d27, #0B5D3B)", color: "#fff", fontSize: 14, fontWeight: 800, textDecoration: "none", width: "100%", boxSizing: "border-box" as const, boxShadow: enrollmentType === "physical" ? "0 4px 16px rgba(11,93,59,0.3)" : "0 4px 16px rgba(11,93,59,0.3)" }}>
              {enrollmentType === "physical" ? "Log In to Portal" : "Log In & Start Test"} <FiArrowRight style={{ width: 15, height: 15 }} />
            </a>

            <p style={{ textAlign: "center", fontSize: 11, color: "#bbb", margin: "10px 0 0" }}>
              Use your registered email &amp; password
            </p>
          </div>
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

        {/* Step indicator */}
        <div className="mb-6 flex items-center justify-center gap-2 rounded-2xl bg-white px-3 py-4" style={{ border: "1px solid #e8f0eb" }}>
          {[
            { n: 1, label: "Student Registration" },
            { n: 2, label: "Admission Test" },
            { n: 3, label: "Confirmation" },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5" style={{ width: "clamp(72px, 25vw, 130px)" }}>
                <div className="grid size-8 place-items-center rounded-full text-xs font-extrabold"
                  style={{
                    background: i === 0 ? "#0B5D3B" : "#f0f5f2",
                    color: i === 0 ? "#fff" : "#999",
                    border: i === 0 ? "none" : "1.5px solid #e0ede7",
                  }}>
                  {s.n}
                </div>
                <div className="text-center text-[9px] sm:text-[10px] font-bold uppercase tracking-wide leading-tight"
                  style={{ color: i === 0 ? "#0B5D3B" : "#999" }}>
                  {s.label}
                </div>
              </div>
              {i < 2 && <div className="h-px w-4 sm:w-12" style={{ background: "#e0ede7", marginBottom: 22 }} />}
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* Form card */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm" style={{ border: "1px solid #e8f0eb" }}>
            {/* Header */}
            <div className="px-4 sm:px-8 py-5 flex items-center gap-3"
              style={{ background: enrollmentType === "physical" ? "linear-gradient(90deg, #073d27, #0B5D3B)" : "linear-gradient(90deg, #073d27, #0B5D3B)", borderBottom: "3px solid #C9A227" }}>
              <div className="grid size-10 place-items-center rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
                <HiOutlineAcademicCap className="size-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">
                  {enrollmentType === "physical" ? "Physical / Onsite Application Form" : "Online Application Form"}
                </div>
                <div className="text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Batch 2026 — Limited Seats</div>
              </div>
            </div>

            {/* Enrollment Type Toggle */}
            <div className="px-4 sm:px-8 pt-6 pb-2">
              <div className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: "#555" }}>Select Enrollment Type</div>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => { setEnrollmentType("online"); setPhoto(null); setPhotoPreview(null); }}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 10px", borderRadius: 12, border: `2px solid ${enrollmentType === "online" ? "#0B5D3B" : "#e4ede8"}`, background: enrollmentType === "online" ? "#f0f9f4" : "#fafcfb", cursor: "pointer", textAlign: "left" as const, transition: "all 0.18s" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: enrollmentType === "online" ? "#0B5D3B" : "#f0f4f1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FiWifi style={{ width: 16, height: 16, color: enrollmentType === "online" ? "#fff" : "#0B5D3B" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: enrollmentType === "online" ? "#073d27" : "#555" }}>Online</div>
                    <div style={{ fontSize: 11, color: "#999", lineHeight: 1.3 }}>Study from home</div>
                  </div>
                  {enrollmentType === "online" && (
                    <div style={{ marginLeft: "auto", width: 18, height: 18, borderRadius: "50%", background: "#0B5D3B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FiCheck style={{ width: 10, height: 10, color: "#fff" }} />
                    </div>
                  )}
                </button>

                <button type="button" onClick={() => { setEnrollmentType("physical"); setCnicFront(null); setCnicBack(null); setPhoto(null); setPhotoPreview(null); }}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 10px", borderRadius: 12, border: `2px solid ${enrollmentType === "physical" ? "#0B5D3B" : "#e4ede8"}`, background: enrollmentType === "physical" ? "#f0f9f4" : "#fafcfb", cursor: "pointer", textAlign: "left" as const, transition: "all 0.18s" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: enrollmentType === "physical" ? "#0B5D3B" : "#f0f4f1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <HiOutlineBuildingOffice2 style={{ width: 16, height: 16, color: enrollmentType === "physical" ? "#fff" : "#0B5D3B" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: enrollmentType === "physical" ? "#073d27" : "#555" }}>Physical / Onsite</div>
                    <div style={{ fontSize: 11, color: "#999", lineHeight: 1.3 }}>Study at institute</div>
                  </div>
                  {enrollmentType === "physical" && (
                    <div style={{ marginLeft: "auto", width: 18, height: 18, borderRadius: "50%", background: "#0B5D3B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FiCheck style={{ width: 10, height: 10, color: "#fff" }} />
                    </div>
                  )}
                </button>
              </div>
            </div>

            <div className="px-8 pt-6">
              <div className="rounded-lg px-4 py-3 text-xs leading-relaxed" style={{ background: "rgba(201,162,39,0.08)", borderLeft: "3px solid #C9A227", color: "#073d27" }}>
                <strong style={{ color: "#C9A227" }}>Notice:</strong> To become eligible for our Scholarship Card (free laptops &amp; advance courses), you must be enrolled in one or more programs under YETP.
              </div>
            </div>

            <form onSubmit={handleRegister} className="p-4 sm:p-8 pt-5 space-y-7">

              {/* Personal */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2" style={{ borderBottom: "1.5px solid #f0f5f2" }}>
                  <div className="grid size-6 place-items-center rounded-full text-white text-[10px] font-extrabold" style={{ background: "#0B5D3B" }}>1</div>
                  <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "#0B5D3B" }}>Personal Information</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field className="sm:col-span-2" label="Full Name" value={reg.name} onChange={(v) => setReg({ ...reg, name: v })} icon={FiUser} placeholder="Enter your full name as per your CNIC/B-Form." />
                  <Field className="sm:col-span-2" label="Father's Name" value={reg.father} onChange={(v) => setReg({ ...reg, father: v })} icon={FiUser} placeholder="Provide your father's name as per your CNIC." />
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                      CNIC / B-Form Number <span style={{ color: "#C9A227" }}>*</span>
                    </label>
                    <input
                      type="text" inputMode="numeric" required
                      value={formatCnic(reg.cnic)}
                      placeholder="XXXXX-XXXXXXX-X"
                      maxLength={15}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "").slice(0, 13);
                        setReg({ ...reg, cnic: digits });
                      }}
                      className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none transition-all"
                      style={{ border: "1.5px solid #e0ede7", letterSpacing: "0.05em" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(11,93,59,0.1)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#e0ede7"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                    <p className="mt-1 text-[10px]" style={{ color: "#aaa" }}>Format: XXXXX-XXXXXXX-X (13 digits)</p>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                      Date of Birth <span style={{ color: "#C9A227" }}>*</span>
                    </label>
                    <input type="date" required value={reg.dateOfBirth}
                      onChange={(e) => setReg({ ...reg, dateOfBirth: e.target.value })}
                      className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none"
                      style={{ border: "1.5px solid #e0ede7" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#e0ede7"; }} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                      Gender <span style={{ color: "#C9A227" }}>*</span>
                    </label>
                    <select required value={reg.gender} onChange={(e) => setReg({ ...reg, gender: e.target.value })}
                      className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none"
                      style={{ border: "1.5px solid #e0ede7" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#e0ede7"; }}>
                      <option value="" disabled>Select your gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <Field className="sm:col-span-2" label="City" value={reg.city} onChange={(v) => setReg({ ...reg, city: v })} icon={FiMapPin} placeholder="Enter your city of residence." />
                  <Field className="sm:col-span-2" label="Address" value={reg.permanentAddress} onChange={(v) => setReg({ ...reg, permanentAddress: v })} icon={FiMapPin} placeholder="Enter your complete address." />
                </div>
              </div>

              {/* Contact & Account */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2" style={{ borderBottom: "1.5px solid #f0f5f2" }}>
                  <div className="grid size-6 place-items-center rounded-full text-white text-[10px] font-extrabold" style={{ background: "#0B5D3B" }}>2</div>
                  <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "#0B5D3B" }}>Contact & Account</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field className="sm:col-span-2" label="Email Address" value={reg.email} onChange={(v) => setReg({ ...reg, email: v })} icon={FiMail} type="email" placeholder="Provide your active email address." />
                  <Field className="sm:col-span-2" label="Mobile Number" value={reg.phone} onChange={(v) => setReg({ ...reg, phone: v })} icon={FiPhone} type="tel" placeholder="Enter your mobile number in the format e.g. 03001234567" />
                  <Field className="sm:col-span-2" label="Password" value={reg.password} onChange={(v) => setReg({ ...reg, password: v })} icon={FiLock} type="password" placeholder="Create a strong password (min 8 characters)" />
                </div>
              </div>

              {/* Academic */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2" style={{ borderBottom: "1.5px solid #f0f5f2" }}>
                  <div className="grid size-6 place-items-center rounded-full text-white text-[10px] font-extrabold" style={{ background: "#0B5D3B" }}>3</div>
                  <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "#0B5D3B" }}>Academic & Program</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                      Highest Qualification Attained <span style={{ color: "#C9A227" }}>*</span>
                    </label>
                    <select required value={reg.qualification} onChange={(e) => setReg({ ...reg, qualification: e.target.value })}
                      className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none"
                      style={{ border: "1.5px solid #e0ede7" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#e0ede7"; }}>
                      <option value="" disabled>Select your highest educational qualification</option>
                      <option value="matric">Matric</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="bachelors">Bachelor / Higher</option>
                    </select>
                  </div>
                  <Field className="sm:col-span-2" label="Referral Code" value={reg.referralCode} onChange={(v) => setReg({ ...reg, referralCode: v })} icon={FiBook} required={false} placeholder="Enter referral code if you have one" />
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                      First Course <span style={{ color: "#C9A227" }}>*</span>
                    </label>
                    <select required value={reg.course} onChange={(e) => setReg({ ...reg, course: e.target.value })}
                      className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none"
                      style={{ border: "1.5px solid #e0ede7" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#e0ede7"; }}>
                      <option value="" disabled>Choose your Course</option>
                      {courses.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                      Second Course <span className="font-normal" style={{ color: "#999" }}>(Optional)</span>
                    </label>
                    <select value={reg.secondCourse} onChange={(e) => setReg({ ...reg, secondCourse: e.target.value })}
                      className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none"
                      style={{ border: "1.5px solid #e0ede7" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#e0ede7"; }}>
                      <option value="">Choose your Course (Optional)</option>
                      {courses.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Identity Verification */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2" style={{ borderBottom: "1.5px solid #f0f5f2" }}>
                  <div className="grid size-6 place-items-center rounded-full text-white text-[10px] font-extrabold" style={{ background: "#0B5D3B" }}>4</div>
                  <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "#0B5D3B" }}>Identity Verification</span>
                </div>

                {enrollmentType === "online" ? (
                  <div className="flex flex-col gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                          Upload CNIC (Front Side) <span style={{ color: "#C9A227" }}>*</span>
                        </label>
                        <label className="flex items-center gap-2 w-full truncate rounded-lg border bg-white px-4 py-2.5 text-sm cursor-pointer"
                          style={{ border: "1.5px solid #e0ede7", color: cnicFront ? "#073d27" : "#999" }}>
                          <FiUpload className="size-4 shrink-0" style={{ color: "#0B5D3B" }} />
                          <span className="truncate">{cnicFront ? cnicFront.name : "Click to choose or drop your file here"}</span>
                          <input type="file" accept="image/png,image/jpeg,application/pdf" className="hidden"
                            onChange={(e) => setCnicFront(e.target.files?.[0] || null)} />
                        </label>
                        <p className="mt-1 text-[10px]" style={{ color: "#999" }}>Accepted formats: jpg, jpeg, png, pdf (Max 2MB)</p>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                          Upload CNIC (Back Side) <span style={{ color: "#C9A227" }}>*</span>
                        </label>
                        <label className="flex items-center gap-2 w-full truncate rounded-lg border bg-white px-4 py-2.5 text-sm cursor-pointer"
                          style={{ border: "1.5px solid #e0ede7", color: cnicBack ? "#073d27" : "#999" }}>
                          <FiUpload className="size-4 shrink-0" style={{ color: "#0B5D3B" }} />
                          <span className="truncate">{cnicBack ? cnicBack.name : "Click to choose or drop your file here"}</span>
                          <input type="file" accept="image/png,image/jpeg,application/pdf" className="hidden"
                            onChange={(e) => setCnicBack(e.target.files?.[0] || null)} />
                        </label>
                        <p className="mt-1 text-[10px]" style={{ color: "#999" }}>Accepted formats: jpg, jpeg, png, pdf (Max 2MB)</p>
                      </div>
                    </div>
                    {/* Passport photo upload for online enrollment */}
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                          Passport-Size Photo <span style={{ color: "#C9A227" }}>*</span>
                        </label>
                        <label className="flex items-center gap-2 w-full truncate rounded-lg border bg-white px-4 py-2.5 text-sm cursor-pointer"
                          style={{ border: "1.5px solid #e0ede7", color: photo ? "#073d27" : "#999" }}>
                          <FiUpload className="size-4 shrink-0" style={{ color: "#0B5D3B" }} />
                          <span className="truncate">{photo ? photo.name : "Click to upload your photo"}</span>
                          <input type="file" accept="image/png,image/jpeg,image/jfif" className="hidden"
                            onChange={(e) => handlePhotoSelect(e.target.files?.[0] || null)} />
                        </label>
                        <p className="mt-1 text-[10px]" style={{ color: "#999" }}>This photo will appear on your Student ID Card · jpg, jpeg, png (Max 2MB)</p>
                      </div>
                      {/* Card preview */}
                      <div style={{ flexShrink: 0 }}>
                        <div style={{ width: 62, height: 76, background: "#eaf0eb", borderRadius: 4, overflow: "hidden", border: "2px solid #C9A227", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {photoPreview
                            ? <img src={photoPreview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            : <FiUser style={{ width: 22, height: 22, color: "#bbb" }} />}
                        </div>
                        <div style={{ fontSize: 9, textAlign: "center", color: "#aaa", marginTop: 3 }}>Card Preview</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="rounded-lg px-4 py-3 mb-4 text-xs leading-relaxed" style={{ background: "rgba(11,93,59,0.07)", borderLeft: "3px solid #0B5D3B", color: "#073d27" }}>
                      <strong>Physical Enrollment:</strong> Please upload a recent passport-size photo. You will be required to bring original documents (CNIC/B-Form) when you visit the institute.
                    </div>
                    <div className="flex items-start gap-4" style={{ maxWidth: 400 }}>
                      <div className="flex-1">
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                          Passport-Size Photo <span style={{ color: "#C9A227" }}>*</span>
                        </label>
                        <label className="flex items-center gap-2 w-full truncate rounded-lg border bg-white px-4 py-2.5 text-sm cursor-pointer"
                          style={{ border: "1.5px solid #e0ede7", color: photo ? "#073d27" : "#999" }}>
                          <FiUpload className="size-4 shrink-0" style={{ color: "#0B5D3B" }} />
                          <span className="truncate">{photo ? photo.name : "Click to upload your photo"}</span>
                          <input type="file" accept="image/png,image/jpeg,image/jfif" className="hidden"
                            onChange={(e) => setPhoto(e.target.files?.[0] || null)} />
                        </label>
                        <p className="mt-1 text-[10px]" style={{ color: "#999" }}>This photo will appear on your Student ID Card · jpg, jpeg, png (Max 2MB)</p>
                      </div>
                      <div style={{ flexShrink: 0 }}>
                        <div style={{ width: 62, height: 76, background: "#eaf0eb", borderRadius: 4, overflow: "hidden", border: "2px solid #C9A227", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {photo
                            ? <img src={URL.createObjectURL(photo)} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            : <FiUser style={{ width: 22, height: 22, color: "#bbb" }} />}
                        </div>
                        <div style={{ fontSize: 9, textAlign: "center", color: "#aaa", marginTop: 3 }}>Card Preview</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Declaration */}
              <label className="flex items-start gap-2.5 text-xs leading-relaxed cursor-pointer" style={{ color: "#555" }}>
                <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 size-3.5 shrink-0" style={{ accentColor: "#0B5D3B" }} />
                I declare that all the information provided is correct to the best of my knowledge, and I agree to the terms and conditions of the YETP program. <span style={{ color: "#C9A227" }}>*</span>
              </label>

              {regError && <p className="text-center text-xs font-semibold" style={{ color: "#c0392b" }}>{regError}</p>}

              <button type="submit" disabled={regLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ background: "linear-gradient(90deg, #073d27, #0B5D3B)" }}>
                {regLoading ? "Submitting..." : "Submit Application"} <FiArrowRight />
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
