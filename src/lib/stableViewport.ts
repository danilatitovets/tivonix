/**
 * Mobile browser chrome show/hide changes window.innerHeight and makes
 * scroll-linked effects / 100%-height roots jump while the user is idle.
 * Freeze height until width or orientation actually changes.
 */

let frozenH = 0;
let frozenW = 0;

function readNow() {
  frozenH = window.innerHeight || frozenH || 800;
  frozenW = window.innerWidth || frozenW || 390;
}

export function getStableViewportHeight(): number {
  if (typeof window === "undefined") return 800;
  if (!frozenH) readNow();
  return frozenH;
}

/** Call once at app boot. */
export function bindStableViewport(): () => void {
  if (typeof window === "undefined") return () => {};

  readNow();
  document.documentElement.style.setProperty("--app-vh", `${frozenH * 0.01}px`);

  const refresh = () => {
    readNow();
    document.documentElement.style.setProperty("--app-vh", `${frozenH * 0.01}px`);
  };

  const onResize = () => {
    // Width change = rotate / desktop resize. Height-only = URL bar chrome.
    if (Math.abs(window.innerWidth - frozenW) < 10) return;
    refresh();
  };

  window.addEventListener("resize", onResize);
  window.addEventListener("orientationchange", refresh);

  return () => {
    window.removeEventListener("resize", onResize);
    window.removeEventListener("orientationchange", refresh);
  };
}
