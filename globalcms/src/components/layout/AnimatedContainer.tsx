import React, { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate, type Variants } from 'framer-motion';

/**
 * Reveal animation for sections when they enter the viewport.
 * Uses exact user-specified timings and ease.
 */
export const FadeInSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ 
  children, 
  delay = 0 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.7, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Wrapper for grids to stagger the entrance of child motion components.
 */
export const StaggerGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{ 
      visible: { 
        transition: { 
          staggerChildren: 0.1 
        } 
      } 
    }}
  >
    {children}
  </motion.div>
);

/**
 * Animated number counter using user-specified motion values.
 */
export const AnimatedCounter: React.FC<{ value: number; duration?: number }> = ({ 
  value, 
  duration = 2 
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    const controls = animate(count, value, { 
      duration: duration,
      ease: [0.22, 1, 0.36, 1] as any
    });
    return controls.stop;
  }, [value, count, duration]);

  return <motion.span>{rounded}</motion.span>;
};

/**
 * Preset variants for child elements inside a StaggerGrid.
 */
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }
  }
};
