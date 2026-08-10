import { useState } from "react";
import { useLang } from "../../i18n/LangProvider";
import { workStartDecisionCopy } from "../../i18n/workStartDecisionCopy";
import {
  type WorkStartAuthorization,
  type WorkStartDecisionChoice,
  type WorkStartDecisionState,
  validateWorkStartDecision,
} from "../../lib/workStartDecision";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

type Props = {
  value: WorkStartDecisionState;
  onChange: (next: WorkStartDecisionState) => void;
  className?: string;
};

const DECISIONS: WorkStartDecisionChoice[] = [
  "include",
  "trade",
  "delay",
  "price",
  "escalate",
];

export default function WorkStartDecisionPanel({ value, onChange, className }: Props) {
  const { lang } = useLang();
  const copy = workStartDecisionCopy(lang);
  const [busy, setBusy] = useState(false);

  const patch = (partial: Partial<WorkStartDecisionState>) => {
    onChange({
      ...value,
      ...partial,
      saved: false,
      saveError: false,
      fieldErrors: {},
    });
  };

  const onSave = () => {
    setBusy(true);
    const validated = validateWorkStartDecision(value, copy);
    onChange(validated);
    setBusy(false);
  };

  const inputClass = cx(
    "w-full min-h-10 rounded-xl border border-black/[0.08] bg-white px-3 py-2",
    "font-sans text-[14px] font-medium text-[#141414] placeholder:text-[#141414]/35",
    "outline-none focus-visible:ring-2 focus-visible:ring-[#fc5000]/35"
  );

  const labelClass = "mb-1 block text-[12px] font-semibold text-[#141414]/55";

  return (
    <section
      className={cx("rounded-2xl bg-white/90 p-4 ring-1 ring-black/[0.05] sm:p-5", className)}
      aria-labelledby="work-start-decision-title"
    >
      <h3
        id="work-start-decision-title"
        className="text-[15px] font-semibold tracking-[-0.02em] text-[#141414]"
      >
        {copy.title}
      </h3>
      <p className="mt-1 text-[13px] font-medium leading-relaxed text-[#141414]/55">
        {copy.subtitle}
      </p>

      {value.stale ? (
        <p
          className="mt-3 rounded-xl bg-[#fc5000]/10 px-3 py-2 text-[13px] font-medium text-[#c2410c]"
          role="status"
        >
          {copy.staleNotice}
        </p>
      ) : null}

      <div className="mt-4 space-y-3">
        <div>
          <label htmlFor="wsd-owner" className={labelClass}>
            {copy.ownerLabel}
          </label>
          <input
            id="wsd-owner"
            className={inputClass}
            value={value.owner}
            onChange={(e) => patch({ owner: e.target.value })}
            placeholder={copy.ownerPlaceholder}
          />
          {value.fieldErrors.owner ? (
            <p className="mt-1 text-[12px] text-[#c2410c]" role="alert">
              {value.fieldErrors.owner}
            </p>
          ) : null}
        </div>

        <div>
          <span className={labelClass}>{copy.decisionLabel}</span>
          <div className="flex flex-wrap gap-2">
            {DECISIONS.map((choice) => (
              <button
                key={choice}
                type="button"
                aria-pressed={value.decision === choice}
                onClick={() => patch({ decision: choice })}
                className={cx(
                  "rounded-full px-3 py-1.5 text-[12px] font-semibold transition",
                  value.decision === choice
                    ? "bg-[#fc5000] text-white"
                    : "bg-[#f4f3f1] text-[#141414]/70 hover:text-[#141414]"
                )}
              >
                {copy.decisions[choice]}
              </button>
            ))}
          </div>
          {value.fieldErrors.decision ? (
            <p className="mt-1 text-[12px] text-[#c2410c]" role="alert">
              {value.fieldErrors.decision}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="wsd-rationale" className={labelClass}>
            {copy.rationaleLabel}
          </label>
          <textarea
            id="wsd-rationale"
            className={cx(inputClass, "min-h-[88px] resize-y")}
            value={value.rationale}
            onChange={(e) => patch({ rationale: e.target.value })}
            placeholder={copy.rationalePlaceholder}
          />
          {value.fieldErrors.rationale ? (
            <p className="mt-1 text-[12px] text-[#c2410c]" role="alert">
              {value.fieldErrors.rationale}
            </p>
          ) : null}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <span className={labelClass}>{copy.authorizationLabel}</span>
            <div className="flex flex-col gap-2">
              {(["approval_required", "work_may_start"] as WorkStartAuthorization[]).map(
                (auth) => (
                  <label
                    key={auth}
                    className="flex items-center gap-2 rounded-xl bg-[#f4f3f1] px-3 py-2 text-[13px] font-medium text-[#141414]/80"
                  >
                    <input
                      type="radio"
                      name="wsd-authorization"
                      checked={value.authorization === auth}
                      onChange={() => patch({ authorization: auth })}
                      className="accent-[#fc5000]"
                    />
                    {copy.authorization[auth]}
                  </label>
                )
              )}
            </div>
            {value.fieldErrors.authorization ? (
              <p className="mt-1 text-[12px] text-[#c2410c]" role="alert">
                {value.fieldErrors.authorization}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="wsd-date" className={labelClass}>
              {copy.dateLabel}
            </label>
            <input
              id="wsd-date"
              type="date"
              className={inputClass}
              value={value.decisionDate}
              onChange={(e) => patch({ decisionDate: e.target.value })}
            />
            {value.fieldErrors.decisionDate ? (
              <p className="mt-1 text-[12px] text-[#c2410c]" role="alert">
                {value.fieldErrors.decisionDate}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" className={cx(primaryBtn)} onClick={onSave} disabled={busy}>
          {busy ? copy.saving : copy.save}
        </button>
        {value.saved && !value.saveError ? (
          <p className="text-[13px] font-semibold text-[#15803d]" role="status">
            {copy.saved}
          </p>
        ) : null}
        {value.saveError && Object.keys(value.fieldErrors).length > 0 ? (
          <p className="text-[13px] font-medium text-[#c2410c]" role="alert">
            {copy.saveError}
          </p>
        ) : null}
      </div>
    </section>
  );
}

const primaryBtn = cx(
  "inline-flex min-h-10 items-center justify-center rounded-xl px-4",
  "bg-[#fc5000] text-[13px] font-semibold text-white transition hover:bg-[#e04800]",
  "disabled:pointer-events-none disabled:opacity-50"
);
