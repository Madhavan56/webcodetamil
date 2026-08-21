import { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';

/* ──────────────────── Reveal wrapper ──────────────────── */

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const directionOffset = {
  up:    { x: 0,   y: 40  },
  down:  { x: 0,   y: -40 },
  left:  { x: 40,  y: 0   },
  right: { x: -40, y: 0   },
};

export const ScrollReveal = ({
  children,
  delay = 0,
  direction = 'up',
  once = true,
  className,
  style,
}: ScrollRevealProps) => {
  const offset = directionOffset[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '0px 0px -60px 0px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

/* ──────────────── Stagger container ───────────────────── */

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  direction?: 'vertical' | 'horizontal';
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
}: FadeInProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: '0px 0px -40px 0px' }}
    transition={{ duration, delay, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

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
}: ScaleInProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '0px 0px -40px 0px' }}
    transition={{
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {children}
  </motion.div>
);
