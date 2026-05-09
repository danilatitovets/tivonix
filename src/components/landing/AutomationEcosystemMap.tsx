import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiTelegram,
  SiGmail,
  SiHubspot,
  SiGooglesheets,
  SiWhatsapp,
  SiNotion,
  SiGooglecalendar,
  SiClickup,
  SiStripe,
  SiGoogledocs,
  SiGoogleanalytics,
  SiZapier,
} from "react-icons/si";
import { FiBell } from "react-icons/fi";

type IntegrationIcon = {
  label: string;
  Icon: IconType;
  side: "left" | "right";
  x: number;
  y: number;
  size: number;
  iconSize: number;
  delay: number;
  color: string;
};

type AutomationEcosystemMapProps = {
  logoSrc: string;
  smokeBase?: string;
  orangeLayer?: string;
  /** Подписи к иконкам, тот же порядок, что у внутреннего массива `icons` */
  badgeLabels: string[];
};

const icons: IntegrationIcon[] = [
  {
    label: "Telegram",
    Icon: SiTelegram,
    side: "left",
    x: -520,
    y: -120,
    size: 72,
    iconSize: 34,
    delay: 0,
    color: "#26A5E4",
  },
  {
    label: "Email",
    Icon: SiGmail,
    side: "left",
    x: -440,
    y: 0,
    size: 96,
    iconSize: 46,
    delay: 0.45,
    color: "#EA4335",
  },
  {
    label: "CRM",
    Icon: SiHubspot,
    side: "right",
    x: 500,
    y: -90,
    size: 96,
    iconSize: 48,
    delay: 0.9,
    color: "#FF5C35",
  },
  {
    label: "Таблицы",
    Icon: SiGooglesheets,
    side: "left",
    x: -330,
    y: -85,
    size: 82,
    iconSize: 40,
    delay: 1.3,
    color: "#34A853",
  },
  {
    label: "WhatsApp",
    Icon: SiWhatsapp,
    side: "left",
    x: -360,
    y: 125,
    size: 88,
    iconSize: 42,
    delay: 1.75,
    color: "#25D366",
  },
  {
    label: "Notion",
    Icon: SiNotion,
    side: "right",
    x: 400,
    y: 20,
    size: 78,
    iconSize: 38,
    delay: 2.2,
    color: "#000000",
  },
  {
    label: "Календарь",
    Icon: SiGooglecalendar,
    side: "right",
    x: 310,
    y: -135,
    size: 92,
    iconSize: 44,
    delay: 2.65,
    color: "#4285F4",
  },
  {
    label: "Задачи",
    Icon: SiClickup,
    side: "right",
    x: 370,
    y: 130,
    size: 84,
    iconSize: 42,
    delay: 3.1,
    color: "#7B68EE",
  },
  {
    label: "Оплаты",
    Icon: SiStripe,
    side: "right",
    x: 520,
    y: 115,
    size: 72,
    iconSize: 36,
    delay: 3.55,
    color: "#635BFF",
  },
  {
    label: "Документы",
    Icon: SiGoogledocs,
    side: "left",
    x: -520,
    y: 110,
    size: 72,
    iconSize: 36,
    delay: 4,
    color: "#4285F4",
  },
  {
    label: "Отчёты",
    Icon: SiGoogleanalytics,
    side: "left",
    x: -455,
    y: -15,
    size: 64,
    iconSize: 34,
    delay: 4.45,
    color: "#F9AB00",
  },
  {
    label: "Автоматизация",
    Icon: SiZapier,
    side: "left",
    x: -250,
    y: 85,
    size: 64,
    iconSize: 34,
    delay: 4.9,
    color: "#FF4A00",
  },
  {
    label: "Уведомления",
    Icon: FiBell,
    side: "right",
    x: 500,
    y: -10,
    size: 64,
    iconSize: 34,
    delay: 5.35,
    color: "#FF5C35",
  },
];

export default function AutomationEcosystemMap({
  logoSrc,
  smokeBase = "radial-gradient(circle at center, rgba(255,122,26,0.12), transparent 45%)",
  orangeLayer = "linear-gradient(180deg, rgba(255,122,26,0.10), transparent 60%)",
  badgeLabels,
}: AutomationEcosystemMapProps) {
  const resolvedIcons = icons.map((icon, index) => ({
    ...icon,
    label: badgeLabels[index] ?? icon.label,
  }));

  return (
    <section className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden px-4 sm:px-6">
      <div className="relative mx-auto min-h-[22rem] max-w-[min(96vw,1400px)] overflow-hidden rounded-[26px] bg-black px-4 py-8 sm:min-h-[30rem] lg:min-h-[34rem]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: smokeBase }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: orangeLayer }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,rgba(255,122,26,0.22),transparent_35%),radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.9)_84%)]"
        />

        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
          viewBox="0 0 1200 430"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lineLeft" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="55%" stopColor="#ffffff" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#ff7a1a" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="lineRight" x1="1" x2="0" y1="0" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="55%" stopColor="#ffffff" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#ff7a1a" stopOpacity="0.95" />
            </linearGradient>

            <filter id="orangeGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {resolvedIcons.map((icon, index) => {
            const startX = 600 + icon.x;
            const startY = 215 + icon.y;

            const c1x = icon.side === "left" ? startX + 150 : startX - 150;
            const c2x = icon.side === "left" ? 470 : 730;
            const c1y = startY;
            const c2y = 215 + icon.y * 0.35;

            const path = `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, 600 215`;

            return (
              <g key={`${icon.label}-line`}>
                <path
                  d={path}
                  fill="none"
                  stroke={icon.side === "left" ? "url(#lineLeft)" : "url(#lineRight)"}
                  strokeWidth="1"
                  strokeDasharray={index % 2 === 0 ? "4 8" : "1 0"}
                  opacity="0.52"
                />

                <circle r="3" fill="#ff7a1a" filter="url(#orangeGlow)">
                  <animateMotion
                    dur={`${5.8 + (index % 4) * 0.45}s`}
                    begin={`${icon.delay}s`}
                    repeatCount="indefinite"
                    path={path}
                  />

                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.15;0.75;1"
                    dur={`${5.8 + (index % 4) * 0.45}s`}
                    begin={`${icon.delay}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        <div className="pointer-events-none absolute inset-0 z-[4]">
          {resolvedIcons.map((item, index) => {
            const Icon = item.Icon;

            return (
              <div
                key={`int-${index}`}
                className="integration-fly absolute left-1/2 top-1/2 flex items-center justify-center rounded-full bg-white shadow-[0_0_34px_rgba(255,255,255,0.18)]"
                style={
                  {
                    "--from-x": `${item.x}px`,
                    "--from-y": `${item.y}px`,
                    "--size": `${item.size}px`,
                    "--duration": `${6.6 + (index % 5) * 0.45}s`,
                    "--delay": `${item.delay}s`,
                  } as CSSProperties
                }
              >
                <Icon size={item.iconSize} color={item.color} aria-hidden />
              </div>
            );
          })}
        </div>

        <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <div className="absolute h-[13rem] w-[13rem] rounded-full bg-[#ff7a1a]/25 blur-[42px] sm:h-[18rem] sm:w-[18rem]" />

          <div className="absolute h-[8rem] w-[8rem] animate-ping rounded-full border border-[#ff7a1a]/35 sm:h-[11rem] sm:w-[11rem]" />

          <div className="relative flex h-[7.5rem] w-[7.5rem] items-center justify-center rounded-full bg-black shadow-[0_0_45px_rgba(255,122,26,0.7)] ring-2 ring-[#ff7a1a] sm:h-[10rem] sm:w-[10rem]">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,122,26,0.35),transparent_65%)]" />

            <img
              src={logoSrc}
              alt="TIVONIX"
              width={96}
              height={96}
              decoding="async"
              className="relative z-10 h-[4rem] w-[4rem] object-contain sm:h-[5.5rem] sm:w-[5.5rem]"
            />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-[11] bg-[radial-gradient(circle_at_center,transparent_0%,transparent_58%,rgba(0,0,0,0.9)_100%)]" />
      </div>

      <style>{`
        .integration-fly {
          width: var(--size);
          height: var(--size);
          animation: fly-to-center var(--duration) cubic-bezier(.55, 0, .15, 1) infinite;
          animation-delay: var(--delay);
          opacity: 0;
          will-change: transform, opacity, filter;
        }

        @keyframes fly-to-center {
          0% {
            transform: translate(var(--from-x), var(--from-y)) translate(-50%, -50%) scale(0.78);
            opacity: 0;
            filter: blur(5px);
          }

          10% {
            opacity: 1;
            filter: blur(0);
          }

          58% {
            opacity: 1;
          }

          82% {
            transform: translate(0, 0) translate(-50%, -50%) scale(0.26);
            opacity: 0;
            filter: blur(2px);
          }

          100% {
            transform: translate(0, 0) translate(-50%, -50%) scale(0.18);
            opacity: 0;
            filter: blur(8px);
          }
        }

        @media (max-width: 768px) {
          .integration-fly {
            width: calc(var(--size) * 0.68);
            height: calc(var(--size) * 0.68);
            animation-name: fly-to-center-mobile;
          }

          @keyframes fly-to-center-mobile {
            0% {
              transform:
                translate(calc(var(--from-x) * 0.52), calc(var(--from-y) * 0.75))
                translate(-50%, -50%)
                scale(0.72);
              opacity: 0;
              filter: blur(5px);
            }

            10% {
              opacity: 1;
              filter: blur(0);
            }

            58% {
              opacity: 1;
            }

            82% {
              transform: translate(0, 0) translate(-50%, -50%) scale(0.24);
              opacity: 0;
              filter: blur(2px);
            }

            100% {
              transform: translate(0, 0) translate(-50%, -50%) scale(0.18);
              opacity: 0;
              filter: blur(8px);
            }
          }
        }
      `}</style>
    </section>
  );
}