import { useContext } from "react";
import { LeadFormContext } from "./leadFormContext";

export function useLeadForm() {
  const ctx = useContext(LeadFormContext);
  if (!ctx) throw new Error("useLeadForm must be used within LeadFormProvider");
  return ctx;
}
