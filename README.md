# TIVONIX

Official website for **TIVONIX** — a product development studio building web platforms, CRM systems, Telegram bots, and AI-assisted business automation.

**Live:** [www.tivonix.tech](https://www.tivonix.tech)

---

## Purpose

TIVONIX presents the studio, services, pricing, case studies, and lead intake. The site is a marketing and conversion surface connected to email/Telegram lead delivery — not a placeholder landing page.

---

## Main features

- Marketing pages: home, services, projects, pricing, partners, contacts
- Case study pages for shipped products
- Lead forms with server-side delivery (email + optional Telegram notify)
- Cookie consent–gated analytics (Hotjar / ads IDs when configured)
- SSR prerender pipeline for SEO-critical HTML
- SEO checks and lead-path verification scripts

---

## Architecture

- **Frontend:** React + TypeScript + Vite (SPA with SSR prerender)
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **Serverless API:** Vercel functions under `api/` (lead intake, rate limiting, delivery)
- **Telegram:** Grammy-based bot webhook support for lead notifications
- **Deploy:** Vercel

```
Browser (React SPA)
   ↓ form submit
Vercel /api/leads  →  Resend email  (+ optional Telegram)
```

---

## Stack

| Area | Technologies |
| --- | --- |
| UI | React 19, TypeScript, Vite, Tailwind CSS |
| SEO | react-helmet-async, prerender scripts, Playwright checks |
| API | Vercel Node functions |
| Messaging | Grammy (Telegram), Resend (email) |
| Visual | Three.js / React Three Fiber (select surfaces) |

---

## Security & data

- Lead delivery secrets (`RESEND_API_KEY`, Telegram tokens) stay on the server — never exposed as `VITE_*`
- Rate limiting on lead endpoints
- Analytics/Hotjar load only after consent where configured
- `.env` is gitignored; use `.env.example` as the template

---

## Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

### Environment variables (from `.env.example`)

| Variable | Role |
| --- | --- |
| `VITE_SITE_URL` | Canonical site URL |
| `VITE_GOOGLE_ADS_ID` / `VITE_GOOGLE_ADS_CONVERSION_LABEL` | Optional ads tracking |
| `VITE_PARTNER_PANEL_URL` | Partner panel link |
| `VITE_HOTJAR_ID` / `VITE_HOTJAR_SV` / `VITE_HOTJAR_FORCE` | Optional Hotjar |
| `LEADS_EMAIL_TO` / `LEADS_EMAIL_FROM` | Lead inbox + verified sender |
| `RESEND_API_KEY` | Email delivery |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` | Optional lead alerts |

Do not commit real secrets.

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Vite development server |
| `npm run build` | Client + SSR build, prerender, SEO check |
| `npm run build:client` | Client bundle only |
| `npm run build:server` | SSR bundle only |
| `npm run preview` | Preview production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run check:seo` | SEO verification |
| `npm run check:leads` / `npm test` | Lead path checks |
| `npm run verify:hydration` | Hydration verification |

---

## Status

**Active production website** for TIVONIX (`www.tivonix.tech`). Content and lead pipeline are maintained as part of studio operations.
