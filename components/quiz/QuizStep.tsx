"use client";

import { motion } from "framer-motion";
import { QuizQuestion } from "@/types/quiz";
import { ChevronLeft } from "lucide-react";

interface QuizStepProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  onAnswer: (optionId: string) => void;
  onPrev?: () => void;
  stepIndex: number;
}

export default function QuizStep({ question, selectedAnswer, onAnswer, onPrev }: QuizStepProps) {
  return (
    <div>
      {/* Question Header */}
      <div style={{ marginBottom: "28px" }}>
        <h3
          style={{
            fontSize: "clamp(1.2rem, 3vw, 1.55rem)",
            fontWeight: 800,
            color: "#F0F6FF",
            lineHeight: 1.3,
            marginBottom: "8px",
            letterSpacing: "-0.01em",
          }}
        >
          {question.question}
        </h3>
        {question.subtitle && (
          <p style={{ color: "#7A9CC2", fontSize: "14px" }}>{question.subtitle}</p>
        )}
      </div>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {question.options.map((option, i) => {
          const isSelected = selectedAnswer === option.id;
          return (
            <motion.button
              key={option.id}
              id={`quiz-option-${option.id}`}
              initial={{ opacity: 0, x: -15, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.35, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={() => onAnswer(option.id)}
              whileHover={{ x: 4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              style={{
                width: "100%",
                padding: "16px 20px",
                borderRadius: "12px",
                border: isSelected
                  ? "2px solid #00C4FF"
                  : "2px solid rgba(26,58,114,0.8)",
                background: isSelected
                  ? "rgba(0,196,255,0.1)"
                  : "#122D5B",
                color: isSelected ? "#F0F6FF" : "#7A9CC2",
                textAlign: "left",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: isSelected ? 600 : 400,
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transition: "all 0.2s ease",
                boxShadow: isSelected ? "0 0 20px rgba(0,196,255,0.2)" : "none",
                fontFamily: "inherit",
              }}
            >
              {/* Selection Indicator */}
              <span
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  border: isSelected ? "none" : "2px solid #1A3A72",
                  background: isSelected
                    ? "linear-gradient(135deg, #00C4FF 0%, #0070B8 100%)"
                    : "transparent",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isSelected ? "0 0 10px #00C4FF66" : "none",
                  transition: "all 0.2s",
                }}
              >
                {isSelected && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L4 7L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              {option.label}
            </motion.button>
          );
        })}
      </div>

      {/* Back Button */}
      {onPrev && (
        <motion.button
          onClick={onPrev}
          id="quiz-prev-btn"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            marginTop: "24px",
            background: "none",
            border: "none",
            color: "#7A9CC2",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "inherit",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#F0F6FF")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#7A9CC2")}
        >
          <ChevronLeft size={16} />
          Pergunta anterior
        </motion.button>
      )}
    </div>
  );
}
