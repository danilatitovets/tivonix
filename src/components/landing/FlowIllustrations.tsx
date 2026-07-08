type FlowVariant = "lead" | "telegram" | "crm" | "status" | "result";

const STROKE = "rgba(255,255,255,0.18)";
const STROKE_SOFT = "rgba(255,255,255,0.1)";
const FILL_PANEL = "rgba(255,255,255,0.04)";
const FILL_BAR = "rgba(255,255,255,0.11)";
const ACCENT = "#FF9A3D";

function WindowDots({ x, y }: { x: number; y: number }) {
  return (
    <>
      <circle cx={x} cy={y} r="2.2" fill="rgba(255,255,255,0.18)" />
      <circle cx={x + 9} cy={y} r="2.2" fill="rgba(255,255,255,0.14)" />
      <circle cx={x + 18} cy={y} r="2.2" fill="rgba(255,255,255,0.1)" />
    </>
  );
}

function CodeBars({
  x,
  y,
  widths,
  accentIndex,
}: {
  x: number;
  y: number;
  widths: number[];
  accentIndex?: number;
}) {
  return (
    <>
      {widths.map((width, i) => (
        <rect
          key={`${x}-${y}-${i}`}
          x={x}
          y={y + i * 11}
          width={width}
          height="6"
          rx="3"
          fill={accentIndex === i ? ACCENT : FILL_BAR}
          opacity={accentIndex === i ? 0.92 : 0.85}
        />
      ))}
    </>
  );
}

function WireGlobe({ cx, cy, rx, ry }: { cx: number; cy: number; rx: number; ry: number }) {
  const latitudes = [-0.55, -0.25, 0.05, 0.35];
  const longitudes = [-0.7, -0.35, 0, 0.35, 0.7];

  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={STROKE_SOFT} strokeWidth="1" />
      {latitudes.map((t) => {
        const y = cy + ry * t;
        const span = Math.sqrt(Math.max(0, 1 - t * t));
        return (
          <ellipse
            key={`lat-${t}`}
            cx={cx}
            cy={y}
            rx={rx * span}
            ry={ry * 0.22}
            fill="none"
            stroke={STROKE_SOFT}
            strokeWidth="0.85"
          />
        );
      })}
      {longitudes.map((t) => (
        <path
          key={`lon-${t}`}
          d={`M ${cx + rx * t} ${cy - ry} A ${rx * Math.abs(t || 0.12)} ${ry} 0 0 1 ${cx + rx * t} ${cy + ry}`}
          fill="none"
          stroke={STROKE_SOFT}
          strokeWidth="0.85"
        />
      ))}
    </g>
  );
}

function AnchorDot({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r="7" fill="rgba(255,255,255,0.06)" />
      <circle cx={cx} cy={cy} r="3.5" fill="rgba(255,255,255,0.88)" />
    </>
  );
}

function DashedLink({ d }: { d: string }) {
  return (
    <path
      d={d}
      fill="none"
      stroke="rgba(255,255,255,0.42)"
      strokeWidth="1.2"
      strokeDasharray="5 4"
      strokeLinecap="round"
    />
  );
}

function LeadIllustration() {
  return (
    <svg viewBox="0 0 300 210" className="flow-illustration" aria-hidden>
      <WireGlobe cx={150} cy={188} rx={118} ry={52} />
      <AnchorDot cx={108} cy={162} />

      <DashedLink d="M 108 162 C 118 132, 138 108, 156 92" />

      <rect x="148" y="34" width="128" height="96" rx="10" fill={FILL_PANEL} stroke={STROKE} />
      <WindowDots x={160} y={46} />
      <rect x="160" y="58" width="52" height="5" rx="2.5" fill="rgba(255,255,255,0.14)" />
      <rect x="160" y="72" width="104" height="18" rx="5" fill="none" stroke={STROKE} />
      <rect x="160" y="98" width="104" height="18" rx="5" fill="none" stroke={STROKE} />
      <rect x="160" y="112" width="48" height="10" rx="3" fill={ACCENT} opacity="0.9" />

      {[
        { x: 34, y: 54, label: "Ads" },
        { x: 34, y: 92, label: "Bot" },
        { x: 34, y: 130, label: "Site" },
      ].map((src) => (
        <g key={src.label}>
          <rect x={src.x} y={src.y} width="54" height="28" rx="7" fill={FILL_PANEL} stroke={STROKE} />
          <rect x={src.x + 10} y={src.y + 10} width="18" height="5" rx="2.5" fill={FILL_BAR} />
          <rect x={src.x + 10} y={src.y + 18} width="30" height="4" rx="2" fill="rgba(255,255,255,0.07)" />
          <path
            d={`M ${src.x + 54} ${src.y + 14} C ${src.x + 72} ${src.y + 14}, ${src.x + 86} ${src.y + 28}, ${src.x + 98} ${src.y + 44}`}
            fill="none"
            stroke={STROKE_SOFT}
            strokeWidth="1"
            strokeDasharray="4 3"
          />
        </g>
      ))}

      <circle cx={156} cy={92} r="3" fill={ACCENT} />
    </svg>
  );
}

function TelegramIllustration() {
  return (
    <svg viewBox="0 0 300 210" className="flow-illustration" aria-hidden>
      <WireGlobe cx={150} cy={192} rx={108} ry={48} />
      <AnchorDot cx={186} cy={168} />
      <DashedLink d="M 186 168 C 176 138, 162 112, 148 88" />

      <rect x="118" y="28" width="108" height="148" rx="16" fill={FILL_PANEL} stroke={STROKE} />
      <rect x="134" y="42" width="76" height="10" rx="5" fill="rgba(255,255,255,0.1)" />
      <rect x="134" y="62" width="52" height="28" rx="10" fill="rgba(255,255,255,0.06)" stroke={STROKE_SOFT} />
      <rect x="150" y="72" width="34" height="4" rx="2" fill={FILL_BAR} />
      <rect x="150" y="80" width="24" height="4" rx="2" fill="rgba(255,255,255,0.07)" />

      <rect x="162" y="100" width="58" height="34" rx="10" fill="rgba(255,154,61,0.1)" stroke={ACCENT} strokeWidth="1.1" />
      <rect x="172" y="110" width="36" height="4" rx="2" fill={ACCENT} opacity="0.85" />
      <rect x="172" y="120" width="26" height="4" rx="2" fill="rgba(255,154,61,0.55)" />

      <path d="M 146 148 L 164 136 L 182 148 L 174 124 Z" fill="none" stroke={ACCENT} strokeWidth="1.4" strokeLinejoin="round" />

      <circle cx={206} cy={48} r="14" fill="rgba(255,154,61,0.16)" stroke={ACCENT} />
      <text x={206} y={52} textAnchor="middle" fill={ACCENT} fontSize="10" fontWeight="700" fontFamily="system-ui">
        1
      </text>
    </svg>
  );
}

function CrmIllustration() {
  return (
    <svg viewBox="0 0 300 210" className="flow-illustration" aria-hidden>
      <WireGlobe cx={150} cy={190} rx={112} ry={50} />
      <AnchorDot cx={124} cy={166} />
      <DashedLink d="M 124 166 C 134 136, 148 108, 158 86" />

      <rect x="52" y="30" width="196" height="118" rx="10" fill={FILL_PANEL} stroke={STROKE} />
      <WindowDots x={64} y={42} />
      <rect x="64" y="56" width="168" height="14" rx="4" fill="rgba(255,255,255,0.06)" />
      {["ID", "Клиент", "Статус"].map((_, i) => (
        <rect key={i} x={64 + i * 56} y="59" width={i === 1 ? 68 : 40} height="5" rx="2.5" fill="rgba(255,255,255,0.14)" />
      ))}

      {[0, 1, 2, 3, 4].map((row) => (
        <g key={row}>
          <rect
            x="64"
            y={78 + row * 14}
            width="168"
            height="11"
            rx="3"
            fill={row === 0 ? "rgba(255,154,61,0.12)" : "rgba(255,255,255,0.03)"}
            stroke={row === 0 ? "rgba(255,154,61,0.35)" : "transparent"}
          />
          <rect x="68" y={81 + row * 14} width="18" height="5" rx="2.5" fill={row === 0 ? ACCENT : FILL_BAR} opacity={row === 0 ? 0.9 : 0.7} />
          <rect x="92" y={81 + row * 14} width="54" height="5" rx="2.5" fill={FILL_BAR} opacity={row === 0 ? 0.95 : 0.65} />
          <rect x="152" y={81 + row * 14} width="36" height="5" rx="2.5" fill={row === 0 ? "rgba(255,154,61,0.55)" : "rgba(255,255,255,0.08)"} />
        </g>
      ))}

      <rect x="232" y="56" width="8" height="8" rx="2" fill={ACCENT} opacity="0.8" />
      <rect x="232" y="70" width="8" height="8" rx="2" fill="rgba(255,255,255,0.1)" />
      <rect x="232" y="84" width="8" height="8" rx="2" fill="rgba(255,255,255,0.08)" />
    </svg>
  );
}

function StatusIllustration() {
  const columns = [
    { x: 48, title: "Новая", active: false },
    { x: 118, title: "В работе", active: true },
    { x: 188, title: "Записан", active: false },
  ];

  return (
    <svg viewBox="0 0 300 210" className="flow-illustration" aria-hidden>
      <WireGlobe cx={150} cy={194} rx={104} ry={46} />
      <AnchorDot cx={150} cy={170} />

      {columns.map((col, i) => (
        <g key={col.x}>
          <rect x={col.x} y="36" width="64" height="108" rx="8" fill={FILL_PANEL} stroke={col.active ? "rgba(255,154,61,0.35)" : STROKE} />
          <rect x={col.x + 10} y="46" width="34" height="5" rx="2.5" fill={col.active ? ACCENT : "rgba(255,255,255,0.14)"} opacity={col.active ? 0.9 : 0.75} />
          <rect x={col.x + 10} y="60" width="44" height="22" rx="6" fill="rgba(255,255,255,0.05)" stroke={STROKE_SOFT} />
          <rect x={col.x + 10} y="88" width="44" height="22" rx="6" fill="rgba(255,255,255,0.04)" stroke={STROKE_SOFT} />
          {i < 2 && (
            <path
              d={`M ${col.x + 64} 90 C ${col.x + 78} 90, ${col.x + 86} 90, ${col.x + 96} 90`}
              fill="none"
              stroke={i === 0 ? ACCENT : STROKE}
              strokeWidth="1.3"
              strokeDasharray={i === 0 ? "0" : "4 3"}
            />
          )}
        </g>
      ))}

      <DashedLink d="M 150 170 C 150 148, 150 126, 150 108" />
    </svg>
  );
}

function ResultIllustration() {
  const nodes = [
    { cx: 56, cy: 58 },
    { cx: 244, cy: 58 },
    { cx: 56, cy: 132 },
    { cx: 244, cy: 132 },
  ];

  return (
    <svg viewBox="0 0 300 210" className="flow-illustration" aria-hidden>
      <WireGlobe cx={150} cy={196} rx={100} ry={44} />

      {nodes.map((node) => (
        <g key={`${node.cx}-${node.cy}`}>
          <path
            d={`M ${node.cx} ${node.cy} Q ${(node.cx + 150) / 2} ${(node.cy + 96) / 2}, 150 96`}
            fill="none"
            stroke={STROKE_SOFT}
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <circle cx={node.cx} cy={node.cy} r="14" fill={FILL_PANEL} stroke={STROKE} />
          <circle cx={node.cx} cy={node.cy - 4} r="5" fill="rgba(255,255,255,0.12)" />
          <rect x={node.cx - 8} y={node.cy + 2} width="16" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
        </g>
      ))}

      <circle cx={150} cy={96} r="24" fill="rgba(255,154,61,0.12)" stroke={ACCENT} strokeWidth="1.5" />
      <path d="M 140 96 L 146 102 L 162 86" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="118" y="148" width="64" height="28" rx="8" fill={FILL_PANEL} stroke={STROKE} />
      <WindowDots x={128} y={156} />
      <CodeBars x={128} y={164} widths={[44, 36, 28]} accentIndex={0} />

      <AnchorDot cx={150} cy={174} />
      <DashedLink d="M 150 120 C 150 138, 150 154, 150 168" />
    </svg>
  );
}

export function FlowIllustration({ variant }: { variant: FlowVariant }) {
  switch (variant) {
    case "lead":
      return <LeadIllustration />;
    case "telegram":
      return <TelegramIllustration />;
    case "crm":
      return <CrmIllustration />;
    case "status":
      return <StatusIllustration />;
    default:
      return <ResultIllustration />;
  }
}

export type { FlowVariant };
