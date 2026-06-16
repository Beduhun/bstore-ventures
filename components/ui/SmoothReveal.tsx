"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface SmoothRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const getVariants = (direction: string, distance: number): Variants => {
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const value =
    direction === "down" || direction === "right" ? -distance : distance;

  return {
    hidden: {
      opacity: 0,
      [axis]: value,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      [axis]: 0,
      filter: "blur(0px)",
    },
  };
};

export default function SmoothReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 40,
  once = true,
  className,
  style,
}: SmoothRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px" });
  const variants = getVariants(direction, distance);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
