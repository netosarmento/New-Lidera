import { useEffect, useRef, useState } from "react";

export function ProgressBar({ pct, delay = 0 }: { pct: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setActive(true), delay);
          observer.disconnect();
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="mt-3 h-2 w-full overflow-hidden rounded-full bg-border/60">
      <div
        className="h-full rounded-full bg-gradient-to-r from-gold-soft to-gold transition-[width] duration-1000 ease-out"
        style={{ width: active ? `${pct}%` : "0%" }}
      />
    </div>
  );
}
