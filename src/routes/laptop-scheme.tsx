import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Container, FadeIn } from "@/components/yetp/primitives";
import { PageHero } from "@/components/yetp/PageHero";
import {
  FiArrowRight, FiCheckCircle, FiAlertCircle, FiUpload, FiClock, FiXCircle
} from "react-icons/fi";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { getSession } from "@/lib/auth-session";
import { getProfile, applyForScholarship } from "@/lib/api/user";
import type { ScholarshipInfo } from "@/lib/api/user";

export const Route = createFileRoute("/laptop-scheme")({
  head: () => ({ meta: [{ title: "Laptop Scheme — YETP" }] }),
  component: LaptopSchemePage,
});

const eligibility = [
  "Currently enrolled or completed a YETP course",
  "Minimum 85% attendance during the program",
  "Passed the final assessment with 70% or above",
  "Submitted a valid CNIC / B-Form copy",
  "Below 30 years of age at time of application",
  "From a low-income or deserving background",
];

const specs = [
  ["Processor", "Intel Core i5 / AMD Ryzen 5 (10th Gen+)"],
  ["RAM", "8 GB DDR4"],
  ["Storage", "256 GB SSD"],
  ["Display", '15.6" Full HD (1920×1080)'],
  ["OS", "Windows 11 Home"],
  ["Battery", "Up to 8 hours"],
  ["Warranty", "1 Year Manufacturer Warranty"],
];

const steps = [
  { n: "01", title: "Check Eligibility", desc: "Review the eligibility criteria and confirm you meet the requirements for the Laptop Scheme." },
  { n: "02", title: "Submit Application", desc: "Fill out the Laptop Scheme Application Form below with your CNIC, course enrollment details, and income proof." },
  { n: "03", title: "Review Process", desc: "YETP's selection committee reviews applications within 7–10 working days and contacts shortlisted candidates." },
  { n: "04", title: "Receive Laptop", desc: "Selected students receive their laptop at the YETP campus after signing the laptop agreement form." },
];

type FormState = "idle" | "loading" | "success" | "error";

function inputStyle(focused: boolean) {
  return { border: `1px solid ${focused ? "#0B5D3B" : "#d5e8dc"}`, transition: "border-color 0.15s" };
}

function StatusBadge({ status }: { status: ScholarshipInfo["status"] }) {
  const map = {
    pending: { bg: "#fffbeb", border: "#f5e4a0", text: "#7a5a00", icon: FiClock, label: "Under Review" },
    approved: { bg: "#f0f9f4", border: "#a8d5b5", text: "#073d27", icon: FiCheckCircle, label: "Approved" },
    rejected: { bg: "#fff5f5", border: "#fecdca", text: "#912018", icon: FiXCircle, label: "Not Selected" },
  }[status];
  const Icon = map.icon;
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
      style={{ background: map.bg, border: `1px solid ${map.border}`, color: map.text }}>
      <Icon className="size-3.5" /> {map.label}
    </span>
  );
}

function LaptopSchemePage() {
  const [form, setForm] = useState({
    fullName: "", cnic: "", rollNumber: "", email: "", mobileNumber: "", challanNumber: "",
  });
  const [focused, setFocused] = useState<Record<string, boolean>>({});
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [existingApp, setExistingApp] = useState<ScholarshipInfo | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const session = getSession();
    if (!session) return;
    getProfile(session.token)
      .then((res) => {
        const u = res.data.user;
        const sc = res.data.scholarship;
        if (sc) setExistingApp(sc);
        setForm((prev) => ({
          ...prev,
          fullName: u.fullName || prev.fullName,
          cnic: u.cnic || prev.cnic,
          rollNumber: u.rollNumber || prev.rollNumber,
          email: u.email || prev.email,
          mobileNumber: u.mobile || prev.mobileNumber,
        }));
      })
      .catch(() => {});
  }, []);

  function handleFile(file: File | null) {
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!image) { setErrorMsg("Please upload your CNIC / income proof image."); return; }
    setState("loading");
    setErrorMsg("");
    const fd = new FormData();
    fd.append("fullName", form.fullName);
    fd.append("cnic", form.cnic.replace(/-/g, ""));
    fd.append("rollNumber", form.rollNumber);
    fd.append("email", form.email);
    fd.append("mobileNumber", form.mobileNumber);
    fd.append("challanNumber", form.challanNumber);
    fd.append("image", image);
    try {
      await applyForScholarship(fd);
      setState("success");
    } catch (err: unknown) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <div>
      <PageHero
        title="YETP Laptop Scheme"
        subtitle="YETP provides free laptops to deserving students who complete their training with excellence. Empowering youth with the tools they need."
      />

      {/* Intro banner */}
      <div style={{ background: "#073d27" }}>
        <Container className="py-6">
          <div className="flex items-center gap-4">
            <HiOutlineComputerDesktop className="size-10 shrink-0" style={{ color: "#C9A227" }} />
            <div>
              <div className="font-display text-lg font-extrabold text-white">
                Free Laptops for Deserving YETP Students
              </div>
              <p className="text-xs text-white/60 mt-0.5">
                Under YETP's Student Empowerment Initiative, eligible graduates receive a laptop to launch their freelancing or tech career.
              </p>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-white py-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

            {/* Left */}
            <div className="space-y-10">

              {/* How it works */}
              <FadeIn>
                <div className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.3em]" style={{ color: "#C9A227" }}>
                  Process
                </div>
                <h2 className="font-display text-xl font-extrabold mb-6" style={{ color: "#073d27" }}>
                  How the Laptop Scheme Works
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {steps.map((s) => (
                    <div key={s.n} className="flex items-start gap-4 p-5 bg-white"
                      style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}>
                      <div className="font-display text-2xl font-extrabold shrink-0" style={{ color: "#0B5D3B" }}>
                        {s.n}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm mb-1" style={{ color: "#073d27" }}>{s.title}</h4>
                        <p className="text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* Application Form */}
              <FadeIn delay={0.08}>
                <div className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.3em]" style={{ color: "#C9A227" }}>
                  Apply
                </div>
                <h2 className="font-display text-xl font-extrabold mb-6" style={{ color: "#073d27" }}>
                  Laptop Scheme Application
                </h2>

                {/* Already applied */}
                {existingApp ? (
                  <div className="p-6 rounded-sm" style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}>
                    <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
                      <div>
                        <div className="font-bold text-sm mb-1" style={{ color: "#073d27" }}>
                          Application Already Submitted
                        </div>
                        <p className="text-xs" style={{ color: "#666" }}>
                          You submitted your Laptop Scheme application on{" "}
                          <strong>{new Date(existingApp.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}</strong>.
                        </p>
                      </div>
                      <StatusBadge status={existingApp.status} />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 text-xs">
                      {[
                        ["Full Name", existingApp.fullName],
                        ["Roll Number", existingApp.rollNumber],
                        ["CNIC", existingApp.cnic],
                        ["Mobile", existingApp.mobileNumber],
                        ["Challan No.", existingApp.challanNumber],
                      ].map(([k, v]) => (
                        <div key={k} className="p-3 rounded-sm" style={{ background: "#f9fcfa", border: "1px solid #e8f0eb" }}>
                          <div className="font-bold uppercase tracking-wider text-[10px] mb-1" style={{ color: "#888" }}>{k}</div>
                          <div className="font-semibold" style={{ color: "#073d27" }}>{v}</div>
                        </div>
                      ))}
                    </div>
                    {existingApp.status === "pending" && (
                      <div className="flex items-start gap-3 p-3 mt-4 text-xs rounded-sm"
                        style={{ background: "#fffbeb", border: "1px solid #f5e4a0" }}>
                        <FiClock className="mt-0.5 size-4 shrink-0" style={{ color: "#a6841b" }} />
                        <span style={{ color: "#7a5a00" }}>
                          Your application is currently under review. The selection committee will contact you within 7–10 working days.
                        </span>
                      </div>
                    )}
                    {existingApp.status === "approved" && (
                      <div className="flex items-start gap-3 p-3 mt-4 text-xs rounded-sm"
                        style={{ background: "#f0f9f4", border: "1px solid #a8d5b5" }}>
                        <FiCheckCircle className="mt-0.5 size-4 shrink-0" style={{ color: "#0B5D3B" }} />
                        <span style={{ color: "#073d27" }}>
                          <strong>Congratulations!</strong> Your application has been approved. Please visit the YETP campus to collect your laptop and sign the agreement form.
                        </span>
                      </div>
                    )}
                    {existingApp.status === "rejected" && (
                      <div className="flex items-start gap-3 p-3 mt-4 text-xs rounded-sm"
                        style={{ background: "#fff5f5", border: "1px solid #fecdca" }}>
                        <FiXCircle className="mt-0.5 size-4 shrink-0" style={{ color: "#d92d20" }} />
                        <span style={{ color: "#912018" }}>
                          Unfortunately your application was not selected in this cycle. You may re-apply in the next batch. Contact support for more details.
                        </span>
                      </div>
                    )}
                  </div>

                ) : state === "success" ? (
                  <div className="flex items-start gap-4 p-6 rounded-sm"
                    style={{ background: "#f0f9f4", border: "1px solid #a8d5b5" }}>
                    <FiCheckCircle className="mt-0.5 size-6 shrink-0" style={{ color: "#0B5D3B" }} />
                    <div>
                      <div className="font-bold" style={{ color: "#073d27" }}>Application Submitted!</div>
                      <p className="mt-1 text-sm leading-relaxed" style={{ color: "#555" }}>
                        Thank you, <strong>{form.fullName}</strong>. Your Laptop Scheme application has been received.
                        Our committee will review it within 7–10 working days and contact you on <strong>{form.mobileNumber}</strong>.
                      </p>
                    </div>
                  </div>

                ) : (
                  <form onSubmit={handleSubmit} className="bg-white space-y-5 p-7"
                    style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}>

                    {/* Row 1: Full Name + CNIC */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                          Full Name <span style={{ color: "#C9A227" }}>*</span>
                        </label>
                        <input required value={form.fullName}
                          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                          placeholder="Your full name"
                          className="w-full rounded-sm px-4 py-2.5 text-sm outline-none"
                          style={inputStyle(!!focused.fullName)}
                          onFocus={() => setFocused((f) => ({ ...f, fullName: true }))}
                          onBlur={() => setFocused((f) => ({ ...f, fullName: false }))}
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                          CNIC Number <span style={{ color: "#C9A227" }}>*</span>
                        </label>
                        <input required value={form.cnic}
                          onChange={(e) => setForm({ ...form, cnic: e.target.value })}
                          placeholder="35201-1234567-1"
                          className="w-full rounded-sm px-4 py-2.5 text-sm outline-none"
                          style={inputStyle(!!focused.cnic)}
                          onFocus={() => setFocused((f) => ({ ...f, cnic: true }))}
                          onBlur={() => setFocused((f) => ({ ...f, cnic: false }))}
                        />
                      </div>
                    </div>

                    {/* Row 2: Roll Number + Email */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                          Roll Number <span style={{ color: "#C9A227" }}>*</span>
                        </label>
                        <input required value={form.rollNumber}
                          onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
                          placeholder="YETP-10001"
                          className="w-full rounded-sm px-4 py-2.5 text-sm outline-none"
                          style={inputStyle(!!focused.rollNumber)}
                          onFocus={() => setFocused((f) => ({ ...f, rollNumber: true }))}
                          onBlur={() => setFocused((f) => ({ ...f, rollNumber: false }))}
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                          Email Address <span style={{ color: "#C9A227" }}>*</span>
                        </label>
                        <input required type="email" value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@email.com"
                          className="w-full rounded-sm px-4 py-2.5 text-sm outline-none"
                          style={inputStyle(!!focused.email)}
                          onFocus={() => setFocused((f) => ({ ...f, email: true }))}
                          onBlur={() => setFocused((f) => ({ ...f, email: false }))}
                        />
                      </div>
                    </div>

                    {/* Row 3: Mobile + Challan No */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                          Mobile Number <span style={{ color: "#C9A227" }}>*</span>
                        </label>
                        <input required type="tel" value={form.mobileNumber}
                          onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
                          placeholder="03XX-XXXXXXX"
                          className="w-full rounded-sm px-4 py-2.5 text-sm outline-none"
                          style={inputStyle(!!focused.mobileNumber)}
                          onFocus={() => setFocused((f) => ({ ...f, mobileNumber: true }))}
                          onBlur={() => setFocused((f) => ({ ...f, mobileNumber: false }))}
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                          Challan Number <span style={{ color: "#C9A227" }}>*</span>
                        </label>
                        <input required value={form.challanNumber}
                          onChange={(e) => setForm({ ...form, challanNumber: e.target.value })}
                          placeholder="e.g. 10001"
                          className="w-full rounded-sm px-4 py-2.5 text-sm outline-none"
                          style={inputStyle(!!focused.challanNumber)}
                          onFocus={() => setFocused((f) => ({ ...f, challanNumber: true }))}
                          onBlur={() => setFocused((f) => ({ ...f, challanNumber: false }))}
                        />
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                        CNIC / Income Proof Photo <span style={{ color: "#C9A227" }}>*</span>
                      </label>
                      <input ref={fileRef} type="file" accept="image/*" className="hidden"
                        onChange={(e) => handleFile(e.target.files?.[0] ?? null)} />
                      {imagePreview ? (
                        <div className="relative" style={{ border: "1px solid #d5e8dc", borderRadius: 4, overflow: "hidden" }}>
                          <img src={imagePreview} alt="preview" className="w-full object-cover" style={{ maxHeight: 180 }} />
                          <button type="button" onClick={() => handleFile(null)}
                            className="absolute top-2 right-2 flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded"
                            style={{ background: "rgba(0,0,0,0.55)", color: "#fff" }}>
                            <FiXCircle className="size-3.5" /> Remove
                          </button>
                        </div>
                      ) : (
                        <button type="button" onClick={() => fileRef.current?.click()}
                          className="w-full flex flex-col items-center justify-center gap-2 py-8 rounded-sm text-sm"
                          style={{ border: "1.5px dashed #a8d5b5", background: "#f9fcfa", color: "#0B5D3B" }}>
                          <FiUpload className="size-6" />
                          <span className="font-bold">Click to upload</span>
                          <span className="text-xs" style={{ color: "#888" }}>JPG, PNG — max 5 MB</span>
                        </button>
                      )}
                    </div>

                    {/* Error */}
                    {(state === "error" || errorMsg) && (
                      <div className="flex items-start gap-3 p-4 text-xs rounded-sm"
                        style={{ background: "#fff5f5", border: "1px solid #fecdca" }}>
                        <FiAlertCircle className="mt-0.5 size-4 shrink-0" style={{ color: "#d92d20" }} />
                        <span style={{ color: "#912018" }}>{errorMsg || "Submission failed. Please try again."}</span>
                      </div>
                    )}

                    {/* Disclaimer */}
                    <div className="flex items-start gap-3 p-4 text-xs"
                      style={{ background: "#fffbeb", border: "1px solid #f5e4a0" }}>
                      <FiAlertCircle className="mt-0.5 size-4 shrink-0" style={{ color: "#a6841b" }} />
                      <span style={{ color: "#7a5a00" }}>
                        Applications are reviewed by a committee. Providing false information will result in disqualification and may affect future enrollment at YETP.
                      </span>
                    </div>

                    <button type="submit" disabled={state === "loading"}
                      className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-60"
                      style={{ background: "#0B5D3B", borderRadius: 2 }}>
                      {state === "loading" ? "Submitting…" : <><span>Submit Application</span> <FiArrowRight /></>}
                    </button>
                  </form>
                )}
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <FadeIn delay={0.05}>
                <div className="bg-white p-6" style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #C9A227" }}>
                  <div className="text-xs font-extrabold uppercase tracking-wider mb-4" style={{ color: "#0B5D3B" }}>
                    Laptop Specifications
                  </div>
                  <div className="divide-y" style={{ borderColor: "#f0f0f0" }}>
                    {specs.map(([k, v]) => (
                      <div key={k} className="flex justify-between py-2.5 text-xs">
                        <span className="font-bold" style={{ color: "#073d27" }}>{k}</span>
                        <span style={{ color: "#555" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="bg-white p-6" style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}>
                  <div className="text-xs font-extrabold uppercase tracking-wider mb-4" style={{ color: "#0B5D3B" }}>
                    Eligibility Criteria
                  </div>
                  <ul className="space-y-2.5">
                    {eligibility.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs">
                        <FiCheckCircle className="mt-0.5 size-4 shrink-0" style={{ color: "#0B5D3B" }} />
                        <span style={{ color: "#444" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="p-6" style={{ background: "#073d27" }}>
                  <div className="text-xs font-extrabold uppercase tracking-wider mb-2" style={{ color: "#C9A227" }}>
                    Need Help?
                  </div>
                  <p className="text-xs text-white/70 mb-4">
                    Contact the YETP team for assistance with your application or to check your eligibility.
                  </p>
                  <a href="tel:+923001234567"
                    className="flex items-center gap-2 text-xs font-bold text-white hover:opacity-80 transition-opacity">
                    <FiArrowRight className="size-3.5" style={{ color: "#C9A227" }} /> +92 300 123 4567
                  </a>
                </div>
              </FadeIn>
            </div>

          </div>
        </Container>
      </div>
    </div>
  );
}
