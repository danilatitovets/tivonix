import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import type { CtaSource } from "../../lib/analytics";
import { trackCtaPrimaryClick, trackLeadFormOpen } from "../../lib/analytics";
import type { PlanId } from "../../lib/pricingData";
import LeadFormModal from "./LeadFormModal";
import { LeadFormContext, type OpenLeadFormOptions } from "./leadFormContext";

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<CtaSource>("unknown");
  const [planId, setPlanId] = useState<PlanId | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const openLeadForm = useCallback((ctaSource: CtaSource, options?: OpenLeadFormOptions) => {
    trackCtaPrimaryClick(ctaSource);
    trackLeadFormOpen(ctaSource);
    setSource(ctaSource);
    setPlanId(options?.planId ?? null);
    setOpen(true);
  }, []);

  const closeLeadForm = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({ openLeadForm, closeLeadForm, isOpen: open, source, planId }),
    [openLeadForm, closeLeadForm, open, source, planId]
  );

  return (
    <LeadFormContext.Provider value={value}>
      {children}
      <LeadFormModal
        open={open}
        source={source}
        planId={planId}
        onClose={closeLeadForm}
      />
    </LeadFormContext.Provider>
  );
}
