import { useSyncExternalStore } from "react";

/** Сразу корректное значение на клиенте (без вспышки после useEffect). */
export function useMinWidth(minPx: number): boolean {
  const query = `(min-width: ${minPx}px)`;
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
