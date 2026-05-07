import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LangProvider } from "./i18n/LangProvider";
import { AppRoutes } from "./AppRoutes";

export function render(url: string) {
  const helmetContext: { helmet?: { title?: { toString(): string }; meta?: { toString(): string }; link?: { toString(): string }; script?: { toString(): string } } } = {};

  const appHtml = renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <LangProvider>
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
