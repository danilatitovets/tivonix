import {
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MsIconAnalyzing,
  MsIconCase,
  MsIconCheck,
  MsIconChevronDown,
  MsIconChevronLeft,
  MsIconChevronRight,
  MsIconClose,
  MsIconCopy,
  MsIconDownload,
  MsIconManual,
  MsIconMenu,
  MsIconReset,
  MsIconSidebar,
  MsIconSidebarOpen,
  MsIconToneFormal,
  MsIconToneNeutral,
  MsIconToneSoft,
} from "./MilesealIcons";
import { useLang, type Lang } from "../../i18n/LangProvider";
import { milesealCopy, prefillFromExample } from "../../i18n/milesealCopy";
import { milesealWorkspaceCopy } from "../../i18n/milesealWorkspaceCopy";
import {
  changeRequestForTone,
  createInitialDemoState,
  demoReducer,
  type DemoTone,
} from "./milesealDemoState";
import MilesealManualReviewPanel, {
  type MilesealLeadVariant,
} from "./MilesealManualReviewPanel";
import WorkStartDecisionPanel from "./WorkStartDecisionPanel";
import type { ScopeFormPrefill } from "../../data/milesealDemo";
import { useMinWidth } from "../../hooks/useMinWidth";
import { useKeepVideoPlaying } from "../../hooks/useKeepVideoPlaying";
import { pathForLang } from "../../lib/localePaths";
import { appendWorkStartDecisionToText } from "../../lib/workStartDecision";
import { savePdfWithTextLayer } from "../../lib/milesealPdf";
import { t3 } from "../../i18n/pick";
import {
  trackLeadFormOpen,
  trackMilesealDemoStarted,
  trackMilesealSampleDownloaded,
} from "../../lib/analytics";
import { HERO_POSTER, HERO_VIDEO_DESKTOP, pickHeroVideoSrc } from "../../lib/heroMedia";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const LANGS: Lang[] = ["ru", "en", "zh"];

function langLabel(code: Lang): string {
  if (code === "zh") return "中文";
  return code.toUpperCase();
}

type Props = {
  onRequestManualReview: (prefill?: ScopeFormPrefill | null) => void;
  formOpen: boolean;
  formKey: number;
  formVariant?: MilesealLeadVariant;
  prefill: ScopeFormPrefill | null;
  onCloseForm: () => void;
  layout?: "fullscreen" | "section";
  formOpenerRef?: React.RefObject<HTMLElement | null>;
  formInitialStep?: "welcome" | "request" | "scope" | "contact" | "review";
};

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-[#fc5000]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f3f1]";

const iconBtn = cx(
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-transparent text-[#141414]/55 transition",
  "hover:text-[#141414]",
  focusRing
);

const softBtn = cx(
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-2.5 text-[13px] font-semibold transition",
  "bg-transparent text-[#141414]/72 hover:text-[#141414]",
  focusRing
);

/** Fixed square so every glyph lines up on one vertical axis */
const iconSlot = "inline-grid h-6 w-6 shrink-0 place-items-center";

const primaryBtn = cx(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-[13px] font-semibold text-white transition",
  "bg-[#fc5000] hover:bg-[#e04800]",
  "outline-none focus-visible:ring-2 focus-visible:ring-[#fc5000]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f3f1]",
  "disabled:pointer-events-none disabled:opacity-45"
);

async function downloadChangeRequestPdf(text: string, lang: Lang) {
  const [{ jsPDF }, html2canvas] = await Promise.all([
    import("jspdf"),
    import("html2canvas"),
  ]);

  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText =
    "position:fixed;left:-10000px;top:0;width:794px;pointer-events:none;opacity:0;";
  host.innerHTML = `
    <div id="mileseal-ws-pdf" style="width:794px;box-sizing:border-box;padding:48px 52px;background:#f7f6f4;color:#141414;font-family:'DM Sans',system-ui,sans-serif;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:28px;">
        <img src="/images/mileseal-mark-orange.svg" width="28" height="28" alt="" />
        <div style="font-size:15px;font-weight:650;letter-spacing:-0.02em;">MileSeal</div>
        <div style="margin-left:auto;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#fc5000;">Change request</div>
      </div>
      <div style="white-space:pre-wrap;font-size:14px;line-height:1.65;font-weight:500;">${text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")}</div>
    </div>
  `;
  document.body.appendChild(host);

  const sheet = host.querySelector("#mileseal-ws-pdf") as HTMLElement | null;
  if (!sheet) {
    host.remove();
    throw new Error("PDF sheet missing");
  }

  try {
      const canvas = await html2canvas.default(sheet, {
      backgroundColor: "#f7f6f4",
      scale: 2,
      useCORS: true,
      logging: false,
      width: 794,
      windowWidth: 794,
    });
    const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const imgW = pageW;
    const imgH = (canvas.height * imgW) / canvas.width;
    let remaining = imgH;
    let srcY = 0;
    let pageIndex = 0;
    const pxPerMm = canvas.height / imgH;

    while (remaining > 0.5) {
      const sliceH = Math.min(remaining, pageH);
      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = Math.max(1, Math.round(sliceH * pxPerMm));
      const ctx = sliceCanvas.getContext("2d");
      if (!ctx) break;
      ctx.drawImage(
        canvas,
        0,
        Math.round(srcY * pxPerMm),
        canvas.width,
        sliceCanvas.height,
        0,
        0,
        canvas.width,
        sliceCanvas.height
      );
      if (pageIndex > 0) doc.addPage();
      doc.addImage(
        sliceCanvas.toDataURL("image/png"),
        "PNG",
        0,
        0,
        imgW,
        sliceH
      );
      srcY += sliceH;
      remaining -= sliceH;
      pageIndex += 1;
    }

    await savePdfWithTextLayer(doc, text, lang, "mileseal-change-request.pdf");
  } finally {
    host.remove();
  }
}

export default function MilesealWorkspace({
  onRequestManualReview,
  formOpen,
  formKey,
  formVariant = "review",
  prefill,
  onCloseForm,
  layout = "fullscreen",
  formOpenerRef,
  formInitialStep,
}: Props) {
  const { lang, setLang } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const copy = milesealCopy(lang);
  const ws = milesealWorkspaceCopy(lang);
  const caseStudyPath = pathForLang("/mileseal/cases/content-migration", lang);
  const examples = copy.examples;
  const firstExample = examples[0];

  const [state, dispatch] = useReducer(
    demoReducer,
    firstExample,
    createInitialDemoState
  );

  const selectedExample = useMemo(
    () => examples.find((e) => e.id === state.selectedScenarioId) ?? firstExample,
    [examples, firstExample, state.selectedScenarioId]
  );

  const [whyOpen, setWhyOpen] = useState(false);
  const [effortOpen, setEffortOpen] = useState(false);
  const [excerptsOpen, setExcerptsOpen] = useState(false);
  const [composerDraft, setComposerDraft] = useState("");
  const [resetMenuOpen, setResetMenuOpen] = useState(false);
  const [toneMenuOpen, setToneMenuOpen] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  const isWideArtifact = useMinWidth(1150);
  const isDesktopNav = useMinWidth(900);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const artifactVideoRef = useRef<HTMLVideoElement>(null);
  const analyzeTimersRef = useRef<number[]>([]);
  const langRef = useRef(lang);
  const [heroVideoSrc, setHeroVideoSrc] = useState(HERO_VIDEO_DESKTOP);
  useKeepVideoPlaying(artifactVideoRef);

  useEffect(() => {
    setHeroVideoSrc(pickHeroVideoSrc());
  }, []);

  const isPreset = state.mode === "preset";
  const showResult = isPreset && state.result !== null;
  const crText = state.result
    ? appendWorkStartDecisionToText(
        changeRequestForTone(state.result, state.activeTone),
        state.workStartDecision,
        lang
      )
    : "";

  // Sync preset copy when language changes
  useEffect(() => {
    if (langRef.current === lang) return;
    langRef.current = lang;
    if (state.mode !== "preset") return;
    const next =
      examples.find((e) => e.id === state.selectedScenarioId) ?? examples[0];
    dispatch({ type: "syncLangPreset", example: next });
    if (state.sessionStarted) setComposerDraft(next.request);
  }, [lang, examples, state.mode, state.selectedScenarioId, state.sessionStarted]);

  // Clear copy status after 2s
  useEffect(() => {
    if (!state.copied && !state.copyError) return;
    const t = window.setTimeout(() => dispatch({ type: "clearCopied" }), 2000);
    return () => window.clearTimeout(t);
  }, [state.copied, state.copyError]);

  // Analysis progress timers
  useEffect(() => {
    analyzeTimersRef.current.forEach((id) => window.clearTimeout(id));
    analyzeTimersRef.current = [];

    if (!state.analyzing || state.mode !== "preset") return;

    const total = prefersReducedMotion() ? 200 : 2000;
    const stepCount = ws.progressSteps.length;
    const stepMs = total / stepCount;
    const scenarioId = selectedExample.id;
    const result = selectedExample.result;

    for (let i = 0; i < stepCount; i++) {
      const id = window.setTimeout(() => {
        dispatch({ type: "setAnalysisStep", step: i + 1 });
      }, stepMs * (i + 1) * 0.85);
      analyzeTimersRef.current.push(id);
    }

    const doneId = window.setTimeout(() => {
      dispatch({ type: "analyzeSuccess", result, scenarioId });
    }, total);
    analyzeTimersRef.current.push(doneId);

    return () => {
      analyzeTimersRef.current.forEach((id) => window.clearTimeout(id));
      analyzeTimersRef.current = [];
    };
  }, [state.analyzing, state.mode, selectedExample, ws.progressSteps.length]);

  // Close mobile nav when switching to desktop
  useEffect(() => {
    if (isDesktopNav && state.isMobileNavOpen) {
      dispatch({ type: "setMobileNavOpen", open: false });
    }
  }, [isDesktopNav, state.isMobileNavOpen]);

  // Lock body scroll when overlays open
  useEffect(() => {
    const lock =
      state.isMobileNavOpen ||
      (!isWideArtifact && state.isChangeRequestOpen) ||
      formOpen;
    if (!lock) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [state.isMobileNavOpen, state.isChangeRequestOpen, isWideArtifact, formOpen]);

  // Escape closes overlays / menus
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (formOpen) {
        onCloseForm();
        return;
      }
      if (!isWideArtifact && state.isChangeRequestOpen) {
        dispatch({ type: "closeChangeRequest" });
        return;
      }
      if (state.isMobileNavOpen) {
        dispatch({ type: "setMobileNavOpen", open: false });
        return;
      }
      if (resetMenuOpen) {
        setResetMenuOpen(false);
        return;
      }
      if (toneMenuOpen) {
        setToneMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    formOpen,
    onCloseForm,
    isWideArtifact,
    state.isChangeRequestOpen,
    state.isMobileNavOpen,
    resetMenuOpen,
    toneMenuOpen,
  ]);

  const switchLang = (next: Lang) => {
    setLang(next);
    const target = pathForLang(location.pathname, next);
    if (target !== location.pathname) {
      navigate(`${target}${location.search}${location.hash}`, { replace: true });
    }
  };

  const startAnalyze = () => {
    if (!isPreset || state.analyzing) return;
    trackMilesealDemoStarted({ scenarioId: selectedExample.id, surface: "workspace" });
    dispatch({ type: "analyzeStart" });
  };

  const handleSelectScenario = (example: (typeof examples)[number]) => {
    dispatch({ type: "selectScenario", example });
    setComposerDraft(example.request);
    setWhyOpen(false);
    setEffortOpen(false);
    setExcerptsOpen(false);
  };

  const handleNewAnalysis = () => {
    dispatch({ type: "newAnalysis" });
    setComposerDraft("");
    setWhyOpen(false);
    setEffortOpen(false);
    setExcerptsOpen(false);
    setResetMenuOpen(false);
    setToneMenuOpen(false);
  };

  const handleResetAnalysis = () => {
    dispatch({ type: "startOver", example: selectedExample });
    setComposerDraft(selectedExample.request);
    setWhyOpen(false);
    setEffortOpen(false);
    setExcerptsOpen(false);
    setResetMenuOpen(false);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      dispatch({ type: "copied" });
      return;
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
      if (ok) dispatch({ type: "copied" });
      else dispatch({ type: "copyFailed" });
    } catch {
      dispatch({ type: "copyFailed" });
    }
  };

  const handleDownloadPdf = async () => {
    if (!crText || pdfBusy) return;
    setPdfBusy(true);
    setPdfError(false);
    try {
      await downloadChangeRequestPdf(crText, lang);
      trackMilesealSampleDownloaded({ surface: "workspace" });
    } catch (err) {
      console.error("PDF download failed", err);
      setPdfError(true);
    } finally {
      setPdfBusy(false);
    }
  };

  const openManual = (nextPrefill?: ScopeFormPrefill | null) => {
    dispatch({ type: "enterManualReview" });
    trackLeadFormOpen("mileseal_scope_review");
    onRequestManualReview(nextPrefill ?? { scope: state.scope, request: state.request });
  };

  const sendComposer = () => {
    const text = composerDraft.trim();
    if (!text || state.analyzing) return;

    const matchingExample = examples.find((e) => e.request.trim() === text);
    if (matchingExample) {
      trackMilesealDemoStarted({ scenarioId: matchingExample.id });
      dispatch({ type: "selectScenario", example: matchingExample });
      dispatch({ type: "analyzeStart" });
      return;
    }

    // Custom text never gets a fake AI result
    dispatch({ type: "setRequest", value: text });
    dispatch({ type: "enterManualReview" });
    onRequestManualReview({
      scope: state.scope.trim() || selectedExample.scope,
      request: text,
    });
  };

  const onComposerKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendComposer();
    }
  };

  const onComposerSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendComposer();
  };

  const resizeComposer = () => {
    const el = composerRef.current;
    if (!el) return;
    el.style.height = "0px";
    const next = Math.min(Math.max(el.scrollHeight, 48), 160);
    el.style.height = `${next}px`;
  };

  useEffect(() => {
    resizeComposer();
  }, [composerDraft]);

  const titleLabel =
    state.sessionStarted && isPreset
      ? selectedExample.label
      : state.sessionStarted && !isPreset
        ? ws.topCustomReview
        : "";

  const sidebarCollapsed = state.isSidebarCollapsed && isDesktopNav;

  const sidebarInner = (
    <div className="flex h-full flex-col">
      <div
        className={cx(
          "flex items-center gap-2.5 px-3 py-3",
          sidebarCollapsed && "flex-col px-2"
        )}
      >
        <img
          src="/images/mileseal-mark-orange.svg"
          alt=""
          className="h-8 w-8 shrink-0"
          width={32}
          height={32}
        />
        {!sidebarCollapsed ? (
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="truncate text-[15px] font-semibold tracking-[-0.02em]">
                MileSeal
              </span>
              <span className="rounded-md bg-[#fc5000]/12 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#fc5000]">
                {ws.demoBadge}
              </span>
            </div>
          </div>
        ) : null}
        {isDesktopNav ? (
          <button
            type="button"
            className={iconBtn}
            aria-label={
              state.isSidebarCollapsed ? ws.expandSidebar : ws.collapseSidebar
            }
            onClick={() => dispatch({ type: "toggleSidebarCollapsed" })}
          >
            {state.isSidebarCollapsed ? (
              <MsIconSidebarOpen className="h-6 w-6" />
            ) : (
              <MsIconSidebar className="h-6 w-6" />
            )}
          </button>
        ) : (
          <button
            type="button"
            className={iconBtn}
            aria-label={ws.closeNav}
            onClick={() => dispatch({ type: "setMobileNavOpen", open: false })}
          >
            <MsIconClose className="h-6 w-6" />
          </button>
        )}
      </div>

      <div className="px-3 pt-3">
        <button
          type="button"
          onClick={handleNewAnalysis}
          className={cx(primaryBtn, "w-full", sidebarCollapsed && "px-0")}
          title={ws.newAnalysis}
        >
          {sidebarCollapsed ? (
            <span className="text-lg leading-none" aria-hidden>
              +
            </span>
          ) : (
            ws.newAnalysis
          )}
        </button>
      </div>

      <nav
        className="mt-4 min-h-0 flex-1 overflow-y-auto px-2 pb-3 no-scrollbar"
        aria-label={ws.demoAnalyses}
      >
        {!sidebarCollapsed ? (
          <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#141414]/45">
            {ws.demoAnalyses}
          </p>
        ) : null}
        <ul className="space-y-0.5">
          {examples.map((example) => {
            const active =
              state.sessionStarted &&
              isPreset &&
              example.id === state.selectedScenarioId;
            return (
              <li key={example.id}>
                <button
                  type="button"
                  aria-current={active ? "page" : undefined}
                  title={example.label}
                  onClick={() => handleSelectScenario(example)}
                  className={cx(
                    "flex w-full min-h-11 items-center gap-2.5 rounded-xl px-2.5 text-left text-[13px] font-medium transition",
                    focusRing,
                    active
                      ? "bg-white/70 text-[#141414]"
                      : "text-[#141414]/65 hover:bg-black/[0.03] hover:text-[#141414]",
                    sidebarCollapsed && "justify-center px-0"
                  )}
                >
                  <span
                    className={cx(
                      "flex h-7 w-7 shrink-0 items-center justify-center",
                      active ? "opacity-100" : "opacity-70"
                    )}
                    aria-hidden
                  >
                    <ScenarioChatIcon id={example.id} active={active} />
                  </span>
                  {!sidebarCollapsed ? (
                    <span className="min-w-0 flex-1 truncate">{example.label}</span>
                  ) : null}
                  {!sidebarCollapsed ? (
                    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#141414]/35">
                      {ws.demoTag}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className={cx(
          "mt-auto space-y-1 p-3",
          sidebarCollapsed && "px-2"
        )}
      >
        <button
          type="button"
          onClick={() => openManual()}
          className={cx(
            softBtn,
            "w-full justify-start gap-3 px-2.5",
            sidebarCollapsed && "justify-center px-0"
          )}
          title={ws.requestManualReview}
          aria-label={ws.requestManualReview}
        >
          <span className={iconSlot}>
            <MsIconManual className="h-6 w-6" />
          </span>
          {!sidebarCollapsed ? (
            <span className="min-w-0 flex-1 truncate text-left leading-none">
              {ws.requestManualReview}
            </span>
          ) : null}
        </button>
        <Link
          to={caseStudyPath}
          className={cx(
            softBtn,
            "w-full justify-start gap-3 px-2.5 no-underline",
            sidebarCollapsed && "justify-center px-0"
          )}
          title={ws.openCaseStudy}
          aria-label={ws.openCaseStudy}
        >
          <span className={iconSlot}>
            <MsIconCase className="h-6 w-6" />
          </span>
          {!sidebarCollapsed ? (
            <span className="min-w-0 flex-1 truncate text-left leading-none">
              {ws.openCaseStudy}
            </span>
          ) : null}
        </Link>

        <div
          className={cx(
            "flex items-center gap-0.5 p-0.5",
            sidebarCollapsed && "flex-col"
          )}
          role="radiogroup"
          aria-label={t3(lang, "Язык", "Language", "语言")}
        >
          {LANGS.map((code) => (
            <button
              key={code}
              type="button"
              role="radio"
              aria-checked={lang === code}
              onClick={() => switchLang(code)}
              className={cx(
                "flex h-9 min-w-0 flex-1 items-center justify-center rounded-lg text-[11px] font-bold tracking-[0.06em] transition",
                focusRing,
                lang === code
                  ? "text-[#141414]"
                  : "text-[#141414]/35 hover:text-[#141414]/7",
                sidebarCollapsed && "w-full flex-none"
              )}
            >
              {langLabel(code)}
            </button>
          ))}
        </div>

        <Link
          to="/"
          className={cx(
            softBtn,
            "w-full justify-start no-underline",
            sidebarCollapsed && "justify-center px-0"
          )}
          title={ws.backToTivonix}
        >
          {sidebarCollapsed ? (
            <MsIconChevronLeft className="h-4 w-4" />
          ) : (
            ws.backToTivonix
          )}
        </Link>
      </div>
    </div>
  );

  const artifactBody = (
    <div className="flex h-full flex-col bg-transparent">
      <div
        className={cx(
          "relative overflow-hidden transition-[flex-grow,min-height,height] duration-700 ease-out",
          state.analyzing
            ? "min-h-0 flex-1"
            : "h-[132px] shrink-0 sm:h-[148px]"
        )}
      >
        <video
          ref={artifactVideoRef}
          className={cx(
            "hero-bg-video pointer-events-none absolute object-cover",
            state.analyzing
              ? "inset-0 h-full w-full scale-105 blur-[6px] brightness-[0.7] saturate-[1.2]"
              : "-inset-[18%] h-[136%] w-[136%] max-w-none scale-110 blur-[10px] brightness-[0.85] saturate-[1.15]"
          )}
          src={heroVideoSrc}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
          aria-hidden
        />
        <div
          className={cx(
            "absolute inset-0",
            state.analyzing
              ? "bg-gradient-to-b from-black/35 via-black/45 to-black/55"
              : "bg-gradient-to-b from-black/25 via-black/35 to-[#f0eeea]"
          )}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(252,80,0,0.28)_0%,transparent_55%)]" />
        {!state.analyzing ? (
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f0eeea] to-transparent" />
        ) : null}

        {/* Analysis fill: grows from header toward bottom */}
        {state.analyzing ? (
          <div
            className="absolute inset-x-0 top-0 overflow-hidden transition-[height] duration-500 ease-out"
            style={{
              height: `${Math.min(
                100,
                Math.max(
                  18,
                  ((state.activeAnalysisStep + 0.35) /
                    Math.max(1, ws.progressSteps.length)) *
                    100
                )
              )}%`,
              transitionDuration: prefersReducedMotion() ? "80ms" : "500ms",
            }}
            aria-hidden
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#fc5000]/35 via-[#fc5000]/18 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#fc5000] to-transparent opacity-80" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/25 to-transparent" />
          </div>
        ) : null}

        <div className="relative z-10 flex h-full flex-col px-3 pb-3 pt-3 sm:px-4">
          <div className="flex items-start gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
              <img
                src="/images/mileseal-mark-orange.svg"
                alt=""
                className="h-8 w-8 shrink-0 drop-shadow-[0_6px_16px_rgba(252,80,0,0.35)]"
                width={32}
                height={32}
              />
              <div className="min-w-0">
                <h2 className="truncate text-[14px] font-semibold tracking-[-0.02em] text-white drop-shadow-sm">
                  {ws.artifactTitle}
                </h2>
                <p className="mt-0.5 truncate text-[11px] font-medium text-white/65">
                  MileSeal · {ws.demoBadge}
                </p>
              </div>
            </div>
            {!isWideArtifact ? (
              <button
                type="button"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label={ws.closeArtifact}
                onClick={() => dispatch({ type: "closeChangeRequest" })}
              >
                <MsIconClose className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          {state.analyzing ? (
            <div
              className="flex min-h-0 flex-1 flex-col items-center justify-center px-2 pb-6 text-center"
              aria-live="polite"
              aria-busy="true"
            >
              <div className="relative h-14 w-14">
                <span
                  className="absolute inset-0 rounded-full border-[2.5px] border-white/25"
                  aria-hidden
                />
                <span
                  className={cx(
                    "absolute inset-0 rounded-full border-[2.5px] border-transparent border-t-[#fc5000] border-r-[#fc5000]/40",
                    !prefersReducedMotion() && "animate-spin"
                  )}
                  aria-hidden
                />
                <span className="absolute inset-0 grid place-items-center">
                  <MsIconAnalyzing className="h-6 w-6" />
                </span>
              </div>
              <p className="mt-4 max-w-[16rem] text-[15px] font-semibold leading-snug tracking-[-0.02em] text-white drop-shadow-sm">
                {ws.analyzingTitle}
              </p>
              <p className="mt-1.5 max-w-[17rem] text-[12px] font-medium text-white/80">
                {ws.progressSteps[
                  Math.min(
                    state.activeAnalysisStep,
                    ws.progressSteps.length - 1
                  )
                ] ?? ws.progressSteps[0]}
              </p>
              <div className="mt-5 h-1 w-40 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-[#fc5000] transition-[width] duration-300 ease-out"
                  style={{
                    width: `${Math.min(
                      100,
                      (state.activeAnalysisStep / ws.progressSteps.length) * 100
                    )}%`,
                    transitionDuration: prefersReducedMotion()
                      ? "80ms"
                      : "300ms",
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {state.analyzing ? null : showResult && state.result ? (
        <>
          <div className="shrink-0 px-3 pb-3 sm:px-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={cx(
                  "inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-3 text-[13px] font-semibold transition",
                  "bg-white/85 text-[#141414]/85 shadow-sm ring-1 ring-black/[0.04]",
                  "hover:bg-white hover:text-[#141414]",
                  focusRing
                )}
                onClick={() => handleCopy(crText)}
              >
                <span className={iconSlot}>
                  {state.copied ? (
                    <MsIconCheck className="h-6 w-6" />
                  ) : (
                    <MsIconCopy className="h-6 w-6" />
                  )}
                </span>
                <span className="truncate leading-none">
                  {state.copied ? ws.copied : ws.copy}
                </span>
              </button>
              <button
                type="button"
                className={cx(
                  "inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-3 text-[13px] font-semibold transition",
                  "bg-white/85 text-[#141414]/85 shadow-sm ring-1 ring-black/[0.04]",
                  "hover:bg-white hover:text-[#141414]",
                  focusRing
                )}
                disabled={pdfBusy}
                onClick={handleDownloadPdf}
              >
                <span className={iconSlot}>
                  <MsIconDownload className="h-6 w-6" />
                </span>
                <span className="truncate leading-none">
                  {pdfBusy ? ws.downloadingPdf : ws.downloadPdf}
                </span>
              </button>

              <div className="relative shrink-0">
                <button
                  type="button"
                  className={cx(
                    "inline-flex h-10 items-center justify-between gap-2 rounded-full px-3 text-[13px] font-semibold transition",
                    "bg-white/85 text-[#141414]/85 shadow-sm ring-1 ring-black/[0.04]",
                    "hover:bg-white hover:text-[#141414]",
                    toneMenuOpen && "bg-white text-[#141414] ring-[#fc5000]/25",
                    focusRing
                  )}
                  aria-haspopup="dialog"
                  aria-expanded={toneMenuOpen}
                  aria-label={ws.toneLabel}
                  onClick={() => {
                    setToneMenuOpen((v) => !v);
                    setResetMenuOpen(false);
                  }}
                >
                  <span className="inline-flex items-center gap-2">
                    <span className={iconSlot}>
                      {state.activeTone === "soft" ? (
                        <MsIconToneSoft className="h-6 w-6" />
                      ) : state.activeTone === "formal" ? (
                        <MsIconToneFormal className="h-6 w-6" />
                      ) : (
                        <MsIconToneNeutral className="h-6 w-6" />
                      )}
                    </span>
                    <span className="whitespace-nowrap leading-none">
                      {state.activeTone === "soft"
                        ? ws.toneSoft
                        : state.activeTone === "formal"
                          ? ws.toneFormal
                          : ws.toneNeutral}
                    </span>
                  </span>
                  <MsIconChevronDown
                    className={cx(
                      "h-4 w-4 shrink-0 transition-transform",
                      toneMenuOpen && "rotate-180"
                    )}
                  />
                </button>

                {toneMenuOpen ? (
                  <>
                    <button
                      type="button"
                      className="fixed inset-0 z-40 cursor-default"
                      aria-label={ws.closeArtifact}
                      onClick={() => setToneMenuOpen(false)}
                    />
                    <div
                      className="absolute right-0 top-full z-50 mt-1.5 w-[13.5rem] rounded-2xl bg-white px-3.5 pb-3.5 pt-3 shadow-[0_12px_40px_rgba(20,20,20,0.14)] ring-1 ring-black/[0.06]"
                      role="dialog"
                      aria-label={ws.toneLabel}
                    >
                      {(() => {
                        const tones: DemoTone[] = ["soft", "neutral", "formal"];
                        const toneIndex = Math.max(
                          0,
                          tones.indexOf(state.activeTone)
                        );
                        const toneLabels = [
                          ws.toneSoft,
                          ws.toneNeutral,
                          ws.toneFormal,
                        ];
                        const pct = (toneIndex / (tones.length - 1)) * 100;
                        return (
                          <>
                            <div className="mb-3 flex items-center justify-between gap-2">
                              <p className="text-[12px] font-semibold tracking-[-0.01em] text-[#141414]/45">
                                {ws.toneLabel}
                                <span className="ml-1 inline-block translate-y-px opacity-70">
                                  ›
                                </span>
                              </p>
                              <p className="text-[12px] font-semibold text-[#fc5000]">
                                {toneLabels[toneIndex]}
                              </p>
                            </div>

                            <div className="relative h-8">
                              <div
                                className="absolute left-0 right-0 top-1/2 h-2.5 -translate-y-1/2 rounded-full bg-[#fc5000]/18"
                                aria-hidden
                              />
                              <div
                                className="absolute left-0 top-1/2 h-2.5 -translate-y-1/2 rounded-full bg-[#fc5000] transition-[width] duration-150 ease-out"
                                style={{
                                  width: `max(1.25rem, ${pct}%)`,
                                }}
                                aria-hidden
                              />
                              <div
                                className="pointer-events-none absolute inset-x-1 top-1/2 flex -translate-y-1/2 justify-between"
                                aria-hidden
                              >
                                {tones.map((_, i) => (
                                  <span
                                    key={i}
                                    className={cx(
                                      "h-1 w-1 rounded-full",
                                      i <= toneIndex
                                        ? "bg-white/80"
                                        : "bg-[#141414]/18"
                                    )}
                                  />
                                ))}
                              </div>
                              <input
                                type="range"
                                min={0}
                                max={2}
                                step={1}
                                value={toneIndex}
                                aria-valuetext={toneLabels[toneIndex]}
                                aria-label={ws.toneLabel}
                                className="tone-slider absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
                                onChange={(e) => {
                                  const next =
                                    tones[Number(e.target.value)] ?? "neutral";
                                  dispatch({ type: "setTone", tone: next });
                                }}
                              />
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            {state.copied
              ? ws.copied
              : state.copyError
                ? ws.copyError
                : `${ws.toneLabel}: ${
                    state.activeTone === "soft"
                      ? ws.toneSoft
                      : state.activeTone === "formal"
                        ? ws.toneFormal
                        : ws.toneNeutral
                  }`}
          </p>
          {(state.copyError || pdfError) && (
            <p
              className="px-3 pb-2 text-[12px] font-medium text-[#c2410c] sm:px-4"
              role="alert"
            >
              {pdfError ? ws.pdfError : ws.copyError}
            </p>
          )}
          <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4 no-scrollbar sm:px-4">
            <div className="rounded-2xl bg-white/70 px-5 py-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-md bg-[#fc5000]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#fc5000]">
                  {ws.artifactStatus}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#141414]/4">
                  {state.activeTone === "soft" ? (
                    <MsIconToneSoft className="h-3.5 w-3.5" />
                  ) : state.activeTone === "formal" ? (
                    <MsIconToneFormal className="h-3.5 w-3.5" />
                  ) : (
                    <MsIconToneNeutral className="h-3.5 w-3.5" />
                  )}
                  {state.activeTone === "soft"
                    ? ws.toneSoft
                    : state.activeTone === "formal"
                      ? ws.toneFormal
                      : ws.toneNeutral}
                </span>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-[14px] font-medium leading-[1.65] text-[#141414]/88">
                {crText}
              </pre>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center px-5 pb-8 text-center">
          <div
            className="w-full max-w-[15.5rem] rounded-2xl border border-dashed border-black/10 bg-white/40 px-4 py-5"
            aria-hidden
          >
            <span className="mx-auto mb-3 block h-11 w-11 drop-shadow-[0_8px_18px_rgba(252,80,0,0.28)]">
              <MileSealEmptyDraftIcon />
            </span>
            <div className="space-y-2">
              <div className="h-2.5 w-[72%] rounded-full bg-black/[0.06]" />
              <div className="h-2.5 w-full rounded-full bg-black/[0.05]" />
              <div className="h-2.5 w-[88%] rounded-full bg-black/[0.05]" />
              <div className="h-2.5 w-[55%] rounded-full bg-black/[0.04]" />
            </div>
          </div>
          <p className="mt-4 text-[13px] font-semibold tracking-[-0.01em] text-[#141414]/75">
            {ws.artifactEmptyTitle}
          </p>
          <p className="mt-1.5 max-w-[17rem] text-[13px] font-medium leading-relaxed text-[#141414]/45">
            {ws.artifactEmpty}
          </p>
          {isPreset && state.sessionStarted && !state.result && !state.analyzing ? (
            <button
              type="button"
              className={cx(softBtn, "mt-4")}
              onClick={() => handleSelectScenario(firstExample)}
            >
              {ws.artifactEmptyAction}
              <MsIconChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              className={cx(softBtn, "mt-4")}
              onClick={() => handleSelectScenario(firstExample)}
            >
              {ws.artifactEmptyAction}
              <MsIconChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );

  const composer = (
    <form
      onSubmit={onComposerSubmit}
      className="shrink-0 bg-transparent px-3 pb-3 pt-1 sm:px-4"
    >
      <div className="mx-auto max-w-[820px] rounded-2xl bg-white/75 p-2">
        {state.sessionStarted && state.scope.trim() ? (
          <div className="mb-1.5 flex px-2 pt-1">
            <span className="inline-flex max-w-full items-center gap-1.5 truncate rounded-lg bg-[#f4f3f1]/80 px-2 py-1 text-[11px] font-medium text-[#141414]/45">
              <span className="shrink-0 text-[#141414]/3">{ws.scopeChipPrefix}</span>
              <span className="truncate">{state.scope}</span>
            </span>
          </div>
        ) : null}
        <div className="flex items-end gap-2">
          <textarea
            ref={composerRef}
            value={composerDraft}
            onChange={(e) => setComposerDraft(e.target.value)}
            onKeyDown={onComposerKeyDown}
            placeholder={ws.composerPlaceholder}
            rows={1}
            className={cx(
              "min-h-12 max-h-40 flex-1 resize-none bg-transparent px-3 py-3",
              "font-sans text-[14px] font-medium leading-[1.5] text-[#141414] placeholder:text-[#141414]/35",
              "outline-none"
            )}
            aria-label={ws.composerPlaceholder}
          />
          <button
            type="submit"
            disabled={!composerDraft.trim() || state.analyzing}
            className={cx(primaryBtn, "mb-0.5 shrink-0")}
          >
            {ws.composerSend}
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div
      className={cx(
        "flex overflow-hidden bg-[#f4f3f1] text-[#141414]",
        layout === "section"
          ? "min-h-[100dvh] h-[min(100dvh,920px)]"
          : "h-[100dvh] min-h-[100dvh]"
      )}
    >
      <a
        href="#mileseal-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2.5 focus:text-[13px] focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#fc5000]/40"
      >
        {ws.skipToContent}
      </a>

      {/* Desktop sidebar */}
      {isDesktopNav ? (
        <aside
          className={cx(
            "relative z-20 flex h-full shrink-0 flex-col bg-[#ebe8e3] transition-[width] duration-200",
            sidebarCollapsed ? "w-[72px]" : "w-[260px]",
            prefersReducedMotion() && "transition-none"
          )}
          aria-label="MileSeal"
        >
          {sidebarInner}
        </aside>
      ) : null}

      {/* Mobile nav drawer */}
      {!isDesktopNav && state.isMobileNavOpen ? (
        <div className="fixed inset-0 z-40 flex" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-black/30"
            aria-label={ws.closeNav}
            onClick={() => dispatch({ type: "setMobileNavOpen", open: false })}
          />
          <aside
            className="relative z-10 flex h-full w-[min(260px,88vw)] flex-col bg-[#ebe8e3] shadow-xl"
            aria-label="MileSeal"
          >
            {sidebarInner}
          </aside>
        </div>
      ) : null}

      {/* Center column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-2 bg-transparent px-3 sm:px-4">
          {!isDesktopNav ? (
            <button
              type="button"
              className={iconBtn}
              aria-label={ws.openNav}
              aria-expanded={state.isMobileNavOpen}
              onClick={() => dispatch({ type: "setMobileNavOpen", open: true })}
            >
              <MsIconMenu className="h-6 w-6" />
            </button>
          ) : null}

          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-2">
              <h1 className="truncate text-[14px] font-semibold tracking-[-0.01em] sm:text-[15px]">
                {titleLabel || "MileSeal"}
              </h1>
              {state.sessionStarted ? (
                <span className="hidden shrink-0 rounded-md bg-black/[0.05] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#141414]/55 sm:inline">
                  {isPreset ? ws.topDemoScenario : ws.topCustomReview}
                </span>
              ) : null}
            </div>
          </div>

          <button type="button" className={cx(softBtn, "hidden sm:inline-flex")} onClick={handleNewAnalysis}>
            {ws.newAnalysis}
          </button>

          {showResult ? (
            <button
              type="button"
              className={softBtn}
              onClick={() => dispatch({ type: "openChangeRequest" })}
            >
              {ws.openArtifact}
              <MsIconChevronRight className="h-4 w-4" />
            </button>
          ) : null}

          <div className="relative">
            <button
              type="button"
              className={iconBtn}
              aria-label={ws.reset}
              aria-expanded={resetMenuOpen}
              aria-haspopup="menu"
              onClick={() => setResetMenuOpen((v) => !v)}
            >
              <MsIconReset className="h-6 w-6" />
            </button>
            {resetMenuOpen ? (
              <>
                <button
                  type="button"
                  className="fixed inset-0 z-30 cursor-default"
                  aria-label={ws.closeNav}
                  onClick={() => setResetMenuOpen(false)}
                />
                <div
                  role="menu"
                  className="absolute right-0 top-full z-40 mt-1 min-w-[11rem] overflow-hidden rounded-xl bg-white/95 py-1 shadow-lg backdrop-blur-md"
                >
                  <button
                    type="button"
                    role="menuitem"
                    className="flex w-full px-3.5 py-2.5 text-left text-[13px] font-medium hover:bg-black/[0.04]"
                    onClick={handleResetAnalysis}
                  >
                    {ws.resetAnalysis}
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="flex w-full px-3.5 py-2.5 text-left text-[13px] font-medium hover:bg-black/[0.04]"
                    onClick={handleNewAnalysis}
                  >
                    {ws.newAnalysis}
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </header>

        <main
          id="mileseal-main"
          ref={mainRef}
          className="flex min-h-0 flex-1 flex-col"
          tabIndex={-1}
        >
          <div className="mx-auto w-full max-w-[820px] flex-1 overflow-y-auto px-4 pb-4 pt-5 no-scrollbar sm:px-6">
            <div id="scope-review" className="scroll-mt-24" tabIndex={-1} aria-hidden />
            {!state.sessionStarted ? (
              <div className="flex min-h-[min(70dvh,36rem)] flex-col items-center justify-center text-center">
                <img
                  src="/images/mileseal-mark-orange.svg"
                  alt=""
                  className="h-14 w-14"
                  width={56}
                  height={56}
                />
                <h2 className="mt-5 max-w-[22rem] text-[clamp(1.35rem,3.5vw,1.75rem)] font-semibold tracking-[-0.03em] text-balance">
                  {ws.emptyTitle}
                </h2>
                <p className="mt-2.5 max-w-[26rem] text-[14px] font-medium leading-relaxed text-[#141414]/55">
                  {ws.emptyDescription}
                </p>
                <div className="mt-6 flex w-full max-w-[28rem] flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
                  {examples.map((example) => (
                    <button
                      key={example.id}
                      type="button"
                      onClick={() => handleSelectScenario(example)}
                      className={cx(softBtn, "sm:min-w-[8.5rem]")}
                    >
                      {example.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Intro */}
                <div className="flex gap-3">
                  <img
                    src="/images/mileseal-mark-orange.svg"
                    alt=""
                    className="mt-0.5 h-7 w-7 shrink-0"
                    width={28}
                    height={28}
                  />
                  <p className="max-w-[36rem] text-[14px] font-medium leading-[1.6] text-[#141414]/75">
                    {ws.introMessage}
                  </p>
                </div>

                {/* Scope preview */}
                {state.scope.trim() ? (
                  <div className="rounded-2xl bg-black/[0.025] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#141414]/35">
                      {ws.scopePreviewTitle}
                    </p>
                    <p className="mt-1 text-[12px] font-medium text-[#141414]/35">
                      {ws.scopeProject}
                    </p>
                    <p className="mt-2 text-[14px] font-medium leading-[1.55] text-[#141414]/8">
                      {state.scope}
                    </p>
                  </div>
                ) : null}

                {/* User request */}
                {state.request.trim() ? (
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl bg-[#ebe8e3]/80 px-4 py-3 text-[14px] font-medium leading-[1.55] text-[#141414]/9">
                      {state.request}
                    </div>
                  </div>
                ) : null}

                {/* Analyse CTA for preset without result */}
                {isPreset && !state.result && !state.analyzing ? (
                  <div className="flex justify-start pl-10">
                    <button type="button" className={primaryBtn} onClick={startAnalyze}>
                      {ws.analyseRequest}
                    </button>
                  </div>
                ) : null}

                {/* Custom notice */}
                {!isPreset && !state.analyzing ? (
                  <div className="rounded-2xl bg-black/[0.025] px-4 py-3.5">
                    <p className="text-[13px] font-medium leading-relaxed text-[#141414]/55">
                      {ws.customNotice}
                    </p>
                    <button
                      type="button"
                      className={cx(primaryBtn, "mt-3")}
                      onClick={() =>
                        openManual({
                          scope: state.scope.trim(),
                          request: state.request.trim(),
                        })
                      }
                    >
                      {ws.sendManual}
                    </button>
                  </div>
                ) : null}

                {/* Analyzing */}
                {state.analyzing ? (
                  <div
                    className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-black/[0.04]"
                    aria-live="polite"
                    aria-busy="true"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative h-9 w-9 shrink-0">
                        <span
                          className="absolute inset-0 rounded-full border-2 border-[#fc5000]/20"
                          aria-hidden
                        />
                        <span
                          className={cx(
                            "absolute inset-0 rounded-full border-2 border-transparent border-t-[#fc5000]",
                            !prefersReducedMotion() && "animate-spin"
                          )}
                          aria-hidden
                        />
                      </div>
                      <p className="text-[14px] font-semibold text-[#141414]">
                        {ws.analyzingTitle}
                      </p>
                    </div>
                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-black/[0.06]">
                      <div
                        className="h-full rounded-full bg-[#fc5000] transition-[width] duration-300 ease-out"
                        style={{
                          width: `${Math.min(
                            100,
                            (state.activeAnalysisStep / ws.progressSteps.length) * 100
                          )}%`,
                          transitionDuration: prefersReducedMotion() ? "80ms" : "300ms",
                        }}
                      />
                    </div>
                    <ul className="mt-3 space-y-2">
                      {ws.progressSteps.map((step, i) => {
                        const done = state.activeAnalysisStep > i;
                        const current = state.activeAnalysisStep === i;
                        return (
                          <li
                            key={step}
                            className={cx(
                              "flex items-center gap-2 text-[13px] font-medium",
                              done
                                ? "text-[#141414]"
                                : current
                                  ? "text-[#141414]/75"
                                  : "text-[#141414]/35"
                            )}
                          >
                            <span
                              className={cx(
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                                done
                                  ? "bg-[#fc5000] text-white"
                                  : current
                                    ? "bg-[#fc5000]/15 text-[#fc5000]"
                                    : "bg-black/[0.06] text-transparent"
                              )}
                            >
                              <MsIconCheck className="h-3 w-3" />
                            </span>
                            {step}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}

                {/* Result */}
                {showResult && state.result ? (
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <img
                        src="/images/mileseal-mark-orange.svg"
                        alt=""
                        className="mt-0.5 h-7 w-7 shrink-0"
                        width={28}
                        height={28}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[#fc5000]/12 px-2.5 py-1 text-[11px] font-semibold text-[#fc5000]">
                            {ws.statusOutside}
                          </span>
                        </div>
                        <h3 className="mt-2 text-[17px] font-semibold tracking-[-0.02em]">
                          {ws.outsideScopeTitle}
                        </h3>
                        <p className="mt-2 text-[14px] font-medium leading-[1.55] text-[#141414]/7">
                          {state.result.reason}
                        </p>

                        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
                          {(
                            [
                              [ws.metrics.effort, state.result.hoursValue],
                              [ws.metrics.cost, state.result.costValue],
                              [ws.metrics.timeline, state.result.timelineValue],
                              [ws.metrics.confidence, state.result.confidence],
                            ] as const
                          ).map(([label, value]) => (
                            <div
                              key={label}
                              className="rounded-xl bg-white px-3 py-3 ring-1 ring-black/[0.06] sm:px-3.5 sm:py-3.5"
                            >
                              <p className="text-[10px] font-semibold uppercase leading-tight tracking-[0.08em] text-[#141414]/45">
                                {label}
                              </p>
                              <p className="mt-2 text-[17px] font-semibold leading-tight tracking-[-0.02em] text-[#141414] tabular-nums sm:text-[18px]">
                                {value}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-5 space-y-1 pt-1">
                          <Disclosure
                            open={whyOpen}
                            onToggle={() => setWhyOpen((v) => !v)}
                            title={ws.whyTitle}
                          >
                            <ul className="list-disc space-y-1.5 pl-4 text-[13px] font-medium leading-relaxed text-[#141414]/65">
                              {ws.whyBulletsPreset.map((b) => (
                                <li key={b}>{b}</li>
                              ))}
                            </ul>
                          </Disclosure>
                          <Disclosure
                            open={effortOpen}
                            onToggle={() => setEffortOpen((v) => !v)}
                            title={ws.effortTitle}
                          >
                            <ul className="space-y-1.5 text-[13px] font-medium leading-relaxed text-[#141414]/65">
                              {(state.result.effortItems ?? []).map((item) => (
                                <li key={item} className="flex gap-2">
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#fc5000]" aria-hidden />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                            <p className="mt-2.5 text-[12px] font-semibold tabular-nums text-[#141414]/75">
                              {ws.metrics.effort}: {state.result.hoursValue}
                            </p>
                            <p className="mt-1.5 text-[13px] font-medium text-[#141414]/55">
                              {state.result.recommendation}
                            </p>
                          </Disclosure>
                          <Disclosure
                            open={excerptsOpen}
                            onToggle={() => setExcerptsOpen((v) => !v)}
                            title={ws.excerptsTitle}
                          >
                            <div className="space-y-2 text-[13px] font-medium leading-relaxed">
                              <p>
                                <span className="text-[#141414]/4">{ws.includedInScope}: </span>
                                <span className="text-[#141414]/7">{state.scope}</span>
                              </p>
                              <p>
                                <span className="text-[#141414]/4">{ws.notInScope}: </span>
                                <span className="text-[#141414]/7">{state.request}</span>
                              </p>
                              <p className="text-[#141414]/55">
                                {ws.newWorkstream} · {ws.needsApproval}
                              </p>
                            </div>
                          </Disclosure>
                        </div>

                        <WorkStartDecisionPanel
                          className="mt-5"
                          value={state.workStartDecision}
                          onChange={(value) =>
                            dispatch({ type: "setWorkStartDecision", value })
                          }
                        />

                        <div className="mt-5 flex flex-wrap gap-2">
                          <button
                            type="button"
                            className={primaryBtn}
                            onClick={() => dispatch({ type: "openChangeRequest" })}
                          >
                            {ws.openChangeRequest}
                          </button>
                          <button
                            type="button"
                            className={softBtn}
                            onClick={() => handleCopy(crText)}
                          >
                            {state.copied ? ws.copied : ws.copySummary}
                          </button>
                          <button
                            type="button"
                            className={softBtn}
                            onClick={() =>
                              openManual(
                                prefillFromExample(selectedExample)
                              )
                            }
                          >
                            {ws.requestManualReview}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {composer}
        </main>
      </div>

      {/* Desktop artifact rail */}
      {isWideArtifact ? (
        <aside
          className="flex h-full w-[400px] shrink-0 flex-col bg-[#f0eeea]"
          aria-label={ws.artifactTitle}
        >
          {artifactBody}
        </aside>
      ) : null}

      {/* Overlay artifact drawer / mobile sheet */}
      {!isWideArtifact && state.isChangeRequestOpen ? (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/30"
          role="dialog"
          aria-modal="true"
          aria-label={ws.artifactTitle}
        >
          <button
            type="button"
            className="absolute inset-0"
            aria-label={ws.closeArtifact}
            onClick={() => dispatch({ type: "closeChangeRequest" })}
          />
          <div className="relative z-10 flex h-full w-full flex-col bg-[#f0eeea] shadow-2xl sm:max-w-[400px]">
            {artifactBody}
          </div>
        </div>
      ) : null}

      {/* Manual review panel — conversational white glass */}
      {formOpen ? (
        <MilesealManualReviewPanel
          key={`${formKey}-${lang}-${formVariant}`}
          prefill={prefill}
          variant={formVariant}
          initialStep={formInitialStep}
          onClose={onCloseForm}
          returnFocusRef={formOpenerRef}
        />
      ) : null}

      {/* Always present for SEO / prerender crawlers */}
      <nav className="sr-only" aria-label="MileSeal">
        <p>{ws.seoNavDescription}</p>
        <Link to={caseStudyPath}>{ws.openCaseStudy}</Link>
      </nav>
    </div>
  );
}

function Disclosure({
  open,
  onToggle,
  title,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className={cx(
          "flex min-h-11 w-full items-center justify-between gap-2 rounded-xl px-1 text-left text-[13px] font-semibold text-[#141414]/8 transition hover:text-[#141414]",
          focusRing
        )}
      >
        {title}
        <MsIconChevronRight
          className={cx(
            "h-4 w-4 shrink-0 text-[#141414]/4 transition-transform",
            open && "rotate-90"
          )}
        />
      </button>
      {open ? <div className="px-1 pb-3 pt-0.5">{children}</div> : null}
    </div>
  );
}

/** Chat-list icons in MileSeal faceted orange language (no gray tile behind). */
function ScenarioChatIcon({ id, active }: { id: string; active?: boolean }) {
  const uid = id.replace(/[^a-z0-9]/gi, "");
  const gBody = `scBody${uid}`;
  const gEdge = `scEdge${uid}`;
  const accent = active ? 1 : 0.92;

  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" aria-hidden>
      <defs>
        <linearGradient id={gBody} x1="4" y1="4" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFAE66" />
          <stop offset="0.5" stopColor="#FC5000" />
          <stop offset="1" stopColor="#B83200" />
        </linearGradient>
        <linearGradient id={gEdge} x1="8" y1="3" x2="22" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF1E3" />
          <stop offset="1" stopColor="#FF9A3D" />
        </linearGradient>
      </defs>
      {/* Angular chat bubble */}
      <path
        d="M5 6.5 L18 4 L24 10 L22 20 L9 22 L4 16 Z"
        fill={`url(#${gBody})`}
        opacity={accent}
      />
      <path d="M18 4 L24 10 L18 11 Z" fill={`url(#${gEdge})`} opacity="0.95" />
      <path d="M5 6.5 L9 22 L4 16 Z" fill="#B83200" opacity="0.28" />
      {/* Tail */}
      <path d="M9 22 L7 26 L13 21.5 Z" fill="#D63A00" opacity="0.9" />

      {id === "homepage-authors" ? (
        <>
          <path d="M10 11 H18" stroke="#FFF8F0" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
          <path d="M10 14.5 H16" stroke="#FFD7B0" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
          <path d="M10 18 H14.5" stroke="#FFD7B0" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
        </>
      ) : null}
      {id === "integrations" ? (
        <>
          <circle cx="11" cy="12" r="1.6" fill="#FFF8F0" />
          <circle cx="18" cy="12" r="1.6" fill="#FFF8F0" />
          <circle cx="14.5" cy="17.5" r="1.6" fill="#FFD7B0" />
          <path d="M12.4 13 L13.6 16.2" stroke="#FFF1E3" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M16.6 13 L15.4 16.2" stroke="#FFF1E3" strokeWidth="1.3" strokeLinecap="round" />
        </>
      ) : null}
      {id === "revisions" ? (
        <>
          <path
            d="M11 17.5 L12.2 12.5 L18 11 L16.8 16 Z"
            fill="#FFF8F0"
            opacity="0.92"
          />
          <path d="M17.2 11.2 L19 9.4" stroke="#FFE8D2" strokeWidth="1.4" strokeLinecap="round" />
        </>
      ) : null}
      {id !== "homepage-authors" && id !== "integrations" && id !== "revisions" ? (
        <>
          <path d="M10 12 H18" stroke="#FFF8F0" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M10 16 H15" stroke="#FFD7B0" strokeWidth="1.6" strokeLinecap="round" />
        </>
      ) : null}
    </svg>
  );
}

/** Faceted draft icon — same orange seal language as MileSeal mark. */
function MileSealEmptyDraftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 96"
      fill="none"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="msEmptyBody" x1="24" y1="20" x2="72" y2="88" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFAE66" />
          <stop offset="0.45" stopColor="#FC5000" />
          <stop offset="1" stopColor="#B83200" />
        </linearGradient>
        <linearGradient id="msEmptyFold" x1="56" y1="8" x2="84" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE0C2" />
          <stop offset="0.5" stopColor="#FF9A3D" />
          <stop offset="1" stopColor="#E04500" />
        </linearGradient>
        <linearGradient id="msEmptyLine" x1="30" y1="48" x2="66" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF8F0" />
          <stop offset="1" stopColor="#FFD7B0" />
        </linearGradient>
      </defs>
      <path d="M22 18 L58 18 L78 38 L78 82 L22 82 Z" fill="url(#msEmptyBody)" />
      <path d="M58 18 L78 38 L58 38 Z" fill="url(#msEmptyFold)" />
      <path d="M32 50 H64" stroke="url(#msEmptyLine)" strokeWidth="5" strokeLinecap="round" opacity="0.92" />
      <path d="M32 62 H58" stroke="url(#msEmptyLine)" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
      <path d="M32 74 H50" stroke="url(#msEmptyLine)" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
      <path d="M28 14 L34 8 L40 14 Z" fill="#FFF8F0" opacity="0.95" />
      <path d="M40 14 L48 22 L34 22 Z" fill="#FFB070" opacity="0.8" />
    </svg>
  );
}
