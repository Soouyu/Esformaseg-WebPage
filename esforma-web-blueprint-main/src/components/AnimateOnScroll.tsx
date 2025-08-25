// src/components/AnimateOnScroll.tsx

import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  delay?: number;
  type?:
    | "fadeInUp"
    | "fadeInScale"
    | "fadeInLeft"
    | "fadeInRight"
    | "flipInY"
    | "zoomBounce"
    | "slideInSkew"
    | "rotateReveal";
}


const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};
const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.1,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.1,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

const flipInY: Variants = {
  hidden: {
    opacity: 0,
    rotateY: -90,
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    transition: {
      duration: 0.9,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const zoomBounce: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const slideInSkew: Variants = {
  hidden: { opacity: 0, x: -100, skewX: 10 },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

const rotateReveal: Variants = {
  hidden: { opacity: 0, rotate: -10, y: 30 },
  visible: {
    opacity: 1,
    rotate: 0,
    y: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};


const AnimateOnScroll: React.FC<Props> = ({ children, delay = 0, type = "fadeInUp" }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);

const variants =
  type === "fadeInScale"
    ? fadeInScale
    : type === "fadeInLeft"
    ? fadeInLeft
    : type === "fadeInRight"
    ? fadeInRight
    : type === "flipInY"
    ? flipInY
    : type === "zoomBounce"
    ? zoomBounce
    : type === "slideInSkew"
    ? slideInSkew
    : type === "rotateReveal"
    ? rotateReveal
    : fadeInUp;



  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: variants.hidden,
        visible: {
          ...variants.visible,
          transition: {
            ...(typeof variants.visible === "object" &&
            "transition" in variants.visible
              ? variants.visible.transition
              : {}),
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnScroll;
