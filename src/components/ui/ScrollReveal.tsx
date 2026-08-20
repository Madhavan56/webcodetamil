import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ScrollRevealProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'whileInView' | 'viewport' | 'ref'> {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}

export const ScrollReveal = ({
  children,
  delay = 0,
  stagger = 0,
  direction = 'up',
  once = true,
  rootMargin = '0px 0px -50px 0px',
  threshold = 0.1,
  className,
  style,
  ...props
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
        delay,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement, {
          variants: childVariants,
          initial: 'hidden',
          animate: isVisible ? 'visible' : 'hidden',
          transition: {
            delay: delay + index * stagger,
          },
        });
      })}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  direction?: 'vertical' | 'horizontal';
  staggerDelay?: number;
}

export const StaggerContainer = ({
  children,
  className,
  direction = 'vertical',
  staggerDelay = 100,
}: StaggerContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { rootMargin: '0px 0px -50px 0px', threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement, {
          initial: { opacity: 0, y: direction === 'vertical' ? 20 : 0, x: direction === 'horizontal' ? 20 : 0 },
          animate: isVisible ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: direction === 'vertical' ? 20 : 0, x: direction === 'horizontal' ? 20 : 0 },
          transition: {
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1],
            delay: index * staggerDelay,
          },
        });
      })}
    </div>
  );
};