import { Link } from "react-router-dom";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

export type PillActionItem = {
  id: string;
  label: string;
  to?: string;
  href?: string;
  onClick?: () => void;
};

function pillItemClass(active: boolean, compact?: boolean) {
  return cx(
    "relative flex items-center rounded-full border-0 font-bold uppercase tracking-[0.12em] outline-none select-none transition duration-[260ms]",
    "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
    compact ? "px-3 h-9 text-[9.5px] tracking-[0.1em]" : "px-4 h-10 text-[10px]",
    active
      ? "bg-[#2c2c2c] text-white"
      : "bg-transparent text-white/55 hover:bg-white/[0.04] hover:text-white/85"
  );
}

function PillActionItemView({
  item,
  active,
  compact,
  onSelect,
}: {
  item: PillActionItem;
  active: boolean;
  compact?: boolean;
  onSelect: (id: string) => void;
}) {
  const className = pillItemClass(active, compact);

  if (item.to) {
    return (
      <Link
        to={item.to}
        onClick={() => onSelect(item.id)}
        className={className}
        aria-current={active ? "page" : undefined}
        data-active={active ? "" : undefined}
      >
        <span className="leading-none">{item.label}</span>
      </Link>
    );
  }

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onSelect(item.id)}
        className={className}
        data-active={active ? "" : undefined}
      >
        <span className="leading-none">{item.label}</span>
      </a>
    );
  }

  return (
    <button type="button" onClick={() => onSelect(item.id)} className={className} data-active={active ? "" : undefined}>
      <span className="leading-none">{item.label}</span>
    </button>
  );
}

export default function PillActionBar({
  items,
  activeId,
  onActiveChange,
  compact = true,
  className,
  ariaLabel,
}: {
  items: PillActionItem[];
  activeId: string;
  onActiveChange: (id: string) => void;
  compact?: boolean;
  className?: string;
  ariaLabel: string;
}) {
  const handleSelect = (id: string) => {
    onActiveChange(id);
    items.find((item) => item.id === id)?.onClick?.();
  };

  return (
    <nav
      className={cx(
        "relative inline-flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border-0 bg-[#141414] p-1",
        className
      )}
      aria-label={ariaLabel}
    >
      {items.map((item) => (
        <PillActionItemView
          key={item.id}
          item={item}
          active={item.id === activeId}
          compact={compact}
          onSelect={handleSelect}
        />
      ))}
    </nav>
  );
}
