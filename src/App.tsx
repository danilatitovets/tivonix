// src/App.tsx
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { initGoogleAds, trackAdsConversion } from "./lib/ads";
import LandingPage from "./pages/LandingPage";

const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));

const HEADER_OFFSET = 84;

function closestAnchor(el: EventTarget | null): HTMLAnchorElement | null {
  let e = el as HTMLElement | null;
  while (e && e !== document.body) {
    if (e.tagName === "A") return e as HTMLAnchorElement;
    e = e.parentElement;
  }
  return null;
}

function isContactLink(href: string): boolean {
  if (href.startsWith("mailto:")) return true;
  if (/^https?:\/\/(www\.)?(t\.me|telegram\.me)\//i.test(href)) return true;
  return false;
}

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    requestAnimationFrame(() => {
      const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  useEffect(() => {
    initGoogleAds();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const a = closestAnchor(e.target);
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (!href || !isContactLink(href)) return;

      const newTab = (a.getAttribute("target") ?? "").toLowerCase() === "_blank";
      if (newTab) {
        trackAdsConversion("contact_click");
        return;
      }

      e.preventDefault();
      trackAdsConversion("contact_click", () => {
        window.location.href = href;
      });
      setTimeout(() => {
        window.location.href = href;
      }, 700);
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  // Учёт визита: один раз за сессию в день вызываем /api/visit
  useEffect(() => {
    const key = "tivonix_visit_date";
    const today = new Date().toISOString().slice(0, 10);
    try {
      const sent = sessionStorage.getItem(key);
      if (sent === today) return;
      fetch("/api/visit", { method: "GET", keepalive: true }).finally(() => {
        try {
          sessionStorage.setItem(key, today);
        } catch {}
      });
    } catch {}
  }, []);

  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/projects"
          element={
            <Suspense fallback={<div className="min-h-screen bg-[var(--bg)]" aria-busy="true" />}>
              <ProjectsPage />
            </Suspense>
          }
        />
        <Route
          path="/contacts"
          element={
            <Suspense fallback={<div className="min-h-screen bg-[var(--bg)]" aria-busy="true" />}>
              <ContactsPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
