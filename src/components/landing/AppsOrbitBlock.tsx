// src/components/landing/AppsOrbitBlock.tsx
import { useMemo, type CSSProperties } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

const RING_SIZE = 780; 
const RING_DX = 40; 
const RING_DY = 150; 
const RING_SPIN_SEC = 14; 
const HERO_IMG = "/images/hero.png";

type CSSVars = CSSProperties & Record<string, string | number>;


function IconMic() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Z" stroke="currentColor" strokeWidth="2" />
      <path d="M19 11a7 7 0 0 1-14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 18v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconWave() {
  return (
    <svg width="46" height="18" viewBox="0 0 46 18" fill="none" aria-hidden="true">
      <path
        d="M4 10v-2M10 14V4M16 16V2M22 13V5M28 16V2M34 14V4M40 10v-2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.95"
      />
    </svg>
  );
}


function TextRing({
  size = 720,
  spinSec = 2.8, 
}: {
  size?: number;
  spinSec?: number;
}) {
  const rootStyle: CSSVars = {
    width: size,
    height: size,
    ["--spinSec"]: `${spinSec}s`,
  };

  return (
    <span aria-hidden="true" className="pointer-events-none relative block" style={rootStyle}>
      <style>{`
        @keyframes sweepSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .ringMask {
          -webkit-mask-image: radial-gradient(circle, transparent 61%, black 62%, black 68%, transparent 69%);
          mask-image: radial-gradient(circle, transparent 61%, black 62%, black 68%, transparent 69%);
        }
        .ringSweep {
          animation: sweepSpin var(--spinSec, 2.8s) linear infinite;
          transform-origin: 50% 50%;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .ringSweep { animation: none !important; }
        }
      `}</style>

      <span
        className="ringMask absolute inset-0 rounded-full"
        style={
          {
            background:
              "conic-gradient(from 220deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02), rgba(255,255,255,0.06), rgba(255,255,255,0.02), rgba(255,255,255,0.08))",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.05) inset, 0 26px 90px rgba(0,0,0,0.62)",
            opacity: 0.45,
          } as CSSProperties
        }
      />

      <span
        className="ringMask ringSweep absolute inset-0 rounded-full"
        style={
          {
            background:
              "conic-gradient(" +
              "from 0deg," +
              "transparent 0deg 318deg," +
              "rgba(255,215,176,0.00) 318deg," +
              "rgba(255,215,176,0.75) 321deg," +
              "rgba(255,154,61,0.95) 326deg," +
              "rgba(255,106,26,0.98) 330deg," +
              "rgba(255,154,61,0.92) 334deg," +
              "rgba(255,215,176,0.70) 339deg," +
              "rgba(255,215,176,0.00) 343deg," +
              "transparent 343deg 360deg" +
              ")",
            filter: "blur(0.35px) saturate(1.2)",
            opacity: 0.95,
            mixBlendMode: "screen",
          } as CSSProperties
        }
      />

      <span
        className="absolute inset-0 rounded-full"
        style={
          {
            background:
              "radial-gradient(closest-side, rgba(255,154,61,0.18), rgba(31,41,51,0.10), transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(circle, transparent 56%, black 57%, black 74%, transparent 75%)",
            maskImage:
              "radial-gradient(circle, transparent 56%, black 57%, black 74%, transparent 75%)",
            opacity: 0.75,
          } as CSSProperties
        }
      />
    </span>
  );
}

/** ---------- main component ---------- */
export default function AppsOrbitBlock() {
  const { dict } = useLang();
  const o = dict.orbit;
  const bullets = useMemo(() => o.bullets, [o]);

  return (
    <Section
      className={cx(
        "relative overflow-hidden",
        "pt-24 sm:pt-28 pb-14 sm:pb-20"
      )}
    >
      <style>{`
        @keyframes ringSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .ring-spin {
          animation: ringSpin var(--ringSpin, 14s) linear infinite;
          transform-origin: 50% 50%;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .ring-spin { animation: none !important; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <img
          src={HERO_IMG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25 blur-[12px] scale-[1.08]"
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55),rgba(0,0,0,0.92))]" />

        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_30%_15%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(800px_500px_at_75%_45%,rgba(255,255,255,0.06),transparent_55%)]" />

        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:14px_14px]" />
      </div>

      <Container>
        <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT */}
          <div className="relative z-10">
            <div className="text-[12px] tracking-[0.22em] text-white/45">{o.badge}</div>

            <h2 className="mt-3 text-[34px] font-[760] leading-[1.06] tracking-[-0.02em] text-white sm:text-[44px]">
              {o.titlePrefix}{" "}
              <span className="relative inline-block align-baseline">
                <span className="relative z-10 bg-[linear-gradient(90deg,#FFD7B0,#FF9A3D,#FF6A1A)] bg-clip-text text-transparent">
                  {o.titleHighlight}
                </span>

                <span
                  className="absolute left-1/2 top-1/2 z-0 opacity-70 pointer-events-none"
                  style={
                    {
                      transform: `translate(-50%, -50%) translate(${RING_DX}px, ${RING_DY}px)`,
                      contain: "paint",
                      overflow: "clip",
                    } as CSSProperties
                  }
                >
                  {/* desktop */}
                  <span className="hidden sm:block">
                    <TextRing size={RING_SIZE} spinSec={RING_SPIN_SEC} />
                  </span>

                  {/* mobile */}
                  <span className="sm:hidden">
                    <TextRing size={460} spinSec={RING_SPIN_SEC} />
                  </span>
                </span>
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/68 sm:text-[16px]">
              {o.description}
            </p>

            {/* 3 пункта */}
            <div className="mt-6 grid max-w-xl gap-2">
              {bullets.map((b) => (
                <div
                  key={b.title}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                >
                  <div className="text-[13px] font-[650] text-white/85">{b.title}</div>
                  <div className="text-[12px] text-white/45">{b.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/contacts"
                className={[
                  "inline-flex h-11 items-center justify-center rounded-2xl px-6",
                  "text-[14px] font-[750] tracking-[-0.01em] text-black",
                  "bg-[linear-gradient(180deg,#FFD7B0_0%,#FF9A3D_52%,#FF6A1A_100%)]",
                  "shadow-[0_18px_55px_rgba(255,122,0,0.18)]",
                  "hover:brightness-105 hover:shadow-[0_22px_70px_rgba(255,122,0,0.24)]",
                  "active:translate-y-[1px] transition",
                ].join(" ")}
              >
                {o.primaryCta} <span className="ml-2 opacity-80" />
              </a>

              <a
                href="/projects"
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/14 bg-white/5 px-6 text-[14px] font-[650] text-white/80 backdrop-blur hover:bg-white/7"
              >
                {o.secondaryCta}
              </a>
            </div>

            <div className="mt-4 text-[12px] text-white/45">{o.footnote}</div>
          </div>

          {/* RIGHT */}
          <div className="relative z-10">
            <div className="relative mx-auto w-full max-w-[520px]">
              <div className="absolute -left-10 bottom-0 hidden h-[420px] w-[520px] md:block">
                <div className="absolute left-[20px] bottom-[22px] h-2 w-2 rounded-full bg-white/18 blur-[1px]" />
              </div>

              <div className="relative mx-auto w-[300px] sm:w-[340px]">
                <div
                  className="relative rounded-[52px] p-[1px] shadow-[0_44px_140px_rgba(0,0,0,0.70)]"
                  style={
                    {
                      backgroundImage:
                        "conic-gradient(from 220deg, #FFD7B0 0deg, #FF9A3D 70deg, #FF6A1A 150deg, #FF9A3D 250deg, #FFD7B0 360deg)",
                    } as CSSProperties
                  }
                >
                  <div className="relative rounded-[51px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.10),rgba(255,255,255,0.04))] p-[7px] backdrop-blur">
                    <div className="relative overflow-hidden rounded-[40px] bg-[#0B0D0C]">
                      {/* notch */}
                      <div className="pointer-events-none absolute left-1/2 top-3 z-30 h-[22px] w-[140px] -translate-x-1/2 rounded-full bg-black/45 ring-1 ring-white/7" />
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_40%_at_30%_10%,rgba(255,255,255,0.12),transparent_55%)]" />

                      {/* CONTENT */}
                      <div className="px-5 pb-4 pt-12">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),rgba(255,255,255,0.06))] ring-1 ring-white/18" />
                          <div>
                            <div className="text-[13px] font-[650] text-white/90">
                              {o.chat.clientLabel}
                            </div>
                            <div className="text-[12px] text-white/55">
                              {o.chat.clientSubtitle}
                            </div>
                          </div>
                          <div className="ml-auto h-2 w-2 rounded-full bg-emerald-400/80 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]" />
                        </div>

                        <div className="mt-5 space-y-3">
                          <div className="max-w-[85%] rounded-2xl bg-white/8 px-4 py-3 text-[12.5px] leading-snug text-white/80">
                            {o.chat.msgClient1}
                          </div>
                          <div className="ml-auto max-w-[86%] rounded-2xl bg-white/12 px-4 py-3 text-[12.5px] leading-snug text-white/85">
                            {o.chat.msgMe1}
                          </div>
                          <div className="max-w-[85%] rounded-2xl bg-white/8 px-4 py-3 text-[12.5px] leading-snug text-white/80">
                            {o.chat.msgClient2}
                          </div>
                        </div>

                        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                          <div className="h-2.5 w-2.5 rounded-full bg-white/30" />
                          <div className="flex-1 text-[12px] text-white/45">
                            {o.chat.inputPlaceholder}
                          </div>
                          <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/8 text-white/75">
                            <IconMic />
                          </div>
                        </div>
                      </div>

                      {/* bottom voice */}
                      <div className="border-t border-white/10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-5 py-6">
                        <div className="flex items-center justify-between">
                          <div className="text-[12px] font-[650] text-white/75">
                            {o.chat.quickCallTitle}
                          </div>
                          <div className="text-[12px] text-white/45">
                            {o.chat.quickCallDuration}
                          </div>
                        </div>
                        <div className="mt-5 grid place-items-center">
                          <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/14 bg-white/6 text-white/85 shadow-[0_18px_55px_rgba(0,0,0,0.55)]">
                            <IconWave />
                          </div>
                          <div className="mt-3 text-[12px] text-white/55">
                            {o.chat.quickCallHint}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pointer-events-none absolute inset-0 rounded-[51px] ring-1 ring-white/6" />
                  </div>
                </div>
              </div>

  
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
