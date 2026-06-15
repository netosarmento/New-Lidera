import { useEffect, useRef, useState } from "react";

interface WordRevealProps {
  text: string;
  className?: string;
  /** delay in ms before the first word appears */
  startDelay?: number;
  /** stagger in ms between each word */
  stagger?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export function WordReveal({
  text,
  className = "",
  startDelay = 0,
  stagger = 60,
  as: Tag = "span",
}: WordRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as any;
  const words = text.split(" ");

  return (
    <Component ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-500 ease-out will-change-transform"
          style={{
            transitionDelay: `${startDelay + i * stagger}ms`,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(0.6em)",
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Component>
  );
}
