# Настройка аналитики TIVONIX

## Переменные окружения (Vercel / `.env`)

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_HOTJAR_ID=1234567
VITE_HOTJAR_SV=6
VITE_GOOGLE_SITE_VERIFICATION=xxxxxxxxxxxxxxxx
VITE_GOOGLE_ADS_ID=AW-XXXXXXXXX          # опционально
VITE_GOOGLE_ADS_CONVERSION_LABEL=xxxxx  # опционально
```

Счётчики загружаются **только после принятия cookies** в баннере согласия.
Если ни один ID не задан, баннер analytics cookies **не показывается**.

## Google Analytics 4

1. [analytics.google.com](https://analytics.google.com) → Admin → Create property `tivonix.tech`.
2. Data stream → Web → URL `https://www.tivonix.tech`.
3. Скопируйте **Measurement ID** (`G-...`) в `VITE_GA_MEASUREMENT_ID`.
4. Admin → Events — проверьте, что приходят события:
   - `page_view`, `cta_click`, `form_open`, `form_start`, `form_submit_success`, `pricing_view`, `project_view`, `telegram_click`, `email_click`, `partner_cta_click`.
5. **Не создавайте** custom dimensions для email/телефона/имени — PII в аналитику не передаётся.

## Google Search Console

1. [search.google.com/search-console](https://search.google.com/search-console) → Add property → **URL prefix** `https://www.tivonix.tech/`.
2. Verification → HTML tag → скопируйте `content=` в `VITE_GOOGLE_SITE_VERIFICATION`.
3. Submit sitemap: `https://www.tivonix.tech/sitemap.xml`.
4. Проверьте hreflang и canonical через URL Inspection для `/`, `/en`, `/zh`.

## Hotjar

1. Sites → New site → `https://www.tivonix.tech`.
2. Site ID → `VITE_HOTJAR_ID`.
3. Убедитесь, что запись начинается только после Accept в cookie banner.

## Google Ads (опционально)

1. Tools → Conversions → создайте conversion action «Lead form submit».
2. Tag setup → скопируйте `AW-...` и conversion label в env.
3. Конверсия отправляется на `form_submit_success` и клики mailto/Telegram.

## Проверка после деплоя

1. Откройте сайт в incognito → Accept cookies.
2. DevTools → Network → фильтр `google-analytics.com` / `hotjar`.
3. Кликните CTA «Получить письменную оценку» → событие `form_open`.
4. **Не отправляйте** реальную заявку на production для теста — используйте DebugView GA4.

Search Console **не считается подключённой**, пока владелец не завершит верификацию и не отправит sitemap.
