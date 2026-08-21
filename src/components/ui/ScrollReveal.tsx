import { useRef, useEffect, useState, type ReactNode, type CSSProperties } from 'react';

/* ──────────────────── useScrollReveal hook ─────────────── */

interface UseScrollRevealOptions {
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
  threshold?: number;
}

const directionStyles: Record<string, { x: number; y: number }> = {
  up:    { x: 0,   y: 30 },
  down:  { x: 0,   y: -30 },
  left:  { x: 30,  y: 0 },
  right: { x: -30, y: 0 },
};

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  delay = 0,
  direction = 'up',
  once = true,
  threshold = 0.15,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const offset = directionStyles[direction];

  const revealStyle: CSSProperties = {
    opacity: isInView ? 1 : 0,
    transform: isInView
      ? 'translate(0, 0) scale(1)'
      : `translate(${offset.x}px, ${offset.y}px) scale(0.97)`,
    transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    willChange: 'opacity, transform',
  };

  return { ref, style: revealStyle, isInView };
}

/* ──────────────── ScrollReveal component ───────────────── */
// A thin wrapper for simple cases. For grids/flex, use the hook directly
// on your own element to avoid an extra wrapper div.

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const ScrollReveal = ({
  children,
  delay = 0,
  direction = 'up',
  once = true,
  className,
  style: styleProp,
}: ScrollRevealProps) => {
  const { ref, style } = useScrollReveal({ delay, direction, once });

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, ...styleProp }}
    >
      {children}
    </div>
  );
};

/* ──────────────── Stagger container ───────────────────── */

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer = ({
  children,
  className,
  staggerDelay = 80,
}: StaggerContainerProps) => {
  return (
    <div className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <ScrollReveal key={i} delay={i * staggerDelay} direction="up">
              {child}
            </ScrollReveal>
          ))
        : <ScrollReveal delay={0} direction="up">{children}</ScrollReveal>
      }
    </div>
  );
};

/* ──────────────── Fade in on scroll ───────────────────── */

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.6,
  className,
}: FadeInProps) => {
  const { ref, style } = useScrollReveal({ delay });
  return (
    <div ref={ref} className={className} style={{ ...style, transitionDuration: `${duration}s` }}>
      {children}
    </div>
  );
};

/* ──────────────── Scale in on scroll ──────────────────── */

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const ScaleIn = ({
  children,
  delay = 0,
  className,
}: ScaleInProps) => {
  const { ref, style } = useScrollReveal({ delay, direction: 'up' });
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};
