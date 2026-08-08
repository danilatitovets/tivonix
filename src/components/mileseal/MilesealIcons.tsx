import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

function MsIcon({
  gid,
  className,
  children,
  ...rest
}: IconProps & { gid: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cx("h-6 w-6 shrink-0", className)}
      aria-hidden
      {...rest}
    >
      <defs>
        <linearGradient id={`${gid}-b`} x1="4" y1="3" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFAE66" />
          <stop offset="0.5" stopColor="#FC5000" />
          <stop offset="1" stopColor="#B83200" />
        </linearGradient>
        <linearGradient id={`${gid}-e`} x1="6" y1="2" x2="20" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF1E3" />
          <stop offset="1" stopColor="#FF9A3D" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );
}

export function MsIconReset({ className, ...rest }: IconProps) {
  return (
    <MsIcon gid="msReset" className={className} {...rest}>
      <path
        d="M5 11.5 A7 7 0 1 1 6.2 16.8"
        stroke="url(#msReset-b)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M5 8.2 L5 12.4 L8.8 11.2 Z" fill="url(#msReset-e)" />
    </MsIcon>
  );
}

export function MsIconManual({ className, ...rest }: IconProps) {
  return (
    <MsIcon gid="msManual" className={className} {...rest}>
      {/* Open package — same optical box as other 24×24 glyphs */}
      <path d="M4 9.5 L12 5 L20 9.5 L12 14 Z" fill="url(#msManual-e)" />
      <path d="M4 9.5 L12 14 L12 20.5 L4 16 Z" fill="url(#msManual-b)" />
      <path d="M20 9.5 L12 14 L12 20.5 L20 16 Z" fill="#D63A00" opacity="0.85" />
      <path d="M7.5 8 L12 5.5 L16.5 8 L12 10.5 Z" fill="#FFD7B0" opacity="0.9" />
    </MsIcon>
  );
}

export function MsIconCase({ className, ...rest }: IconProps) {
  return (
    <MsIcon gid="msCase" className={className} {...rest}>
      <path d="M5 3.5 L14.5 2.5 L20 8.5 L19 20.5 L5 19.5 Z" fill="url(#msCase-b)" />
      <path d="M14.5 2.5 L20 8.5 L14.5 8.5 Z" fill="url(#msCase-e)" />
      <path d="M8 10.5 H15.5" stroke="#FFF8F0" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
      <path d="M8 14 H14" stroke="#FFD7B0" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
      <path d="M8 17.5 H12.5" stroke="#FFD7B0" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
    </MsIcon>
  );
}

export function MsIconCopy({ className, ...rest }: IconProps) {
  return (
    <MsIcon gid="msCopy" className={className} {...rest}>
      <path d="M8.5 4 L17.5 3 L20 15 L10.5 16 Z" fill="url(#msCopy-b)" opacity="0.4" />
      <path d="M4 6 L16 4.5 L18.5 19.5 L6 21 Z" fill="url(#msCopy-b)" />
      <path d="M16 4.5 L18.5 7.5 L16 7.5 Z" fill="url(#msCopy-e)" />
      <path d="M8 11.5 H14" stroke="#FFF8F0" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
      <path d="M8 15 H12.5" stroke="#FFD7B0" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
    </MsIcon>
  );
}

export function MsIconDownload({ className, ...rest }: IconProps) {
  return (
    <MsIcon gid="msDl" className={className} {...rest}>
      <path d="M5 3.5 L19 3.5 L18 10 L6 10 Z" fill="url(#msDl-e)" opacity="0.85" />
      <path d="M7 10 L17 10 L16 13.5 L8 13.5 Z" fill="url(#msDl-b)" opacity="0.7" />
      <path d="M10.5 7.5 L13.5 7.5 L13.5 14 L17.5 14 L12 20 L6.5 14 L10.5 14 Z" fill="url(#msDl-b)" />
      <path d="M4 20.5 H20" stroke="url(#msDl-e)" strokeWidth="2" strokeLinecap="round" />
    </MsIcon>
  );
}

export function MsIconCheck({ className, ...rest }: IconProps) {
  return (
    <MsIcon gid="msCheck" className={className} {...rest}>
      <path
        d="M5 12 L10 17 L19 7"
        stroke="url(#msCheck-b)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MsIcon>
  );
}

export function MsIconClose({ className, ...rest }: IconProps) {
  return (
    <MsIcon gid="msClose" className={className} {...rest}>
      <path d="M6 6 L18 18" stroke="url(#msClose-b)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M18 6 L6 18" stroke="url(#msClose-e)" strokeWidth="2.2" strokeLinecap="round" />
    </MsIcon>
  );
}

export function MsIconChevronRight({ className, ...rest }: IconProps) {
  return (
    <MsIcon gid="msChevR" className={className} {...rest}>
      <path
        d="M9 5 L16 12 L9 19"
        stroke="url(#msChevR-b)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MsIcon>
  );
}

export function MsIconChevronLeft({ className, ...rest }: IconProps) {
  return (
    <MsIcon gid="msChevL" className={className} {...rest}>
      <path
        d="M15 5 L8 12 L15 19"
        stroke="url(#msChevL-b)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MsIcon>
  );
}

export function MsIconMenu({ className, ...rest }: IconProps) {
  return (
    <MsIcon gid="msMenu" className={className} {...rest}>
      <path d="M5 7 H19" stroke="url(#msMenu-b)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M5 12 H19" stroke="url(#msMenu-e)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M5 17 H15" stroke="url(#msMenu-b)" strokeWidth="2.2" strokeLinecap="round" />
    </MsIcon>
  );
}

export function MsIconSidebar({ className, ...rest }: IconProps) {
  return (
    <MsIcon gid="msSide" className={className} {...rest}>
      <path d="M4 5 H20 V19 H4 Z" stroke="url(#msSide-b)" strokeWidth="1.8" />
      <path d="M9 5 V19" stroke="url(#msSide-e)" strokeWidth="1.8" />
      <path
        d="M14 9 L11 12 L14 15"
        stroke="#FFF8F0"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MsIcon>
  );
}

export function MsIconSidebarOpen({ className, ...rest }: IconProps) {
  return (
    <MsIcon gid="msSideO" className={className} {...rest}>
      <path d="M4 5 H20 V19 H4 Z" stroke="url(#msSideO-b)" strokeWidth="1.8" />
      <path d="M9 5 V19" stroke="url(#msSideO-e)" strokeWidth="1.8" />
      <path
        d="M12 9 L15 12 L12 15"
        stroke="#FFF8F0"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MsIcon>
  );
}

export function MsIconToneSoft({ className, ...rest }: IconProps) {
  return (
    <MsIcon gid="msSoft" className={className} {...rest}>
      <path d="M4 6.5 L15.5 3.5 L20.5 14 L7 19.5 Z" fill="url(#msSoft-b)" />
      <path d="M15.5 3.5 L20.5 14 L15.5 13.5 Z" fill="url(#msSoft-e)" />
      <path d="M8 11 H15" stroke="#FFF8F0" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 14.5 H13" stroke="#FFD7B0" strokeWidth="1.6" strokeLinecap="round" />
    </MsIcon>
  );
}

export function MsIconToneNeutral({ className, ...rest }: IconProps) {
  return (
    <MsIcon gid="msNeu" className={className} {...rest}>
      <path
        d="M12 2 L14.1 9.1 L21.5 9.1 L15.6 13.4 L17.8 20.8 L12 16.3 L6.2 20.8 L8.4 13.4 L2.5 9.1 L9.9 9.1 Z"
        fill="url(#msNeu-b)"
      />
      <path d="M12 2 L14.1 9.1 L12 10.8 Z" fill="url(#msNeu-e)" />
    </MsIcon>
  );
}

export function MsIconToneFormal({ className, ...rest }: IconProps) {
  return (
    <MsIcon gid="msForm" className={className} {...rest}>
      <path d="M6 7.5 L12 3 L18 7.5 L18 11 L12 8.5 L6 11 Z" fill="url(#msForm-e)" />
      <path d="M5 11 L12 8.5 L19 11 L19 21 L5 21 Z" fill="url(#msForm-b)" />
      <path d="M9 15 H15" stroke="#FFF8F0" strokeWidth="1.6" strokeLinecap="round" />
    </MsIcon>
  );
}

export function MsIconChevronDown({ className, ...rest }: IconProps) {
  return (
    <MsIcon gid="msChevD" className={className} {...rest}>
      <path
        d="M6 9 L12 15 L18 9"
        stroke="url(#msChevD-b)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MsIcon>
  );
}

export function MsIconAnalyzing({ className, ...rest }: IconProps) {
  return (
    <MsIcon gid="msAn" className={cx("animate-pulse", className)} {...rest}>
      <path d="M6 8 L12 4 L18 8 L16 18 L8 18 Z" fill="url(#msAn-b)" />
      <path d="M12 4 L18 8 L12 10 Z" fill="url(#msAn-e)" />
      <path d="M10 13 H14" stroke="#FFF8F0" strokeWidth="1.5" strokeLinecap="round" />
    </MsIcon>
  );
}
