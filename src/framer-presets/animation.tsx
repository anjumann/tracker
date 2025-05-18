/* eslint-disable @typescript-eslint/no-explicit-any */
import { Variants } from "framer-motion";

// Fade in/out
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
};

// Scale in/out
export const scale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } },
};

// Slide up/down
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: 40, transition: { duration: 0.3, ease: "easeIn" } },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -40, transition: { duration: 0.3, ease: "easeIn" } },
};

// Slide left/right
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: 40, transition: { duration: 0.3, ease: "easeIn" } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.3, ease: "easeIn" } },
};

// Bounce in/out
export const bounce: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      duration: 0.5,
    },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

// Staggered children
export const staggerContainer = (stagger: number = 0.1): Variants => ({
  visible: {
    transition: {
      staggerChildren: stagger,
    },
  },
  hidden: {},
});

// Page transition (fade + slide)
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -24, transition: { duration: 0.3, ease: "easeIn" } },
};

// Utility for custom delays
export const withDelay = (variant: Variants, delay: number): Variants => {
    
  const addDelay = (obj: any) => ({ ...obj, transition: { ...obj.transition, delay } });
  return {
    hidden: variant.hidden,
    visible: addDelay(variant.visible),
    exit: variant.exit ? addDelay(variant.exit) : undefined,
  };
};
