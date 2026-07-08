import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  ring: boolean;
};

const NODE_COUNT = 16;

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function initNodes(): Node[] {
  return Array.from({ length: NODE_COUNT }, () => ({
    x: rand(0.08, 0.92),
    y: rand(0.1, 0.9),
    vx: rand(-0.00014, 0.00014),
    vy: rand(-0.00012, 0.00012),
    r: rand(2.2, 4.2),
    ring: Math.random() > 0.55,
  }));
}

export default function HeroSmokeParticles({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodesRef = useRef<Node[]>(initNodes());
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    if (canvas.parentElement && ro) ro.observe(canvas.parentElement);
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;

      if (!prefersReduced) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0.04 || n.x > 0.96) n.vx *= -1;
          if (n.y < 0.06 || n.y > 0.94) n.vy *= -1;
        }
      }

      for (const n of nodes) {
        const px = n.x * w;
        const py = n.y * h;

        if (n.ring) {
          ctx.beginPath();
          ctx.arc(px, py, n.r + 5, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255,255,255,0.22)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(px, py, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.88)";
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      ro?.disconnect();
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[3]"
      aria-hidden
    />
  );
}
