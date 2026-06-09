import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Container, FadeIn } from "@/components/yetp/primitives";
import { PageHero } from "@/components/yetp/PageHero";
import { FiSearch, FiCheckCircle, FiAlertCircle, FiPhone, FiMail, FiArrowRight } from "react-icons/fi";
import { HiOutlineCreditCard } from "react-icons/hi2";

export const Route = createFileRoute("/fee-verification")({
  head: () => ({
    meta: [{ title: "Fee Verification — YETP" }],
  }),
  component: FeeVerificationPage,
});

type Status = "idle" | "found" | "not_found";

const fakePaid = ["YETP-2024-1001", "YETP-2024-1002", "YETP-2025-0305", "YETP-2025-0101"];

function FeeVerificationPage() {
  const [receiptNo, setReceiptNo] = useState("");
  const [cnic, setCnic] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    const upper = receiptNo.trim().toUpperCase();
    setStatus(fakePaid.includes(upper) ? "found" : "not_found");
  }

  return (
    <div>
      <PageHero
        title="Fee Verification"
        subtitle="Verify your YETP fee submission using your receipt number or CNIC to confirm payment status."
        breadcrumb="Fee Verification"
      />

      <div className="bg-white py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">

            {/* Verification Form */}
            <div>
              <FadeIn>
                <div className="bg-white" style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #0B5D3B" }}>
                  <div
                    className="px-8 py-4 border-b flex items-center gap-3"
                    style={{ borderColor: "#f0f0f0", background: "#f9fcfb" }}
                  >
                    <HiOutlineCreditCard className="size-5" style={{ color: "#0B5D3B" }} />
                    <span className="font-bold text-sm" style={{ color: "#073d27" }}>Verify Fee Submission</span>
                  </div>

                  <form onSubmit={handleVerify} className="p-8 space-y-5">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                        Receipt / Voucher Number <span style={{ color: "#C9A227" }}>*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                          <FiSearch className="size-4" style={{ color: "#0B5D3B" }} />
                        </div>
                        <input
                          type="text"
                          required
                          value={receiptNo}
                          onChange={(e) => { setReceiptNo(e.target.value); setStatus("idle"); }}
                          placeholder="e.g. YETP-2025-0101"
                          className="w-full rounded-sm border bg-white py-2.5 pl-10 pr-4 text-sm outline-none"
                          style={{ border: "1px solid #d5e8dc" }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(11,93,59,0.1)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "#d5e8dc"; e.currentTarget.style.boxShadow = "none"; }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider" style={{ color: "#555" }}>
                        CNIC / B-Form Number (Optional)
                      </label>
                      <input
                        type="text"
                        value={cnic}
                        onChange={(e) => setCnic(e.target.value)}
                        placeholder="e.g. 35201-1234567-1"
                        className="w-full rounded-sm border bg-white px-4 py-2.5 text-sm outline-none"
                        style={{ border: "1px solid #d5e8dc" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#0B5D3B"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "#d5e8dc"; }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                      style={{ background: "#0B5D3B", borderRadius: 2 }}
                    >
                      <FiSearch className="size-4" /> Verify Payment
                    </button>
                  </form>

                  {/* Result */}
                  {status === "found" && (
                    <div
                      className="mx-8 mb-8 flex items-start gap-4 p-5 rounded-sm"
                      style={{ background: "#f0f9f4", border: "1px solid #a8d5b5" }}
                    >
                      <FiCheckCircle className="mt-0.5 size-5 shrink-0" style={{ color: "#0B5D3B" }} />
                      <div>
                        <div className="font-bold text-sm" style={{ color: "#073d27" }}>Payment Verified</div>
                        <p className="mt-0.5 text-xs" style={{ color: "#555" }}>
                          Your fee submission for receipt <strong>{receiptNo.trim().toUpperCase()}</strong> has been recorded and verified in our system.
                        </p>
                      </div>
                    </div>
                  )}

                  {status === "not_found" && (
                    <div
                      className="mx-8 mb-8 flex items-start gap-4 p-5 rounded-sm"
                      style={{ background: "#fff8f0", border: "1px solid #f5c6a0" }}
                    >
                      <FiAlertCircle className="mt-0.5 size-5 shrink-0 text-orange-500" />
                      <div>
                        <div className="font-bold text-sm" style={{ color: "#7a3a00" }}>Record Not Found</div>
                        <p className="mt-0.5 text-xs" style={{ color: "#7a5a30" }}>
                          No payment record found for this receipt number. Please check the number and try again, or contact YETP admin for assistance.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </FadeIn>

              {/* Info table */}
              <FadeIn delay={0.1}>
                <div className="mt-6 bg-white" style={{ border: "1px solid #e5e5e5" }}>
                  <div className="px-6 py-3 border-b text-xs font-extrabold uppercase tracking-widest"
                    style={{ borderColor: "#f0f0f0", color: "#0B5D3B", background: "#f9fcfb" }}>
                    How to Find Your Receipt Number
                  </div>
                  <div className="divide-y" style={{ borderColor: "#f0f0f0" }}>
                    {[
                      ["Bank Deposit Slip", "The receipt number is printed at the top of your bank deposit slip."],
                      ["EasyPaisa / JazzCash", "The transaction ID sent via SMS is your receipt number."],
                      ["HBL / UBL Online", "Check the reference number in your bank portal transaction history."],
                      ["Cash at Institute", "The manually issued voucher number given at the YETP front desk."],
                    ].map(([title, desc]) => (
                      <div key={title} className="flex items-start gap-4 px-6 py-4">
                        <div className="min-w-[140px] text-xs font-bold" style={{ color: "#073d27" }}>{title}</div>
                        <div className="text-xs" style={{ color: "#6b6b6b" }}>{desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <FadeIn delay={0.05}>
                <div className="bg-white p-6" style={{ border: "1px solid #e5e5e5", borderTop: "3px solid #C9A227" }}>
                  <div className="text-xs font-extrabold uppercase tracking-wider mb-4" style={{ color: "#0B5D3B" }}>
                    Payment Methods
                  </div>
                  {[
                    "HBL Bank — Account: 0082-7988802-01",
                    "Bank Alfalah — Account: 0147-1001-17874",
                    "JazzCash — 0302-9898082",
                    "EasyPaisa — 0302-9898082",
                    "Cash at YETP Office, Lahore",
                  ].map((m) => (
                    <div key={m} className="flex items-start gap-2 py-1.5 text-sm" style={{ color: "#444" }}>
                      <FiCheckCircle className="mt-0.5 size-3.5 shrink-0" style={{ color: "#0B5D3B" }} /> {m}
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.08}>
                <div className="bg-white p-6" style={{ border: "1px solid #e5e5e5", borderLeft: "3px solid #0B5D3B" }}>
                  <div className="text-xs font-extrabold uppercase tracking-wider mb-4" style={{ color: "#0B5D3B" }}>
                    Need Help?
                  </div>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "#6b6b6b" }}>
                    If you cannot find your payment record, please contact our admin team with your CNIC and payment proof.
                  </p>
                  <div className="space-y-2.5">
                    <a href="tel:+923029898082" className="flex items-center gap-2 text-sm hover:text-[#0B5D3B]" style={{ color: "#555" }}>
                      <FiPhone className="size-4 text-[#C9A227]" /> 0302-9898082
                    </a>
                    <a href="mailto:info@yetp.pk" className="flex items-center gap-2 text-sm hover:text-[#0B5D3B]" style={{ color: "#555" }}>
                      <FiMail className="size-4 text-[#C9A227]" /> info@yetp.pk
                    </a>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="p-6 text-center text-white" style={{ background: "#0B5D3B" }}>
                  <div className="text-sm font-bold mb-1">Ready to Apply?</div>
                  <p className="text-xs text-white/65 mb-3 leading-relaxed">
                    Not enrolled yet? Apply now for YETP's upcoming batch.
                  </p>
                  <a href="/enroll"
                    className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold"
                    style={{ background: "#C9A227", color: "#073d27", borderRadius: 2 }}>
                    Apply Now <FiArrowRight />
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
