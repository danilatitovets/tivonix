import { MapPin } from "lucide-react";

const COPIES = 4;

type MarqueeProps = {
  items: string[];
};

function mapsUrl(label: string) {
  return `https://yandex.ru/maps/?text=${encodeURIComponent(label)}`;
}

export default function AudienceMarquee({ items }: MarqueeProps) {
  if (!items.length) return null;

  const sequence = Array.from({ length: COPIES }, (_, copyIndex) =>
    items.map((item, itemIndex) => ({
      id: `${copyIndex}-${itemIndex}`,
      label: item,
    }))
  ).flat();

  return (
    <div className="tivonix-audience__marquee">
      <div className="tivonix-audience__marquee-track">
        {sequence.map(({ id, label }) => (
          <a
            key={id}
            className="tivonix-audience__marquee-item"
            href={mapsUrl(label)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} — Яндекс Карты`}
          >
            <span className="tivonix-audience__marquee-text">{label}</span>
            <MapPin className="tivonix-audience__marquee-maps" strokeWidth={2} aria-hidden />
          </a>
        ))}
      </div>
    </div>
  );
}
