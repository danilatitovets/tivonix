// src/components/landing/Benefits.tsx
import React, { useMemo } from "react";
import Section from "../ui/Section";
import Container from "../ui/Container";
import { useLang } from "../../i18n/LangProvider";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

// ✅ фотка (public/images/mak.png)
const RIGHT_IMG = "/images/mak.png";

function IconRocket() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 10l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M15.5 3.5c3.4 1 5.9 3.5 6.9 6.9-2 6.1-7.7 9.9-13.8 9.2-.6-.1-1.1-.6-1.2-1.2C6.6 11.2 10.4 5.5 16.5 3.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M6 18l-2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}
function IconLayout() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="2" opacity="0.7" />
      <path d="M8 14h5M8 17h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l8 4v6c0 5-3.4 9-8 11C7.4 22 4 18 4 13V7l8-4Z" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8.5 12.2l2.3 2.3L15.8 9.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconPlug() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 3v6M15 3v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 9h10v2a5 5 0 0 1-10 0V9Z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 16v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconSpark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2l1.4 6.1L20 10l-6.6 1.9L12 18l-1.4-6.1L4 10l6.6-1.9L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconWrench() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 7.5a5 5 0 0 1-6.8 4.7L7.7 18.7a2 2 0 0 1-2.8 0l-.6-.6a2 2 0 0 1 0-2.8l6.5-6.5A5 5 0 0 1 17.5 3l-3 3 3.5 3.5 3-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Benefit = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  glow: string;
  badge: string;
};

function BenefitRow({ b, rowLabel, rowMeta }: { b: Benefit; rowLabel: string; rowMeta: string }) {
  return (
    <div
      className={cx(
        "group relative overflow-hidden rounded-[22px]",
        "border border-white/10 bg-white/[0.05] backdrop-blur-2xl",
        "shadow-[0_22px_80px_rgba(0,0,0,0.50)]"
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-10 opacity-[0.55] blur-2xl" style={{ background: b.glow }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.52),rgba(0,0,0,0.86))]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute inset-0 ring-1 ring-white/10" />
      </div>

      <div className="relative z-10 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div
              className={cx(
                "grid place-items-center h-10 w-10 shrink-0 rounded-2xl",
                "border border-white/12 bg-black/25 backdrop-blur-xl",
                "text-[#FF9A3D] shadow-[0_14px_44px_rgba(0,0,0,0.42)]"
              )}
            >
              {b.icon}
            </div>

            <div className="min-w-0">
              <div className="text-[15px] sm:text-[16px] font-[820] tracking-tight text-white/92">
                {b.title}
              </div>
              <div className="mt-1 text-[12.5px] sm:text-[13px] leading-relaxed text-white/60">
                {b.desc}
              </div>
            </div>
          </div>

          <div className="sm:pt-0.5">
            <span
              className={cx(
                "inline-flex items-center rounded-full px-2.5 py-1",
                "border border-white/12 bg-black/25",
                "text-[11px] font-[780] text-white/80"
              )}
            >
              {b.badge}
            </span>
          </div>
        </div>

        <div className="mt-4 h-px w-full bg-white/10 overflow-hidden">
          <div
            className="h-px w-full opacity-80"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,215,176,0.60) 30%, rgba(255,154,61,0.90) 55%, rgba(255,106,26,0.90) 75%, transparent 100%)",
            }}
          />
        </div>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-[10.5px] tracking-[0.22em] text-white/45">{rowLabel}</div>
          <div className="text-[11.5px] text-white/55">{rowMeta}</div>
        </div>
      </div>
    </div>
  );
}

export default function Benefits() {
  const { dict } = useLang();
  const bDict = dict.benefits;

  const items = useMemo<Benefit[]>(
    () => [
      {
        title: bDict.items[0].title,
        desc: bDict.items[0].desc,
        icon: <IconRocket />,
        glow: "radial-gradient(520px 260px at 18% 20%, rgba(255,154,61,0.30), transparent 62%)",
        badge: bDict.items[0].badge,
      },
      {
        title: bDict.items[1].title,
        desc: bDict.items[1].desc,
        icon: <IconLayout />,
        glow: "radial-gradient(560px 280px at 85% 22%, rgba(255,215,176,0.20), transparent 64%)",
        badge: bDict.items[1].badge,
      },
      {
        title: bDict.items[2].title,
        desc: bDict.items[2].desc,
        icon: <IconShield />,
        glow: "radial-gradient(560px 280px at 72% 16%, rgba(255,106,26,0.22), transparent 66%)",
        badge: bDict.items[2].badge,
      },
      {
        title: bDict.items[3].title,
        desc: bDict.items[3].desc,
        icon: <IconPlug />,
        glow: "radial-gradient(560px 300px at 18% 85%, rgba(255,154,61,0.22), transparent 66%)",
        badge: bDict.items[3].badge,
      },
      {
        title: bDict.items[4].title,
        desc: bDict.items[4].desc,
        icon: <IconSpark />,
        glow: "radial-gradient(560px 280px at 88% 82%, rgba(255,215,176,0.18), transparent 70%)",
        badge: bDict.items[4].badge,
      },
      {
        title: bDict.items[5].title,
        desc: bDict.items[5].desc,
        icon: <IconWrench />,
        glow: "radial-gradient(560px 280px at 50% 18%, rgba(255,106,26,0.18), transparent 72%)",
        badge: bDict.items[5].badge,
      },
    ],
    [bDict]
  );

  return (
    <Section id="benefits" className="relative pt-16 sm:pt-20 pb-16 sm:pb-20">
      {/* ✅ НЕТ hero.png — фон уже видео. Тут только “читаемость” поверх видео */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.38),rgba(0,0,0,0.92))]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 650px at 18% 10%, rgba(255,154,61,0.14), transparent 60%)," +
              "radial-gradient(900px 520px at 85% 18%, rgba(255,106,26,0.10), transparent 62%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.20)_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute inset-x-0 top-0 h-px opacity-60 bg-[linear-gradient(90deg,transparent,rgba(255,215,176,0.35),rgba(255,154,61,0.55),rgba(255,106,26,0.45),transparent)]" />
      </div>

      <Container>
        <div className="relative overflow-visible">
          {/* ✅ DESKTOP: фотка справа */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block z-0 overflow-visible">
            <img
              src={RIGHT_IMG}
              alt=""
              draggable={false}
              className={cx(
                "absolute right-[-420px] top-[160px]",
                "w-[1180px] max-w-none",
                "h-[760px] object-contain",
                "opacity-[0.98]",
                "drop-shadow-[0_90px_240px_rgba(0,0,0,0.75)]"
              )}
            />
          </div>

          {/* ✅ MOBILE/TABLET */}
          <div className="pointer-events-none absolute inset-0 lg:hidden z-0 overflow-visible">
            <img
              src={RIGHT_IMG}
              alt=""
              draggable={false}
              className={cx(
                "absolute right-[-180px] top-[260px]",
                "w-[920px] max-w-none",
                "h-[640px] object-contain",
                "opacity-[0.40]",
                "drop-shadow-[0_70px_190px_rgba(0,0,0,0.78)]"
              )}
            />
          </div>

          {/* ✅ контент */}
          <div className="relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-[12px] tracking-[0.22em] text-white/55">{bDict.badge}</div>
              <h2 className="mt-3 text-[34px] sm:text-[44px] font-[820] tracking-[-0.03em] text-white leading-[1.06]">
                {bDict.titlePrefix}{" "}
                <span className="bg-[linear-gradient(90deg,#FFD7B0,#FF9A3D,#FF6A1A)] bg-clip-text text-transparent">
                  {bDict.titleHighlight}
                </span>
              </h2>
            </div>

            <div className="mt-10 space-y-3 sm:space-y-4 max-w-[760px] mx-auto lg:mx-0">
              {items.map((b) => (
                <BenefitRow key={b.title} b={b} rowLabel={bDict.rowLabel} rowMeta={bDict.rowMeta} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
