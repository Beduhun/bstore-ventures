"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import QuizEngine from "@/components/quiz/QuizEngine";

export default function QuizSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="quiz"
      ref={ref}
      style={{
        background: "#FFFFFF",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.02, 0.04, 0.02] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,196,255,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            style={{
              display: "inline-block",
              color: "#00C4FF",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "14px",
              background: "rgba(0,196,255,0.06)",
              padding: "6px 18px",
              borderRadius: "100px",
              border: "1px solid rgba(0,196,255,0.2)",
              cursor: "default",
            }}
          >
            ✦ Diagnóstico Personalizado — 2 minutos
          </motion.span>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 900,
              color: "#0B2545",
              letterSpacing: "-0.02em",
              marginBottom: "14px",
            }}
          >
            Qual é o seu{" "}
            <span className="gradient-text">perfil empreendedor?</span>
          </h2>
          <p style={{ color: "#1E3A5F", fontSize: "1rem", maxWidth: "520px", margin: "0 auto" }}>
            Responda 7 perguntas rápidas e descubra qual estratégia e quais cursos são ideais para o seu momento.
          </p>
        </motion.div>

        {/* Quiz Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(11,37,69,0.08)",
            borderRadius: "24px",
            padding: "clamp(28px, 5vw, 52px)",
            boxShadow: "0 10px 40px rgba(11,37,69,0.05), 0 0 60px rgba(0,196,255,0.02)",
            maxWidth: "720px",
            margin: "0 auto",
          }}
        >
          <QuizEngine />
        </motion.div>
      </div>
    </section>
  );
}
