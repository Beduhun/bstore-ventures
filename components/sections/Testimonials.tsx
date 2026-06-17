"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    name: "Carlos S., 48 anos",
    role: "Proprietário de Papelaria Física",
    avatar: "🏪",
    scenario: "Persona: Lojista Migrando",
    quote: "O aluguel da minha loja física de 12 anos continuava subindo enquanto o movimento na rua caía. O diagnóstico me direcionou para a transição segura para o Mercado Livre. Hoje o digital representa 40% do meu faturamento e o aluguel já não me tira o sono.",
    tagColor: "#00C4FF",
  },
  {
    name: "Juliana M., 27 anos",
    role: "Iniciante no Digital (ex-CLT)",
    avatar: "🚀",
    scenario: "Persona: Começando do Zero",
    quote: "Eu tinha muito medo de cair em promessas fáceis e gastar o pouco que tinha. O plano me direcionou para a Shopee com baixo investimento inicial. Comecei com menos de R$100 e fiz minhas primeiras vendas logo na segunda semana. Passo a passo muito claro.",
    tagColor: "#10B981",
  },
  {
    name: "Rafael K., 34 anos",
    role: "Empreendedor de E-commerce",
    avatar: "📈",
    scenario: "Persona: Digital Sem ROI",
    quote: "Eu já tinha minha loja virtual própria, mas gastava em tráfego pago e a conversão não passava de 0.3%. Com a recomendação dos cursos de CRO, consegui estruturar melhor o funil e corrigir os gargalos. Minha conversão hoje está saudável.",
    tagColor: "#7C3AED",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        background: "#F7FAFC",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
            color: "#0070B8",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "12px",
            background: "rgba(0,112,184,0.06)",
            padding: "4px 14px",
            borderRadius: "100px",
          }}>
            Casos de Sucesso Ilustrativos
          </span>
          <h2 style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 900,
            color: "#0B2545",
            letterSpacing: "-0.02em",
          }}>
            Direcionamento focado em{" "}
            <span className="gradient-text">resultados reais</span>
          </h2>
          <p style={{ color: "#1E3A5F", fontSize: "1rem", marginTop: "12px", maxWidth: "520px", margin: "12px auto 0", lineHeight: 1.6 }}>
            Veja exemplos de como o diagnóstico personalizado ajuda lojistas e iniciantes a encontrarem o melhor caminho digital para seu momento.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glow-card"
              style={{
                padding: "36px 28px",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                position: "relative",
              }}
            >
              {/* Badge Scenario */}
              <span style={{
                alignSelf: "flex-start",
                fontSize: "11px",
                fontWeight: 700,
                color: t.tagColor,
                background: `${t.tagColor}15`,
                padding: "4px 10px",
                borderRadius: "100px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}>
                {t.scenario}
              </span>

              {/* Quote */}
              <p style={{
                color: "#1E3A5F",
                fontSize: "14.5px",
                lineHeight: 1.7,
                fontStyle: "italic",
                flex: 1,
              }}>
                "{t.quote}"
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", borderTop: "1px solid rgba(11,37,69,0.06)", paddingTop: "16px" }}>
                <div style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: `${t.tagColor}10`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  border: `1px solid ${t.tagColor}33`,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <h4 style={{ color: "#0B2545", fontWeight: 700, fontSize: "14.5px" }}>{t.name}</h4>
                  <p style={{ color: "#4A6B82", fontSize: "12.5px", marginTop: "2px" }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
