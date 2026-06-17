"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { MARKET_STATS as stats } from "@/lib/stats";

const chartData = [
  { ano: "2019", valor: 61 },
  { ano: "2020", valor: 87 },
  { ano: "2021", valor: 150 },
  { ano: "2022", valor: 169 },
  { ano: "2023", valor: 186 },
  { ano: "2024", valor: 204 },
];

function AnimatedCounter({ target, suffix, prefix }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = 0;
    const duration = 1800;
    const startTime = performance.now();
    const isFloat = target % 1 !== 0;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;
      setCount(isFloat ? Math.round(current * 10) / 10 : Math.floor(current));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span ref={ref} className="stat-number">
      {prefix}{count}{suffix}
    </span>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          background: "rgba(11, 37, 69, 0.95)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(0, 196, 255, 0.3)",
          borderRadius: "12px",
          padding: "14px 18px",
          color: "#F0F6FF",
          boxShadow: "0 10px 30px rgba(0, 196, 255, 0.15)",
        }}
      >
        <p style={{ color: "#7A9CC2", fontSize: "13px", marginBottom: "4px" }}>{label}</p>
        <p style={{ color: "#00C4FF", fontWeight: 700, fontSize: "18px" }}>
          R$ {payload[0].value} bilhões
        </p>
      </motion.div>
    );
  }
  return null;
};

export default function PainSection() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const chartRef = useRef(null);
  const chartInView = useInView(chartRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#F7FAFC",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.02, 0.04, 0.02] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "20%",
          left: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,196,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 900,
              color: "#0B2545",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            O mercado não vai te{" "}
            <span className="gradient-text">esperar.</span>
          </h2>
          <p style={{ color: "#1E3A5F", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
            O aluguel não espera o fim do mês e o movimento de rua não é mais o mesmo. Cada dia de porta aberta custa caro, e ficar de braços cruzados esperando a rua encher não é mais uma opção.
          </p>
        </motion.div>

        {/* Stat Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "64px",
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glow-card"
              style={{
                padding: "28px 24px",
                borderRadius: "16px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "2.8rem",
                  fontWeight: 900,
                  color: "#0B2545",
                  lineHeight: 1,
                  marginBottom: "10px",
                }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <div style={{ color: "#1E3A5F", fontWeight: 600, fontSize: "15px", marginBottom: "6px" }}>
                {stat.label}
              </div>
              <div style={{ color: "#4A6B82", fontSize: "12px" }}>Fonte: {stat.source}</div>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          ref={chartRef}
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          animate={chartInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="glow-card"
          style={{ borderRadius: "20px", padding: "36px 24px 24px" }}
        >
          <h3 style={{ color: "#0B2545", fontWeight: 800, fontSize: "1.1rem", marginBottom: "8px" }}>
            Crescimento do E-commerce Brasileiro
          </h3>
          <p style={{ color: "#4A6B82", fontSize: "13px", marginBottom: "28px" }}>
            Volume em R$ bilhões — Fonte: ABComm / Neotrust
          </p>
          {chartInView && (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C4FF" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#00C4FF" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,37,69,0.08)" />
                <XAxis dataKey="ano" stroke="#4A6B82" tick={{ fill: "#4A6B82", fontSize: 13 }} />
                <YAxis stroke="#4A6B82" tick={{ fill: "#4A6B82", fontSize: 13 }} unit="bi" />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(0,196,255,0.2)", strokeWidth: 1.5 }} />
                <Area
                  type="monotone"
                  dataKey="valor"
                  stroke="#00C4FF"
                  strokeWidth={3.5}
                  fillOpacity={1}
                  fill="url(#chartGrad)"
                  dot={{ r: 5, fill: "#00C4FF", strokeWidth: 0 }}
                  activeDot={{ r: 8, fill: "#00C4FF", stroke: "#FFFFFF", strokeWidth: 2 }}
                  isAnimationActive={true}
                  animationDuration={2000}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ textAlign: "center", marginTop: "52px" }}
        >
          <p style={{ color: "#0B2545", fontSize: "1.3rem", fontWeight: 700, marginBottom: "20px" }}>
            Você ainda quer ficar fora dessa onda? 🌊
          </p>
          <motion.a
            href={`${basePath}/#quiz`}
            id="pain-cta"
            className="btn-cyan pulse-glow"
            whileHover={{ scale: 1.03, y: -2 }}
            style={{
              padding: "14px 32px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Descobrir meu ponto de entrada →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
