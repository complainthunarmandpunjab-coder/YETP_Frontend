import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";
import logoUrl from "@/assets/logo-yetp.png";

type DropItem = { label: string; to: string };
type NavItem  = { label: string; to: string; drop?: DropItem[] };

const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Our Courses", to: "/courses" },
  { label: "About Us", to: "/about" },
  {
    label: "Info Desk", to: "/faqs",
    drop: [
      { label: "FAQ's",    to: "/faqs" },
      { label: "Contact",  to: "/contact" },
      { label: "Our Team", to: "/team" },
      { label: "Events",   to: "/events" },
    ],
  },
  { label: "LMS Portal", to: "/lms" },
  {
    label: "Verification", to: "/fee-verification",
    drop: [
      { label: "Fee Verification",         to: "/fee-verification" },
      { label: "Certificate Verification", to: "/certificate-verification" },
    ],
  },
  { label: "Careers",           to: "/careers" },
  { label: "Our Success Story", to: "/success-story" },
  { label: "Laptop Scheme",     to: "/laptop-scheme" },
];

function Dropdown({ items, open }: { items: DropItem[]; open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.15 }}
          className="absolute left-0 top-full z-50 min-w-[190px] overflow-hidden bg-white shadow-xl"
          style={{ borderTop: "3px solid #C9A227", borderRadius: "0 0 6px 6px" }}
        >
          {items.map((item, i) => (
            <Link
              key={item.label}
              to={item.to as never}
              className="block px-5 py-2.5 text-[13px] font-medium text-[#333] hover:bg-[#f0f8f4] hover:text-[#0B5D3B] transition-colors"
              style={{ borderBottom: i < items.length - 1 ? "1px solid #f0f0f0" : "none" }}
            >
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [openDrop, setOpenDrop]     = useState<string | null>(null);
  const [mobileExp, setMobileExp]   = useState<string | null>(null);
  const [scrolled, setScrolled]     = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMenuOpen(false); setMobileExp(null); }, [pathname]);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const enter = (label: string) => { if (timer.current) clearTimeout(timer.current); setOpenDrop(label); };
  const leave = () => { timer.current = setTimeout(() => setOpenDrop(null), 130); };

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-shadow duration-300", scrolled && "shadow-2xl")}>

      {/* ── Row 1: dark green — logo | phone | social ─── */}
      <div style={{ background: "#0B5D3B" }}>
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-1.5">

          {/* Logo + name */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoUrl}
              alt="YETP Logo"
              className="size-[46px] rounded-full object-contain"
              style={{ border: "2px solid rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.08)", padding: 3 }}
            />
            <div>
              <div className="font-display text-[22px] font-extrabold leading-tight text-white">YETP</div>
              <div className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "#C9A227" }}>
                Learn &nbsp;·&nbsp; Lead &nbsp;·&nbsp; Change
              </div>
            </div>
          </Link>

          {/* Phone — center */}
          <div className="hidden md:flex items-center gap-2 text-sm font-semibold" style={{ color: "rgba(255,255,255,0.82)" }}>
            <span style={{ color: "#C9A227", fontWeight: 700 }}>Make a call:</span>
            &nbsp;0302-9898082 &nbsp;||&nbsp; 0324-9881887
          </div>

          {/* Social — right */}
          <div className="flex items-center gap-4">
            {[
              { Icon: FaFacebookF,  href: "https://www.facebook.com/share/1MUL1L7Fao/" },
              { Icon: FaInstagram,  href: "https://www.instagram.com/yetp.pk?igsh=MWpzYndyeDV5dHo5Zg==" },
              { Icon: FaLinkedinIn, href: "https://www.linkedin.com/company/yetp/" },
              { Icon: FaWhatsapp, href: "https://wa.me/923029898082" },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                className="flex size-8 items-center justify-center rounded-full transition-all hover:scale-110"
                style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#C9A227"; (e.currentTarget as HTMLElement).style.color = "#073d27"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; }}
              >
                <Icon className="size-3.5" />
              </a>
            ))}
            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="ml-1 flex size-9 items-center justify-center rounded lg:hidden"
              style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
            >
              {menuOpen ? <FiX className="size-5" /> : <FiMenu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Row 2: white nav bar ───────────────────────── */}
      <div className="hidden bg-white lg:block" style={{ borderBottom: "2px solid #0B5D3B" }}>
        <div className="mx-auto flex max-w-[1280px] items-center px-6">
          {navItems.map((item) => {
            const active = pathname === item.to;
            const isOpen = openDrop === item.label;
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.drop && enter(item.label)}
                onMouseLeave={() => item.drop && leave()}
              >
                <Link
                  to={item.to as never}
                  className={cn(
                    "flex items-center gap-0.5 whitespace-nowrap px-3 py-3 text-[11.5px] font-semibold transition-colors",
                    active
                      ? "text-[#0B5D3B] border-b-2 border-[#0B5D3B]"
                      : "text-[#333] hover:text-[#0B5D3B]",
                  )}
                >
                  {item.label}
                  {item.drop && (
                    <FiChevronDown className={cn("ml-0.5 size-3.5 transition-transform", isOpen && "rotate-180")} />
                  )}
                </Link>
                {item.drop && <Dropdown items={item.drop} open={isOpen} />}
              </div>
            );
          })}

          {/* Right side: Candidate Login + Apply Now */}
          <div className="ml-auto flex items-center gap-2">
            <a
              href="/candidate-login"
              className="whitespace-nowrap rounded-full px-5 py-2 text-[12px] font-extrabold uppercase tracking-wide transition-all text-[#0B5D3B] hover:bg-[#073d27] hover:text-white hover:border-[#073d27]"
              style={{ border: "1.5px solid #0B5D3B" }}
            >
              Candidate Login
            </a>
            <a
              href="/enroll"
              className="whitespace-nowrap rounded-full px-6 py-2 text-[13px] font-extrabold uppercase tracking-wide transition-all hover:opacity-90 hover:scale-105"
              style={{ background: "#C9A227", color: "#073d27", boxShadow: "0 3px 12px rgba(201,162,39,0.4)" }}
            >
              APPLY NOW
            </a>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ─────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden lg:hidden"
            style={{ background: "#073d27" }}
          >
            <div className="flex flex-col px-4 py-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center">
                    <Link
                      to={item.to as never}
                      className={cn(
                        "flex-1 px-3 py-3 text-sm font-semibold",
                        pathname === item.to ? "text-[#C9A227]" : "text-white/75 hover:text-white",
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.drop && (
                      <button
                        onClick={() => setMobileExp(mobileExp === item.label ? null : item.label)}
                        className="p-3 text-white/50"
                      >
                        <FiChevronDown className={cn("size-4 transition-transform", mobileExp === item.label && "rotate-180")} />
                      </button>
                    )}
                  </div>
                  {item.drop && mobileExp === item.label && (
                    <div style={{ background: "rgba(0,0,0,0.25)" }} className="ml-4 mb-1 rounded">
                      {item.drop.map((d) => (
                        <Link key={d.label} to={d.to as never}
                          className="block px-5 py-2.5 text-xs text-white/65 hover:text-white transition-colors">
                          {d.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a href="/candidate-login"
                className="mt-3 rounded-full py-3 text-center text-sm font-extrabold uppercase border"
                style={{ border: "1.5px solid rgba(255,255,255,0.4)", color: "white" }}>
                Candidate Login
              </a>
              <a href="/enroll"
                className="my-2 rounded-full py-3 text-center text-sm font-extrabold uppercase text-[#073d27]"
                style={{ background: "#C9A227" }}>
                APPLY NOW
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
