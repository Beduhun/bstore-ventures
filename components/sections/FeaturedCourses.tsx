"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const featuredCourses = [
  {
    title: "Mercado Livre do Zero",
    description: "Do cadastro à primeira venda em 7 dias. O maior marketplace do Brasil ao seu alcance.",
    tag: "Mais Popular",
    tagColor: "#0070B8",
    href: "#LINK_AFILIADO_ML",
    icon: "🛍️",
    id: "course-ml",
  },
  {
    title: "E-commerce Completo",
    description: "Crie sua loja virtual do zero e construa uma marca com autoridade.",
    tag: "Recomendado",
    tagColor: "#10B981",
    href: "#LINK_AFILIADO_ECOMMERCE",
    icon: "🌐",
    id: "course-ecommerce",
  },
  {
    title: "Amazon FBA Brasil",
    description: "Venda em dólar morando no Brasil. Faturamento em moeda forte.",
    tag: "Alto Potencial",
    tagColor: "#D97706",
    href: "#LINK_AFILIADO_AMAZON",
    icon: "💵",
    id: "course-amazon",
  },
  {
    title: "Shopee para Iniciantes",
    description: "Do zero ao primeiro pedido. O marketplace que mais cresce no Brasil.",
    tag: "Iniciante",
    tagColor: "#7C3AED",
    href: "#LINK_AFILIADO_SHOPEE",
    icon: "📦",
    id: "course-shopee",
  },
];

export default function FeaturedCourses() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="cursos"
      ref={ref}
      style={{
        background: "#FFFFFF",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.01, 0.03, 0.01] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
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
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <span style={{
            color: "#0070B8",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "12px",
          }}>
            Cursos em Destaque
          </span>
          <h2 style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 900,
            color: "#0B2545",
            letterSpacing: "-0.02em",
          }}>
            Escolhidos pelos nossos{" "}
            <span className="gradient-text">especialistas</span>
          </h2>
          <p style={{ color: "#1E3A5F", fontSize: "1rem", marginTop: "12px", maxWidth: "480px", margin: "12px auto 0" }}>
            Cursos validados com resultados reais de alunos que venderam nos primeiros 30 dias.
          </p>
        </motion.div>

        {/* Course Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {featuredCourses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glow-card"
              style={{
                padding: "32px 24px",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle corner glow */}
              <div style={{
                position: "absolute",
                top: "-30px",
                right: "-30px",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${course.tagColor}15 0%, transparent 70%)`,
                pointerEvents: "none",
              }} />

              {/* Tag */}
              <span
                style={{
                  display: "inline-block",
                  background: `${course.tagColor}20`,
                  border: `1px solid ${course.tagColor}44`,
                  color: course.tagColor,
                  padding: "4px 12px",
                  borderRadius: "100px",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  alignSelf: "flex-start",
                }}
              >
                {course.tag}
              </span>

              {/* Icon */}
              <motion.div
                style={{ fontSize: "2.5rem" }}
                whileHover={{ scale: 1.15, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {course.icon}
              </motion.div>

              {/* Content */}
              <h3 style={{ color: "#0B2545", fontWeight: 800, fontSize: "1.15rem" }}>
                {course.title}
              </h3>
              <p style={{ color: "#1E3A5F", fontSize: "14px", lineHeight: 1.65, flex: 1 }}>
                {course.description}
              </p>

              {/* CTA */}
              <motion.a
                href={course.href}
                id={course.id}
                className="btn-cyan"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: "12px 20px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 700,
                  textDecoration: "none",
                  color: "#0B2545",
                  textAlign: "center",
                  display: "block",
                  marginTop: "4px",
                }}
              >
                Acessar Curso →
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
