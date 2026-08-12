import { useEffect, useMemo, useReducer, useRef, type MouseEvent, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { AlertCircle, ArrowRight, Check, Loader2 } from "lucide-react";
import Container from "../ui/Container";
import { ctaClass } from "../leads/ctaStyles";
import BgLoopVideo from "../ui/BgLoopVideo";
import { useLang } from "../../i18n/LangProvider";
import { pathForLang } from "../../lib/localePaths";
import { trackMilesealDemoStarted, trackMilesealSampleDownloaded } from "../../lib/analytics";
import WorkStartDecisionPanel from "./WorkStartDecisionPanel";
import {
  authorizationLabel,
  decisionLabel,
  formatWorkStartDecisionBlock,
} from "../../lib/workStartDecision";
import { workStartDecisionCopy } from "../../i18n/workStartDecisionCopy";
import {
  CASE_ADDITIONAL_HOURS,
  caseAdditionalCost,
  caseTimelineDays,
  formatCaseBusinessDays,
  formatCaseHours,
  formatGbp,
  milesealCaseChangeRequestPlainText,
  milesealCaseCopy,
  type CaseTone,
} from "../../i18n/milesealCaseCopy";
import {
  caseDemoReducer,
  createInitialCaseDemoState,
} from "./milesealCaseDemoState";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top: Math.max(0, y), behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    /* fall through */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import type { Lang } from "../../i18n/LangProvider";
import { savePdfWithTextLayer } from "../../lib/milesealPdf";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function fetchAsDataUrl(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  const blob = await res.blob();
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error(`Failed to read ${url}`));
    reader.readAsDataURL(blob);
  });
}

const MILESEAL_MARK_SVG = (size: number) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="${size}" height="${size}" style="display:block;width:${size}px;height:${size}px;">
  <defs>
    <linearGradient id="pdfMsPeakL${size}" x1="18" y1="8" x2="48" y2="40" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFF1E3"/><stop offset="0.35" stop-color="#FFC48A"/><stop offset="1" stop-color="#FC5000"/>
    </linearGradient>
    <linearGradient id="pdfMsPeakR${size}" x1="78" y1="8" x2="48" y2="40" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFE0C2"/><stop offset="0.4" stop-color="#FF9A3D"/><stop offset="1" stop-color="#E04500"/>
    </linearGradient>
    <linearGradient id="pdfMsLeft${size}" x1="12" y1="28" x2="40" y2="88" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFAE66"/><stop offset="0.55" stop-color="#FC5000"/><stop offset="1" stop-color="#B83200"/>
    </linearGradient>
    <linearGradient id="pdfMsRight${size}" x1="84" y1="28" x2="56" y2="88" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FC5000"/><stop offset="0.5" stop-color="#D63A00"/><stop offset="1" stop-color="#8F2400"/>
    </linearGradient>
    <linearGradient id="pdfMsCenter${size}" x1="48" y1="30" x2="48" y2="72" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFD7B0"/><stop offset="0.45" stop-color="#FF8A3D"/><stop offset="1" stop-color="#FC5000"/>
    </linearGradient>
    <linearGradient id="pdfMsBridge${size}" x1="24" y1="20" x2="72" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFE8D2"/><stop offset="1" stop-color="#FF9A3D"/>
    </linearGradient>
  </defs>
  <path d="M16 30 L30 10 L48 34 L30 28 Z" fill="url(#pdfMsPeakL${size})"/>
  <path d="M80 30 L66 10 L48 34 L66 28 Z" fill="url(#pdfMsPeakR${size})"/>
  <path d="M30 10 L48 34 L66 10 L66 28 L48 46 L30 28 Z" fill="url(#pdfMsBridge${size})" opacity="0.95"/>
  <path d="M16 30 L30 28 L30 52 L24 82 L16 70 Z" fill="url(#pdfMsLeft${size})"/>
  <path d="M80 30 L66 28 L66 52 L72 82 L80 70 Z" fill="url(#pdfMsRight${size})"/>
  <path d="M30 28 L48 46 L66 28 L66 52 L48 70 L30 52 Z" fill="url(#pdfMsCenter${size})"/>
  <path d="M30 10 L48 34 L30 28 Z" fill="#FFF8F0" opacity="0.9"/>
  <path d="M66 10 L48 34 L66 28 Z" fill="#FFB070" opacity="0.75"/>
  <path d="M30 52 L48 70 L48 46 Z" fill="#FF8A3D" opacity="0.55"/>
  <path d="M66 52 L48 70 L48 46 Z" fill="#D63A00" opacity="0.45"/>
</svg>`.trim();

async function downloadChangeRequestPdf(opts: {
  lang: Lang;
  plainText: string;
  docKind: string;
  docTitle: string;
  projectLabel: string;
  projectValue: string;
  statusLabel: string;
  statusValue: string;
  body: string;
  effortLabel: string;
  hoursLabel: string;
  costLabelName: string;
  costLabel: string;
  timelineLabelName: string;
  timelineLabel: string;
  approval: string;
  dateLocale: string;
  fileName?: string;
  workStartDecision?: {
    heading: string;
    ownerLabel: string;
    owner: string;
    decisionLabel: string;
    decision: string;
    rationaleLabel: string;
    rationale: string;
    authorizationLabel: string;
    authorization: string;
    dateLabel: string;
    date: string;
  };
}) {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://www.tivonix.tech";
  const generatedAt = new Date().toLocaleDateString(opts.dateLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let logoLockup = `${origin}/images/tivonix-logo-white.png`;
  try {
    logoLockup = await fetchAsDataUrl(`${origin}/images/tivonix-logo-white.png`);
  } catch {
    /* keep absolute URL fallback */
  }

  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText =
    "position:fixed;left:-10000px;top:0;width:794px;background:#0a0a0a;z-index:-1;pointer-events:none;";
  host.innerHTML = `
    <div id="mileseal-pdf-sheet" style="
      box-sizing:border-box;width:794px;min-height:1123px;padding:48px 44px 40px;
      background:#0a0a0a;color:#ffffff;
      font-family:'DM Sans','Segoe UI',system-ui,-apple-system,sans-serif;
      -webkit-font-smoothing:antialiased;
    ">
      <table style="width:100%;border-collapse:collapse;margin:0 0 34px;table-layout:fixed;">
        <tr>
          <td style="vertical-align:middle;text-align:left;padding:0;height:42px;">
            <img src="${logoLockup}" alt="TIVONIX" width="148" height="32" style="display:block;height:32px;width:auto;" />
          </td>
          <td style="vertical-align:middle;text-align:right;padding:0;height:42px;">
            <div style="display:inline-block;height:42px;border-radius:999px;background:#ffffff;overflow:hidden;vertical-align:middle;">
              <table style="border-collapse:collapse;height:42px;">
                <tr>
                  <td style="height:42px;vertical-align:middle;padding:0 0 0 12px;">
                    <div style="width:26px;height:26px;overflow:hidden;">${MILESEAL_MARK_SVG(26)}</div>
                  </td>
                  <td style="height:42px;vertical-align:middle;padding:0 10px 0 8px;color:#070607;font-size:13px;font-weight:600;letter-spacing:-0.01em;white-space:nowrap;">
                    <div style="line-height:16px;margin:0;padding:0;">MileSeal</div>
                  </td>
                  <td style="height:42px;vertical-align:middle;padding:0 6px 0 0;">
                    <div style="width:30px;height:30px;border-radius:999px;background:#070607;color:#ffffff;text-align:center;line-height:30px;font-size:14px;font-weight:700;">→</div>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>

      <div style="height:32px;display:inline-block;border-radius:999px;background:#1a1a1a;overflow:hidden;vertical-align:middle;">
        <table style="border-collapse:collapse;height:32px;">
          <tr>
            <td style="height:32px;vertical-align:middle;padding:0 14px;color:rgba(255,255,255,0.65);font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">
              <div style="line-height:14px;margin:0;padding:0;">${escapeHtml(opts.docKind)}</div>
            </td>
          </tr>
        </table>
      </div>

      <h1 style="margin:18px 0 28px;font-size:36px;line-height:1.12;font-weight:700;letter-spacing:-0.03em;color:#ffffff;max-width:18ch;">
        ${escapeHtml(opts.docTitle)}
      </h1>

      <table style="width:100%;border-collapse:collapse;margin:0 0 28px;table-layout:fixed;">
        <tr>
          <td style="width:50%;vertical-align:top;padding:0 7px 0 0;">
            <div style="height:104px;border-radius:18px;background:#141414;overflow:hidden;">
              <table style="width:100%;height:104px;border-collapse:collapse;">
                <tr>
                  <td style="height:104px;vertical-align:middle;padding:0 20px;">
                    <div style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.42);line-height:14px;margin:0 0 10px;padding:0;">
                      ${escapeHtml(opts.projectLabel)}
                    </div>
                    <div style="font-size:16px;font-weight:600;line-height:22px;color:#ffffff;margin:0;padding:0;">
                      ${escapeHtml(opts.projectValue)}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </td>
          <td style="width:50%;vertical-align:top;padding:0 0 0 7px;">
            <div style="height:104px;border-radius:18px;background:#141414;overflow:hidden;">
              <table style="width:100%;height:104px;border-collapse:collapse;">
                <tr>
                  <td style="height:104px;vertical-align:middle;padding:0 20px;">
                    <div style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.42);line-height:14px;margin:0 0 10px;padding:0;">
                      ${escapeHtml(opts.statusLabel)}
                    </div>
                    <div style="font-size:16px;font-weight:600;line-height:22px;color:#ffffff;margin:0;padding:0;">
                      ${escapeHtml(opts.statusValue)}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 30px;font-size:16px;line-height:1.75;color:rgba(255,255,255,0.78);max-width:56ch;">
        ${escapeHtml(opts.body)}
      </p>

      <table style="width:100%;border-collapse:collapse;margin:0 0 30px;table-layout:fixed;">
        <tr>
          <td style="width:33.33%;vertical-align:top;padding:0 6px 0 0;">
            <div style="height:112px;border-radius:18px;background:#141414;overflow:hidden;">
              <table style="width:100%;height:112px;border-collapse:collapse;">
                <tr>
                  <td style="height:112px;vertical-align:middle;padding:0 16px;">
                    <div style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.42);line-height:14px;margin:0 0 10px;padding:0;">
                      ${escapeHtml(opts.effortLabel)}
                    </div>
                    <div style="font-size:24px;font-weight:700;letter-spacing:-0.03em;color:#ffffff;line-height:28px;margin:0;padding:0;">
                      ${escapeHtml(opts.hoursLabel)}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </td>
          <td style="width:33.33%;vertical-align:top;padding:0 6px;">
            <div style="height:112px;border-radius:18px;background:#fc5000;overflow:hidden;">
              <table style="width:100%;height:112px;border-collapse:collapse;">
                <tr>
                  <td style="height:112px;vertical-align:middle;padding:0 16px;">
                    <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(7,6,7,0.62);line-height:14px;margin:0 0 10px;padding:0;">
                      ${escapeHtml(opts.costLabelName)}
                    </div>
                    <div style="font-size:24px;font-weight:800;letter-spacing:-0.03em;color:#070607;line-height:28px;margin:0;padding:0;">
                      ${escapeHtml(opts.costLabel)}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </td>
          <td style="width:33.33%;vertical-align:top;padding:0 0 0 6px;">
            <div style="height:112px;border-radius:18px;background:#141414;overflow:hidden;">
              <table style="width:100%;height:112px;border-collapse:collapse;">
                <tr>
                  <td style="height:112px;vertical-align:middle;padding:0 16px;">
                    <div style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.42);line-height:14px;margin:0 0 10px;padding:0;">
                      ${escapeHtml(opts.timelineLabelName)}
                    </div>
                    <div style="font-size:24px;font-weight:700;letter-spacing:-0.03em;color:#ffffff;line-height:28px;margin:0;padding:0;">
                      ${escapeHtml(opts.timelineLabel)}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>

      ${
        opts.workStartDecision
          ? `
      <div style="margin:0 0 28px;border-radius:18px;background:#141414;padding:22px 24px;">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#fc5000;line-height:14px;margin:0 0 16px;padding:0;">
          ${escapeHtml(opts.workStartDecision.heading)}
        </div>
        <div style="font-size:14px;line-height:1.7;color:rgba(255,255,255,0.82);">
          <div style="margin:0 0 8px;"><strong>${escapeHtml(opts.workStartDecision.ownerLabel)}:</strong> ${escapeHtml(opts.workStartDecision.owner)}</div>
          <div style="margin:0 0 8px;"><strong>${escapeHtml(opts.workStartDecision.decisionLabel)}:</strong> ${escapeHtml(opts.workStartDecision.decision)}</div>
          <div style="margin:0 0 8px;"><strong>${escapeHtml(opts.workStartDecision.rationaleLabel)}:</strong> ${escapeHtml(opts.workStartDecision.rationale)}</div>
          <div style="margin:0 0 8px;"><strong>${escapeHtml(opts.workStartDecision.authorizationLabel)}:</strong> ${escapeHtml(opts.workStartDecision.authorization)}</div>
          <div style="margin:0;"><strong>${escapeHtml(opts.workStartDecision.dateLabel)}:</strong> ${escapeHtml(opts.workStartDecision.date)}</div>
        </div>
      </div>`
          : ""
      }

      <div style="height:56px;margin:0 0 48px;border-radius:999px;background:#ffffff;overflow:hidden;">
        <table style="width:100%;height:56px;border-collapse:collapse;table-layout:fixed;">
          <tr>
            <td style="height:56px;vertical-align:middle;padding:0 8px 0 22px;color:#070607;font-size:14px;font-weight:600;">
              <div style="line-height:18px;margin:0;padding:0;">
                <span style="color:#fc5000;">TIVONIX</span><span style="color:rgba(7,6,7,0.28);padding:0 8px;">·</span>${escapeHtml(opts.approval)}
              </div>
            </td>
            <td style="width:50px;height:56px;vertical-align:middle;padding:0 10px 0 0;text-align:right;">
              <div style="display:inline-block;width:34px;height:34px;border-radius:999px;background:#070607;color:#ffffff;text-align:center;line-height:34px;font-size:16px;font-weight:700;">→</div>
            </td>
          </tr>
        </table>
      </div>

      <table style="width:100%;border-collapse:collapse;table-layout:fixed;">
        <tr>
          <td style="vertical-align:middle;padding:0;color:rgba(255,255,255,0.58);font-size:11px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;">
            <table style="border-collapse:collapse;">
              <tr>
                <td style="vertical-align:middle;padding:0 10px 0 0;">
                  <span style="display:block;width:22px;height:22px;line-height:0;">${MILESEAL_MARK_SVG(22)}</span>
                </td>
                <td style="vertical-align:middle;padding:0;line-height:22px;white-space:nowrap;">MileSeal by TIVONIX</td>
              </tr>
            </table>
          </td>
          <td style="vertical-align:middle;padding:0;text-align:right;color:rgba(255,255,255,0.42);font-size:11px;font-weight:500;white-space:nowrap;">
            Demonstration · ${escapeHtml(generatedAt)}
          </td>
        </tr>
      </table>
    </div>
  `;
  document.body.appendChild(host);

  const sheet = host.querySelector("#mileseal-pdf-sheet") as HTMLElement | null;
  if (!sheet) {
    host.remove();
    throw new Error("PDF sheet missing");
  }

  const imgs = Array.from(sheet.querySelectorAll("img"));
  await Promise.all(
    imgs.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
            return;
          }
          img.onload = () => resolve();
          img.onerror = () => resolve();
          window.setTimeout(() => resolve(), 2500);
        })
    )
  );
  await new Promise((r) => requestAnimationFrame(() => r(undefined)));
  await new Promise((r) => setTimeout(r, 80));

  try {
    const canvas = await html2canvas(sheet, {
      backgroundColor: "#0a0a0a",
      scale: 3,
      useCORS: true,
      logging: false,
      width: 794,
      windowWidth: 794,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const imgW = pageW;
    const imgH = (canvas.height * imgW) / canvas.width;

    if (imgH <= pageH + 0.5) {
      pdf.addImage(imgData, "PNG", 0, 0, imgW, imgH);
    } else {
      const fitH = pageH;
      const fitW = (canvas.width * fitH) / canvas.height;
      const x = (pageW - fitW) / 2;
      pdf.addImage(imgData, "PNG", x, 0, fitW, fitH);
    }

    await savePdfWithTextLayer(
      pdf,
      opts.plainText,
      opts.lang,
      opts.fileName ?? "mileseal-change-request.pdf"
    );
  } finally {
    host.remove();
  }
}

const labelClass = "mb-1.5 block text-[12px] font-semibold tracking-[0.04em] text-white/45";

const inputClass = cx(
  "h-11 w-full min-h-11 rounded-[12px] border border-white/[0.08] bg-[#141414] px-3.5",
  "font-sans text-[15px] font-medium text-white placeholder:text-white/35",
  "outline-none focus-visible:ring-2 focus-visible:ring-[#fc5000]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
);

export default function MilesealCaseStudy() {
  const { lang } = useLang();
  const copy = milesealCaseCopy(lang);
  const location = useLocation();
  const milesealPath = pathForLang("/mileseal", lang);
  const hashBootstrapped = useRef(false);
  const analysisTimers = useRef<number[]>([]);
  const analyseBtnRef = useRef<HTMLButtonElement>(null);

  const [state, dispatch] = useReducer(
    caseDemoReducer,
    undefined,
    () => createInitialCaseDemoState()
  );

  const cost = caseAdditionalCost(state.agencyRate);
  const days = caseTimelineDays(state.deliveryHoursPerDay);
  const costLabel = formatGbp(cost, lang);
  const rateLabel = formatGbp(state.agencyRate, lang);
  const hoursLabel = formatCaseHours(CASE_ADDITIONAL_HOURS, lang);
  const timelineLabel = formatCaseBusinessDays(days, lang, true);
  const daysLabel = formatCaseBusinessDays(days, lang, false);

  const calcCostText = copy.result.calcCost
    .replace("{hoursLabel}", hoursLabel)
    .replace("{rate}", rateLabel)
    .replace("{cost}", costLabel);

  const calcDaysText = copy.result.calcDays
    .replace("{hoursLabel}", hoursLabel)
    .replace("{capacity}", String(state.deliveryHoursPerDay))
    .replace("{daysLabel}", daysLabel);

  const wsdLabels = workStartDecisionCopy(lang);
  const workStartDecisionBlock = formatWorkStartDecisionBlock(state.workStartDecision, lang);

  const plainChangeRequest = useMemo(
    () =>
      milesealCaseChangeRequestPlainText({
        copy,
        tone: state.selectedTone,
        costLabel,
        timelineLabel,
        hoursLabel,
        workStartDecisionBlock,
      }),
    [copy, state.selectedTone, costLabel, timelineLabel, hoursLabel, workStartDecisionBlock]
  );

  const pdfWorkStartDecision =
    state.workStartDecision.saved && !state.workStartDecision.stale
      ? {
          heading: wsdLabels.documentHeading,
          ownerLabel: wsdLabels.ownerLabel,
          owner: state.workStartDecision.owner.trim(),
          decisionLabel: wsdLabels.decisionLabel,
          decision: decisionLabel(state.workStartDecision.decision, wsdLabels),
          rationaleLabel: wsdLabels.rationaleLabel,
          rationale: state.workStartDecision.rationale.trim(),
          authorizationLabel: wsdLabels.authorizationLabel,
          authorization: authorizationLabel(state.workStartDecision.authorization, wsdLabels),
          dateLabel: wsdLabels.dateLabel,
          date: state.workStartDecision.decisionDate.trim(),
        }
      : undefined;

  const clearAnalysisTimers = () => {
    for (const id of analysisTimers.current) window.clearTimeout(id);
    analysisTimers.current = [];
  };

  useEffect(() => () => clearAnalysisTimers(), []);

  useEffect(() => {
    if (!state.copied && !state.copyError) return;
    const t = window.setTimeout(() => dispatch({ type: "clearCopyStatus" }), 2400);
    return () => window.clearTimeout(t);
  }, [state.copied, state.copyError]);

  useEffect(() => {
    if (hashBootstrapped.current) return;
    if (location.hash.replace("#", "") !== "change-request") return;
    hashBootstrapped.current = true;
    dispatch({ type: "showResultImmediate" });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToId("change-request"));
    });
  }, [location.hash]);

  const runAnalysis = () => {
    const rateRaw = Number(String(state.rateInput).trim().replace(",", "."));
    const capRaw = Number(String(state.capacityInput).trim().replace(",", "."));
    const rateOk = Number.isFinite(rateRaw) && rateRaw >= 10 && rateRaw <= 500;
    const capOk = Number.isFinite(capRaw) && capRaw >= 1 && capRaw <= 24;

    if (!rateOk || !capOk) {
      if (!rateOk) dispatch({ type: "commitRate" });
      if (!capOk) dispatch({ type: "commitCapacity" });
      return;
    }

    clearAnalysisTimers();
    trackMilesealDemoStarted({ surface: "case", scenarioId: "content-migration" });
    dispatch({ type: "startAnalysisWith", rate: rateRaw, capacity: capRaw });
    requestAnimationFrame(() => scrollToId("analysis-progress"));

    const reduced = prefersReducedMotion();
    const stepCount = copy.progress.steps.length;
    const totalMs = reduced ? 200 : 1600;
    const stepMs = totalMs / stepCount;

    for (let i = 0; i < stepCount; i += 1) {
      const id = window.setTimeout(() => {
        dispatch({ type: "setAnalysisStep", step: i });
      }, Math.round(i * stepMs));
      analysisTimers.current.push(id);
    }

    const doneId = window.setTimeout(() => {
      dispatch({ type: "finishAnalysis" });
      requestAnimationFrame(() => scrollToId(copy.result.id));
    }, totalMs + (reduced ? 40 : 100));
    analysisTimers.current.push(doneId);
  };

  const handleRunExample = () => {
    scrollToId(copy.workspace.id);
    window.setTimeout(() => {
      analyseBtnRef.current?.focus({ preventScroll: true });
      runAnalysis();
    }, prefersReducedMotion() ? 50 : 280);
  };

  const handleCopy = async () => {
    const ok = await copyText(plainChangeRequest);
    dispatch({ type: ok ? "copied" : "copyFailed" });
  };

  const handleDownloadPdf = () => {
    void downloadChangeRequestPdf({
      lang,
      plainText: plainChangeRequest,
      docKind: copy.changeRequest.docKind,
      docTitle: copy.changeRequest.docTitle,
      projectLabel: copy.changeRequest.projectLabel,
      projectValue: copy.changeRequest.projectValue,
      statusLabel: copy.changeRequest.statusLabel,
      statusValue: copy.changeRequest.statusValue,
      body: copy.changeRequest.bodies[state.selectedTone],
      effortLabel: copy.changeRequest.effortLabel,
      hoursLabel,
      costLabelName: copy.changeRequest.costLabel,
      costLabel,
      timelineLabelName: copy.changeRequest.timelineLabel,
      timelineLabel,
      approval: copy.changeRequest.approval,
      dateLocale: lang === "ru" ? "ru-RU" : lang === "zh" ? "zh-CN" : "en-GB",
      fileName: "mileseal-change-request.pdf",
      workStartDecision: pdfWorkStartDecision,
    })
      .then(() => {
        trackMilesealSampleDownloaded({ surface: "case" });
      })
      .catch((err) => {
      console.error("PDF download failed", err);
    });
  };

  const handleViewDocument = (e: MouseEvent) => {
    e.preventDefault();
    if (state.stage !== "result") {
      dispatch({ type: "showResultImmediate" });
      requestAnimationFrame(() => {
        scrollToId("change-request");
        window.setTimeout(() => handleDownloadPdf(), prefersReducedMotion() ? 80 : 220);
      });
      return;
    }
    scrollToId("change-request");
    handleDownloadPdf();
  };

  const setTone = (tone: CaseTone) => dispatch({ type: "setTone", tone });

  const analyzing = state.stage === "analyzing";
  const showResult = state.stage === "result";

  const stepIndex = analyzing ? 2 : showResult ? 2 : 1;

  return (
    <>
      {/* Compact product hero — centered, brand video behind */}
      <section className="relative isolate overflow-hidden bg-[#0a0a0a] pt-[calc(var(--tivonix-header-spacer)+0.75rem)] pb-10 sm:pb-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <BgLoopVideo className="pointer-events-none absolute -inset-[2px] h-[calc(100%+4px)] w-[calc(100%+4px)] max-w-none object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.55)_78%)]" />
        </div>

        <Container className="relative z-10 mx-auto max-w-[1240px]">
          <div className="mx-auto max-w-[720px] text-center">
            <p className="text-[12px] font-semibold tracking-[0.04em] text-white/55">
              {copy.hero.eyebrow}
            </p>
            <h1 className="mt-3 font-sans text-[clamp(2.125rem,4.5vw,3.375rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-white text-balance">
              {copy.hero.title}
            </h1>
            <p className="mx-auto mt-3 max-w-[40rem] text-[15px] font-medium leading-[1.55] text-white/70 sm:text-[16px]">
              {copy.hero.subtitle}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-x-5">
              <button
                type="button"
                onClick={handleRunExample}
                disabled={analyzing}
                className={ctaClass("primary", "md", "disabled:opacity-50")}
              >
                {copy.hero.runExample}
              </button>
              <a
                href="#change-request"
                onClick={handleViewDocument}
                className="text-[14px] font-medium text-white/60 underline-offset-4 transition hover:text-white hover:underline"
              >
                {copy.hero.viewOutput}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Unified workspace */}
      <section
        id={copy.workspace.id}
        className="scroll-mt-[var(--tivonix-header-spacer)] bg-[#0a0a0a] pb-10 sm:pb-14"
      >
        <Container className="mx-auto max-w-[1240px]">
          <div className="rounded-[20px] border border-white/[0.08] bg-[#121212] p-[18px] sm:rounded-[22px] sm:p-8 lg:p-10">
            <StepIndicator
              steps={[copy.steps.scope, copy.steps.request, copy.steps.analysis]}
              current={stepIndex}
              completed={showResult}
            />

            <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10">
              {/* Left: agreed scope */}
              <article>
                <p className={labelClass}>{copy.workspace.scopeLabel}</p>
                <h2 className="mt-1 font-sans text-[20px] font-semibold tracking-[-0.02em] text-white sm:text-[22px]">
                  {copy.workspace.docTitle}
                </h2>
                <dl className="mt-5 space-y-3.5">
                  {copy.workspace.meta.map((row) => (
                    <div key={row.label} className="grid gap-0.5 sm:grid-cols-[minmax(0,11.5rem)_1fr] sm:gap-4">
                      <dt className="text-[13px] font-medium text-white/40">{row.label}</dt>
                      <dd className="text-[15px] font-medium leading-[1.45] text-white/88 sm:text-[16px]">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-[15px] font-medium leading-[1.6] text-white/65 sm:text-[16px]">
                  {copy.workspace.scopeExcerpt}
                </p>
                <p className="mt-4 rounded-[12px] bg-white/[0.04] px-3.5 py-3 text-[14px] font-semibold leading-snug text-white/80 ring-1 ring-white/[0.06] sm:text-[15px]">
                  {copy.workspace.scopeHighlight}
                </p>
              </article>

              {/* Right: client request */}
              <div>
                <label htmlFor="mileseal-case-request" className={labelClass}>
                  {copy.workspace.requestLabel}
                </label>
                <textarea
                  id="mileseal-case-request"
                  readOnly
                  rows={5}
                  value={copy.workspace.clientRequest}
                  className={cx(
                    inputClass,
                    "h-auto min-h-[8.5rem] resize-none py-3.5 leading-[1.55] opacity-95 sm:min-h-[9.5rem]"
                  )}
                  aria-readonly="true"
                />

                <div className="mt-5 grid gap-3 min-[420px]:grid-cols-2">
                  <div>
                    <label htmlFor="mileseal-case-rate" className={labelClass}>
                      {copy.workspace.rateLabel}
                    </label>
                    <div className="relative">
                      <input
                        id="mileseal-case-rate"
                        type="number"
                        inputMode="decimal"
                        min={10}
                        max={500}
                        step={1}
                        value={state.rateInput}
                        disabled={analyzing}
                        onChange={(e) => dispatch({ type: "setRateInput", value: e.target.value })}
                        onBlur={() => dispatch({ type: "commitRate" })}
                        aria-invalid={state.rateInvalid}
                        aria-describedby={state.rateInvalid ? "mileseal-case-rate-error" : undefined}
                        className={inputClass}
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-medium text-white/40">
                        {copy.workspace.rateSuffix}
                      </span>
                    </div>
                    {state.rateInvalid ? (
                      <p id="mileseal-case-rate-error" className="mt-1.5 text-[12px] text-[#ff8a6a]" role="alert">
                        {copy.workspace.rateError}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="mileseal-case-capacity" className={labelClass}>
                      {copy.workspace.capacityLabel}
                    </label>
                    <div className="relative">
                      <input
                        id="mileseal-case-capacity"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={24}
                        step={1}
                        value={state.capacityInput}
                        disabled={analyzing}
                        onChange={(e) =>
                          dispatch({ type: "setCapacityInput", value: e.target.value })
                        }
                        onBlur={() => dispatch({ type: "commitCapacity" })}
                        aria-invalid={state.capacityInvalid}
                        aria-describedby={
                          state.capacityInvalid ? "mileseal-case-capacity-error" : undefined
                        }
                        className={inputClass}
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-medium text-white/40">
                        {copy.workspace.capacitySuffix}
                      </span>
                    </div>
                    {state.capacityInvalid ? (
                      <p
                        id="mileseal-case-capacity-error"
                        className="mt-1.5 text-[12px] text-[#ff8a6a]"
                        role="alert"
                      >
                        {copy.workspace.capacityError}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <button
                    ref={analyseBtnRef}
                    type="button"
                    onClick={runAnalysis}
                    disabled={analyzing}
                    className={ctaClass("primary", "md", "min-w-[11rem] disabled:opacity-50")}
                  >
                    {analyzing ? copy.workspace.analyzing : copy.workspace.analyse}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      clearAnalysisTimers();
                      dispatch({ type: "reset" });
                    }}
                    disabled={analyzing}
                    className="min-h-11 text-[14px] font-medium text-white/50 transition hover:text-white/80 disabled:opacity-50"
                  >
                    {copy.workspace.reset}
                  </button>
                </div>
              </div>
            </div>

            {/* Inline analysis — spinner + shimmering orange progress */}
            {analyzing ? (
              <div
                id="analysis-progress"
                className="mt-8 scroll-mt-[var(--tivonix-header-spacer)] border-t border-white/[0.08] pt-6"
                role="status"
                aria-live="polite"
                aria-busy="true"
                aria-labelledby="mileseal-case-analysis-title"
              >
                <div className="flex items-center gap-3">
                  <Loader2
                    className="h-5 w-5 shrink-0 animate-spin text-[#fc5000] motion-reduce:animate-none"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <p
                      id="mileseal-case-analysis-title"
                      className="text-[12px] font-medium tracking-[0.04em] text-white/45"
                    >
                      {copy.progress.label}
                    </p>
                    <p className="mt-1 text-[15px] font-medium text-white sm:text-[16px]">
                      {copy.progress.steps[
                        Math.max(0, Math.min(state.activeAnalysisStep, copy.progress.steps.length - 1))
                      ]}
                    </p>
                  </div>
                </div>
                <div
                  className="mt-4 h-[2px] overflow-hidden rounded-full bg-white/[0.06]"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(
                    ((state.activeAnalysisStep + 1) / copy.progress.steps.length) * 100
                  )}
                >
                  <div className="mileseal-orange-shimmer h-full w-full rounded-full motion-reduce:animate-none" />
                </div>
              </div>
            ) : null}

            {/* Result inside workspace */}
            {showResult ? (
              <div
                id={copy.result.id}
                className="mt-8 scroll-mt-[var(--tivonix-header-spacer)] border-t border-white/[0.08] pt-8"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
                  <div className="min-w-0 max-w-[36rem]">
                    <span className="inline-flex items-center rounded-full bg-[#fc5000]/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#ffae66]">
                      {copy.result.status}
                    </span>
                    <h2 className="mt-3 font-sans text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-white">
                      {copy.result.title}
                    </h2>
                    <p className="mt-2 text-[15px] font-medium leading-[1.55] text-white/60 sm:text-[16px]">
                      {copy.result.description}
                    </p>
                  </div>

                  <dl className="grid w-full grid-cols-2 gap-y-4 border-t border-white/[0.08] pt-4 sm:gap-0 sm:border-t-0 sm:pt-0 lg:max-w-[28rem] lg:grid-cols-4 lg:divide-x lg:divide-white/[0.08]">
                    <MetricCell value={hoursLabel} />
                    <MetricCell value={costLabel} />
                    <MetricCell value={timelineLabel} />
                    <MetricCell value={copy.result.metrics.confidenceValue} />
                  </dl>
                </div>

                <div className="mt-9 grid gap-8 lg:grid-cols-2 lg:gap-10">
                  <div>
                    <h3 className="text-[13px] font-semibold text-white/50">
                      {copy.result.reasonsTitle}
                    </h3>
                    <ul className="mt-4 space-y-2.5" role="list">
                      {copy.result.reasons.map((reason) => (
                        <li
                          key={reason}
                          className="flex gap-2.5 text-[15px] font-medium leading-[1.5] text-white/75 sm:text-[16px]"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/35" aria-hidden />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-[13px] font-semibold text-white/50">
                      {copy.result.breakdownTitle}
                    </h3>
                    <ul className="mt-4 space-y-3" role="list">
                      {copy.result.breakdown.map((row) => (
                        <li key={row.label}>
                          <div className="flex items-baseline justify-between gap-3 text-[14px] sm:text-[15px]">
                            <span className="font-medium text-white/70">{row.label}</span>
                            <span className="shrink-0 font-semibold tabular-nums text-white">
                              {formatCaseHours(row.hours, lang)}
                            </span>
                          </div>
                          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.08]">
                            <div
                              className="h-full rounded-full bg-white/30"
                              style={{
                                width: `${(row.hours / CASE_ADDITIONAL_HOURS) * 100}%`,
                              }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex items-baseline justify-between border-t border-white/[0.08] pt-3">
                      <span className="text-[13px] font-semibold text-white/45">
                        {copy.result.totalLabel}
                      </span>
                      <span className="text-[16px] font-semibold text-white">{hoursLabel}</span>
                    </div>
                    <p className="mt-4 text-[14px] font-medium text-white/65 sm:text-[15px]">
                      {calcCostText}
                    </p>
                    <p className="mt-1.5 text-[14px] font-medium text-white/65 sm:text-[15px]">
                      {calcDaysText}
                    </p>
                  </div>
                </div>

                <WorkStartDecisionPanel
                  className="mt-8"
                  value={state.workStartDecision}
                  onChange={(value) => dispatch({ type: "setWorkStartDecision", value })}
                />
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {/* Change request export */}
      {showResult ? (
        <section
          id="change-request"
          className="scroll-mt-[var(--tivonix-header-spacer)] bg-[#0a0a0a] pb-12 pt-10 sm:pb-16 sm:pt-14"
        >
          <Container className="mx-auto max-w-[1240px]">
            <div className="max-w-none">
              <p className="text-[12px] font-medium tracking-[0.04em] text-white/45">
                {copy.changeRequest.eyebrow}
              </p>
              <h2 className="mt-2 font-sans text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold tracking-[-0.02em] text-white">
                {copy.changeRequest.title}
              </h2>
              <p className="mt-2 max-w-[40rem] text-[15px] font-medium leading-[1.55] text-white/55">
                {copy.changeRequest.description}
              </p>

              <div
                className="mt-7 flex flex-wrap items-center gap-2.5 sm:gap-3"
                role="group"
                aria-label={copy.changeRequest.title}
              >
                <ArrowPillButton onClick={handleDownloadPdf}>
                  {copy.changeRequest.downloadPdf}
                </ArrowPillButton>
                <ArrowPillButton
                  variant="outline"
                  onClick={handleCopy}
                  icon={state.copied ? "check" : "arrow"}
                >
                  {state.copied ? copy.changeRequest.copied : copy.changeRequest.copy}
                </ArrowPillButton>

                <div
                  className="inline-flex flex-wrap items-center gap-1.5 rounded-full bg-[#1a1a1a] p-1.5 ring-1 ring-white/[0.08]"
                  role="group"
                  aria-label={copy.changeRequest.tones.neutral}
                >
                  <ToneButton
                    label={copy.changeRequest.makeSofter}
                    pressed={state.selectedTone === "soft"}
                    onClick={() => setTone("soft")}
                  />
                  <ToneButton
                    label={copy.changeRequest.makeFormal}
                    pressed={state.selectedTone === "formal"}
                    onClick={() => setTone("formal")}
                  />
                  <ToneButton
                    label={copy.changeRequest.resetWording}
                    pressed={state.selectedTone === "neutral"}
                    onClick={() => dispatch({ type: "resetTone" })}
                  />
                </div>
              </div>

              <p className="sr-only" aria-live="polite">
                {state.copied
                  ? copy.changeRequest.copied
                  : state.copyError
                    ? copy.changeRequest.copyError
                    : ""}
              </p>
              {state.copyError ? (
                <p
                  className="mt-3 flex items-center gap-1.5 text-[13px] font-medium text-[#ff8a6a]"
                  role="alert"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {copy.changeRequest.copyError}
                </p>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Full-width video CTA with floating MileSeal mark */}
      <section className="relative bg-[#0a0a0a] pb-0 pt-28 sm:pt-32 lg:pt-36">
        <div className="relative isolate w-full overflow-visible">
          {/* Crisp vector mark + HTML wordmark (no soft bitmap upscale) */}
          <div className="pointer-events-none absolute left-1/2 top-0 z-20 flex -translate-x-1/2 -translate-y-[52%] items-center justify-center gap-3 sm:-translate-y-[55%] sm:gap-4 lg:gap-5">
            <img
              src="/images/mileseal-mark-orange.svg"
              alt=""
              className="h-[4.25rem] w-[4.25rem] drop-shadow-[0_18px_44px_rgba(252,80,0,0.4)] sm:h-24 sm:w-24 lg:h-28 lg:w-28"
              width={112}
              height={112}
              aria-hidden
            />
            <span className="select-none font-sans text-[2.35rem] font-semibold tracking-[-0.04em] text-white [text-rendering:geometricPrecision] drop-shadow-[0_10px_28px_rgba(0,0,0,0.55)] sm:text-[3rem] lg:text-[3.5rem]">
              MileSeal
            </span>
          </div>

          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <BgLoopVideo className="pointer-events-none absolute -inset-[2px] h-[calc(100%+4px)] w-[calc(100%+4px)] max-w-none object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/70 to-black/60" />
              <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-[#0a0a0a] via-[rgba(252,80,0,0.12)] to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(252,80,0,0.14)_0%,transparent_55%)]" />
            </div>

            <div className="relative z-10 px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
              <div className="mx-auto max-w-[36rem] text-center">
                <h2 className="font-sans text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold tracking-[-0.02em] text-white">
                  {copy.finalCta.title}
                </h2>
                <p className="mx-auto mt-3 max-w-[30rem] text-[15px] font-medium leading-[1.55] text-white/70 sm:text-[16px]">
                  {copy.finalCta.text}
                </p>
                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-center">
                  <ArrowPillLink to={milesealPath}>{copy.finalCta.primary}</ArrowPillLink>
                  <ArrowPillLink to={`${milesealPath}?manual=1`} variant="outline">
                    {copy.finalCta.secondary}
                  </ArrowPillLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        .mileseal-orange-shimmer {
          background: linear-gradient(
            90deg,
            #ffd7b0 0%,
            #ff9a3d 25%,
            #fc5000 50%,
            #ff9a3d 75%,
            #ffd7b0 100%
          );
          background-size: 200% 100%;
          animation: milesealOrangeShimmer 1.1s linear infinite;
        }
        @keyframes milesealOrangeShimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mileseal-orange-shimmer {
            animation: none;
            background: #fc5000;
            background-size: auto;
          }
        }
      `}</style>
    </>
  );
}

function StepIndicator({
  steps,
  current,
  completed,
}: {
  steps: string[];
  current: number;
  completed: boolean;
}) {
  return (
    <ol className="flex flex-wrap items-center gap-y-2" aria-label="Demo steps">
      {steps.map((label, i) => {
        const isCurrent = !completed && i === current;
        const isDone = completed || i < current;
        return (
          <li key={label} className="flex items-center">
            {i > 0 ? (
              <span
                className={cx(
                  "mx-2 h-px w-6 sm:mx-3 sm:w-10",
                  isDone || isCurrent ? "bg-white/25" : "bg-white/10"
                )}
                aria-hidden
              />
            ) : null}
            <span
              className={cx(
                "inline-flex items-center gap-2 text-[12px] font-medium sm:text-[13px]",
                isCurrent && "text-white",
                isDone && !isCurrent && "text-white/55",
                !isDone && !isCurrent && "text-white/35"
              )}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span
                className={cx(
                  "inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                  isCurrent && "bg-[#fc5000] text-black",
                  isDone && !isCurrent && "bg-white/15 text-white/70",
                  !isDone && !isCurrent && "bg-white/[0.06] text-white/40"
                )}
                aria-hidden
              >
                {isDone && !isCurrent ? (
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                ) : (
                  i + 1
                )}
              </span>
              <span className="hidden min-[400px]:inline">{label}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function MetricCell({ value }: { value: string }) {
  return (
    <div className="px-0 sm:px-3 lg:first:pl-0 lg:last:pr-0">
      <dd className="text-[15px] font-semibold leading-snug text-white sm:text-[16px]">{value}</dd>
    </div>
  );
}

function arrowPillClass(variant: "solid" | "outline" = "solid") {
  const solid = variant === "solid";
  return cx(
    "group inline-flex min-h-11 items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5",
    "font-sans text-[14px] font-medium tracking-[-0.01em] transition duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
    "active:scale-[0.98]",
    solid
      ? "bg-white text-black hover:bg-white/92"
      : "bg-transparent text-white ring-1 ring-white/18 hover:bg-white/[0.06]"
  );
}

function ArrowPillIcon({
  variant = "solid",
  icon = "arrow",
}: {
  variant?: "solid" | "outline";
  icon?: "arrow" | "check";
}) {
  const solid = variant === "solid";
  return (
    <span
      className={cx(
        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition",
        solid ? "bg-black text-white" : "bg-white text-black"
      )}
      aria-hidden
    >
      {icon === "check" ? (
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
      ) : (
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
      )}
    </span>
  );
}

function ArrowPillButton({
  children,
  onClick,
  variant = "solid",
  icon = "arrow",
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: "solid" | "outline";
  icon?: "arrow" | "check";
}) {
  return (
    <button type="button" onClick={onClick} className={arrowPillClass(variant)}>
      <span className="pr-0.5">{children}</span>
      <ArrowPillIcon variant={variant} icon={icon} />
    </button>
  );
}

function ArrowPillLink({
  children,
  to,
  variant = "solid",
}: {
  children: ReactNode;
  to: string;
  variant?: "solid" | "outline";
}) {
  return (
    <Link to={to} className={arrowPillClass(variant)}>
      <span className="pr-0.5">{children}</span>
      <ArrowPillIcon variant={variant} />
    </Link>
  );
}

function ToneButton({
  label,
  pressed,
  onClick,
}: {
  label: string;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cx(
        "inline-flex h-9 items-center justify-center rounded-full px-4 text-[13px] font-medium tracking-[-0.01em] transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]",
        pressed
          ? "-my-0.5 h-10 bg-white px-5 text-black shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
          : "bg-transparent text-white/70 ring-1 ring-white/20 hover:bg-white/[0.04] hover:text-white"
      )}
    >
      {label}
    </button>
  );
}
