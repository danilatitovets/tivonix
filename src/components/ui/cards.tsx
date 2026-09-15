function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export interface CardItem {
  id: string | number;
  title: string;
  subtitle: string;
  /** Still cover (also used as video poster). */
  imageUrl: string;
  /** Optional muted loop shown instead of a static image. */
  videoUrl?: string;
  /** Optional text link shown to the right of the title on hover. */
  actionLabel?: string;
  onAction?: () => void;
}

export interface HoverRevealCardsProps {
  items: CardItem[];
  className?: string;
  cardClassName?: string;
}

/**
 * Full-bleed horizontal card strip with hover-reveal:
 * siblings dim/blur; the hovered/focused card pops.
 * One continuous row edge-to-edge (scrolls sideways when needed).
 */
export default function HoverRevealCards({
  items,
  className,
  cardClassName,
}: HoverRevealCardsProps) {
  return (
    <div
      role="list"
      className={cx(
        "group flex w-full snap-x snap-mandatory gap-1.5 overflow-x-auto overscroll-x-contain px-0 sm:gap-2",
        "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.id}
          role="listitem"
          aria-label={item.subtitle ? `${item.title}, ${item.subtitle}` : item.title}
          tabIndex={0}
          className={cx(
            "group/card relative h-[min(58vh,32rem)] min-h-[260px] w-[min(78vw,20rem)] shrink-0 snap-center cursor-pointer overflow-hidden bg-[#101012] bg-cover bg-center transition-all duration-500 ease-in-out",
            "sm:h-[min(64vh,36rem)] sm:w-[min(28vw,18rem)] md:w-[min(22vw,16.5rem)] lg:w-[min(18vw,15rem)]",
            "group-hover:scale-[0.97] group-hover:opacity-55 group-hover:blur-[2px]",
            "hover:!scale-[1.03] hover:!opacity-100 hover:!blur-none focus-within:!scale-[1.03] focus-within:!opacity-100 focus-within:!blur-none focus-visible:!scale-[1.03] focus-visible:!opacity-100 focus-visible:!blur-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5000]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070607]",
            cardClassName
          )}
          style={
            item.videoUrl
              ? undefined
              : { backgroundImage: `url(${item.imageUrl})` }
          }
        >
          {item.videoUrl ? (
            <video
              className="absolute inset-0 h-full w-full object-cover object-top"
              src={item.videoUrl}
              poster={item.imageUrl}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              controls={false}
              draggable={false}
              aria-hidden
            />
          ) : null}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-5">
            {item.subtitle ? (
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/70 sm:text-xs">
                {item.subtitle}
              </p>
            ) : null}
            <div
              className={cx(
                "flex items-baseline gap-3",
                item.subtitle && "mt-1"
              )}
            >
              <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em] sm:text-xl">
                {item.title}
              </h3>
              {item.actionLabel && item.onAction ? (
                <a
                  href="#order"
                  className="pointer-events-auto translate-y-0.5 text-[13px] font-medium text-white/80 underline decoration-white/35 underline-offset-[3px] opacity-0 transition duration-300 hover:text-white hover:decoration-white/70 group-hover/card:opacity-100 group-focus-within/card:opacity-100 focus-visible:opacity-100"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    item.onAction?.();
                  }}
                >
                  {item.actionLabel}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
