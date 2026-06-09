import { Link } from "@tanstack/react-router";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import { courses } from "@/data/yetp";
import { Container } from "./primitives";
import logoUrl from "@/assets/logo-yetp.png";

const quickLinks = [
  { to: "/", l: "Home" },
  { to: "/enroll", l: "Apply Now" },
  { to: "/courses", l: "Our Courses" },
  { to: "/about", l: "About Us" },
  { to: "/contact", l: "Contact Us" },
  { to: "/careers", l: "Careers" },
  { to: "/terms", l: "Terms & Conditions" },
];

export function Footer() {
  return (
    <footer style={{ background: "#073d27", color: "white" }}>
      {/* Top tricolor rule */}
      <div className="flex w-full" style={{ height: 4 }}>
        <div className="flex-1" style={{ background: "#0B5D3B" }} />
        <div className="flex-1" style={{ background: "#C9A227" }} />
        <div className="flex-1" style={{ background: "#0B5D3B" }} />
      </div>

      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <div
                className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-white/10 p-1"
              >
                <img src={logoUrl} alt="YETP" className="size-9 object-contain" />
              </div>
              <div>
                <div className="font-display text-lg font-extrabold text-white">YETP</div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Learn · Lead · Change
                </div>
              </div>
            </div>
            <div className="mt-3 h-0.5 w-10" style={{ background: "#C9A227" }} />
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Pakistan's No.1 IT Training Institute providing professional IT Trainings with over 4,500+ Alumni since 2021. Learn, Lead and Change.
            </p>
            <div
              className="mt-3 flex items-center gap-2 text-xs"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <FiClock className="size-3.5" style={{ color: "#C9A227" }} />
              <span>Mon - Sun &nbsp; 10:00 AM - 6:00 PM</span>
            </div>
            <div className="mt-5 flex gap-2">
              {[
                { Icon: FaFacebookF,  href: "https://www.facebook.com/share/1MUL1L7Fao/" },
                { Icon: FaInstagram,  href: "https://www.instagram.com/yetp.pk?igsh=MWpzYndyeDV5dHo5Zg==" },
                { Icon: FaLinkedinIn, href: "https://www.linkedin.com/company/yetp/" },
                { Icon: FaWhatsapp, href: "https://wa.me/923029898082" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="social"
                  className="grid size-8 place-items-center transition-colors"
                  style={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.5)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#C9A227";
                    (e.currentTarget as HTMLElement).style.borderColor = "#C9A227";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                  }}
                >
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div
              className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.3em]"
              style={{ color: "#C9A227" }}
            >
              Quick Links
            </div>
            <div className="mb-4 h-0.5 w-10" style={{ background: "#C9A227" }} />
            <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              {quickLinks.map((x) => (
                <li key={x.l}>
                  <Link
                    to={x.to as never}
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <span className="size-1 rounded-full" style={{ background: "#C9A227", flexShrink: 0 }} />
                    {x.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <div
              className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.3em]"
              style={{ color: "#C9A227" }}
            >
              Programs
            </div>
            <div className="mb-4 h-0.5 w-10" style={{ background: "#C9A227" }} />
            <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              {courses.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/courses"
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <span className="size-1 rounded-full shrink-0" style={{ background: "#C9A227" }} />
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div
              className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.3em]"
              style={{ color: "#C9A227" }}
            >
              Contact Us
            </div>
            <div className="mb-4 h-0.5 w-10" style={{ background: "#C9A227" }} />
            <ul className="space-y-4 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              <li className="flex items-start gap-2.5">
                <FiPhone className="mt-0.5 size-4 shrink-0" style={{ color: "#C9A227" }} />
                <div className="space-y-1">
                  <a href="tel:+923029898082" className="block hover:text-white transition-colors">
                    0302-9898082
                  </a>
                  <a href="tel:+923249881887" className="block hover:text-white transition-colors">
                    0324-9881887
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <FiMail className="mt-0.5 size-4 shrink-0" style={{ color: "#C9A227" }} />
                <div className="space-y-1">
                  <a href="mailto:info@yetp.pk" className="block hover:text-white transition-colors">
                    info@yetp.pk
                  </a>
                  <a href="mailto:contact@yetp.pk" className="block hover:text-white transition-colors">
                    contact@yetp.pk
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <FiMapPin className="mt-0.5 size-4 shrink-0" style={{ color: "#C9A227" }} />
                <span>Building No 30, Tariq Block, Usmani Rd, New Garden Town, Lahore, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-col items-center justify-between gap-3 pt-6 text-xs md:flex-row"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          <span>
            &copy; {new Date().getFullYear()} yetp.pk — Youth Empowerment Training Program. All rights reserved.
          </span>
          <span>Built with intention. Designed for impact.</span>
        </div>
      </Container>
    </footer>
  );
}
