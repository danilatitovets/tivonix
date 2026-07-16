/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_ADS_ID?: string;
  readonly VITE_GOOGLE_ADS_CONVERSION_LABEL?: string;
  readonly VITE_PARTNER_PANEL_URL?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_HOTJAR_ID?: string;
  readonly VITE_HOTJAR_SV?: string;
  readonly VITE_HOTJAR_FORCE?: string;
  readonly VITE_NEXT_PUBLIC_HOTJAR_ID?: string;
  readonly VITE_NEXT_PUBLIC_HOTJAR_SV?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
