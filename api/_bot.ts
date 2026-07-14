// api/_bot.ts
import { Bot, Context, InlineKeyboard, session, SessionFlavor } from "grammy";
import type { PlanId } from "../src/lib/pricingData.js";
import {
  formatPlanHighlightsForTelegram,
  formatPlanPriceLine,
  formatPlansOverviewForTelegram,
  PLAN_PRICE_USD,
} from "../src/i18n/pricingCopy.js";

type Lang = "ru" | "en";

type SessionData = {
  step:
    | "idle"
    | "lead_chat"
    | "lang"
    | "consent"
    | "project_type"
    | "project_type_text" // ✅ новый шаг для своего текста
    | "features"
    | "timeline"
    | "budget"
    | "note";
  lang?: Lang;
  source?: string;

  projectType?: string;
  features?: string[];
  timeline?: string;
  budget?: string;

  // admin "tracker" message to edit
  adminTracker?: Record<string, { chatId: number; messageId: number }>;
};

type MyContext = Context & SessionFlavor<SessionData>;

const PROJECT_TYPES = [
  { k: "saas", ru: "SaaS / MVP", en: "SaaS / MVP" },
  { k: "cabinet", ru: "Личный кабинет / веб-сервис", en: "Client portal / web app" },
  { k: "landing", ru: "Лендинг / сайт", en: "Landing / website" },
  { k: "support", ru: "Доработки / поддержка", en: "Fixes / support" },
] as const;

const FEATURES = [
  { ru: "Авторизация + роли", en: "Auth + roles" },
  { ru: "Админка", en: "Admin panel" },
  { ru: "Платежи", en: "Payments" },
  { ru: "Аналитика/метрики", en: "Analytics/metrics" },
  { ru: "Интеграции (CRM/API)", en: "Integrations (CRM/API)" },
  { ru: "Чат/уведомления", en: "Chat/notifications" },
  { ru: "Файлы/документы", en: "Files/documents" },
] as const;

const TIMELINES = [
  { ru: "Срочно (1–2 недели)", en: "Urgent (1–2 weeks)" },
  { ru: "2–4 недели", en: "2–4 weeks" },
  { ru: "1–2 месяца", en: "1–2 months" },
  { ru: "Не важно", en: "No preference" },
] as const;

const BUDGETS = [
  { ru: "до $500", en: "under $500" },
  { ru: "$500–$1500", en: "$500–$1500" },
  { ru: "$1500–$5000", en: "$1500–$5000" },
  { ru: "$5000+", en: "$5000+" },
  { ru: "Пока не знаю", en: "Not sure yet" },
] as const;

function parseAdminIds(raw: string | undefined) {
  return new Set(
    (raw ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => Number(s))
      .filter((n) => Number.isFinite(n))
  );
}

function botTokenOrThrow(token?: string) {
  if (!token) throw new Error("BOT_TOKEN is missing");
  return token;
}

function escapeHtml(s: string) {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function formatBotSource(source: string) {
  const map: Record<string, string> = {
    calc: "calc (default)",
    direct: "Direct (без параметра)",
    plan_start: "Start (/plans)",
    plan_growth: "Growth (/plans)",
    plan_product: "Product (/plans)",
    plan_custom: "Custom (/plans)",
    plan_help: "Help (/plans)",
    partner_agency: "Partners (/partners)",
  };
  return map[source] ?? source;
}

type PlanWelcomeEntry = {
  intro: string;
  cta: string;
  planId?: PlanId;
  priceNote?: string;
  useHtml?: boolean;
};

const PLAN_WELCOME_ENTRIES: Record<string, PlanWelcomeEntry> = {
  plan_start: {
    planId: "start",
    intro: "Привет! Вы выбрали <b>Start</b> — быстрый запуск: лендинг, заявки и Telegram.",
    cta: "📝 Напишите коротко, чем занимается ваш бизнес — подскажем следующий шаг.",
    useHtml: true,
  },
  plan_growth: {
    planId: "growth",
    intro: "Привет! Вы выбрали <b>Growth</b> — система заявок, Telegram и мини-CRM.",
    cta: "📝 Напишите, чем занимается бизнес и сколько заявок в месяц — подскажем, как собрать систему.",
    useHtml: true,
  },
  plan_product: {
    planId: "product",
    intro: "Привет! Вы выбрали <b>Product</b> — веб-сервис с кабинетом, админкой и оплатой.",
    cta: "📝 Коротко опишите продукт и ключевые функции.",
    useHtml: true,
  },
  plan_custom: {
    planId: "custom",
    intro: "Привет! Вы выбрали <b>Custom</b> — автоматизация, AI или индивидуальное решение.",
    priceNote: "💰 Стоимость: индивидуально — зависит от задачи и объёма.",
    cta: "📝 Напишите, какой процесс хотите автоматизировать.",
    useHtml: true,
  },
  plan_help: {
    intro: "Привет! Поможем выбрать подходящий план.",
    cta: "📝 Напишите, что хотите запустить: сайт, бот, CRM, кабинет, автоматизацию или просто идею.",
    useHtml: true,
  },
  partner_agency: {
    intro:
      "Привет! Это заявка в <b>TIVONIX Partners</b> — white-label и referral для агентств.",
    cta:
      "📝 Напишите: название агентства, нишу и формат (referral или white-label). Коротко опишите первого клиента или задачу.",
    useHtml: true,
  },
};

function buildPlanWelcome(payload: string): { text: string; parseMode?: "HTML" } | undefined {
  const entry = PLAN_WELCOME_ENTRIES[payload];
  if (!entry) return undefined;

  const priceLine =
    entry.priceNote ??
    (entry.planId && entry.planId in PLAN_PRICE_USD
      ? formatPlanPriceLine(entry.planId as keyof typeof PLAN_PRICE_USD, "ru")
      : undefined);

  const highlightsLine = entry.planId
    ? formatPlanHighlightsForTelegram(entry.planId, "ru")
    : payload === "plan_help"
      ? formatPlansOverviewForTelegram("ru")
      : undefined;

  const text = [entry.intro, priceLine, highlightsLine, entry.cta].filter(Boolean).join("\n\n");

  return entry.useHtml ? { text, parseMode: "HTML" } : { text };
}

const DEFAULT_WELCOME =
  "Привет! Это TIVONIX. Мы делаем сайты, боты, CRM, веб-сервисы и автоматизации, чтобы заявки не терялись. Напишите, что хотите запустить.";

const WELCOME_PHOTO_PATH = "/images/photo_2026-07-08_16-44-47.jpg";
const TELEGRAM_CAPTION_LIMIT = 1024;

const LEAD_ACK =
  "Спасибо! Заявка принята. Мы ответим вам в ближайшее время.";

function formatNowRu() {
  return new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
}

function t(lang: Lang, key: string, vars?: Record<string, string>) {
  const dict: Record<Lang, Record<string, string>> = {
    ru: {
      choose_lang: "Выберите язык / Choose language:",
      consent_title: "Перед началом нужно согласие",
      consent_text:
        "Я собираю ваш Telegram username/ID и ответы на вопросы, чтобы связаться с вами и рассчитать стоимость.\n" +
        "Нажимая «Согласен», вы даёте согласие на обработку персональных данных.\n\n" +
        "📄 {privacy}\n" +
        "✅ {consent}",
      // кнопки
      agree: "✅ Согласен — начать",
      decline: "❌ Не согласен",
      declined_text: "Ок. Без согласия я не могу принять заявку.",
      start_over: "Начать заново",

      q_project: "1/5 Что нужно сделать?",
      q_project_custom_btn: "✍️ Написать своё",
      q_project_custom_hint:
        "Напишите одним сообщением, что нужно сделать.\nНапример: «CRM для салона + личный кабинет + оплата»",

      q_features: "2/5 Какие модули нужны? (можно несколько)",
      done_pick_features: "Готово ✅",
      q_timeline: "3/5 Какие сроки?",
      q_budget: "4/5 Какой бюджетный диапазон?",
      q_note:
        "5/5 Пришлите ссылку на ТЗ/макет/сайт (если есть) или кратко опишите задачу одним сообщением.",

      sent: "Спасибо! Заявка отправлена. Мы напишем вам в ближайшее время.",
      open_chat: "Открыть чат",

      tracker_title: "Пользователь заполняет заявку",
      tracker_user: "Пользователь",
      tracker_source: "Источник",
      tracker_lang: "Язык",
      tracker_step: "Шаг",
      tracker_project: "Тип",
      tracker_features: "Модули",
      tracker_timeline: "Срок",
      tracker_budget: "Бюджет",
      tracker_note: "Комментарий",
      step_lang: "Выбор языка",
      step_consent: "Согласие",
      step_project: "Тип проекта",
      step_project_text: "Свой вариант",
      step_features: "Модули",
      step_timeline: "Сроки",
      step_budget: "Бюджет",
      step_note: "Описание",
      tracker_final: "✅ Заявка отправлена",
      tracker_declined: "❌ Отказ от согласия",
    },
    en: {
      choose_lang: "Choose language / Выберите язык:",
      consent_title: "Consent required",
      consent_text:
        "I collect your Telegram username/ID and your answers to estimate the project and contact you.\n" +
        "By pressing “I agree”, you consent to personal data processing.\n\n" +
        "📄 {privacy}\n" +
        "✅ {consent}",
      agree: "✅ I agree — start",
      decline: "❌ I don’t agree",
      declined_text: "Okay. Without consent I can’t accept the request.",
      start_over: "Start over",

      q_project: "1/5 What do you need?",
      q_project_custom_btn: "✍️ Write my own",
      q_project_custom_hint:
        "Write in one message what you need.\nExample: “Client portal + payments + admin panel”",

      q_features: "2/5 Which features do you need? (multi-select)",
      done_pick_features: "Done ✅",
      q_timeline: "3/5 Timeline?",
      q_budget: "4/5 Budget range?",
      q_note:
        "5/5 Send a link to specs/design/site (if any) or describe your task in one message.",

      sent: "Thanks! Your request was sent. We’ll message you soon.",
      open_chat: "Open chat",

      tracker_title: "User is filling the request",
      tracker_user: "User",
      tracker_source: "Source",
      tracker_lang: "Language",
      tracker_step: "Step",
      tracker_project: "Type",
      tracker_features: "Features",
      tracker_timeline: "Timeline",
      tracker_budget: "Budget",
      tracker_note: "Note",
      step_lang: "Language",
      step_consent: "Consent",
      step_project: "Project type",
      step_project_text: "Custom text",
      step_features: "Features",
      step_timeline: "Timeline",
      step_budget: "Budget",
      step_note: "Description",
      tracker_final: "✅ Request submitted",
      tracker_declined: "❌ Consent declined",
    },
  };

  let s = dict[lang][key] ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v);
  return s;
}

function langKeyboard() {
  return new InlineKeyboard().text("🇷🇺 Русский", "lang:ru").text("🇬🇧 English", "lang:en");
}

function consentKeyboard(lang: Lang) {
  return new InlineKeyboard()
    .text(t(lang, "agree"), "consent:yes")
    .row()
    .text(t(lang, "decline"), "consent:no");
}

function projectTypeKeyboard(lang: Lang) {
  const kb = new InlineKeyboard();
  for (const p of PROJECT_TYPES) kb.text(lang === "ru" ? p.ru : p.en, `q:project:${p.k}`).row();
  kb.text(t(lang, "q_project_custom_btn"), "q:project:custom").row();
  return kb;
}

function featuresKeyboard(lang: Lang, selected: Set<number>) {
  const kb = new InlineKeyboard();
  FEATURES.forEach((f, idx) => {
    const mark = selected.has(idx) ? "✅ " : "☑️ ";
    kb.text(mark + (lang === "ru" ? f.ru : f.en), `q:feat:${idx}`).row();
  });
  kb.text(t(lang, "done_pick_features"), "q:feat:done");
  return kb;
}

function timelineKeyboard(lang: Lang) {
  const kb = new InlineKeyboard();
  TIMELINES.forEach((x, i) => kb.text(lang === "ru" ? x.ru : x.en, `q:timeline:${i}`).row());
  return kb;
}

function budgetKeyboard(lang: Lang) {
  const kb = new InlineKeyboard();
  BUDGETS.forEach((x, i) => kb.text(lang === "ru" ? x.ru : x.en, `q:budget:${i}`).row());
  return kb;
}

function selectedFeatureIndexesFromSession(lang: Lang, features: string[] | undefined) {
  const s = new Set<number>();
  FEATURES.forEach((f, i) => {
    const label = lang === "ru" ? f.ru : f.en;
    if ((features ?? []).includes(label)) s.add(i);
  });
  return s;
}

function getBaseUrlFromContext(ctx: MyContext) {
  const b = (ctx as any).bot;
  const baseUrl = b?.config?.baseUrl;
  return typeof baseUrl === "string" && baseUrl.startsWith("http")
    ? baseUrl
    : "https://www.tivonix.tech";
}

function splitWelcomeForPhoto(text: string): { caption: string; followUp?: string } {
  const blocks = text.split("\n\n");
  const captionBlocks: string[] = [];
  const restBlocks: string[] = [];

  for (const block of blocks) {
    const candidate = [...captionBlocks, block].join("\n\n");
    if (candidate.length <= TELEGRAM_CAPTION_LIMIT) {
      captionBlocks.push(block);
    } else {
      restBlocks.push(block);
    }
  }

  return {
    caption: captionBlocks.join("\n\n"),
    followUp: restBlocks.length ? restBlocks.join("\n\n") : undefined,
  };
}

async function replyWithWelcomePhoto(
  ctx: MyContext,
  text: string,
  parseMode?: "HTML"
) {
  const photoUrl = `${getBaseUrlFromContext(ctx)}${WELCOME_PHOTO_PATH}`;
  const { caption, followUp } = splitWelcomeForPhoto(text);
  const textOpts = {
    parse_mode: parseMode,
    link_preview_options: { is_disabled: true as const },
  };

  try {
    await ctx.replyWithPhoto(photoUrl, { caption, ...textOpts });
    if (followUp) {
      await ctx.reply(followUp, textOpts);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[bot] welcome photo fail, fallback to text", { error: message });
    await ctx.reply(text, textOpts);
  }
}

function docUrl(base: string, fileName: string) {
  return `${base}/doc/${encodeURIComponent(fileName)}`;
}

function getDocs(ctx: MyContext) {
  const baseUrl = getBaseUrlFromContext(ctx);
  return {
    ru: {
      privacyUrl: docUrl(baseUrl, "Политика_обработки_ПД_Tivonix_RU.pdf"),
      consentUrl: docUrl(baseUrl, "Согласие_на_обработку_ПД_Tivonix_RU.pdf"),
    },
    en: {
      privacyUrl: docUrl(baseUrl, "Privacy_Policy_Tivonix_EN.pdf"),
      consentUrl: docUrl(baseUrl, "Consent_Tivonix_EN.pdf"),
    },
  };
}

function userLabel(ctx: MyContext) {
  const from = ctx.from;
  const username = from?.username ? `@${from.username}` : "—";
  const name = [from?.first_name, from?.last_name].filter(Boolean).join(" ").trim() || "—";
  return `${name} (${username}) id=${from?.id}`;
}

function stepName(lang: Lang, step: SessionData["step"]) {
  const map: Record<SessionData["step"], string> = {
    idle: "-",
    lead_chat: "Диалог (/plans)",
    lang: t(lang, "step_lang"),
    consent: t(lang, "step_consent"),
    project_type: t(lang, "step_project"),
    project_type_text: t(lang, "step_project_text"),
    features: t(lang, "step_features"),
    timeline: t(lang, "step_timeline"),
    budget: t(lang, "step_budget"),
    note: t(lang, "step_note"),
  };
  return map[step];
}

export function createBot(env: { BOT_TOKEN: string; ADMIN_IDS?: string }) {
  const bot = new Bot<MyContext>(botTokenOrThrow(env.BOT_TOKEN));
  const admins = parseAdminIds(env.ADMIN_IDS);

  bot.use(
    session<SessionData, MyContext>({
      initial(): SessionData {
        return { step: "idle" };
      },
    })
  );

  bot.use(async (ctx, next) => {
    const updateType = ctx.message
      ? "message"
      : ctx.callbackQuery
        ? "callback_query"
        : "other";
    console.log("[bot] update", {
      updateId: ctx.update.update_id,
      type: updateType,
      chatId: ctx.chat?.id ?? null,
    });
    await next();
  });

  const ensureLang = (ctx: MyContext): Lang => ctx.session.lang ?? "ru";

  async function notifyAdminLead(
    ctx: MyContext,
    opts: { kind: "start" | "message"; messageText: string }
  ) {
    if (!admins.size) {
      console.warn("[bot] admin notify skipped: ADMIN_IDS not configured");
      return;
    }

    const source = formatBotSource(ctx.session.source ?? "direct");
    const text =
      `<b>📩 Новая заявка из Telegram</b>\n\n` +
      `<b>Источник:</b> ${escapeHtml(source)}\n` +
      `<b>Пользователь:</b> ${escapeHtml(userLabel(ctx))}\n` +
      `<b>Сообщение:</b> ${escapeHtml(opts.messageText)}\n` +
      `<b>Время:</b> ${escapeHtml(formatNowRu())}`;

    for (const adminId of admins) {
      try {
        await ctx.api.sendMessage(adminId, text, {
          parse_mode: "HTML",
          link_preview_options: { is_disabled: true },
        });
        console.log("[bot] admin notify success", { adminId, kind: opts.kind });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("[bot] admin notify fail", { adminId, kind: opts.kind, error: message });
      }
    }
  }

  async function upsertAdminTracker(ctx: MyContext, extraStatus?: string) {
    if (!ctx.from) return;
    const lang = ensureLang(ctx);

    const text =
      `<b>🧾 ${escapeHtml(t(lang, "tracker_title"))}</b>\n\n` +
      `<b>${escapeHtml(t(lang, "tracker_user"))}:</b> ${escapeHtml(userLabel(ctx))}\n` +
      `<b>${escapeHtml(t(lang, "tracker_source"))}:</b> ${escapeHtml(formatBotSource(ctx.session.source ?? "direct"))}\n` +
      `<b>${escapeHtml(t(lang, "tracker_lang"))}:</b> ${escapeHtml(ctx.session.lang ?? "—")}\n` +
      `<b>${escapeHtml(t(lang, "tracker_step"))}:</b> ${escapeHtml(stepName(lang, ctx.session.step))}\n\n` +
      `<b>${escapeHtml(t(lang, "tracker_project"))}:</b> ${escapeHtml(ctx.session.projectType ?? "—")}\n` +
      `<b>${escapeHtml(t(lang, "tracker_features"))}:</b> ${escapeHtml((ctx.session.features ?? []).join(", ") || "—")}\n` +
      `<b>${escapeHtml(t(lang, "tracker_timeline"))}:</b> ${escapeHtml(ctx.session.timeline ?? "—")}\n` +
      `<b>${escapeHtml(t(lang, "tracker_budget"))}:</b> ${escapeHtml(ctx.session.budget ?? "—")}\n` +
      `<b>${escapeHtml(t(lang, "tracker_note"))}:</b> ${escapeHtml(extraStatus ?? "—")}`;

    ctx.session.adminTracker = ctx.session.adminTracker ?? {};

    for (const adminId of admins) {
      const key = String(adminId);
      const existing = ctx.session.adminTracker[key];

      try {
        if (existing?.messageId) {
          await ctx.api.editMessageText(existing.chatId, existing.messageId, text, {
            parse_mode: "HTML",
            link_preview_options: { is_disabled: true },
          });
        } else {
          const msg = await ctx.api.sendMessage(adminId, text, {
            parse_mode: "HTML",
            link_preview_options: { is_disabled: true },
          });
          ctx.session.adminTracker[key] = { chatId: adminId, messageId: msg.message_id };
        }
      } catch {
        // ignore
      }
    }
  }

  async function goChooseLang(ctx: MyContext, source?: string) {
    ctx.session.step = "lang";
    ctx.session.source = source ?? ctx.session.source;
    await ctx.reply(t("ru", "choose_lang"), { reply_markup: langKeyboard() });
    await upsertAdminTracker(ctx, "—");
  }

  async function goConsent(ctx: MyContext) {
    const lang = ensureLang(ctx);
    ctx.session.step = "consent";

    const docs = getDocs(ctx)[lang];

    // ✅ красивые ссылки (HTML)
    const privacyLink =
      lang === "ru"
        ? `<a href="${docs.privacyUrl}">Политика обработки ПД</a>`
        : `<a href="${docs.privacyUrl}">Privacy Policy</a>`;
    const consentLink =
      lang === "ru"
        ? `<a href="${docs.consentUrl}">Согласие на обработку ПД</a>`
        : `<a href="${docs.consentUrl}">Consent to processing</a>`;

    const text =
      `🛡 <b>${escapeHtml(t(lang, "consent_title"))}</b>\n\n` +
      escapeHtml(
        lang === "ru"
          ? "Я собираю ваш Telegram username/ID и ответы на вопросы, чтобы связаться с вами и рассчитать стоимость.\nНажимая «Согласен», вы даёте согласие на обработку персональных данных."
          : "I collect your Telegram username/ID and your answers to estimate the project and contact you.\nBy pressing “I agree”, you consent to personal data processing."
      ) +
      `\n\n📄 ${privacyLink}\n✅ ${consentLink}`;

    await ctx.reply(text, {
      parse_mode: "HTML",
      reply_markup: consentKeyboard(lang),
      link_preview_options: { is_disabled: true },
    });

    await upsertAdminTracker(ctx, "—");
  }

  async function startQuiz(ctx: MyContext) {
    const lang = ensureLang(ctx);
    ctx.session.step = "project_type";
    await ctx.reply(t(lang, "q_project"), { reply_markup: projectTypeKeyboard(lang) });
    await upsertAdminTracker(ctx, "—");
  }

  bot.command("start", async (ctx) => {
    const payload = (ctx.match?.trim?.() as string | undefined) || "";
    console.log("[bot] /start payload", { payload: payload || "(empty)" });

    if (payload === "calc") {
      ctx.session = {
        step: "idle",
        source: "calc",
        lang: ctx.session.lang,
        adminTracker: ctx.session.adminTracker,
      };
      await goChooseLang(ctx, "calc");
      return;
    }

    const source = payload || "direct";
    const welcome = buildPlanWelcome(payload);
    const startMessage = payload ? `/start ${payload}` : "/start";

    ctx.session = {
      step: "lead_chat",
      source,
      lang: ctx.session.lang,
      adminTracker: ctx.session.adminTracker,
    };

    if (welcome) {
      await replyWithWelcomePhoto(ctx, welcome.text, welcome.parseMode);
    } else {
      await replyWithWelcomePhoto(ctx, DEFAULT_WELCOME);
    }
    await notifyAdminLead(ctx, { kind: "start", messageText: startMessage });
  });

  bot.command("estimate", async (ctx) => {
    ctx.session.source = ctx.session.source ?? "command_estimate";
    if (!ctx.session.lang) return goChooseLang(ctx, ctx.session.source);
    await goConsent(ctx);
  });

  bot.callbackQuery(/^lang:(ru|en)$/, async (ctx) => {
    const lang = ctx.match?.[1] as Lang;
    ctx.session.lang = lang;
    await ctx.answerCallbackQuery();
    await ctx.editMessageReplyMarkup().catch(() => {});
    await upsertAdminTracker(ctx, `lang=${lang}`);
    await goConsent(ctx);
  });

  bot.callbackQuery("restart", async (ctx) => {
    await ctx.answerCallbackQuery();
    ctx.session = {
      step: "idle",
      source: ctx.session.source,
      lang: ctx.session.lang,
      adminTracker: ctx.session.adminTracker,
    };
    await goChooseLang(ctx, "restart");
  });

  bot.callbackQuery(/^consent:(yes|no)$/, async (ctx) => {
    const lang = ensureLang(ctx);
    const yes = ctx.match?.[1] === "yes";
    await ctx.answerCallbackQuery();

    if (!yes) {
      ctx.session.step = "idle";
      await upsertAdminTracker(ctx, t(lang, "tracker_declined"));
      await ctx.reply(t(lang, "declined_text"), {
        reply_markup: new InlineKeyboard().text(t(lang, "start_over"), "restart"),
      });
      return;
    }

    await upsertAdminTracker(ctx, "✅ consent=yes");
    await startQuiz(ctx);
  });

  // Q1: choose project type OR custom text
  bot.callbackQuery(/^q:project:(.+)$/, async (ctx) => {
    const lang = ensureLang(ctx);
    if (ctx.session.step !== "project_type") return ctx.answerCallbackQuery();

    const key = ctx.match?.[1] as string;

    if (key === "custom") {
      ctx.session.step = "project_type_text";
      await ctx.answerCallbackQuery();
      await upsertAdminTracker(ctx, "custom project type…");
      await ctx.reply(t(lang, "q_project_custom_hint"));
      return;
    }

    const p = PROJECT_TYPES.find((x) => x.k === key);
    if (!p) return ctx.answerCallbackQuery();

    ctx.session.projectType = lang === "ru" ? p.ru : p.en;
    ctx.session.features = [];
    ctx.session.step = "features";

    await ctx.answerCallbackQuery();
    await upsertAdminTracker(ctx, `project=${ctx.session.projectType}`);

    await ctx.reply(t(lang, "q_features"), { reply_markup: featuresKeyboard(lang, new Set()) });
  });

  // Простой диалог после /start plan_* или пустого /start
  bot.on("message:text", async (ctx, next) => {
    if (ctx.session.step !== "lead_chat") {
      await next();
      return;
    }

    const text = ctx.message.text.trim();
    if (text.startsWith("/")) {
      await next();
      return;
    }

    await ctx.reply(LEAD_ACK);
    await notifyAdminLead(ctx, { kind: "message", messageText: text });
  });

  // ✅ custom project type text handler
  bot.on("message:text", async (ctx, next) => {
    const lang = ensureLang(ctx);

    // if user is typing custom project type
    if (ctx.session.step === "project_type_text") {
      const text = ctx.message.text.trim();
      ctx.session.projectType = text || (lang === "ru" ? "Своя задача" : "Custom task");
      ctx.session.features = [];
      ctx.session.step = "features";

      await upsertAdminTracker(ctx, `project(custom)=${ctx.session.projectType}`);

      await ctx.reply(t(lang, "q_features"), { reply_markup: featuresKeyboard(lang, new Set()) });
      return;
    }

    await next();
  });

  // Q2: multi select features
  bot.callbackQuery(/^q:feat:(\d+|done)$/, async (ctx) => {
    const lang = ensureLang(ctx);
    if (ctx.session.step !== "features") return ctx.answerCallbackQuery();

    const v = ctx.match?.[1] as string;
    const currentLabels = new Set(ctx.session.features ?? []);

    if (v === "done") {
      ctx.session.step = "timeline";
      await ctx.answerCallbackQuery();
      await upsertAdminTracker(ctx, `features=${(ctx.session.features ?? []).join(", ") || "—"}`);
      await ctx.reply(t(lang, "q_timeline"), { reply_markup: timelineKeyboard(lang) });
      return;
    }

    const idx = Number(v);
    if (!Number.isFinite(idx) || idx < 0 || idx >= FEATURES.length) {
      await ctx.answerCallbackQuery();
      return;
    }

    const label = lang === "ru" ? FEATURES[idx].ru : FEATURES[idx].en;
    if (currentLabels.has(label)) currentLabels.delete(label);
    else currentLabels.add(label);

    ctx.session.features = Array.from(currentLabels);
    await ctx.answerCallbackQuery();

    const selected = selectedFeatureIndexesFromSession(lang, ctx.session.features);
    await upsertAdminTracker(ctx, `features=${(ctx.session.features ?? []).join(", ") || "—"}`);

    await ctx
      .editMessageReplyMarkup({ reply_markup: featuresKeyboard(lang, selected) })
      .catch(async () => {
        await ctx.reply(t(lang, "q_features"), { reply_markup: featuresKeyboard(lang, selected) });
      });
  });

  // Q3
  bot.callbackQuery(/^q:timeline:(\d+)$/, async (ctx) => {
    const lang = ensureLang(ctx);
    if (ctx.session.step !== "timeline") return ctx.answerCallbackQuery();

    const idx = Number(ctx.match?.[1]);
    if (!Number.isFinite(idx) || idx < 0 || idx >= TIMELINES.length) return ctx.answerCallbackQuery();

    ctx.session.timeline = lang === "ru" ? TIMELINES[idx].ru : TIMELINES[idx].en;
    ctx.session.step = "budget";

    await ctx.answerCallbackQuery();
    await upsertAdminTracker(ctx, `timeline=${ctx.session.timeline}`);
    await ctx.reply(t(lang, "q_budget"), { reply_markup: budgetKeyboard(lang) });
  });

  // Q4
  bot.callbackQuery(/^q:budget:(\d+)$/, async (ctx) => {
    const lang = ensureLang(ctx);
    if (ctx.session.step !== "budget") return ctx.answerCallbackQuery();

    const idx = Number(ctx.match?.[1]);
    if (!Number.isFinite(idx) || idx < 0 || idx >= BUDGETS.length) return ctx.answerCallbackQuery();

    ctx.session.budget = lang === "ru" ? BUDGETS[idx].ru : BUDGETS[idx].en;
    ctx.session.step = "note";

    await ctx.answerCallbackQuery();
    await upsertAdminTracker(ctx, `budget=${ctx.session.budget}`);
    await ctx.reply(t(lang, "q_note"));
  });

  // Q5 note (final text)
  bot.on("message:text", async (ctx, next) => {
    const lang = ensureLang(ctx);
    if (ctx.session.step !== "note") {
      await next();
      return;
    }

    const note = ctx.message.text.trim();
    const from = ctx.from;
    const username = from?.username ? `@${from.username}` : "—";
    const name = [from?.first_name, from?.last_name].filter(Boolean).join(" ").trim() || "—";
    const source = formatBotSource(ctx.session.source ?? "direct");

    await upsertAdminTracker(ctx, note || "—");

    const leadHtml =
      `<b>📩 Новая заявка</b>\n\n` +
      `<b>Источник:</b> ${escapeHtml(source)}\n` +
      `<b>Тип:</b> ${escapeHtml(ctx.session.projectType ?? "—")}\n` +
      `<b>Модули:</b> ${escapeHtml((ctx.session.features ?? []).join(", ") || "—")}\n` +
      `<b>Срок:</b> ${escapeHtml(ctx.session.timeline ?? "—")}\n` +
      `<b>Бюджет:</b> ${escapeHtml(ctx.session.budget ?? "—")}\n` +
      `<b>Комментарий:</b> ${escapeHtml(note || "—")}\n\n` +
      `<b>Контакт:</b> ${escapeHtml(name)} (${escapeHtml(username)})\n` +
      `<b>ID:</b> <code>${from?.id}</code>`;

    const kb = new InlineKeyboard()
      .url(t(lang, "open_chat"), `tg://user?id=${from?.id}`)
      .url("👤 Профиль", from?.username ? `https://t.me/${from.username}` : `tg://user?id=${from?.id}`);

    for (const adminId of admins) {
      ctx.api
        .sendMessage(adminId, leadHtml, {
          parse_mode: "HTML",
          link_preview_options: { is_disabled: true },
          reply_markup: kb,
        })
        .catch(() => {});
    }

    await upsertAdminTracker(ctx, t(lang, "tracker_final"));
    await ctx.reply(t(lang, "sent"));

    ctx.session = {
      step: "idle",
      lang: ctx.session.lang,
      source: ctx.session.source,
      adminTracker: ctx.session.adminTracker,
    };
  });

  bot.command("help", async (ctx) => {
    const lang = ensureLang(ctx);
    const isAdmin = ctx.from && admins.has(ctx.from.id);
    const helpText =
      lang === "ru"
        ? "Команды: /start /estimate" + (isAdmin ? " /admin" : "") + "\n\n/start → выбор языка → согласие → 5 вопросов."
        : "Commands: /start /estimate" + (isAdmin ? " /admin" : "") + "\n\n/start → choose language → consent → 5 questions.";
    await ctx.reply(helpText);
  });

  bot.command("admin", async (ctx) => {
    const userId = ctx.from?.id;
    if (userId == null || !admins.has(userId)) {
      await ctx.reply("Нет доступа. / Access denied.");
      return;
    }
    const today = new Date().toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    let visitCount: number | null = null;
    try {
      const baseUrl = getBaseUrlFromContext(ctx);
      const res = await fetch(`${baseUrl}/api/visit?stats=1`);
      if (res.ok) {
        const data = (await res.json()) as { count?: number };
        visitCount = typeof data?.count === "number" ? data.count : 0;
      }
    } catch {
      // сеть или API недоступны
    }
    const countText =
      visitCount !== null ? String(visitCount) : "0";
    const hint =
      visitCount === null
        ? "\n\n💡 Счётчик в памяти; если бот и сайт на разных инстансах — может показывать 0."
        : "";
    await ctx.reply(
      `👋 Админ-панель\n\n` +
        `📅 Дата: ${today}\n` +
        `👁 Визитов сегодня: ${countText}` +
        hint +
        `\n\nИспользуйте бота для заявок — новые заявки приходят сюда.`
    );
  });

  return bot;
}