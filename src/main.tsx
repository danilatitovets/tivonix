import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { LangProvider } from "./i18n/LangProvider";
import { readBootstrapLang } from "./lib/readBootstrapLang";
import { markTelegramWebView } from "./lib/telegramWebView";
import { bindStableViewport } from "./lib/stableViewport";
import "./index.css";

const root = document.getElementById("root");

const initialLang = readBootstrapLang();

const app = (
  <HelmetProvider>
    <LangProvider initialLang={initialLang}>
      <App />
    </LangProvider>
  </HelmetProvider>
);

if (root) {
  if (root.hasChildNodes()) {
    hydrateRoot(root, app);
  } else {
    createRoot(root).render(app);
  }
}

// Mutate <html> only AFTER hydrateRoot so server HTML attributes stay intact
// during the first client render (lang / data-lang / style.--app-vh).
queueMicrotask(() => {
  markTelegramWebView();
  bindStableViewport();
});
