export type MilesealCommercialCopy = {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    reviewCta: string;
    caseCta: string;
  };
  ladder: {
    eyebrow: string;
    title: string;
    subtitle: string;
    featuredBadge: string;
    tiers: Array<{
      id: "review" | "audit" | "installation";
      eyebrow: string;
      price: string;
      title: string;
      text: string;
      note?: string;
      cta?: string;
      featured?: boolean;
    }>;
  };
};

export function milesealCommercialCopy(): MilesealCommercialCopy {
  return {
    hero: {
      badge: "For agencies & studios",
      title: "Stop one client request before it becomes unpaid work.",
      subtitle:
        "Compare a late client ask against the agreed scope, estimate the extra effort, and send a professional change request — or get a human review within 24 hours.",
      reviewCta: "Review my request — free",
      caseCta: "See the 56-hour case",
    },
    ladder: {
      eyebrow: "Commercial ladder",
      title: "Start free. Scale when scope leakage is real.",
      subtitle:
        "Every tier builds on the last. The $350 audit fee is credited in full toward Founding Installation.",
      featuredBadge: "Most chosen",
      tiers: [
        {
          id: "review",
          eyebrow: "Last Incident Review",
          price: "Free",
          title: "One real scope-creep case",
          text: "Send a recent client request and agreed scope. We return a clear read within 24 hours.",
          cta: "Review my request — free",
        },
        {
          id: "audit",
          eyebrow: "Scope Leakage Audit",
          price: "$350",
          title: "Structured leakage audit",
          text: "We review your delivery workflow, scope boundaries, and where unpaid hours enter the project.",
          cta: "Request the $350 audit",
          featured: true,
        },
        {
          id: "installation",
          eyebrow: "Founding Installation",
          price: "$1,250",
          title: "MileSeal installed for your team",
          text: "Templates, change-request wording, and a repeatable scope-change workflow for client work.",
          note: "$350 audit fee credited toward Installation.",
        },
      ],
    },
  };
}
