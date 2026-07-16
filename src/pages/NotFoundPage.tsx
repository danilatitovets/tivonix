import { Link } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import Container from "../components/ui/Container";
import { SEO } from "../components/SEO";
import { LeadCTAButton } from "../components/leads/LeadCTAButton";
import { useLang } from "../i18n/LangProvider";

export default function NotFoundPage() {
  const { lang } = useLang();
  const isRu = lang === "ru";

  const title = isRu ? "Страница не найдена — TIVONIX" : "Page not found — TIVONIX";
  const description = isRu
    ? "Запрошенная страница не существует. Вернитесь на главную или посмотрите проекты TIVONIX."
    : "The page you requested does not exist. Return home or explore TIVONIX projects.";

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--bg)]">
      <SEO
        title={title}
        description={description}
        canonicalPath={isRu ? "/404" : "/en/404"}
        ogLocalePrimary={isRu ? "ru_RU" : "en_US"}
        robots="noindex,nofollow"
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
            {isRu ? "Страница не найдена" : "Page not found"}
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-7 text-white/70 sm:text-[17px]">
            {isRu
              ? "Ссылка устарела или адрес введён с ошибкой. Можно вернуться на главную, посмотреть проекты или оставить заявку."
              : "The link may be outdated or mistyped. Go home, browse projects, or send a short brief."}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to={isRu ? "/" : "/en"}
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-[14px] font-bold text-black transition hover:bg-white/92 sm:px-8 sm:text-[15px]"
            >
              {isRu ? "На главную" : "Home"}
            </Link>
            <Link
              to={isRu ? "/projects" : "/en/projects"}
              className="inline-flex h-12 items-center justify-center rounded-full bg-white/[0.08] px-7 text-[14px] font-bold text-white/90 ring-1 ring-white/12 transition hover:bg-white/[0.12] sm:px-8 sm:text-[15px]"
            >
              {isRu ? "Проекты" : "Projects"}
            </Link>
            <LeadCTAButton source="final_cta" variant="primary" size="lg">
              {isRu ? "Оставить заявку" : "Send a brief"}
            </LeadCTAButton>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
