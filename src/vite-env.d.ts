/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_ADS_ID?: string;
  readonly VITE_GOOGLE_ADS_CONVERSION_LABEL?: string;
  readonly VITE_PARTNER_PANEL_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
