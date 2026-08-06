import { useEffect, useMemo, useReducer, useRef } from "react";
import { Check, ClipboardCopy, Pencil, RotateCcw } from "lucide-react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import AutoGrowTextarea from "../ui/AutoGrowTextarea";
import { ctaClass } from "../leads/ctaStyles";
import { useLang } from "../../i18n/LangProvider";
import { milesealCopy } from "../../i18n/milesealCopy";
import type { ScopeFormPrefill } from "../../data/milesealDemo";
import {
  createInitialDemoState,
  demoReducer,
} from "./milesealDemoState";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

const fieldLabel =
  "mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ffae66]/90";

type Props = {
  onSendForReview: (prefill: ScopeFormPrefill) => void;
};

export default function MilesealDemo({ onSendForReview }: Props) {
  const { lang } = useLang();
  const copy = milesealCopy(lang);
  const examples = copy.examples;
  const d = copy.demo;
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

  const langRef = useRef(lang);
  useEffect(() => {
    if (langRef.current === lang) return;
    langRef.current = lang;
    const next = examples.find((e) => e.id === state.selectedScenarioId) ?? examples[0];
    dispatch({ type: "syncLangPreset", example: next });
  }, [lang, examples, state.selectedScenarioId]);

  useEffect(() => {
    if (!state.copied) return;
    const t = window.setTimeout(() => dispatch({ type: "clearCopied" }), 2200);
    return () => window.clearTimeout(t);
  }, [state.copied]);

  const analyzeTimerRef = useRef<number | null>(null);
  useEffect(() => {
    return () => {
      if (analyzeTimerRef.current != null) {
        window.clearTimeout(analyzeTimerRef.current);
        analyzeTimerRef.current = null;
      }
    };
  }, [state.selectedScenarioId, state.mode, lang]);

  const isPreset = state.mode === "preset";
  const showResult = isPreset && state.result !== null;
  const showHelper = !showResult;

  const handleAnalyze = () => {
    if (!isPreset || state.analyzing) return;
    dispatch({ type: "analyzeStart" });
    const scenarioId = selectedExample.id;
    const result = selectedExample.result;
    if (analyzeTimerRef.current != null) {
      window.clearTimeout(analyzeTimerRef.current);
    }
    analyzeTimerRef.current = window.setTimeout(() => {
      analyzeTimerRef.current = null;
      dispatch({ type: "analyzeSuccess", result, scenarioId });
    }, 360);
  };

  const handleCopy = async () => {
    if (!state.result) return;
    const text = state.result.changeRequest;
    try {
      await navigator.clipboard.writeText(text);
      dispatch({ type: "copied" });
      return;
    } catch {
      /* fall through to legacy copy */
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
    } catch {
      /* no false success toast */
    }
  };

  return (
    <Section
      id="demo"
      className="scroll-mt-[var(--tivonix-header-spacer)] bg-black !py-12 sm:!py-16 lg:!py-20"
    >
      <Container>
        <Reveal>
          <h2 className="max-w-[28rem] font-hero text-[clamp(1.75rem,4.2vw,2.75rem)] font-normal uppercase leading-[0.98] tracking-[0.02em] text-white">
            {d.title}
          </h2>
          {showHelper ? (
            <p className="mt-3 max-w-[40rem] font-sans text-[14px] font-medium leading-[1.55] text-white/55 sm:text-[15px]">
              {d.helper}
            </p>
          ) : null}
        </Reveal>

        <Reveal delay={70} className="mt-7">
          <div className="overflow-hidden rounded-[24px] bg-[#0c0c0c]">
            <div className="flex flex-wrap gap-2 px-5 pt-5 sm:px-7 sm:pt-6">
              {examples.map((example) => {
                const active = isPreset && example.id === state.selectedScenarioId;
                return (
                  <button
                    key={example.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => dispatch({ type: "selectScenario", example })}
                    className={cx(
                      "rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition",
                      active
                        ? "bg-[rgba(255,138,30,0.18)] text-[#ffae66]"
                        : "bg-white/[0.06] text-white/62 hover:bg-white/[0.09] hover:text-white/85"
                    )}
                  >
                    {example.label}
                  </button>
                );
              })}
            </div>

            <div className="px-5 py-5 sm:px-7 sm:py-6">
              <div className="grid gap-4 lg:grid-cols-2 lg:items-start lg:gap-5">
                <div>
                  <label htmlFor="mileseal-scope" className={fieldLabel}>
                    {d.scopeLabel}
                  </label>
                  <AutoGrowTextarea
                    id="mileseal-scope"
                    value={state.scope}
                    minRows={3}
                    maxRows={10}
                    readOnly={isPreset}
                    aria-readonly={isPreset}
                    onChange={(e) => dispatch({ type: "setScope", value: e.target.value })}
                    className={isPreset ? "cursor-default opacity-90" : undefined}
                  />
                </div>
                <div>
                  <label htmlFor="mileseal-request" className={fieldLabel}>
                    {d.requestLabel}
                  </label>
                  <AutoGrowTextarea
                    id="mileseal-request"
                    value={state.request}
                    minRows={3}
                    maxRows={10}
                    readOnly={isPreset}
                    aria-readonly={isPreset}
                    onChange={(e) => dispatch({ type: "setRequest", value: e.target.value })}
                    className={isPreset ? "cursor-default opacity-90" : undefined}
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                {isPreset ? (
                  <>
                    <button
                      type="button"
                      onClick={handleAnalyze}
                      disabled={state.analyzing || !state.scope.trim() || !state.request.trim()}
                      className={ctaClass("primary", "lg", "disabled:opacity-50")}
                    >
                      {state.analyzing ? d.analyzing : d.analyze}
                    </button>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "editExample" })}
                      className={ctaClass("ghost", "md", "gap-2")}
                    >
                      <Pencil className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                      {d.editExample}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        onSendForReview({
                          scope: state.scope.trim(),
                          request: state.request.trim(),
                        })
                      }
                      disabled={!state.scope.trim() || !state.request.trim()}
                      className={ctaClass("primary", "lg", "disabled:opacity-50")}
                    >
                      {d.sendHumanReview}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch({ type: "restoreExample", example: selectedExample })
                      }
                      className={ctaClass("ghost", "md", "gap-2")}
                    >
                      <RotateCcw className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                      {d.restoreExample}
                    </button>
                  </>
                )}
              </div>

              {!isPreset ? (
                <p
                  className="mt-4 rounded-[16px] bg-[#141414] px-4 py-3 text-[13px] font-medium leading-relaxed text-white/55"
                  role="status"
                >
                  {d.customNotice}
                </p>
              ) : null}
            </div>
          </div>
        </Reveal>

        {showResult && state.result ? (
          <div className="mt-5 translate-y-0 opacity-100 transition duration-500 ease-out sm:mt-6">
            <article className="overflow-hidden rounded-[24px] bg-[#0c0c0c]">
              <div className="px-5 py-6 sm:px-8 sm:py-8">
                <span className="inline-flex rounded-full bg-[rgba(255,138,30,0.16)] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#ffae66]">
                  {state.result.status}
                </span>

                <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-10">
                  <div>
                    <p className="font-hero text-[clamp(2.6rem,8vw,3.75rem)] font-normal leading-none tracking-[0.01em] text-white">
                      {state.result.hoursValue}
                    </p>
                    <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/45">
                      {d.hoursLabel}
                    </p>
                  </div>
                  <div>
                    <p className="font-hero text-[clamp(2.6rem,8vw,3.75rem)] font-normal leading-none tracking-[0.01em] text-white">
                      {state.result.costValue}
                    </p>
                    <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/45">
                      {d.valueLabel}
                    </p>
                  </div>
                </div>

                <p className="mt-7 max-w-[40rem] font-sans text-[15px] font-medium leading-[1.55] text-white/72 sm:text-[16px]">
                  {state.result.reason}
                </p>
                <p className="mt-3 max-w-[36rem] font-sans text-[14px] font-medium leading-[1.55] text-[#ffae66]/90">
                  {state.result.recommendation}
                </p>

                {!state.isChangeRequestOpen ? (
                  <div className="mt-7">
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "openChangeRequest" })}
                      className={ctaClass("primary", "lg")}
                    >
                      {d.generateCr}
                    </button>
                  </div>
                ) : (
                  <div className="mt-7 border-t border-white/[0.07] pt-6">
                    <p
                      id="mileseal-change-request"
                      className="max-w-[48rem] font-sans text-[14px] font-medium leading-[1.65] text-white/70 sm:text-[15px]"
                    >
                      {state.result.changeRequest}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={handleCopy}
                        className={ctaClass("primary", "md", "gap-2")}
                      >
                        {state.copied ? (
                          <Check className="h-4 w-4" strokeWidth={2} aria-hidden />
                        ) : (
                          <ClipboardCopy className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                        )}
                        {state.copied ? d.copied : d.copy}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch({ type: "startOver", example: selectedExample })
                        }
                        className={ctaClass("ghost", "md", "gap-2")}
                      >
                        <RotateCcw className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                        {d.startOver}
                      </button>
                    </div>

                    {state.copied ? (
                      <p className="mt-3 text-[13px] font-medium text-[#ffae66]" role="status">
                        {d.copied}
                      </p>
                    ) : null}
                  </div>
                )}
              </div>
            </article>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
