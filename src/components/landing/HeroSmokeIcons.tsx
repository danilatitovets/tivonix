import type { IconType } from "react-icons";
import { SiNotion, SiPostgresql, SiReact, SiSupabase, SiTelegram } from "react-icons/si";
import { CreditCard } from "lucide-react";
import { useLang } from "../../i18n/LangProvider";

type BarItem = { key: string; Icon: IconType; labelRu: string; labelEn: string };

const BAR_ITEMS: BarItem[] = [
  { key: "telegram", Icon: SiTelegram, labelRu: "Telegram", labelEn: "Telegram" },
  { key: "react", Icon: SiReact, labelRu: "React", labelEn: "React" },
  { key: "supabase", Icon: SiSupabase, labelRu: "Supabase", labelEn: "Supabase" },
  { key: "postgres", Icon: SiPostgresql, labelRu: "Postgres", labelEn: "Postgres" },
  { key: "notion", Icon: SiNotion, labelRu: "Notion", labelEn: "Notion" },
  { key: "pay", Icon: CreditCard, labelRu: "Оплата", labelEn: "Payments" },
];

export function HeroIntegrationBar() {
  const { lang } = useLang();
  const isRu = lang === "ru";

  return (
    <div className="relative z-[7] bg-[#0a0a0a]">
      <div className="flex items-center justify-center gap-5 overflow-x-auto px-4 py-3 no-scrollbar sm:gap-7 sm:px-6 sm:py-3.5">
        {BAR_ITEMS.map(({ key, Icon, labelRu, labelEn }) => (
          <div key={key} className="flex shrink-0 flex-col items-center gap-1.5">
            <Icon size={18} className="text-white/60" aria-hidden />
            <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/35 sm:text-[10px]">
              {isRu ? labelRu : labelEn}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
