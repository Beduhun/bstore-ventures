"use client";

interface QuizProgressProps {
  current: number;
  total: number;
  percent: number;
}

export default function QuizProgress({ current, total, percent }: QuizProgressProps) {
  // SVG Circle calculations
  const radius = 42;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  // Calculate dashoffset. If percent is 0, offset is full circumference (empty)
  // Clamp percent between 0 and 100
  const clampedPercent = Math.max(0, Math.min(100, percent));
  const strokeDashoffset = circumference - (clampedPercent / 100) * circumference;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "32px",
        gap: "12px",
      }}
    >
      <div style={{ position: "relative", width: "100px", height: "100px" }}>
        {/* SVG Circular Progress */}
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="rgba(11, 37, 69, 0.08)"
            strokeWidth={strokeWidth}
          />
          {/* Active indicator circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#00C4FF"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.4s ease-out",
              filter: "drop-shadow(0 0 4px rgba(0, 196, 255, 0.3))",
            }}
          />
        </svg>

        {/* Text inside circle */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: 800, color: "#0B2545" }}>
            {Math.round(clampedPercent)}%
          </span>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#4A6B82", marginTop: "-2px" }}>
            {current}/{total}
          </span>
        </div>
      </div>

      <span
        style={{
          color: "#4A6B82",
          fontSize: "13px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        Progresso do Diagnóstico
      </span>
    </div>
  );
}
