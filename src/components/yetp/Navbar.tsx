import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { LinkButton } from "./primitives";
import logoAsset from "@/assets/logo-yetp.png.asset.json";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-strong py-2" : "py-4",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-2">
          <img src={logoAsset.url} alt="YETP" className="size-10 object-contain transition-transform group-hover:scale-105" />
          <div className="leading-none">
            <div className="font-display text-lg font-bold tracking-tight">YETP</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Learn · Lead · Change</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to as never}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  active ? "text-white" : "text-muted-foreground hover:text-white",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/8 ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <LinkButton to="/enroll" size="md" variant="primary">Enroll Now</LinkButton>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 md:hidden"
        >
          {open ? <FiX className="size-5" /> : <FiMenu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-5 mt-3 overflow-hidden rounded-2xl glass md:hidden"
          >
            <div className="flex flex-col p-3">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to as never}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm",
                    pathname === l.to ? "bg-white/10 text-white" : "text-muted-foreground hover:bg-white/5 hover:text-white",
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <div className="p-2">
                <LinkButton to="/enroll" size="md" className="w-full">Enroll Now</LinkButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
