import { useEffect, useMemo, useState } from "react";
import Section from "../ui/Section";
import Container from "../ui/Container";
import { useLang, type Lang } from "../../i18n/LangProvider";
import HeroWebGLBg from "./HeroWebGLBg";
import { TG_BOT_URL } from "../../constants/links";

const HERO_BG_IMG = "/images/hero1.png"; // mobile hero image
const CONTACT_EMAIL = "tivoonix@gmail.com";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

function useMediaQuery(query: string) {
  const getMatch = () =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false;
  const [matches, setMatches] = useState<boolean>(getMatch);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    if (m.addEventListener) m.addEventListener("change", onChange);
    else m.addListener(onChange);
    return () => {
      if (m.removeEventListener) m.removeEventListener("change", onChange);
      else m.removeListener(onChange);
    };
  }, [query]);

  return matches;
}

/**
 * ВАЖНО: чтобы не было “резкого перехода”
 * - НЕ делаем условный рендер mobile/desktop разметки.
 * - Разметка ОДНА, а переключение стилей — только через CSS media queries.
 * Тогда нет “скачка” из-за гидрации/JS-брейкпоинта.
 */
const HERO_STYLES = `
  .hero{
    --tiv-amber: 255,154,61;
    --tiv-orange: 255,106,26;
    --tiv-cream: 255,215,176;
    --tiv-ice: 245,246,248;

    /* mobile bg knobs */
    --hero-img-shift: 0vh;
    --hero-img-scale: 1.04;
  }

  .heroBg{ position:absolute; inset:0; background:#000000; overflow:hidden; }

  .heroBg .heroImg{
    position:absolute; inset:0;
    width:100%; height:100%;
    object-fit:cover;
    object-position:50% 50%;
    transform: translate3d(0,var(--hero-img-shift),0) scale(var(--hero-img-scale));
    filter:saturate(1.05) contrast(1.04);
    will-change: transform;
  }

  .heroWebgl{
    position:absolute; inset:0;
    width:100%; height:100%;
    transform:scale(1.03);
    will-change: transform;
    pointer-events:auto;
  }
  .heroWebgl canvas{ pointer-events:auto; }

  .heroOverlay{
    position:absolute; inset:0;
    background:
      linear-gradient(90deg,
        rgba(0,0,0,0.82) 0%,
        rgba(0,0,0,0.64) 28%,
        rgba(0,0,0,0.30) 52%,
        rgba(0,0,0,0.12) 68%,
        rgba(0,0,0,0.26) 100%),
      radial-gradient(120% 90% at 55% 35%,
        rgba(var(--tiv-amber),0.14) 0%,
        rgba(var(--tiv-orange),0.10) 32%,
        rgba(0,0,0,0) 62%),
      radial-gradient(120% 120% at 50% 55%,
        rgba(0,0,0,0.18) 0%,
        rgba(0,0,0,0.84) 72%,
        rgba(0,0,0,1) 100%);
  }

  .heroGrain{
    position:absolute; inset:0;
    opacity:.10;
    background-image:
      radial-gradient(circle at 1px 1px, rgba(255,255,255,0.26) 1px, transparent 0);
    background-size:28px 28px;
    mix-blend-mode:overlay;
    pointer-events:none;
  }

  /* ===== DESKTOP typography (как было) ===== */
  .heroH1{
    font-weight:850;
    letter-spacing:-0.03em;
    line-height:1.06;
    text-shadow:0 14px 38px rgba(0,0,0,0.86);
  }

  /* ===== DESKTOP CTA (как было) ===== */
  .gmailBtn{
    border-radius:18px;
    border:1px solid rgba(255,255,255,0.18);
    background:rgba(0,0,0,0.34);
    backdrop-filter:blur(12px);
    -webkit-backdrop-filter:blur(12px);
    box-shadow:inset 0 1px 0 rgba(255,255,255,0.06);
    transition:transform .18s ease, background .18s ease, border-color .18s ease;
  }
  .gmailBtn:hover{
    transform:translateY(-1px);
    background:rgba(255,255,255,0.06);
    border-color:rgba(255,255,255,0.26);
  }
  .gmailBtn:active{ transform:translateY(0px); }

  /* ===== Mobile (Vercel-like) — только стилями, без другой разметки ===== */

  /* Резерв снизу, чтобы фон не лез на текст */
  @media (max-width: 640px){
    .hero{
      --hero-img-shift: 16vh;   /* опусти фон */
      --hero-img-scale: 1;
    }
    .heroBg .heroImg{
      inset: auto;
      width: 88%;
      height: 88%;
      left: 50%;
      top: 58%;
      object-fit: contain;
      object-position: 50% 50%;
      transform: translate3d(-50%, -50%, 0) scale(var(--hero-img-scale));
    }

    /* Моб. оверлей: верх темнее, низ “чище” */
@media (max-width: 640px){
  .heroOverlay{
    background:
      /* общий диммер */
      linear-gradient(0deg,
        rgba(0,0,0,0.40),
        rgba(0,0,0,0.40)
      ),
      /* верх темнее под текст */
      linear-gradient(180deg,
        rgba(0,0,0,0.92) 0%,
        rgba(0,0,0,0.72) 28%,
        rgba(0,0,0,0.35) 58%,
        rgba(0,0,0,0.15) 72%,
        rgba(0,0,0,0.86) 100%
      );
  }
}

    /* Центрируем блок как у Vercel */
    .hero .heroWrap{ text-align:center; padding-top: 2px; padding-bottom: clamp(220px, 40vh, 440px); }
    .hero .heroSubtitle{ margin-left:auto; margin-right:auto; }

    /* Типографика мобилки */
    .hero .heroTitleCaps{ text-transform:none !important; letter-spacing:-0.02em !important; }
    .hero .heroH1{
      line-height:1.04;
      letter-spacing:-0.035em;
      text-shadow:none;
    }

    /* Ограничим ширину заголовка, чтобы выглядел “плотно” */
    .hero .heroH1{ max-width: 18ch; margin-left:auto; margin-right:auto; }
    .hero .heroSubtitle{
      font-size: 13.75px !important;
      line-height: 1.6 !important;
      color: rgba(255,255,255,0.68) !important;
      max-width: 48ch;
    }

    /* CTA в одну строку (2 колонки), как Vercel */
    .hero .heroCtas{
      margin-top: 18px !important;
      display:grid !important;
      grid-template-columns: 1fr 1fr;
      gap: 12px !important;
      max-width: 520px;
      margin-left:auto;
      margin-right:auto;
    }

    /* Превращаем обе кнопки в pill-стиль */
    .hero .gmailBtn,
    .hero .tgBtn{
      height: 44px !important;
      border-radius: 999px !important;
      font-size: 13.5px !important;
      font-weight: 700 !important;
      letter-spacing: -0.012em !important;
      border: none !important;
      box-shadow: none !important;
    }

    /* Telegram = primary (белая) */
    .hero .tgBtn{
      background: rgba(255,255,255,0.95) !important;
      color: rgba(0,0,0,0.90) !important;
      box-shadow: 0 10px 28px rgba(0,0,0,.35) !important;
    }

    /* Gmail = ghost */
    .hero .gmailBtn{
      background: rgba(255,255,255,0.14) !important;
      color: rgba(255,255,255,0.92) !important;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    /* Супер узкие экраны: кнопки в столбик */
    @media (max-width: 360px){
      .hero .heroCtas{ grid-template-columns: 1fr; }
      .hero .gmailBtn, .hero .tgBtn{ height: 46px !important; }
      .hero .heroH1{ max-width: 20ch; }
    }
  }

  @media (prefers-reduced-motion: reduce){
    .heroBg .heroImg{ transform:none; will-change:auto; }
    .heroWebgl{ transform:none; }
    .gmailBtn{ transition:none; }
  }
`;

function buildMailBody(lang: Lang) {
  if (lang === "ru") {
    return (
      "Здравствуйте!\n\n" +
      "Хочу получить оценку разработки.\n\n" +
      "1) Что нужно сделать (1–2 предложения):\n- \n\n" +
      "2) Ключевые функции:\n- \n- \n- \n\n" +
      "3) Есть ли дизайн/ТЗ/прототип:\n- \n\n" +
      "4) Сроки / бюджет (если есть):\n- \n\n" +
      "Контакты для связи:\n- \n\n" +
      "Спасибо!"
    );
  }

  return (
    "Hi!\n\n" +
    "I'd like to get an estimate.\n\n" +
    "1) What we’re building (1–2 sentences):\n- \n\n" +
    "2) Key features:\n- \n- \n- \n\n" +
    "3) Do you have design/spec/prototype:\n- \n\n" +
    "4) Timeline / budget (if any):\n- \n\n" +
    "Contact details:\n- \n\n" +
    "Thank you!"
  );
}

function getSubject(lang: Lang) {
  return lang === "ru" ? "Запрос оценки с сайта TIVONIX" : "TIVONIX inquiry: estimate";
}

function buildGmailUrl(to: string, subject: string, body: string) {
  return (
    "https://mail.google.com/mail/?view=cm&fs=1" +
    `&to=${encodeURIComponent(to)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
  );
}

export default function Hero() {
  const { lang, dict } = useLang();
  const hero = dict.hero;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Оставляем ТОЛЬКО это условие: фон WebGL на десктопе (это не ломает разметку текста/кнопок)
  const isDesktop = useMediaQuery("(min-width: 900px)");

  const { gmailUrl, gmailLabel, tgLabel } = useMemo(() => {
    const subject = getSubject(lang);
    const body = buildMailBody(lang);
    return {
      gmailUrl: buildGmailUrl(CONTACT_EMAIL, subject, body),
      gmailLabel: lang === "ru" ? "Открыть в Gmail" : "Open in Gmail",
      tgLabel: "Telegram",
    };
  }, [lang]);

  return (
    <Section
      className={cx(
        "hero relative isolate overflow-hidden flex items-center",
        "pt-16 pb-14 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20",
        "min-h-[78vh] sm:min-h-[82vh] lg:min-h-[86vh]"
      )}
    >
      <style>{HERO_STYLES}</style>

      {/* BG */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="heroBg">
          {mounted && isDesktop ? (
            <div className="heroWebgl pointer-events-auto">
              <HeroWebGLBg />
            </div>
          ) : (
            <img className="heroImg" src={HERO_BG_IMG} alt="" draggable={false} loading="eager" decoding="async" />
          )}
        </div>

        <div className="heroOverlay" />
        <div className="heroGrain" />

        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <Container>
        <div className="relative mx-auto max-w-6xl px-1 sm:px-0 w-full">
          {/* ОДНА разметка для всех экранов (без резких скачков) */}
          <div className="pt-2 sm:pt-6 lg:pt-8 heroWrap">
            <h1 className={cx("heroH1 tracking-[-0.02em]", "text-[30px] sm:text-[46px] lg:text-[54px]")}>
              <span className="block font-[850] text-white/95 uppercase heroTitleCaps">{hero.titleLine1}</span>
              <span className="block font-[850] text-white/80 uppercase heroTitleCaps">{hero.titleLine2Prefix}</span>
              <span className="block font-[850] uppercase heroTitleCaps">
                <span className="bg-[linear-gradient(90deg,#FFD7B0,#FF9A3D,#FF6A1A)] bg-clip-text text-transparent">
                  {hero.titleLine2Premium}
                </span>
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-[15px] sm:text-[16px] leading-relaxed font-medium text-white/85 heroSubtitle">
              {hero.subtitle}
            </p>

            <div className="mt-7 flex w-full max-w-[820px] flex-col gap-3 sm:flex-row sm:items-stretch heroCtas">
              <a
                href={TG_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tgLabel}
                className={cx(
                  "tgBtn group relative block w-full sm:w-auto",
                  "inline-flex items-center justify-center",
                  "rounded-2xl h-[54px] sm:h-[58px] px-6 sm:px-8",
                  "text-center font-[780] tracking-[-0.01em]",
                  "text-[15px] sm:text-[16px] text-black whitespace-nowrap",
                  "shadow-[0_18px_70px_rgba(0,0,0,.55)]",
                  "transition active:translate-y-[1px]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                )}
                style={{
                  background: "linear-gradient(180deg, #FFB020 0%, #FF7A18 45%, #FF5A12 100%)",
                }}
              >
                <span className="relative z-10">{tgLabel}</span>
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl transition duration-300 group-hover:opacity-70"
                  style={{
                    background: "radial-gradient(700px 120px at 50% 30%, rgba(255,176,32,0.65), rgba(0,0,0,0))",
                  }}
                />
              </a>

              <a
                href={gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={gmailLabel}
                className={cx(
                  "gmailBtn",
                  "inline-flex items-center justify-center",
                  "h-[54px] sm:h-[58px] px-6 sm:px-7",
                  "w-full sm:w-auto whitespace-nowrap",
                  "text-white/90 text-[15px] sm:text-[16px] font-[780]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                )}
              >
                {gmailLabel}
              </a>
            </div>

          </div>
        </div>
      </Container>
    </Section>
  );
}