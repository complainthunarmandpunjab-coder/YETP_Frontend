import { Link } from "@tanstack/react-router";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "ghost" | "gold" | "outline";
type ButtonSize = "md" | "lg";

const buttonBase =
  "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 will-change-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-brand to-brand-light text-white shadow-sm hover:shadow-[0_8px_30px_-8px_var(--brand-light)] hover:-translate-y-0.5",
  gold:
    "bg-gradient-to-r from-gold to-[oklch(0.82_0.14_82)] text-ink font-bold hover:shadow-[0_8px_30px_-8px_var(--gold)] hover:-translate-y-0.5",
  ghost:
    "text-foreground/80 hover:text-foreground hover:bg-brand/6",
  outline:
    "border border-brand/25 text-brand hover:border-brand hover:bg-brand/6",
};

const buttonSizes: Record<ButtonSize, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export function Button({
  variant = "primary",
  size = "lg",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <button className={cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  to,
  variant = "primary",
  size = "lg",
  className,
  children,
  ...props
}: { to: string; variant?: ButtonVariant; size?: ButtonSize; className?: string; children: ReactNode } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  if (to.startsWith("/")) {
    return (
      <Link to={to as never} className={cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)}>
        {children}
      </Link>
    );
  }
  return (
    <a href={to} className={cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)} {...props}>
      {children}
    </a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left", className)}
    >
      {eyebrow && (
        <div className={cn("mb-4 flex", align === "center" ? "justify-center" : "justify-start")}>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            <span className="size-1.5 rounded-full bg-gold animate-pulse" />
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.05]">{title}</h2>
      {description && <p className="mt-4 text-base sm:text-lg text-muted-foreground">{description}</p>}
    </motion.div>
  );
}

export function FadeIn({
  children,
  delay = 0,
  y = 24,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number; className?: string } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}
