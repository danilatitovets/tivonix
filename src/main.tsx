import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { LangProvider } from "./i18n/LangProvider";
import { markTelegramWebView } from "./lib/telegramWebView";
import { bindStableViewport } from "./lib/stableViewport";
import "./index.css";

markTelegramWebView();
bindStableViewport();

const root = document.getElementById("root");

const app = (
  <HelmetProvider>
    <LangProvider>
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
