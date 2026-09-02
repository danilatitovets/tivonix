import { LeadFormProvider } from "./components/leads/LeadFormProvider";
import { AppRoutes } from "./AppRoutes";
import ConsentBanner from "./components/ConsentBanner";
import ScrollDepthTracker from "./components/ScrollDepthTracker";
import PageViewTracker from "./components/PageViewTracker";

/** Shared tree for SSR (MemoryRouter) and client (BrowserRouter) — must match for hydration. */
export function AppShell() {
  return (
    <LeadFormProvider>
      <PageViewTracker />
      <AppRoutes />
      <ConsentBanner />
      <ScrollDepthTracker />
    </LeadFormProvider>
  );
}
