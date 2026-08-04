export type MilesealDemoExample = {
  id: string;
  label: string;
  scope: string;
  request: string;
  result: {
    status: string;
    /** Big metric, e.g. "14–18" */
    hoursValue: string;
    /** Big metric, e.g. "$840–$1,080" */
    costValue: string;
    /** Short reason shown on the summary card */
    reason: string;
    recommendation: string;
    changeRequest: string;
  };
};

export type ScopeFormPrefill = {
  scope?: string;
  request?: string;
  changeRequest?: string;
};
