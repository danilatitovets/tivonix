import { useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import Container from "../components/ui/Container";
import { SEO } from "../components/SEO";
import { LeadCTAButton } from "../components/leads/LeadCTAButton";
import { useKeepVideoPlaying } from "../hooks/useKeepVideoPlaying";
import { useLang } from "../i18n/LangProvider";
import { localizedHome, ogLocaleFor, t3 } from "../i18n/pick";
import { pathForLang } from "../lib/localePaths";

const HERO_VIDEO = "/images/hero-bg.mp4";
const HERO_POSTER = "/images/hero-bg-poster.webp";

function Video404Mark() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useKeepVideoPlaying(videoRef);

  return (
    <div className="relative mx-auto w-full max-w-[56rem] select-none" aria-hidden>
      <div className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,122,40,0.24),transparent_68%)] blur-2xl" />

      {/*
        Video shows through white “404” via multiply against a black overlay.
        Fallback gradient sits under the video if it fails to paint.
      */}
      <div className="nf404-stage relative isolate grid place-items-center overflow-hidden rounded-[4px] bg-black">
        <div
          className="col-start-1 row-start-1 h-[clamp(7.5rem,28vw,17rem)] w-full bg-[linear-gradient(135deg,#FF6A1A_0%,#FF9A3D_45%,#7C2D12_100%)]"
          aria-hidden
        />
        <img
          src={HERO_POSTER}
          alt=""
          draggable={false}
          className="col-start-1 row-start-1 h-[clamp(7.5rem,28vw,17rem)] w-full object-cover object-center"
        />
        <video
          ref={videoRef}
          className="nf404-video col-start-1 row-start-1 h-[clamp(7.5rem,28vw,17rem)] w-full max-w-none object-cover object-center"
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
        />
        <div className="col-start-1 row-start-1 flex h-[clamp(7.5rem,28vw,17rem)] w-full items-center justify-center bg-black mix-blend-multiply">
          <span className="nf404-digits font-hero text-[clamp(7.25rem,28vw,16.5rem)] font-normal leading-none tracking-[-0.04em] text-white">
            404
          </span>
        </div>
        <div className="nf404-shimmer pointer-events-none absolute inset-0 mix-blend-soft-light" />
      </div>
    </div>
  );
}

export default function NotFoundPage() {
  const { lang } = useLang();

  const title = t3(
    lang,
    "Страница не найдена — TIVONIX",
    "Page not found — TIVONIX",
    "页面未找到 — TIVONIX"
  );
  const description = t3(
    lang,
    "Запрошенная страница не существует. Вернитесь на главную или посмотрите проекты TIVONIX.",
    "The page you requested does not exist. Return home or explore TIVONIX projects.",
    "您访问的页面不存在。请返回首页或查看 TIVONIX 项目案例。"
  );

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--bg)]">
      <SEO
        title={title}
        description={description}
        canonicalPath={lang === "ru" ? "/404" : `/${lang}/404`}
        ogLocalePrimary={ogLocaleFor(lang)}
      />
      <Header />

      <main className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[min(72vh,640px)] opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "linear-gradient(to bottom, black 35%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 35%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_50%_20%,rgba(255,122,40,0.16),transparent_58%)]"
        />

        <Container className="relative pt-[calc(var(--tivonix-header-spacer)+1.25rem)] pb-16 sm:pb-20">
          <div className="mx-auto max-w-[48rem] text-center">
            <h1 className="sr-only">
              {t3(lang, "Страница не найдена", "Page not found", "页面未找到")}
            </h1>

            <Video404Mark />

            <p
              className="mt-6 font-hero text-[clamp(1.85rem,4.5vw,3rem)] font-normal uppercase leading-[0.98] tracking-[0.02em] text-white sm:mt-8"
              aria-hidden
            >
              {t3(lang, "Страница не найдена", "Sorry about that.", "页面未找到")}
            </p>
            <p className="mx-auto mt-4 max-w-xl text-[15px] font-medium leading-[1.55] text-white/65 sm:text-[16px]">
              {t3(
                lang,
                "Ссылка устарела или адрес введён с ошибкой. Можно вернуться на главную, посмотреть проекты или оставить заявку.",
                "The page you're looking for doesn't exist or has moved.",
                "链接可能已失效或地址输入有误。可返回首页、浏览项目或提交需求。"
              )}
            </p>

            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                to={localizedHome(lang)}
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-[14px] font-bold text-black transition hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5000]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:text-[15px]"
              >
                {t3(lang, "На главную", "Home", "返回首页")}
              </Link>
              <Link
                to={pathForLang("/projects", lang)}
                className="inline-flex h-12 items-center justify-center rounded-full bg-white/[0.08] px-7 text-[14px] font-bold text-white/90 ring-1 ring-white/12 transition hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5000]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:text-[15px]"
              >
                {t3(lang, "Проекты", "Projects", "项目案例")}
              </Link>
              <LeadCTAButton source="final_cta" variant="primary" size="lg">
                {t3(lang, "Оставить заявку", "Send a brief", "提交需求")}
              </LeadCTAButton>
            </div>
          </div>
        </Container>
      </main>

      <Footer />

      <style>{`
        @keyframes nf404-drift {
          0% { object-position: 40% 50%; }
          50% { object-position: 60% 42%; }
          100% { object-position: 40% 50%; }
        }
        @keyframes nf404-shimmer {
          0% { transform: translateX(-35%); opacity: 0.12; }
          45% { opacity: 0.4; }
          100% { transform: translateX(35%); opacity: 0.12; }
        }
        @keyframes nf404-glitch {
          0%, 90%, 100% { transform: translate(0, 0); }
          92% { transform: translate(-2px, 1px); }
          94% { transform: translate(2px, -1px); }
          96% { transform: translate(-1px, 0); }
        }
        .nf404-video {
          animation: nf404-drift 14s ease-in-out infinite;
        }
        .nf404-digits {
          animation: nf404-glitch 7s steps(1, end) infinite;
        }
        .nf404-shimmer {
          background: linear-gradient(
            105deg,
            transparent 34%,
            rgba(255, 255, 255, 0.38) 48%,
            rgba(255, 154, 61, 0.28) 52%,
            transparent 66%
          );
          animation: nf404-shimmer 5.5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .nf404-video,
          .nf404-digits,
          .nf404-shimmer {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
