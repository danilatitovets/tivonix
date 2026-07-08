import { Bell, Check, MessageCircle, User } from "lucide-react";

const STATUSES = [
  { label: "Новая", count: 3, active: true },
  { label: "В работе", count: 2, active: false },
  { label: "Записан", count: 1, active: false },
  { label: "Оплачен", count: 1, active: false },
] as const;

export default function HeroProductMockup({ isRu = true }: { isRu?: boolean }) {
  const t = isRu
    ? {
        panel: "Заявки",
        newLead: "Новая заявка",
        source: "с формы сайта",
        tg: "Telegram",
        tgText: "Новая заявка: маникюр, завтра 14:00",
        client: "Анна К.",
        phone: "+7 ••• ••• 42-18",
        service: "Маникюр + покрытие",
        status: "В работе",
      }
    : {
        panel: "Leads",
        newLead: "New lead",
        source: "from website form",
        tg: "Telegram",
        tgText: "New lead: nails, tomorrow 2 PM",
        client: "Anna K.",
        phone: "+1 ••• ••• 42-18",
        service: "Manicure + gel",
        status: "In progress",
      };

  return (
    <div className="heroMockup relative w-full lg:ml-auto">
      <div className="relative overflow-hidden rounded-[inherit] border border-white/[0.06] bg-[#0a0a0c] shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
            TIVONIX CRM
          </span>
        </div>

        <div className="grid gap-3 p-3 sm:grid-cols-[1fr_0.9fr] sm:gap-4 sm:p-4">
          <div className="min-w-0 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[13px] font-semibold text-white/90">{t.panel}</h3>
              <span className="flex items-center gap-1 rounded-full bg-[#FF9A3D]/15 px-2 py-0.5 text-[10px] font-semibold text-[#FFAE66]">
                <Bell size={10} aria-hidden />
                +1
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
              {STATUSES.map((s) => (
                <div
                  key={s.label}
                  className={`rounded-xl border px-2 py-2 text-center ${
                    s.active
                      ? "border-[#FF9A3D]/35 bg-[#FF9A3D]/10"
                      : "border-white/[0.08] bg-white/[0.03]"
                  }`}
                >
                  <div className="text-[9px] font-medium uppercase tracking-wide text-white/45">
                    {s.label}
                  </div>
                  <div className="mt-0.5 text-[15px] font-semibold tabular-nums text-white/92">
                    {s.count}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-[#FF9A3D]/25 bg-gradient-to-br from-[#FF9A3D]/12 to-transparent p-3 heroMockupPulse">
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FF9A3D]/20 text-[#FFAE66]">
                  <MessageCircle size={15} aria-hidden />
                </span>
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-white/92">{t.newLead}</div>
                  <div className="text-[11px] text-white/48">{t.source}</div>
                  <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/[0.08] px-2 py-0.5 text-[10px] text-white/65">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
                    {t.status}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
              <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#26A5E4]">
                <MessageCircle size={12} aria-hidden />
                {t.tg}
              </div>
              <p className="text-[11.5px] leading-relaxed text-white/72">{t.tgText}</p>
              <div className="mt-2 text-[10px] text-white/35">2 {isRu ? "мин назад" : "min ago"}</div>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.08] text-white/70">
                  <User size={16} aria-hidden />
                </span>
                <div>
                  <div className="text-[12px] font-semibold text-white/90">{t.client}</div>
                  <div className="text-[10.5px] text-white/45">{t.phone}</div>
                </div>
              </div>
              <div className="mt-2.5 border-t border-white/[0.06] pt-2.5 text-[11px] text-white/58">
                {t.service}
              </div>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-[#5eb3f6]">
                <Check size={11} aria-hidden />
                {isRu ? "Карточка создана" : "Card created"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroMockupPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,154,61,0); }
          50% { box-shadow: 0 0 0 1px rgba(255,154,61,0.25), 0 8px 32px rgba(255,107,44,0.12); }
        }
        .heroMockupPulse { animation: heroMockupPulse 3.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .heroMockupPulse { animation: none; }
        }
      `}</style>
    </div>
  );
}
