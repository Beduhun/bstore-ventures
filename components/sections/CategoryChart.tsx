"use client";

import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";

interface CategoryChartProps {
  slug: string;
}

// 1. Marketplaces: Column (Bar) Chart
const MARKETPLACES_DATA = [
  { name: "Mercado Livre", share: 38, fill: "#0070B8" },
  { name: "Shopee", share: 24, fill: "#FF5722" },
  { name: "Amazon Brasil", share: 16, fill: "#FF9900" },
  { name: "Magazine Luiza", share: 12, fill: "#0084FF" },
  { name: "Outros", share: 10, fill: "#4A6B82" },
];

// 2. Venda Sem Estoque: Donut (Pie) Chart
const DROPSHIPPING_DATA = [
  { name: "Tráfego Pago", value: 50, color: "#0070B8", desc: "Testes de produtos e escala de criativos." },
  { name: "Contingência/Reserva", value: 20, color: "#10B981", desc: "Segurança para reembolsos ou novas contas." },
  { name: "Ferramentas & Apps", value: 15, color: "#D97706", desc: "Plataforma, checkout e apps de mineração." },
  { name: "Criativos & Design", value: 15, color: "#8B5CF6", desc: "Imagens, vídeos e identidade visual da loja." },
];

// 3. Loja Virtual: Line Chart
const LOJA_VIRTUAL_DATA = [
  { mes: "Antes (Mês 0)", conversao: 0.35 },
  { mes: "Mês 1 (Básico)", conversao: 0.75 },
  { mes: "Mês 2 (CRO)", conversao: 1.25 },
  { mes: "Mês 3 (Checkout)", conversao: 1.80 },
  { mes: "Mês 4 (Velocidade)", conversao: 2.30 },
  { mes: "Mês 5 (Otimizado)", conversao: 2.85 },
];

// 4. Escalar: CAC vs ROAS Dual Line Chart
const ESCALAR_DATA = [
  { semana: "Sem. 1", CAC: 45.0, ROAS: 1.8 },
  { semana: "Sem. 2", CAC: 39.5, ROAS: 2.3 },
  { semana: "Sem. 3", CAC: 31.2, ROAS: 2.9 },
  { semana: "Sem. 4", CAC: 26.8, ROAS: 3.4 },
  { semana: "Sem. 5", CAC: 22.1, ROAS: 4.1 },
  { semana: "Sem. 6", CAC: 19.8, ROAS: 4.7 },
];

const ChartTooltip = ({ active, payload, label, formatter }: any) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(11, 37, 69, 0.08)",
          borderRadius: "12px",
          padding: "12px 16px",
          boxShadow: "0 10px 25px rgba(11, 37, 69, 0.08)",
          color: "#0B2545",
        }}
      >
        {label && <p style={{ color: "#4A6B82", fontSize: "12.5px", marginBottom: "6px", fontWeight: 600 }}>{label}</p>}
        {payload.map((p: any, idx: number) => (
          <p key={idx} style={{ color: p.color || p.payload?.fill || "#0070B8", fontWeight: 700, fontSize: "14px", display: "flex", alignItems: "center", gap: "8px", margin: "4px 0" }}>
            <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: p.color || p.payload?.fill || "#0070B8" }}></span>
            {p.name}: {formatter ? formatter(p.value) : p.value}
          </p>
        ))}
      </motion.div>
    );
  }
  return null;
};

export default function CategoryChart({ slug }: CategoryChartProps) {
  const chartWrapperStyle = {
    background: "#FFFFFF",
    border: "1px solid rgba(11, 37, 69, 0.08)",
    borderRadius: "24px",
    padding: "36px",
    boxShadow: "0 10px 30px rgba(11, 37, 69, 0.03)",
    marginTop: "40px",
    marginBottom: "40px",
  };

  const renderChart = () => {
    switch (slug) {
      case "marketplaces":
        return (
          <div style={chartWrapperStyle}>
            <h3 style={{ color: "#0B2545", fontWeight: 850, fontSize: "1.25rem", marginBottom: "6px", letterSpacing: "-0.01em" }}>
              📊 Market Share de Marketplaces no Brasil (2024)
            </h3>
            <p style={{ color: "#4A6B82", fontSize: "14px", marginBottom: "32px", lineHeight: 1.5 }}>
              Distribuição estimada do volume de vendas (GMV). O Mercado Livre lidera com Shopee em rápida ascensão. Fonte: Ebit | NielsenIQ.
            </p>
            <div style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MARKETPLACES_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(11, 37, 69, 0.06)" />
                  <XAxis dataKey="name" stroke="#4A6B82" tick={{ fill: "#4A6B82", fontSize: 12, fontWeight: 500 }} />
                  <YAxis stroke="#4A6B82" tick={{ fill: "#4A6B82", fontSize: 12 }} unit="%" />
                  <Tooltip content={<ChartTooltip formatter={(v: number) => `${v}%`} />} cursor={{ fill: "rgba(0, 112, 184, 0.03)" }} />
                  <Bar
                    dataKey="share"
                    name="Market Share"
                    radius={[8, 8, 0, 0]}
                    isAnimationActive={true}
                    animationDuration={1500}
                  >
                    {MARKETPLACES_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case "venda-sem-estoque":
        return (
          <div style={chartWrapperStyle}>
            <h3 style={{ color: "#0B2545", fontWeight: 850, fontSize: "1.25rem", marginBottom: "6px", letterSpacing: "-0.01em" }}>
              🍩 Distribuição Recomendada do Orçamento Inicial
            </h3>
            <p style={{ color: "#4A6B82", fontSize: "14px", marginBottom: "32px", lineHeight: 1.5 }}>
              Planejamento seguro para quem está iniciando no Dropshipping sem estoque físico. Minimiza riscos e maximiza testes de ofertas.
            </p>
            
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: "40px" }}>
              {/* Chart on Left */}
              <div style={{ flex: "1 1 280px", height: "240px", display: "flex", justifyContent: "center" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip content={<ChartTooltip formatter={(v: number) => `${v}%`} />} />
                    <Pie
                      data={DROPSHIPPING_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                      isAnimationActive={true}
                      animationDuration={1500}
                    >
                      {DROPSHIPPING_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Descriptions on Right */}
              <div style={{ flex: "2 1 350px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {DROPSHIPPING_DATA.map((item, index) => (
                  <div key={index} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: item.color,
                      marginTop: "5px",
                      flexShrink: 0
                    }} />
                    <div>
                      <h4 style={{ color: "#0B2545", fontWeight: 700, fontSize: "14.5px", margin: 0 }}>
                        {item.name} — <span style={{ color: item.color }}>{item.value}%</span>
                      </h4>
                      <p style={{ color: "#1E3A5F", fontSize: "13px", margin: "3px 0 0 0", lineHeight: 1.4 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "loja-virtual":
        return (
          <div style={chartWrapperStyle}>
            <h3 style={{ color: "#0B2545", fontWeight: 850, fontSize: "1.25rem", marginBottom: "6px", letterSpacing: "-0.01em" }}>
              📈 Crescimento Médio da Taxa de Conversão pós-CRO
            </h3>
            <p style={{ color: "#4A6B82", fontSize: "14px", marginBottom: "32px", lineHeight: 1.5 }}>
              Média acumulada de e-commerces que aplicaram otimizações na experiência de usuário, checkout transparente e velocidade da página.
            </p>
            <div style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={LOJA_VIRTUAL_DATA} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(11, 37, 69, 0.06)" />
                  <XAxis dataKey="mes" stroke="#4A6B82" tick={{ fill: "#4A6B82", fontSize: 12, fontWeight: 500 }} />
                  <YAxis stroke="#4A6B82" tick={{ fill: "#4A6B82", fontSize: 12 }} unit="%" />
                  <Tooltip content={<ChartTooltip formatter={(v: number) => `${v}%`} />} />
                  <Line
                    type="monotone"
                    dataKey="conversao"
                    name="Taxa de Conversão"
                    stroke="#0070B8"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#0070B8", strokeWidth: 0 }}
                    activeDot={{ r: 7, fill: "#FFFFFF", stroke: "#0070B8", strokeWidth: 2 }}
                    isAnimationActive={true}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case "escalar":
        return (
          <div style={chartWrapperStyle}>
            <h3 style={{ color: "#0B2545", fontWeight: 850, fontSize: "1.25rem", marginBottom: "6px", letterSpacing: "-0.01em" }}>
              ⚡ Escala do Funil: Redução de CAC vs. Aumento de ROAS
            </h3>
            <p style={{ color: "#4A6B82", fontSize: "14px", marginBottom: "32px", lineHeight: 1.5 }}>
              Demonstração real do impacto da otimização de anúncios em escala: à medida que a inteligência de pixel atua, o custo por venda (CAC) cai e o retorno sobre anúncio (ROAS) cresce.
            </p>
            <div style={{ height: "320px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ESCALAR_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(11, 37, 69, 0.06)" />
                  <XAxis dataKey="semana" stroke="#4A6B82" tick={{ fill: "#4A6B82", fontSize: 12, fontWeight: 500 }} />
                  
                  {/* Left YAxis - CAC in R$ */}
                  <YAxis yAxisId="left" stroke="#D97706" tick={{ fill: "#D97706", fontSize: 12 }} label={{ value: "CAC (R$)", angle: -90, position: "insideLeft", fill: "#D97706", offset: 10, style: { textAnchor: "middle", fontSize: "11px", fontWeight: 600 } }} />
                  
                  {/* Right YAxis - ROAS */}
                  <YAxis yAxisId="right" orientation="right" stroke="#10B981" tick={{ fill: "#10B981", fontSize: 12 }} label={{ value: "ROAS (x)", angle: 90, position: "insideRight", fill: "#10B981", offset: 10, style: { textAnchor: "middle", fontSize: "11px", fontWeight: 600 } }} />
                  
                  <Tooltip content={<ChartTooltip />} />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: "12.5px" }} />
                  
                  {/* Line 1: CAC */}
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="CAC"
                    name="CAC (Custo de Aquisição)"
                    stroke="#D97706"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#D97706", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#FFFFFF", stroke: "#D97706", strokeWidth: 2 }}
                    isAnimationActive={true}
                    animationDuration={1500}
                  />

                  {/* Line 2: ROAS */}
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="ROAS"
                    name="ROAS (Retorno em Anúncios)"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#10B981", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#FFFFFF", stroke: "#10B981", strokeWidth: 2 }}
                    isAnimationActive={true}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {renderChart()}
    </motion.div>
  );
}
