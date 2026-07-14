import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LangProvider } from "./i18n/LangProvider";
import { AppRoutes } from "./AppRoutes";
import type { Lang } from "./i18n/LangProvider";

function langFromUrl(url: string): Lang {
  try {
    const path = (url.startsWith("http") ? new URL(url).pathname : url.split("?")[0]) || "/";
    if (path === "/en" || path.startsWith("/en/")) return "en";
    return "ru";
  } catch {
    return "ru";
  }
}

export function render(url: string) {
  const helmetContext: { helmet?: { title?: { toString(): string }; meta?: { toString(): string }; link?: { toString(): string }; script?: { toString(): string } } } = {};
  const initialLang = langFromUrl(url);

  const appHtml = renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <LangProvider initialLang={initialLang}>
          <MemoryRouter initialEntries={[url]}>
            <AppRoutes />
          </MemoryRouter>
        </LangProvider>
      </HelmetProvider>
    </React.StrictMode>
  );

  const { helmet } = helmetContext;
  const headTags = [
    helmet?.title?.toString() ?? "",
    helmet?.meta?.toString() ?? "",
    helmet?.link?.toString() ?? "",
    helmet?.script?.toString() ?? "",
  ]
    .filter(Boolean)
    .join("\n");

  return { appHtml, headTags };
}
