"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const categories = [
  {
    icon: "🛒",
    title: "Marketplaces",
    description: "Venda onde milhões já compram. Mercado Livre, Shopee, Amazon e mais.",
    cta: "Ver cursos →",
    href: "#LINK_MARKETPLACE",
    id: "cat-marketplace",
  },
  {
    icon: "🌐",
    title: "Loja Virtual Própria",
    description: "Construa seu próprio canal de vendas com total controle da marca.",
    cta: "Ver cursos →",
    href: "#LINK_LOJA_VIRTUAL",
    id: "cat-loja-virtual",
  },
  {
    icon: "🔄",
    title: "Migração Física → Digital",
    description: "Do balcão para o digital. Reduza custos fixos e escale sem limites.",
    cta: "Ver cursos →",
    href: "#LINK_MIGRACAO",
    id: "cat-migracao",
  },
  {
    icon: "📈",
    title: "Escalar E-commerce",
    description: "Já vende online? Aumente seu ROI com tráfego pago e automação.",
    cta: "Ver cursos →",
    href: "#LINK_ESCALAR",
    id: "cat-escalar",
  },
];

export default function CourseCategories() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="categorias"
      ref={ref}
      style={{
        background: "#0B2545",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        bottom: "-20%",
        right: "-10%",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,196,255,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <span style={{
            display: "inline-block",
            color: "#00C4FF",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}>
            Escolha seu caminho
          </span>
          <h2 style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 900,
            color: "#F0F6FF",
            letterSpacing: "-0.02em",
          }}>
            Qual é o seu perfil de{" "}
            <span className="gradient-text">empreendedor?</span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glow-card"
              style={{
                padding: "36px 28px",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <motion.div
                style={{ fontSize: "2.5rem" }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {cat.icon}
              </motion.div>
              <h3 style={{
                color: "#F0F6FF",
                fontWeight: 800,
                fontSize: "1.2rem",
                letterSpacing: "-0.01em",
              }}>
                {cat.title}
              </h3>
              <p style={{ color: "#7A9CC2", fontSize: "14px", lineHeight: 1.7, flex: 1 }}>
                {cat.description}
              </p>
              <motion.a
                href={cat.href}
                id={cat.id}
                whileHover={{ x: 4 }}
                style={{
                  color: "#00C4FF",
                  fontWeight: 700,
                  fontSize: "14px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  transition: "gap 0.3s ease",
                }}
              >
                {cat.cta}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
