import type { ComponentType, CSSProperties } from "react";
import { Calendar, Globe, Mail } from "lucide-react";
import {
  SiFacebook,
  SiHubspot,
  SiInstagram,
  SiNotion,
  SiTelegram,
  SiVk,
  SiWhatsapp,
} from "react-icons/si";
import { useLang, type HeroLeadChannel, type Lang } from "../../i18n/LangProvider";
import { t3 } from "../../i18n/pick";

type LeadBlock = {
  title: string;
  source: string;
  time: string;
  channel: HeroLeadChannel;
};

type ChannelMeta = {
  Icon: ComponentType<{ size?: number; className?: string; style?: CSSProperties }>;
  appName: string;
  color: string;
};

function channelMeta(channel: HeroLeadChannel, lang: Lang): ChannelMeta {
  switch (channel) {
    case "telegram":
      return { Icon: SiTelegram, appName: "Telegram", color: "#2AABEE" };
    case "instagram":
      return { Icon: SiInstagram, appName: "Instagram", color: "#E4405F" };
    case "whatsapp":
      return { Icon: SiWhatsapp, appName: "WhatsApp", color: "#25D366" };
    case "gmail":
      return { Icon: Mail, appName: t3(lang, "Почта", "Gmail", "邮箱"), color: "#EA4335" };
    case "facebook":
      return { Icon: SiFacebook, appName: "Facebook", color: "#1877F2" };
    case "vk":
      return { Icon: SiVk, appName: t3(lang, "ВКонтакте", "VK", "VK"), color: "#0077FF" };
    case "hubspot":
      return { Icon: SiHubspot, appName: "HubSpot", color: "#FF7A59" };
    case "notion":
      return { Icon: SiNotion, appName: "Notion", color: "#FFFFFF" };
    case "calendar":
      return {
        Icon: Calendar,
        appName: t3(lang, "Календарь", "Calendar", "日历"),
        color: "#4285F4",
      };
    default:
      return {
        Icon: Globe,
        appName: t3(lang, "Сайт", "Website", "网站"),
        color: "#9CA3AF",
      };
  }
}

function LeadNotification({ lead, lang }: { lead: LeadBlock; lang: Lang }) {
  const { Icon, appName, color } = channelMeta(lead.channel, lang);

  return (
    <article className="flex w-[300px] shrink-0 gap-3 rounded-2xl bg-[#121212] px-4 py-4 sm:w-[340px] sm:px-5 sm:py-[18px]">
      <div className="shrink-0 pt-0.5">
        <Icon size={26} style={{ color }} aria-hidden />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-[13px] font-medium text-white/52">{appName}</span>
          <span className="shrink-0 text-[12px] tabular-nums text-white/32">{lead.time}</span>
        </div>

        <p className="mt-1.5 text-[14px] font-semibold leading-snug text-white/92 sm:text-[15px]">
          {lead.title}
        </p>
        <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-white/44 sm:text-[14px]">
          {lead.source}
        </p>
      </div>
    </article>
  );
}

export default function HeroLeadFlowAnimation() {
  const { dict, lang } = useLang();
  const leads = dict.hero.leads.map(({ title, source, time, channel }) => ({
    title,
    source,
    time,
    channel,
  }));

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[6] flex items-center overflow-hidden"
      aria-label={dict.hero.leadsAria}
    >
      <div className="absolute inset-y-0 left-0 z-10 w-[12%] max-w-[80px] bg-gradient-to-r from-black to-transparent" aria-hidden />
      <div className="absolute inset-y-0 right-0 z-10 w-[12%] max-w-[80px] bg-gradient-to-l from-black to-transparent" aria-hidden />

      <div className="flex w-full justify-center gap-5 px-4 sm:gap-6">
        {leads.map((lead) => (
          <LeadNotification key={`${lead.title}-${lead.source}-${lead.channel}`} lead={lead} lang={lang} />
        ))}
      </div>
    </div>
  );
}
