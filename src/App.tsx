// src/App.tsx
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));

const HEADER_OFFSET = 84; 

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
