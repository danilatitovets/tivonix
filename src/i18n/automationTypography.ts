/** Единый стиль заголовков страницы «Автоматизация бизнеса»: только белый текст, font-display. */

export const automationTypo = {
  /** Главный заголовок страницы (hero) */
  h1: "font-display text-white font-[850] leading-[1.02] tracking-[-0.04em] text-[32px] sm:text-[48px] lg:text-[56px]",
  /** Все крупные заголовки секций */
  h2: "font-display text-white font-[850] leading-[0.98] tracking-[-0.045em] text-[32px] sm:text-[44px] lg:text-[52px]",
  /** Заголовки карточек и компактных блоков */
  h3: "font-display text-white font-[800] leading-[1.1] tracking-[-0.03em] text-[20px] sm:text-[22px]",
  /** Акцентные заголовки (слайды, сетка «Почему TIVONIX») */
  h3Lg: "font-display text-white font-[800] leading-[1.08] tracking-[-0.035em] text-[24px] sm:text-[28px] lg:text-[32px]",
} as const;
