"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface BlogCTAProps {
  position?: "middle" | "end";
}

export default function BlogCTA({ position = "end" }: BlogCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        background: "linear-gradient(135deg, rgba(0,196,255,0.08) 0%, rgba(18,45,91,0.9) 100%)",
        border: "1px solid rgba(0,196,255,0.25)",
        borderRadius: "20px",
        padding: "36px 32px",
        margin: "40px 0",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute",
        top: "-20px",
        right: "-20px",
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,196,255,0.2) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🧠</div>
      <h3 style={{
        color: "#F0F6FF",
        fontWeight: 800,
        fontSize: "1.25rem",
        marginBottom: "10px",
        letterSpacing: "-0.01em",
      }}>
        {position === "middle"
          ? "Quer um plano personalizado para o seu perfil?"
          : "Pronto para descobrir qual é o seu caminho?"}
      </h3>
      <p style={{ color: "#7A9CC2", fontSize: "14px", marginBottom: "24px", maxWidth: "400px", margin: "0 auto 24px" }}>
        Quer saber qual curso é ideal para o seu perfil? Leva apenas 2 minutos e é personalizado para o seu momento.
      </p>
      <Link
        href="/#quiz"
        id={`blog-cta-${position}`}
        className="btn-cyan"
        style={{
          padding: "13px 28px",
          borderRadius: "10px",
          fontSize: "15px",
          fontWeight: 700,
          textDecoration: "none",
          color: "#0B2545",
          display: "inline-block",
        }}
      >
        Fazer Meu Diagnóstico →
      </Link>
    </motion.div>
  );
}
