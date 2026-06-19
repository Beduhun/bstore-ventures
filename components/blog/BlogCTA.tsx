"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface BlogCTAProps {
  position?: "middle" | "end";
  category?: "loja-virtual" | "marketplaces" | "venda-sem-estoque" | "escalar";
}

const ctaContent = {
  "loja-virtual": {
    title: "Quer construir sua marca com loja virtual própria?",
    description: "Aprenda a estruturar seu site de vendas do zero e atrair clientes sem depender de intermediários.",
    btnText: "Ver Cursos de Loja Virtual →",
    href: "/categorias/loja-virtual",
  },
  marketplaces: {
    title: "Quer dominar as vendas em Marketplaces?",
    description: "Aprenda as estratégias de posicionamento e anúncios internos para Shopee, Mercado Livre e TikTok Shop.",
    btnText: "Ver Cursos de Marketplaces →",
    href: "/categorias/marketplaces",
  },
  "venda-sem-estoque": {
    title: "Quer construir sua marca e vender online sem estoque?",
    description: "Conheça os segredos do dropshipping nacional e da operação internacional no Amazon FBA.",
    btnText: "Ver Cursos Sem Estoque →",
    href: "/categorias/venda-sem-estoque",
  },
  escalar: {
    title: "Pronto para escalar o faturamento da sua operação?",
    description: "Domine automações avançadas e estratégias de tráfego pago para alavancar seu ROI e reduzir o CAC.",
    btnText: "Ver Cursos de Escala →",
    href: "/categorias/escalar",
  },
};

export default function BlogCTA({ position = "end", category }: BlogCTAProps) {
  // If we have a category, show category-specific CTA, otherwise fallback to general quiz CTA
  const content = category ? ctaContent[category] : null;

  if (content) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          background: "linear-gradient(135deg, rgba(0,196,255,0.08) 0%, rgba(18,45,91,0.9) 100%)",
          border: "2px solid rgba(0,196,255,0.25)",
          borderRadius: "20px",
          padding: "36px 32px",
          margin: "40px 0",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
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

        <div style={{ fontSize: "2.2rem", marginBottom: "12px" }}>🚀</div>
        <h3 style={{
          color: "#F0F6FF",
          fontWeight: 800,
          fontSize: "1.3rem",
          marginBottom: "12px",
          letterSpacing: "-0.01em",
        }}>
          {content.title}
        </h3>
        <p style={{ color: "#7A9CC2", fontSize: "14px", marginBottom: "24px", maxWidth: "450px", margin: "0 auto 24px", lineHeight: 1.6 }}>
          {content.description}
        </p>
        <Link
          href={content.href}
          id={`blog-cta-${category}-${position}`}
          className="btn-cyan pulse-glow"
          style={{
            padding: "14px 30px",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: 700,
            textDecoration: "none",
            color: "#0B2545",
            display: "inline-block",
          }}
        >
          {content.btnText}
        </Link>
      </motion.div>
    );
  }

  // Fallback Quiz CTA
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
      <p style={{ color: "#7A9CC2", fontSize: "14px", marginBottom: "24px", maxWidth: "400px", margin: "0 auto 24px", lineHeight: 1.6 }}>
        Responda a 7 perguntas rápidas e descubra qual curso de e-commerce e estratégia de vendas é ideal para o seu momento e orçamento.
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
