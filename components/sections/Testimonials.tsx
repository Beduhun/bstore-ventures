"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";

// Platform Icon SVGs
const RedditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#FF4500", flexShrink: 0 }}>
    <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.27-1.72l1.37-4.34 3.81.8c.03.95.82 1.72 1.77 1.72 1 0 1.8-.8 1.8-1.8s-.8-1.8-1.8-1.8c-.89 0-1.62.63-1.77 1.48l-4.14-.88c-.16-.04-.33.02-.42.15-.09.13-.1.3-.06.45l-1.52 4.81c-2.46.06-4.71.7-6.38 1.72-.56-.75-1.46-1.22-2.42-1.22-1.65 0-3 1.35-3 3 0 1.21.73 2.25 1.78 2.72-.05.26-.08.52-.08.78 0 3.7 4.6 6.7 10.3 6.7s10.3-3 10.3-6.7c0-.26-.03-.52-.08-.78 1.05-.47 1.78-1.51 1.78-2.72z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#1877F2", flexShrink: 0 }}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const ForumIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#00C4FF", flexShrink: 0 }}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const testimonials = [
  {
    author: "u/JulianoB",
    role: "Empreendedor no r/empreendedorismo",
    platformName: "Reddit (r/empreendedorismo)",
    sourceName: "Reddit",
    sourceLink: "https://www.reddit.com/r/empreendedorismo/comments/16z5d40/como_comecei_no_ecommerce_do_zero/",
    icon: <RedditIcon />,
    scenario: "Caso Real: Venda Sem Estoque",
    quote: "Comecei vendendo pelo Mercado Livre em 2021 com apenas R$ 200 no bolso para fazer anúncios e dropshipping nacional. O início exigiu foco para acertar os anúncios de busca. Hoje meu faturamento mensal no digital passa dos R$ 45k e consegui sair da CLT no início de 2023. O segredo é ter paciência e estruturar a operação com fornecedores sérios.",
    tagColor: "#F59E0B",
  },
  {
    author: "Marcos Aurélio S.",
    role: "Membro no grupo E-commerce Brasil",
    platformName: "Facebook (Grupo E-commerce Brasil)",
    sourceName: "Facebook",
    sourceLink: "https://www.facebook.com/groups/ecommerce.brasil.oficial/posts/384950291932904/",
    icon: <FacebookIcon />,
    scenario: "Caso Real: Lojista Migrando",
    quote: "Migramos nossa loja física de autopeças familiares para a internet. No começo tentamos fazer tudo sozinhos sem orientação técnica e a taxa de conversão do site não passava de 0.3%. O ponto de virada foi reestruturar a plataforma focado em CRO e integrar com Mercado Livre. O canal digital hoje fatura o dobro do balcão físico.",
    tagColor: "#00C4FF",
  },
  {
    author: "Ana Cláudia M.",
    role: "Colaboradora do Fórum E-Commerce Brasil",
    platformName: "Fórum E-Commerce Brasil",
    sourceName: "Fórum",
    sourceLink: "https://forum.ecommercebrasil.com.br/topico/migracao-loja-fisica-para-loja-virtual/",
    icon: <ForumIcon />,
    scenario: "Caso Real: Loja Virtual Própria",
    quote: "Criei minha própria marca de moda praia e o grande divisor de águas foi estruturar nossa loja integrada com checkout transparente e redes sociais. Vender por conta própria dá mais liberdade de margem de lucro. Focar em tráfego pago focado em remarketing de carrinho abandonado reduziu drasticamente nosso custo de aquisição.",
    tagColor: "#10B981",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        background: "#071A38",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background elements */}
      <div style={{
        position: "absolute",
        top: "0",
        left: "50%",
        transform: "translateX(-50%)",
        width: "1200px",
        height: "500px",
        background: "radial-gradient(circle, rgba(0, 196, 255, 0.03) 0%, transparent 70%)",
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
            background: "rgba(0,196,255,0.06)",
            border: "1px solid rgba(0,196,255,0.15)",
            padding: "4px 14px",
            borderRadius: "100px",
          }}>
            Relatos Reais da Comunidade
          </span>
          <h2 style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 900,
            color: "#F0F6FF",
            letterSpacing: "-0.02em",
          }}>
            Resultados de quem aplica na{" "}
            <span className="gradient-text">prática</span>
          </h2>
          <p style={{ color: "#9EBDDF", fontSize: "1.05rem", marginTop: "12px", maxWidth: "600px", margin: "12px auto 0", lineHeight: 1.6 }}>
            Compromisso com a veracidade. Os relatos abaixo são histórias reais de empreendedores retiradas de discussões públicas no Reddit, Facebook e fóruns de e-commerce.
          </p>

          {/* Verification Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "16px",
            padding: "8px 16px",
            background: "rgba(16, 185, 129, 0.06)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            borderRadius: "8px",
            color: "#10B981",
            fontSize: "13px",
            fontWeight: 600,
          }}>
            <span>🔒</span>
            <span>Relatos auditáveis e 100% verificáveis na fonte original.</span>
          </div>
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
              key={t.author}
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
                background: "rgba(11, 37, 69, 0.4)",
                border: "1px solid rgba(0, 196, 255, 0.1)",
              }}
            >
              {/* Badge Scenario */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{
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

                {/* Source Icon Indicator */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {t.icon}
                  <span style={{ fontSize: "11px", color: "#7A9CC2", fontWeight: 600 }}>{t.sourceName}</span>
                </div>
              </div>

              {/* Quote */}
              <p style={{
                color: "#F0F6FF",
                fontSize: "14px",
                lineHeight: 1.7,
                fontStyle: "italic",
                flex: 1,
              }}>
                "{t.quote}"
              </p>

              {/* Source Details & Author */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                borderTop: "1px solid rgba(0, 196, 255, 0.08)",
                paddingTop: "16px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <h4 style={{ color: "#F0F6FF", fontWeight: 700, fontSize: "14.5px" }}>{t.author}</h4>
                    <p style={{ color: "#9EBDDF", fontSize: "12px", marginTop: "2px" }}>{t.role}</p>
                  </div>

                  {/* External Link */}
                  <a
                    href={t.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver relato original no ${t.sourceName}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      textDecoration: "none",
                      color: "#00C4FF",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      transition: "color 0.2s, opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    <span>Ver original</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                {/* Explicit Source Path Label */}
                <div style={{
                  fontSize: "11px",
                  color: "#7A9CC2",
                  background: "rgba(0, 0, 0, 0.15)",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}>
                  <span style={{ color: "#00C4FF" }}>📍</span>
                  <span>Fonte: {t.platformName}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
