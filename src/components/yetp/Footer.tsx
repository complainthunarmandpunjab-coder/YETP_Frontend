import { Link } from "@tanstack/react-router";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { courses } from "@/data/yetp";
import { Container } from "./primitives";
import logoAsset from "@/assets/logo-yetp.png.asset.json";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/8">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-light to-transparent" />
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <img src={logoAsset.url} alt="YETP" className="size-10 object-contain" />
              <div>
                <div className="font-display text-lg font-bold">YETP</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Learn · Lead · Change</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Youth Empowerment Training Program — turning Pakistan's youth into globally hireable talent.
            </p>
            <div className="mt-5 flex gap-2">
              {[FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaWhatsapp].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:border-brand-light hover:text-white">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {[{ to: "/", l: "Home" }, { to: "/courses", l: "Courses" }, { to: "/about", l: "About" }, { to: "/contact", l: "Contact" }, { to: "/enroll", l: "Enroll" }].map((x) => (
                <li key={x.to}><Link to={x.to as never} className="hover:text-white">{x.l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Programs</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {courses.slice(0, 6).map((c) => (
                <li key={c.slug}><Link to="/courses" className="hover:text-white">{c.title}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><FiMapPin className="mt-0.5 size-4 text-brand-light" /> Karachi, Pakistan</li>
              <li className="flex items-start gap-2"><FiPhone className="mt-0.5 size-4 text-brand-light" /> +92 300 0000000</li>
              <li className="flex items-start gap-2"><FiMail className="mt-0.5 size-4 text-brand-light" /> hello@yetp.pk</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} YETP — Youth Empowerment Training Program. All rights reserved.</span>
          <span>Built with intention. Designed for impact.</span>
        </div>
      </Container>
    </footer>
  );
}
