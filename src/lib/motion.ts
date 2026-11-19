// Motion Design System Tokens: "Editorial Studio, in motion"

export const EASINGS = {
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
  easeInOutQuart: [0.76, 0, 0.24, 1] as const,
  spring: {
    stiffness: 260,
    damping: 30,
    mass: 0.8,
  },
  springLag: {
    stiffness: 180,
    damping: 24,
    mass: 0.6,
  },
};

export const DURATIONS = {
  micro: 0.18,
  ui: 0.35,
  reveal: 0.8,
  scene: 1.2,
  stagger: 0.05,
};

// Reusable Motion Variants
export const textRevealVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateZ: 1.5,
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    rotateZ: 0,
    transition: {
      duration: DURATIONS.reveal,
      ease: EASINGS.easeOutExpo,
      delay: i * DURATIONS.stagger,
    },
  }),
};

export const cardRevealVariants = {
  hidden: {
    clipPath: "inset(100% 0% 0% 0%)",
    scale: 1.12,
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    opacity: 1,
    transition: {
      duration: DURATIONS.reveal,
      ease: EASINGS.easeOutExpo,
    },
  },
};
