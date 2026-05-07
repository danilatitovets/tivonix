// src/components/landing/SeoContent.tsx — цитата на чёрном фоне + скрытый SEO-текст (sr-only)
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";

const VISIBLE_RU = (
  <>
    <div className="flex items-start gap-4">
      <img
        src="/images/tivonix-logo-icon.png"
        alt="TIVONIX logo"
        className="h-10 w-10 shrink-0 select-none rounded-xl"
        loading="lazy"
      />
      <div className="min-w-0">
        <div className="text-white font-extrabold tracking-[0.02em] leading-none">TIVONIX</div>
        <div className="mt-1 text-white/70 text-[13px] font-semibold tracking-[0.01em]">
          Web Studio • React / TypeScript
        </div>
      </div>
    </div>

    <blockquote className="mt-6 m-0 border-0 pl-0 font-display text-[18px] sm:text-[20px] font-extrabold leading-[1.55] tracking-tight text-white/95">
      <span className="text-white/30 text-[2rem] sm:text-[2.35rem] font-extrabold leading-none mr-1 align-[-0.15em]">
        “
      </span>
      Мы в <span className="text-white">TIVONIX</span> создаём цифровые продукты, которые выглядят дорого, работают быстро
      и помогают бизнесу расти. Берём на себя структуру, дизайн, разработку и запуск — чтобы вы получили не просто сайт,
      а понятный инструмент для клиентов и продаж. Лендинг, многостраничный сайт, MVP, онлайн-сервис и Telegram-бот для
      заявок — в одном процессе, без лишней суеты.
      <span className="text-white/30 text-[2rem] sm:text-[2.35rem] font-extrabold leading-none ml-0.5 align-[-0.15em]">
        ”
      </span>
    </blockquote>
  </>
);

const VISIBLE_EN = (
  <>
    <div className="flex items-start gap-4">
      <img
        src="/images/tivonix-logo-icon.png"
        alt="TIVONIX logo"
        className="h-10 w-10 shrink-0 select-none rounded-xl"
        loading="lazy"
      />
      <div className="min-w-0">
        <div className="text-white font-extrabold tracking-[0.02em] leading-none">TIVONIX</div>
        <div className="mt-1 text-white/70 text-[13px] font-semibold tracking-[0.01em]">
          Web Studio • React / TypeScript
        </div>
      </div>
    </div>

    <blockquote className="mt-6 m-0 border-0 pl-0 font-display text-[18px] sm:text-[20px] font-extrabold leading-[1.55] tracking-tight text-white/95">
      <span className="text-white/30 text-[2rem] sm:text-[2.35rem] font-extrabold leading-none mr-1 align-[-0.15em]">
        “
      </span>
      At <span className="text-white">TIVONIX</span>, we create digital products that look premium, perform fast, and help
      businesses grow. We own structure, design, development, and launch — so you get more than a website: a clear tool for
      clients and sales. Clean build. Fast launch. Reliable support.
      <span className="text-white/30 text-[2rem] sm:text-[2.35rem] font-extrabold leading-none ml-0.5 align-[-0.15em]">
        ”
      </span>
    </blockquote>
  </>
);

const SEO_HIDDEN_RU = (
  <>
    <p>
      Делаем аккуратно. Запускаем быстро. Поддерживаем надёжно.
    </p>
    <p>
      Создание сайтов и цифровых продуктов — наша основная специализация. Мы делаем лендинги под заявки и продажи,
      корпоративный сайт для компаний и команд, а также помогаем с запуском интернет-магазина и веб-приложения. Вся
      разработка ведётся на современном стеке: React и TypeScript, что даёт быструю загрузку, удобную поддержку и
      возможность масштабирования.
    </p>
    <p>
      От идеи и прототипа до запуска и дальнейшего развития — мы сопровождаем проект на всех этапах. В стоимость входят
      премиум-дизайн, адаптивная вёрстка, базовая SEO-оптимизация и настройка форм или интеграций по запросу. После сдачи
      проекта доступна поддержка: правки, новые блоки, доработки под изменения в бизнесе.
    </p>
    <p>
      Лендинги и корпоративные сайты мы собираем так, чтобы они одинаково хорошо смотрелись на телефоне, планшете и
      десктопе. Используем аккуратную типографику, оптимизацию изображений и лёгкую сборку — страницы открываются быстро и
      не перегружают пользователя. Если нужен не просто одностраничник, а многостраничный сайт или каталог — можем
      спроектировать структуру и реализовать её на React TypeScript с удобной панелью или интеграцией с вашей CMS.
    </p>
    <p>
      Сроки зависят от объёма и готовности контента: от нескольких дней для простого лендинга до нескольких недель для
      сложного веб-приложения. Оплата обычно по этапам — так удобнее планировать бюджет. Напишите нам, опишите задачу, и
      мы предложим план и ориентиры по срокам и стоимости.
    </p>
  </>
);

const SEO_HIDDEN_EN = (
  <>
    <p>Clean build. Fast launch. Reliable support.</p>
    <p>
      Website development and digital products are our core focus. We build landing pages for leads and sales, corporate
      sites for companies and teams, and help launch e-commerce and web applications. Everything is built with React and
      TypeScript for fast load times, easy support, and scalability.
    </p>
    <p>
      From idea and prototype to launch and beyond — we support the project at every stage. Premium design, responsive
      layout, basic SEO, and forms or integrations are included. After delivery we offer ongoing support: edits, new
      sections, and updates as your business evolves.
    </p>
    <p>
      Landing pages and corporate sites are built to look and work well on mobile, tablet, and desktop. We use clean
      typography, optimized images, and a light build so pages load quickly. For multi-page sites or catalogs we can
      design the structure and implement it with React TypeScript and optional CMS integration.
    </p>
  </>
);

export default function SeoContent() {
  const { lang } = useLang();
  const isRu = lang === "ru";

  return (
    <Section id="seo-content" className="bg-black">
      <Container>
        <div
          className="mx-auto max-w-4xl py-10 sm:py-14"
          role="article"
          aria-label={isRu ? "О создании сайтов и услугах TIVONIX" : "About website development and TIVONIX services"}
        >
          <h2 className="sr-only">
            {isRu
              ? "Создание сайта, лендинга, MVP, Telegram-бота и веб-разработка"
              : "Website, landing, MVP, Telegram bot and web development"}
          </h2>

          {/* Видимый контент (коротко и красиво) */}
          {isRu ? VISIBLE_RU : VISIBLE_EN}

          {/* Скрытый SEO-текст (не видно глазами, но есть в HTML) */}
          <div className="sr-only" aria-hidden="false">
            {isRu ? SEO_HIDDEN_RU : SEO_HIDDEN_EN}
          </div>
        </div>
      </Container>
    </Section>
  );
}