const COPIES = 4;

type MarqueeProps = {
  items: string[];
};

export default function AudienceMarquee({ items }: MarqueeProps) {
  if (!items.length) return null;

  const sequence = Array.from({ length: COPIES }, (_, copyIndex) =>
    items.map((item, itemIndex) => ({
      id: `${copyIndex}-${itemIndex}`,
      label: item,
    }))
  ).flat();

  return (
    <div className="tivonix-audience__marquee" aria-hidden>
      <div className="tivonix-audience__marquee-track">
        {sequence.map(({ id, label }) => (
          <span key={id} className="tivonix-audience__marquee-item">
            <span className="tivonix-audience__marquee-text">{label}</span>
            <span className="tivonix-audience__marquee-sep">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
