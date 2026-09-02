import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ContactsPage from "./pages/ContactsPage";
import AutomationBusinessPage from "./pages/AutomationBusinessPage";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";
import PartnersPage from "./pages/PartnersPage";
import NotFoundPage from "./pages/NotFoundPage";
import MilesealPage from "./pages/MilesealPage";
import MilesealCaseContentMigrationPage from "./pages/MilesealCaseContentMigrationPage";
import ServiceLandingPage from "./pages/ServiceLandingPage";
import { LangPathSync } from "./i18n/LangProvider";
import {
  PARTNERS_PATH_EN,
  PARTNERS_PATH_RU,
  PARTNERS_PATH_RU_LEGACY,
  PARTNERS_PATH_ZH,
} from "./i18n/partnersPaths";

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
        <Route path="/zh" element={<LandingPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/en/projects" element={<ProjectsPage />} />
        <Route path="/zh/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/en/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/zh/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/plans" element={<PricingPage />} />
        <Route path="/en/plans" element={<PricingPage />} />
        <Route path="/zh/plans" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/en/about" element={<AboutPage />} />
        <Route path="/zh/about" element={<AboutPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/en/contacts" element={<ContactsPage />} />
        <Route path="/zh/contacts" element={<ContactsPage />} />
        <Route path="/sozdanie-sajtov" element={<ServiceLandingPage pageId="websites" />} />
        <Route path="/razrabotka-mvp" element={<ServiceLandingPage pageId="mvp" />} />
        <Route path="/razrabotka-crm" element={<ServiceLandingPage pageId="crm" />} />
        <Route path="/razrabotka-lichnogo-kabineta" element={<ServiceLandingPage pageId="portal" />} />
        <Route path="/telegram-boty-dlya-biznesa" element={<ServiceLandingPage pageId="telegram" />} />
        <Route path="/avtomatizaciya-biznesa" element={<AutomationBusinessPage />} />
        <Route path="/en/website-development" element={<ServiceLandingPage pageId="websites" />} />
        <Route path="/en/mvp-development" element={<ServiceLandingPage pageId="mvp" />} />
        <Route path="/en/business-automation" element={<ServiceLandingPage pageId="automation" />} />
        <Route path="/en/client-portal-development" element={<ServiceLandingPage pageId="portal" />} />
        <Route path="/en/telegram-bot-development" element={<ServiceLandingPage pageId="telegram" />} />
        <Route path="/en/white-label-development" element={<ServiceLandingPage pageId="white-label" />} />
        <Route path="/mileseal" element={<MilesealPage />} />
        <Route path="/en/mileseal" element={<MilesealPage />} />
        <Route path="/zh/mileseal" element={<MilesealPage />} />
        <Route
          path="/mileseal/cases/content-migration"
          element={<MilesealCaseContentMigrationPage />}
        />
        <Route
          path="/en/mileseal/cases/content-migration"
          element={<MilesealCaseContentMigrationPage />}
        />
        <Route
          path="/zh/mileseal/cases/content-migration"
          element={<MilesealCaseContentMigrationPage />}
        />
        <Route path={PARTNERS_PATH_RU} element={<PartnersPage />} />
        <Route path={PARTNERS_PATH_RU_LEGACY} element={<PartnersPage />} />
        <Route path={PARTNERS_PATH_EN} element={<PartnersPage />} />
        <Route path={PARTNERS_PATH_ZH} element={<PartnersPage />} />
        <Route path="/en/*" element={<NotFoundPage />} />
        <Route path="/zh/*" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
