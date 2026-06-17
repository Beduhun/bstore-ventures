"use client";

import { motion } from "framer-motion";

interface QuizProgressProps {
  current: number;
  total: number;
  percent: number;
}

export default function QuizProgress({ current, total, percent }: QuizProgressProps) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <span style={{ color: "#4A6B82", fontSize: "13px", fontWeight: 600 }}>
          Pergunta {current} de {total}
        </span>
        <span style={{ color: "#00C4FF", fontSize: "13px", fontWeight: 700 }}>
          {Math.round((current / total) * 100)}%
        </span>
      </div>
      <div className="quiz-progress-bar">
        <motion.div
          className="quiz-progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
