import { Container } from "./primitives";

export function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #052b1c 0%, #0B5D3B 100%)",
        paddingTop: 120,
      }}
    >
      <Container className="py-10">
        <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            {subtitle}
          </p>
        )}
      </Container>
      <div style={{ height: 3, background: "rgba(255,255,255,0.08)" }} />
    </div>
  );
}
