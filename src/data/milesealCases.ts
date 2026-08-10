import type { Lang } from "../i18n/LangProvider";

export type MilesealCaseTeaserCopy = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
};

export type MilesealCaseDef = {
  slug: string;
  scenarioId: string;
  path: string;
  published: boolean;
  teaser: Record<Lang, MilesealCaseTeaserCopy>;
};

/** Published case-study routes — extend this list when new demos ship. */
export const MILESEAL_CASES: MilesealCaseDef[] = [
  {
    slug: "content-migration",
    scenarioId: "content-migration",
    path: "/mileseal/cases/content-migration",
    published: true,
    teaser: {
      en: {
        eyebrow: "DEMONSTRATION CASE",
        title: "See how a “small” content request became 56 additional hours",
        description:
          "Follow the original scope, the later client request, MileSeal’s decision and the resulting change request.",
        cta: "View the full case",
      },
      ru: {
        eyebrow: "ДЕМОНСТРАЦИОННЫЙ КЕЙС",
        title: "Как «небольшой» запрос на контент превратился в 56 дополнительных часов",
        description:
          "Посмотрите исходный объём, поздний запрос клиента, решение MileSeal и готовый запрос на изменение.",
        cta: "Смотреть полный кейс",
      },
      zh: {
        eyebrow: "演示案例",
        title: "看看一个“很小”的内容请求如何变成额外 56 小时",
        description: "跟随最初范围、后续客户请求、MileSeal 判定以及最终变更请求。",
        cta: "查看完整案例",
      },
    },
  },
  {
    slug: "extra-integrations",
    scenarioId: "integrations",
    path: "/mileseal/cases/extra-integrations",
    published: false,
    teaser: {
      en: {
        eyebrow: "DEMONSTRATION CASE",
        title: "When “just connect CRM and payments” adds 22–30 hours",
        description:
          "Walk through a fixed marketing-site scope, a late integration request, and the change request MileSeal prepares.",
        cta: "View the full case",
      },
      ru: {
        eyebrow: "ДЕМОНСТРАЦИОННЫЙ КЕЙС",
        title: "Когда «просто подключите CRM и оплату» добавляет 22–30 часов",
        description:
          "Пройдите сценарий с фиксированным объёмом сайта, поздним запросом на интеграции и готовым запросом на изменение.",
        cta: "Смотреть полный кейс",
      },
      zh: {
        eyebrow: "演示案例",
        title: "当“只要接 CRM 和支付”变成额外 22–30 小时",
        description: "跟随固定网站范围、后续集成请求，以及 MileSeal 生成的变更请求。",
        cta: "查看完整案例",
      },
    },
  },
  {
    slug: "additional-revisions",
    scenarioId: "revisions",
    path: "/mileseal/cases/additional-revisions",
    published: false,
    teaser: {
      en: {
        eyebrow: "DEMONSTRATION CASE",
        title: "Extra revision rounds and dark mode outside the agreed scope",
        description:
          "Compare the signed landing scope with a late design request and see how MileSeal frames the change request.",
        cta: "View the full case",
      },
      ru: {
        eyebrow: "ДЕМОНСТРАЦИОННЫЙ КЕЙС",
        title: "Дополнительные раунды правок и тёмная тема вне согласованного объёма",
        description:
          "Сравните подписанный объём лендинга с поздним дизайн-запросом и посмотрите, как MileSeal оформляет запрос на изменение.",
        cta: "Смотреть полный кейс",
      },
      zh: {
        eyebrow: "演示案例",
        title: "额外修订轮次与深色模式超出约定范围",
        description: "对照已签署着陆页范围与后续设计请求，查看 MileSeal 如何生成变更请求。",
        cta: "查看完整案例",
      },
    },
  },
];

export function publishedMilesealCases(): MilesealCaseDef[] {
  return MILESEAL_CASES.filter((entry) => entry.published);
}

export function milesealCaseForScenario(scenarioId: string): MilesealCaseDef | undefined {
  return MILESEAL_CASES.find((entry) => entry.published && entry.scenarioId === scenarioId);
}

export function milesealCaseBySlug(slug: string): MilesealCaseDef | undefined {
  return MILESEAL_CASES.find((entry) => entry.slug === slug);
}

export function milesealCaseTeaser(entry: MilesealCaseDef, lang: Lang): MilesealCaseTeaserCopy {
  return entry.teaser[lang] ?? entry.teaser.en;
}
