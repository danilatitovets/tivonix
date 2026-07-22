import { LeadFormProvider } from "./components/leads/LeadFormProvider";
import { AppRoutes } from "./AppRoutes";
import ConsentBanner from "./components/ConsentBanner";
import ScrollDepthTracker from "./components/ScrollDepthTracker";

/** Shared tree for SSR (MemoryRouter) and client (BrowserRouter) — must match for hydration. */
export function AppShell() {
  return (
    <LeadFormProvider>
      <AppRoutes />
      <ConsentBanner />
      <ScrollDepthTracker />
    </LeadFormProvider>
  );
}
