import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ContactsPage from "./pages/ContactsPage";
import WebsiteCreationPage from "./pages/WebsiteCreationPage";
import AutomationBusinessPage from "./pages/AutomationBusinessPage";
import PricingPage from "./pages/PricingPage";
import PartnersPage from "./pages/PartnersPage";
import NotFoundPage from "./pages/NotFoundPage";
import { LangPathSync } from "./i18n/LangProvider";
import { PARTNERS_PATH_EN, PARTNERS_PATH_RU } from "./i18n/partnersPaths";

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

export function AppRoutes() {
  return (
    <>
      <LangPathSync />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/en" element={<LandingPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/en/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/en/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/plans" element={<PricingPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/en/contacts" element={<ContactsPage />} />
        <Route path="/sozdanie-sajtov" element={<WebsiteCreationPage />} />
        <Route path="/avtomatizaciya-biznesa" element={<AutomationBusinessPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path={PARTNERS_PATH_RU} element={<PartnersPage />} />
        <Route path={PARTNERS_PATH_EN} element={<PartnersPage />} />
        <Route path="/en/*" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
