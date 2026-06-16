"use client";

import { motion } from "framer-motion";
import { QuizResult as QuizResultType } from "@/types/quiz";
import { ExternalLink, RotateCcw } from "lucide-react";

interface QuizResultProps {
  result: QuizResultType;
  onReset: () => void;
}

export default function QuizResult({ result, onReset }: QuizResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Result Header */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(0,196,255,0.08) 0%, rgba(0,112,184,0.08) 100%)",
          border: "1px solid rgba(0,196,255,0.25)",
          borderRadius: "20px",
          padding: "32px 28px",
          marginBottom: "24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow blob */}
        <div style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,196,255,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <h3
          style={{
            fontSize: "clamp(1.2rem, 3vw, 1.55rem)",
            fontWeight: 800,
            color: "#F0F6FF",
            marginBottom: "16px",
            lineHeight: 1.35,
            letterSpacing: "-0.01em",
          }}
        >
          {result.headline}
        </h3>
        <p style={{ color: "#7A9CC2", fontSize: "15px", lineHeight: 1.75 }}>
          {result.diagnosis}
        </p>
      </div>

      {/* Recommendations */}
      <div style={{ marginBottom: "28px" }}>
        <h4
          style={{
            color: "#00C4FF",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          ✦ Cursos Recomendados para o Seu Perfil
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {result.recommendations.map((rec, i) => (
            <motion.a
              key={rec.label}
              href={rec.href}
              id={`result-rec-${i}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -15, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ x: 4, scale: 1.01 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "16px 20px",
                background: "#122D5B",
                border: "1px solid #1A3A72",
                borderRadius: "12px",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,196,255,0.35)";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,196,255,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1A3A72";
                (e.currentTarget as HTMLAnchorElement).style.background = "#122D5B";
              }}
            >
              <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>{rec.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ color: "#F0F6FF", fontWeight: 600, fontSize: "15px" }}>
                    {rec.label}
                  </span>
                  {rec.badge && (
                    <span style={{
                      background: "rgba(0,196,255,0.15)",
                      border: "1px solid rgba(0,196,255,0.3)",
                      color: "#00C4FF",
                      padding: "2px 8px",
                      borderRadius: "100px",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      whiteSpace: "nowrap",
                    }}>
                      {rec.badge}
                    </span>
                  )}
                </div>
              </div>
              <ExternalLink size={16} style={{ color: "#7A9CC2", flexShrink: 0 }} />
            </motion.a>
          ))}
        </div>
      </div>

      {/* CTA + Reset */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <a
          href={result.recommendations[0]?.href ?? "#"}
          id="result-primary-cta"
          className="btn-cyan pulse-glow"
          style={{
            padding: "16px 24px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: 700,
            textDecoration: "none",
            color: "#0B2545",
            textAlign: "center",
            display: "block",
          }}
        >
          Acessar Meu Curso Recomendado →
        </a>
        <button
          id="quiz-reset-btn"
          onClick={onReset}
          style={{
            background: "none",
            border: "1px solid #1A3A72",
            color: "#7A9CC2",
            padding: "12px 24px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontFamily: "inherit",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#00C4FF44";
            (e.currentTarget as HTMLButtonElement).style.color = "#F0F6FF";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#1A3A72";
            (e.currentTarget as HTMLButtonElement).style.color = "#7A9CC2";
          }}
        >
          <RotateCcw size={14} />
          Refazer Diagnóstico
        </button>
      </div>
    </motion.div>
  );
}
