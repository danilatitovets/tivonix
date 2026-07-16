import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import { SEO } from "../components/SEO";
import { LeadCTAButton } from "../components/leads/LeadCTAButton";
import { trackTelegramDirectClick } from "../lib/analytics";
import { useLang } from "../i18n/LangProvider";

export default function WebsiteCreationPage() {
  const { lang } = useLang();
  const isRu = lang === "ru";

  const title = isRu
    ? "Создание сайтов под ключ — TIVONIX"
    : "Website development turnkey — TIVONIX";
  const description = isRu
    ? "Создаём сайты под ключ для бизнеса: лендинги, корпоративные сайты, веб-сервисы и MVP. Дизайн, адаптивная разработка, базовое SEO и запуск."
    : "We build turnkey websites for business: landing pages, corporate sites, web services and MVPs. Design, responsive development, basic SEO and launch.";

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SEO
        title={title}
        description={description}
        canonicalPath="/sozdanie-sajtov"
        ogLocalePrimary={isRu ? "ru_RU" : "en_US"}
      />
      <Header />
      <main>
        <Section className="pt-8 sm:pt-10 pb-8">
          <Container>
            <h1 className="text-[32px] sm:text-[46px] font-[850] tracking-[-0.03em] text-white leading-[1.08]">
              {isRu ? "Создание сайтов под ключ для бизнеса" : "Turnkey website development for business"}
            </h1>
            <p className="mt-5 max-w-3xl text-[16px] leading-7 text-white/72">
              {isRu
                ? "Проектируем, дизайним, разрабатываем и запускаем сайты в одном процессе: без хаоса и с понятным результатом для заявок и продаж."
                : "We design, develop and launch websites in one clear process focused on leads and sales."}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <LeadCTAButton source="service_websites" variant="primary" size="lg">
                {isRu ? "Оставить заявку" : "Send a brief"}
              </LeadCTAButton>
              <a
                href="https://t.me/TIVONIX"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackTelegramDirectClick()}
                className="inline-flex h-12 items-center justify-center rounded-full bg-white/[0.08] px-7 text-[14px] font-bold text-white/90 ring-1 ring-white/12 transition hover:bg-white/[0.12]"
              >
                Telegram
              </a>
            </div>
          </Container>
        </Section>

        <Section className="py-8">
          <Container>
            <h2 className="text-[24px] sm:text-[32px] font-[800] tracking-tight text-white">Что делаем</h2>
            <ul className="mt-4 grid gap-3 text-white/74">
              <li>Лендинги и промо-страницы</li>
              <li>Корпоративные сайты и сайты услуг</li>
              <li>Веб-сервисы, MVP и личные кабинеты</li>
              <li>Интеграции с формами, Telegram и CRM</li>
            </ul>
          </Container>
        </Section>

        <Section className="py-8">
          <Container>
            <h2 className="text-[24px] sm:text-[32px] font-[800] tracking-tight text-white">Что входит в работу</h2>
            <p className="mt-4 max-w-4xl text-white/74 leading-7">
              Структура страницы, дизайн, адаптивная разработка на React/TypeScript, формы заявок, базовая SEO-оптимизация
              (title/description/canonical/og), оптимизация скорости и запуск на домене.
            </p>
          </Container>
        </Section>

        <Section className="py-8">
          <Container>
            <h2 className="text-[24px] sm:text-[32px] font-[800] tracking-tight text-white">Этапы, сроки и оценка</h2>
            <p className="mt-4 max-w-4xl text-white/74 leading-7">
              Бриф и структура, дизайн ключевых блоков, разработка, правки, деплой и поддержка. Типовой срок: от нескольких
              дней для лендинга до нескольких недель для MVP. Первичную оценку даём после короткого брифа или созвона.
            </p>
          </Container>
        </Section>

        <Section className="pt-8 pb-14">
          <Container>
            <h2 className="text-[24px] sm:text-[32px] font-[800] tracking-tight text-white">FAQ и следующий шаг</h2>
            <p className="mt-4 max-w-4xl text-white/74 leading-7">
              Частые вопросы по процессу и стоимости уже собраны в разделе FAQ на главной. Оставьте заявку на сайте или
              перейдите в контакты — ответим с ориентиром по сроку и формату.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LeadCTAButton source="service_websites" variant="primary" size="lg">
                {isRu ? "Оставить заявку" : "Send a brief"}
              </LeadCTAButton>
              <a
                href="/contacts"
                className="inline-flex h-11 items-center justify-center rounded-xl px-6 text-[14px] font-[650] text-white border border-white/15 bg-white/[0.04]"
              >
                {isRu ? "Контакты" : "Contacts"}
              </a>
              <a
                href="https://t.me/TIVONIX"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackTelegramDirectClick()}
                className="inline-flex h-11 items-center justify-center rounded-xl px-6 text-[14px] font-[650] text-white/80 border border-white/10 bg-transparent"
              >
                Telegram
              </a>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
