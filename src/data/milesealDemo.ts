export type MilesealDemoExample = {
  id: string;
  label: string;
  scope: string;
  request: string;
  result: {
    status: string;
    /** Big metric, e.g. "14–18 hours" */
    hoursValue: string;
    /** Big metric, e.g. "$840–$1,080" */
    costValue: string;
    /** Timeline impact, e.g. "3–5 days" */
    timelineValue: string;
    /** Confidence label, e.g. "High" */
    confidence: string;
    /** Short reason shown on the summary card */
    reason: string;
    recommendation: string;
    /** Work categories that sum to hoursValue range */
    effortItems: string[];
    changeRequest: string;
    changeRequestSoft: string;
    changeRequestFormal: string;
  };
};

export type ScopeFormPrefill = {
  scope?: string;
  request?: string;
  changeRequest?: string;
};
