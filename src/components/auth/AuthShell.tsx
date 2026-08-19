import type { ReactNode } from "react";

function GlowOrb({ className, delay }: { className?: string; delay?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`${className} animate-pulse`}
      style={{ animationDelay: delay }}
    />
  );
}

// Subtle holographic HUD grid backdrop.
function GridHud() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,243,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,0.05) 1px, transparent 1px)",
        backgroundSize: "42px 42px",
      }}
    />
  );
}

// Floating, breathing particles that drift across the background.
function ParticleField() {
  const count = 28;
  const sizes = ["w-1 h-1", "w-1.5 h-1.5", "w-2 h-2"];
  const colors = ["bg-cyan-400/35", "bg-teal-300/25", "bg-blue-400/20"];
  const delays = ["0.3s", "0.7s", "1.1s", "1.5s", "1.9s", "2.3s"];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      {Array.from({ length: count }).map((_, i) => {
        // Golden-angle spread gives an even, natural-looking distribution.
        const left = ((i * 137.508) % 100).toFixed(2);
        const top = ((i * 61.7) % 92 + 4).toFixed(2);
        const size = sizes[i % sizes.length];
        const color = colors[i % colors.length];
        const delay = delays[i % delays.length];
        const blur = i % 2 === 0 ? "blur-[1px]" : "blur-sm";
        return (
          <span
            key={i}
            className={`absolute rounded-full ${size} ${color} ${blur} animate-pulse`}
            style={{ left: `${left}%`, top: `${top}%`, animationDelay: delay }}
          />
        );
      })}
    </div>
  );
}

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* Base gradient (back-most) */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-black via-slate-950 to-[#031f2b]" />

      {/* HUD grid */}
      <GridHud />

      {/* Breathing glow orbs */}
      <GlowOrb
        className="absolute top-[18%] -left-40 h-80 w-80 -z-10 rounded-full bg-cyan-400/25 blur-[90px]"
        delay="0.5s"
      />
      <GlowOrb
        className="absolute bottom-[22%] -right-40 h-80 w-80 -z-10 rounded-full bg-teal-300/25 blur-[90px]"
        delay="1.8s"
      />
      <GlowOrb
        className="absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/15 blur-[80px]"
        delay="1.1s"
      />

      {/* Floating particles */}
      <ParticleField />

      <div className="relative z-10 w-full max-w-md px-4 py-8">
        <div className="rounded-[34px] bg-gradient-to-r from-cyan-300/30 via-teal-300/20 to-blue-300/30 p-px shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
          <div className="rounded-[28px] bg-black/45 px-8 py-9">
            <div className="mb-6 flex justify-center">
              <span className="text-[26px] font-extrabold tracking-[0.4em] text-cyan-50 drop-shadow-[0_0_12px_rgba(0,243,255,0.85)] drop-shadow-[0_0_22px_rgba(0,243,255,0.5)]">
                THSEMS
              </span>
            </div>

            <h1 className="text-center text-2xl font-medium text-white">
              {title}
            </h1>
            <p className="mt-1.5 text-center text-sm text-white/55">
              {subtitle}
            </p>

            <div className="my-6 flex flex-col gap-5">{children}</div>

            {footer && (
              <div className="text-center text-sm text-white/60">{footer}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
