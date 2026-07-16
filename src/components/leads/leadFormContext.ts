import { createContext } from "react";
import type { CtaSource } from "../../lib/analytics";
import type { PlanId } from "../../lib/pricingData";

export type OpenLeadFormOptions = {
  planId?: PlanId | null;
};

export type LeadFormContextValue = {
  openLeadForm: (source: CtaSource, options?: OpenLeadFormOptions) => void;
  closeLeadForm: () => void;
  isOpen: boolean;
  source: CtaSource;
  planId: PlanId | null;
};

export const LeadFormContext = createContext<LeadFormContextValue | null>(null);
