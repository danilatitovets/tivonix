import React from "react";
import { cx } from "./uiBits";

export function IPhoneFrame({
  children,
  className,
  show,
}: {
  children: React.ReactNode;
  className?: string;
  show: boolean;
}) {
  return (
    <div
      className={cx(
        "relative w-[360px] max-w-[92vw]",
        "transition-all duration-700 ease-out",
        show ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-[0.98]",
        className
      )}
    >
      <div
        className={cx(
          "relative overflow-hidden rounded-[44px]",
          "border border-white/12 bg-[#0b0b0c]/80",
          "shadow-[0_28px_90px_rgba(0,0,0,0.65)]"
        )}
      >
        {/* subtle conic-ish border */}
        <div className="pointer-events-none absolute inset-0 rounded-[44px] ring-1 ring-white/10" />
        <div className="pointer-events-none absolute -inset-[2px] rounded-[46px] bg-[radial-gradient(900px_400px_at_40%_-10%,rgba(255,160,70,0.20),transparent_60%),radial-gradient(700px_360px_at_70%_110%,rgba(255,120,40,0.18),transparent_58%)] opacity-80" />

        {/* notch */}
        <div className="absolute left-1/2 top-[10px] z-10 h-[28px] w-[140px] -translate-x-1/2 rounded-[16px] bg-black/80 border border-white/10" />
        <div className="absolute left-1/2 top-[18px] z-10 h-[10px] w-[48px] -translate-x-1/2 rounded-full bg-white/10" />

        <div className="relative h-[720px] w-full bg-[radial-gradient(900px_700px_at_50%_0%,rgba(255,255,255,0.06),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_22%,rgba(255,255,255,0.02))]">
          {children}
        </div>
      </div>
    </div>
  );
}

export function TopTimeline({
  title,
  days,
  activeDay,
}: {
  title: string;
  days: number;
  activeDay: number;
}) {
  const items = Array.from({ length: days }, (_, i) => i + 1);
  return (
    <div className="px-5 pt-8">
      <div className="flex items-center justify-between">
        <div className="text-white/90 text-[13px] font-semibold">{title}</div>
        <div className="text-white/55 text-[12px]">день {activeDay}/{days}</div>
      </div>
      <div className="mt-3 h-[10px] rounded-full border border-white/10 bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,rgba(255,160,70,0.95),rgba(255,120,40,0.95),rgba(255,220,170,0.55))]"
          style={{ width: `${(activeDay / days) * 100}%` }}
        />
      </div>

      <div className="mt-3 grid grid-cols-14 gap-1.5">
        {items.map((d) => {
          const on = d <= activeDay;
          const isActive = d === activeDay;
          return (
            <div
              key={d}
              className={cx(
                "h-[10px] rounded-full border",
                on ? "border-white/10 bg-white/18" : "border-white/8 bg-white/6",
                isActive && "ring-2 ring-[rgba(255,160,70,0.45)]"
              )}
              title={`day ${d}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export function ChatHeader({
  name,
  status,
  avatarUrl,
}: {
  name: string;
  status: string;
  avatarUrl?: string;
}) {
  return (
    <div className="px-5 pt-4 pb-3 flex items-center gap-3">
      <div className="h-9 w-9 rounded-full border border-white/10 overflow-hidden bg-white/5">
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(18px_18px_at_30%_30%,rgba(255,160,70,0.28),transparent_60%),radial-gradient(18px_18px_at_70%_70%,rgba(255,120,40,0.18),transparent_60%)]" />
        )}
      </div>
      <div className="flex-1">
        <div className="text-white/92 text-[13px] font-semibold leading-tight">
          {name}
        </div>
        <div className="text-white/55 text-[12px] leading-tight">{status}</div>
      </div>
      <div className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/65">
        ⋯
      </div>
    </div>
  );
}

export function Bubble({
  side,
  children,
  subtle,
}: {
  side: "left" | "right";
  children: React.ReactNode;
  subtle?: boolean;
}) {
  const isRight = side === "right";
  return (
    <div className={cx("flex", isRight ? "justify-end" : "justify-start")}>
      <div
        className={cx(
          "max-w-[85%] rounded-[18px] px-4 py-3 text-[13px] leading-snug",
          isRight
            ? "bg-[linear-gradient(135deg,rgba(255,160,70,0.88),rgba(255,120,40,0.88),rgba(255,220,170,0.30))] text-black/90"
            : "bg-white/10 text-white/90 border border-white/10",
          subtle && "opacity-80"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function MiniCodeCard({
  lines,
  progress,
}: {
  lines: string[];
  progress: number; // 0..1 typing
}) {
  const visible = Math.max(1, Math.floor(lines.length * progress));
  return (
    <div className="rounded-2xl border border-white/10 bg-black/35 overflow-hidden">
      <div className="px-4 py-2 flex items-center gap-2 border-b border-white/10 bg-white/5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
        <div className="ml-2 text-white/55 text-[12px]">editor.ts</div>
      </div>
      <div className="px-4 py-3 font-mono text-[11px] leading-[1.55] text-white/80">
        {lines.slice(0, visible).map((l, i) => (
          <div key={i} className="whitespace-pre">
            <span className="text-white/30 mr-3">{String(i + 1).padStart(2, "0")}</span>
            {l}
          </div>
        ))}
        <div className="mt-2 h-2 w-24 rounded bg-white/10" />
      </div>
    </div>
  );
}

export function ImageGridMock({ active }: { active: boolean }) {
  const cells = Array.from({ length: 4 }, (_, i) => i);
  return (
    <div className="grid grid-cols-2 gap-3">
      {cells.map((i) => (
        <div
          key={i}
          className={cx(
            "relative overflow-hidden rounded-2xl border border-white/10 bg-white/6",
            "h-[110px]"
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(90px_70px_at_30%_20%,rgba(255,160,70,0.22),transparent_60%),radial-gradient(80px_60px_at_80%_90%,rgba(255,120,40,0.16),transparent_55%)]" />
          <div
            className={cx(
              "absolute -inset-[40%] rotate-12 bg-white/10 blur-xl",
              active ? "opacity-100" : "opacity-40"
            )}
            style={{ animation: active ? "hs-shimmer 1.6s linear infinite" : undefined }}
          />
          <div className="absolute bottom-2 left-2 right-2 h-[10px] rounded bg-white/10" />
        </div>
      ))}
    </div>
  );
}
