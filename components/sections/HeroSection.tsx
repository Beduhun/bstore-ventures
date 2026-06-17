"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { MARKET_STATS } from "@/lib/stats";

const circuitPaths = [
  "M 0 200 L 100 200 L 100 100 L 200 100",
  "M 300 0 L 300 150 L 400 150 L 400 300",
  "M 500 200 L 600 200 L 600 100",
  "M 700 300 L 700 150 L 800 150 L 800 0",
  "M 0 400 L 150 400 L 150 500",
  "M 900 400 L 800 400 L 800 500",
  "M 200 600 L 200 500 L 300 500 L 300 400",
  "M 600 600 L 600 500 L 700 500",
];

/* Floating particle dots */
function FloatingParticles() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${3 + i * 0.5}px`,
            height: `${3 + i * 0.5}px`,
            borderRadius: "50%",
            background: "#00C4FF",
            opacity: 0.15 + i * 0.03,
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20 - i * 5, 0],
            x: [0, (i % 2 === 0 ? 10 : -10), 0],
            opacity: [0.12, 0.25, 0.12],
          }}
          transition={{
            duration: 5 + i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });
  const [mouseInHero, setMouseInHero] = useState(false);

  // Cursor glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 35, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  return (
    <section
      ref={ref}
      className="circuit-bg"
      onMouseEnter={() => setMouseInHero(true)}
      onMouseLeave={() => setMouseInHero(false)}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0B2545",
        position: "relative",
        overflow: "hidden",
        padding: "120px 24px 80px",
      }}
    >
      {/* Cursor glow follower */}
      <motion.div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,196,255,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: mouseInHero ? 1 : 0,
          transition: "opacity 0.4s ease",
          zIndex: 2,
        }}
      />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Animated circuit SVG */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.06,
          pointerEvents: "none",
        }}
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid slice"
      >
        {circuitPaths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="#00C4FF"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 2, delay: i * 0.3, ease: "easeInOut" }}
          />
        ))}
        {/* Circuit dots */}
        {[
          [100, 200], [300, 150], [600, 100], [800, 150],
          [150, 400], [800, 500], [300, 500], [700, 500],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={cx}
            cy={cy}
            r={4}
            fill="#00C4FF"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 0.6 } : {}}
            transition={{ duration: 0.4, delay: 1 + i * 0.15 }}
          />
        ))}
      </svg>

      {/* Radial glow — main */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,196,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Secondary ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "30%",
          right: "10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,112,184,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        style={{
          maxWidth: "900px",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Badge */}
        <motion.div variants={item}>
          <motion.span
            whileHover={{ scale: 1.05 }}
            style={{
              display: "inline-block",
              background: "rgba(0,196,255,0.1)",
              border: "1px solid rgba(0,196,255,0.3)",
              color: "#00C4FF",
              padding: "6px 18px",
              borderRadius: "100px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              marginBottom: "28px",
              textTransform: "uppercase",
              cursor: "default",
            }}
          >
            ✦ Do Balcão ao Digital — Caminho Seguro, Sem Promessas
          </motion.span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 900,
            color: "#F0F6FF",
            lineHeight: 1.15,
            marginBottom: "28px",
            letterSpacing: "-0.02em",
          }}
        >
          Do balcão ao digital:
          <br className="break" />
          descubra o caminho certo para{" "}
          <span className="cyan-underline" style={{ color: "#00C4FF" }}>
            vender online
          </span>
          .
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={item}
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: "#9EBDDF",
            maxWidth: "640px",
            margin: "0 auto 44px",
            lineHeight: 1.75,
          }}
        >
          Tem loja física perdendo movimento ou está começando do zero? Responda
          7 perguntas e receba um plano personalizado, sem achismo e sem
          promessa de dinheiro fácil.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={item}
          style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
        >
          <motion.a
            href={`${basePath}/#quiz`}
            id="hero-cta-primary"
            className="btn-cyan"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: "16px 36px",
              borderRadius: "12px",
              fontSize: "17px",
              fontWeight: 800,
              textDecoration: "none",
              color: "#0B2545",
              display: "inline-block",
              letterSpacing: "-0.01em",
            }}
          >
            Descobrir Meu Plano Ideal →
          </motion.a>
          <motion.a
            href={`${basePath}/#cursos`}
            id="hero-cta-secondary"
            className="btn-ghost"
            whileHover={{ scale: 1.03, y: -2 }}
            style={{
              padding: "16px 32px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Ver Cursos
          </motion.a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          variants={item}
          style={{
            display: "flex",
            gap: "32px",
            justifyContent: "center",
            marginTop: "52px",
            flexWrap: "wrap",
          }}
        >
          {MARKET_STATS.slice(0, 3).map((stat, i) => {
            const displayValue = `${stat.prefix ?? ""}${stat.value}${stat.suffix ?? ""}`;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.15 }}
                style={{ textAlign: "center" }}
              >
                <div
                  className="gradient-text"
                  style={{ fontSize: "1.5rem", fontWeight: 800 }}
                >
                  {displayValue}
                </div>
                <div style={{ fontSize: "12px", color: "#9EBDDF", marginTop: "4px" }}>
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
