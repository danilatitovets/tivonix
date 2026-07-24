import { Link } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import Container from "../components/ui/Container";
import { SEO } from "../components/SEO";
import { LeadCTAButton } from "../components/leads/LeadCTAButton";
import { useLang } from "../i18n/LangProvider";
import { localizedHome, ogLocaleFor, t3 } from "../i18n/pick";
import { pathForLang } from "../lib/localePaths";

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
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,122,40,0.18),transparent_55%)]"
        />
        <Container className="relative pt-[calc(var(--tivonix-header-spacer)+2.5rem)] pb-16 sm:pb-20">
          <p className="text-[13px] font-semibold tracking-[0.14em] text-[#FF9A3D]/90 uppercase">
            404
          </p>
          <h1 className="mt-4 max-w-[16ch] text-[clamp(2.1rem,5.5vw,3.6rem)] font-[850] leading-[1.05] tracking-[-0.035em] text-white">
            {t3(lang, "Страница не найдена", "Page not found", "页面未找到")}
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-7 text-white/70 sm:text-[17px]">
            {t3(
              lang,
              "Ссылка устарела или адрес введён с ошибкой. Можно вернуться на главную, посмотреть проекты или оставить заявку.",
              "The link may be outdated or mistyped. Go home, browse projects, or send a short brief.",
              "链接可能已失效或地址输入有误。可返回首页、浏览项目或提交需求。"
            )}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to={localizedHome(lang)}
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-[14px] font-bold text-black transition hover:bg-white/92 sm:px-8 sm:text-[15px]"
            >
              {t3(lang, "На главную", "Home", "返回首页")}
            </Link>
            <Link
              to={pathForLang("/projects", lang)}
              className="inline-flex h-12 items-center justify-center rounded-full bg-white/[0.08] px-7 text-[14px] font-bold text-white/90 ring-1 ring-white/12 transition hover:bg-white/[0.12] sm:px-8 sm:text-[15px]"
            >
              {t3(lang, "Проекты", "Projects", "项目案例")}
            </Link>
            <LeadCTAButton source="final_cta" variant="primary" size="lg">
              {t3(lang, "Оставить заявку", "Send a brief", "提交需求")}
            </LeadCTAButton>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
