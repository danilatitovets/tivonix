# TIVONIX — отчёт: conversion, SEO, trust, performance

Дата: 2026-09-03  
Проект: `сайт-визитка` (Vite + React, Vercel)

## Резюме

Дизайн TIVONIX **не менялся** (цвета, композиция, анимации, карточки). Обновлены тексты, SEO, аналитика, контакты, кейсы, тарифы, sitemap, canonical на `https://www.tivonix.tech`, добавлены SEO-страницы услуг EN/RU.

---

## Изменённые файлы (основные)

| Область | Файлы |
|---------|--------|
| Конфиг | `src/config/siteConfig.ts`, `.env.example` |
| Позиционирование / тексты | `src/i18n/landingCopy.ts`, `pricingCopy.ts`, `homeExtraCopy.ts` |
| Кейсы | `src/data/projectsCatalog.ts`, `projectCaseSystem.ts` |
| SEO | `src/components/SEO.tsx`, `src/lib/localePaths.ts`, `src/lib/schema.ts`, `public/sitemap.xml`, `scripts/check-seo.mjs`, `src/i18n/partnersPaths.ts` |
| SEO-страницы | `src/i18n/servicePagesCopy.ts`, `src/pages/ServiceLandingPage.tsx`, `src/AppRoutes.tsx`, `scripts/prerender-routes.mjs` |
| Аналитика | `src/lib/analyticsAdapter.ts`, `analytics.ts`, `App.tsx`, `ConsentBanner.tsx`, `PageViewTracker.tsx` |
| Контакты | `src/pages/ContactsPage.tsx`, `src/constants/links.ts`, `Footer.tsx` |
| Доверие / отзывы | `HomeTestimonialsSection.tsx`, `projectsCatalog.ts` (фильтр co-founder) |
| Инфра | `vercel.json` (CSP, HSTS, redirect `/ru/partners` → `/partners`, cache `/assets/`) |
| Документация | `ANALYTICS_SETUP.md`, `TIVONIX_REQUIRED_BUSINESS_DATA.md` |

---

## Тексты и позиционирование

### Hero
- **RU:** «Сайты и автоматизация для бизнеса», фокус на заявку до результата, CTA «Получить письменную оценку».
- **EN:** «Founder-led product studio», SaaS/MVP/portals, CTA «Get a written scope & estimate».
- **ZH:** профессиональный перевод без EN/RU фрагментов.

### Тарифы
- Цены **не изменены**: Start $400, Growth $900, Product $2000.
- Убраны искусственная скидка Launch discount и зачёркнутые цены.
- Переименованы планы (Launch page, Focused MVP foundation и т.д.).
- Product ≠ «полный веб-сервис»; границы MVP vs Custom описаны в FAQ.

### Кейсы
- Структура: контекст → задача → delivery → ответственность → результат → технологии → статус.
- Удалены неподтверждённые: $200k investor, «huge admin», «3 weeks full marketplace».
- `master cabinet` → **service provider portal** (EN).

---

## Ссылки

| Было | Исправлено |
|------|------------|
| Gmail compose URL на EN contacts | `mailto:` с локализованной темой |
| EN footer → RU `/sozdanie-sajtov` | EN → `/en/website-development` и др. |
| Дубль `/ru/partners` в sitemap | Redirect 301 → `/partners`, убран из sitemap |
| Canonical без `www` | Единый origin `https://www.tivonix.tech` |
| ZH canonical → RU на /about, /projects, /contacts | `canonicalPathForLang()` |

**Партнёрская панель:** `VITE_PARTNER_PANEL_URL` → `/login`, `/register?type=referral|white_label`.

**Внешние проекты** (статус не проверялся runtime): spliton.io, headmind.ru, slotty.of.by, logovo24.by, neo-terminal — при недоступности используйте нейтральный статус на странице кейса.

---

## Аналитика

Единый adapter: `analyticsAdapter.ts` + события в `analytics.ts`:

`page_view`, `cta_click`, `project_view`, `external_project_click`, `pricing_view`, `form_open`, `form_start`, `form_validation_error`, `form_submit_success`, `form_submit_error`, `telegram_click`, `email_click`, `partner_cta_click`.

Параметры: locale, page_path, cta_source, plan, UTM. **PII не передаётся.**

Инструкция: `ANALYTICS_SETUP.md`.

---

## Env-переменные

См. `.env.example` и `TIVONIX_REQUIRED_BUSINESS_DATA.md`.

---

## SEO

- Canonical / OG / JSON-LD → `www.tivonix.tech`
- hreflang: ru, en, zh-CN, x-default
- Новые страницы в sitemap (RU + EN services)
- `check-seo.mjs` обновлён под новые тексты и www

---

## Производительность

| Метрика | Значение (после сборки) |
|---------|-------------------------|
| Main JS (`index-*.js`) | ~1735 KB (uncompressed) — требует дальнейшего code-splitting тяжёлых 3D/Three блоков |

- Immutable cache для `/assets/` в `vercel.json`
- Lazy import сохранён на уровне тяжёлых компонентов (Hero WebGL и др.) где уже был
- Eager routes для корректного SSR prerender SEO

---

## Проверки

| Проверка | Результат |
|----------|-----------|
| `npm run typecheck` | ✅ Pass |
| `npm run build` + `check-seo.mjs` | ✅ Pass |
| `npm run test` | ✅ Pass (leads + mileseal) |
| `npm run lint` | ⚠️ 94 существующих замечаний (не блокируют build) |

---

## Маршруты prerender

`/`, `/en`, `/zh`, projects, plans, about, contacts, partners, mileseal, 5 кейсов, RU/EN service pages, `avtomatizaciya-biznesa`.

---

## TODO для владельца

1. Заполнить юридические данные и LinkedIn (`TIVONIX_REQUIRED_BUSINESS_DATA.md`).
2. Настроить GA4, Hotjar, Search Console (`ANALYTICS_SETUP.md`).
3. Подтвердить публикацию бюджетов/сроков в кейсах.
4. Добавить проверяемые ссылки к отзывам клиентов.
5. Опционально: `hello@tivonix.tech` после настройки почты.
6. Дальнейшее уменьшение JS: вынести Three.js/WebGL в отдельный async chunk.

---

## Визуальные изменения

**Нет.** Только тексты, SEO-meta, mailto вместо Gmail, aria-hidden на дубликатах отзывов в marquee.
