"use client";

import { motion } from "framer-motion";
import { QuizResult as QuizResultType } from "@/types/quiz";
import { ExternalLink, RotateCcw, Award } from "lucide-react";

interface QuizResultProps {
  result: QuizResultType;
  onReset: () => void;
}

export default function QuizResult({ result, onReset }: QuizResultProps) {
  const { headline, diagnosis, recommendedCourse, secondaryCourses } = result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ display: "flex", flexDirection: "column", gap: "28px" }}
    >
      {/* Result Diagnosis Header */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(0,196,255,0.06) 0%, rgba(0,112,184,0.06) 100%)",
          border: "1px solid rgba(0,196,255,0.2)",
          borderRadius: "20px",
          padding: "32px 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,196,255,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <h3
          style={{
            fontSize: "clamp(1.25rem, 3vw, 1.6rem)",
            fontWeight: 900,
            color: "#0B2545",
            marginBottom: "16px",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}
        >
          {headline}
        </h3>
        <p style={{ color: "#1E3A5F", fontSize: "15px", lineHeight: 1.75 }}>
          {diagnosis}
        </p>
      </div>

      {/* Main Course Recommendation */}
      <div>
        <h4
          style={{
            color: "#0B2545",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "14px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Award size={14} style={{ color: "#00C4FF" }} />
          Recomendação Principal (Mais Compatível)
        </h4>

        <motion.div
          whileHover={{ scale: 1.01 }}
          style={{
            background: "linear-gradient(135deg, rgba(18, 45, 91, 0.95) 0%, rgba(7, 26, 56, 0.98) 100%)",
            border: "2px solid #00C4FF",
            borderRadius: "20px",
            padding: "32px 28px",
            position: "relative",
            boxShadow: "0 10px 30px rgba(0, 196, 255, 0.15)",
            color: "#F0F6FF",
          }}
        >
          {/* Compatibility badge */}
          <span
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "rgba(0, 196, 255, 0.15)",
              border: "1px solid rgba(0, 196, 255, 0.4)",
              color: "#00C4FF",
              padding: "4px 12px",
              borderRadius: "100px",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.05em",
            }}
          >
            {recommendedCourse.tag}
          </span>

          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>
            {recommendedCourse.icon}
          </div>

          <h3
            style={{
              fontSize: "1.35rem",
              fontWeight: 800,
              color: "#FFFFFF",
              marginBottom: "12px",
              letterSpacing: "-0.01em",
            }}
          >
            {recommendedCourse.title}
          </h3>

          <p style={{ color: "#9EBDDF", fontSize: "14.5px", lineHeight: 1.7, marginBottom: "24px" }}>
            {recommendedCourse.description}
          </p>

          <a
            href={recommendedCourse.href}
            id="result-primary-cta"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cyan pulse-glow"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "16px 24px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: 700,
              textDecoration: "none",
              color: "#0B2545",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            Acessar Curso Recomendado <ExternalLink size={18} />
          </a>
        </motion.div>
      </div>

      {/* Secondary Recommendations */}
      {secondaryCourses.length > 0 && (
        <div>
          <h4
            style={{
              color: "#0B2545",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            ✦ Cursos que também combinam com seu perfil
          </h4>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {secondaryCourses.map((course, i) => (
              <motion.a
                key={course.id}
                href={course.href}
                id={`result-rec-secondary-${i}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4, scale: 1.01 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "18px 20px",
                  background: "#F7FAFC",
                  border: "1px solid rgba(11, 37, 69, 0.08)",
                  borderRadius: "14px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0, 196, 255, 0.3)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0, 196, 255, 0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(11, 37, 69, 0.08)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "#F7FAFC";
                }}
              >
                <span style={{ fontSize: "2rem", flexShrink: 0 }}>{course.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px", flexWrap: "wrap" }}>
                    <span style={{ color: "#0B2545", fontWeight: 700, fontSize: "15px" }}>
                      {course.title}
                    </span>
                    <span
                      style={{
                        background: `${course.tagColor}15`,
                        border: `1px solid ${course.tagColor}33`,
                        color: course.tagColor,
                        padding: "2px 8px",
                        borderRadius: "100px",
                        fontSize: "10px",
                        fontWeight: 700,
                      }}
                    >
                      {course.tag}
                    </span>
                  </div>
                  <span style={{ color: "#4A6B82", fontSize: "12px", display: "block", marginTop: "2px", lineHeight: 1.4 }}>
                    {course.description.substring(0, 85)}...
                  </span>
                </div>
                <ExternalLink size={16} style={{ color: "#4A6B82", flexShrink: 0 }} />
              </motion.a>
            ))}
          </div>
        </div>
      )}

      {/* Reset button */}
      <div style={{ marginTop: "8px" }}>
        <button
          id="quiz-reset-btn"
          onClick={onReset}
          style={{
            background: "none",
            border: "1px solid rgba(11, 37, 69, 0.12)",
            color: "#4A6B82",
            padding: "14px 24px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontFamily: "inherit",
            transition: "all 0.2s",
            width: "100%",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#00C4FF44";
            (e.currentTarget as HTMLButtonElement).style.color = "#0B2545";
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(11, 37, 69, 0.02)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(11, 37, 69, 0.12)";
            (e.currentTarget as HTMLButtonElement).style.color = "#4A6B82";
            (e.currentTarget as HTMLButtonElement).style.background = "none";
          }}
        >
          <RotateCcw size={14} />
          Refazer Diagnóstico
        </button>
      </div>
    </motion.div>
  );
}
