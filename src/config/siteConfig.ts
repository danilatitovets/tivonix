/**
 * Central site configuration — contacts, legal, social, analytics env.
 * Do not invent business data; leave empty until owner provides values.
 */

const env = import.meta.env;

/** Primary canonical origin (www). */
export const CANONICAL_ORIGIN =
  (env.VITE_SITE_URL as string | undefined)?.replace(/\/+$/, "") ||
  "https://www.tivonix.tech";

/** Primary contact email — always shown when set. */
export const CONTACT_EMAIL = "tivoonix@gmail.com";

/** Optional public hello@ — shown only when explicitly configured. */
export const HELLO_EMAIL = (env.VITE_HELLO_EMAIL as string | undefined)?.trim() || "";

export const TELEGRAM_URL = "https://t.me/TIVONIX";
export const INSTAGRAM_URL = "https://www.instagram.com/tivonix.tech/";

/** LinkedIn company or founder profile — schema/footer only when set. */
export const LINKEDIN_URL = (env.VITE_LINKEDIN_URL as string | undefined)?.trim() || "";

/** Legal entity — output only when filled. */
export const LEGAL = {
  companyName: (env.VITE_LEGAL_COMPANY_NAME as string | undefined)?.trim() || "",
  unp: (env.VITE_LEGAL_UNP as string | undefined)?.trim() || "",
  address: (env.VITE_LEGAL_ADDRESS as string | undefined)?.trim() || "",
  phone: (env.VITE_LEGAL_PHONE as string | undefined)?.trim() || "",
} as const;

export const ANALYTICS = {
  gaMeasurementId: (env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim() || "",
  hotjarId: (env.VITE_HOTJAR_ID as string | undefined)?.trim() || "",
  hotjarSv: (env.VITE_HOTJAR_SV as string | undefined)?.trim() || "6",
  googleSiteVerification:
    (env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined)?.trim() || "",
  googleAdsId: (env.VITE_GOOGLE_ADS_ID as string | undefined)?.trim() || "",
  googleAdsConversionLabel:
    (env.VITE_GOOGLE_ADS_CONVERSION_LABEL as string | undefined)?.trim() || "",
} as const;

/** Whether any analytics vendor is configured. */
export function hasAnalyticsConfigured(): boolean {
  return Boolean(
    ANALYTICS.gaMeasurementId ||
      ANALYTICS.hotjarId ||
      (ANALYTICS.googleAdsId && ANALYTICS.googleAdsConversionLabel)
  );
}

/** Real social profiles for schema.org sameAs. */
export function socialSameAs(): string[] {
  const out: string[] = [TELEGRAM_URL, INSTAGRAM_URL];
  if (LINKEDIN_URL) out.push(LINKEDIN_URL);
  return out;
}

/** All public contact emails (primary + optional hello@). */
export function publicContactEmails(): string[] {
  const list = [CONTACT_EMAIL];
  if (HELLO_EMAIL && HELLO_EMAIL !== CONTACT_EMAIL) list.push(HELLO_EMAIL);
  return list;
}
