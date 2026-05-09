import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ContactsPage from "./pages/ContactsPage";
import WebsiteCreationPage from "./pages/WebsiteCreationPage";
import AutomationBusinessPage from "./pages/AutomationBusinessPage";

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
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/sozdanie-sajtov" element={<WebsiteCreationPage />} />
        <Route path="/avtomatizaciya-biznesa" element={<AutomationBusinessPage />} />
      </Routes>
    </>
  );
}
