"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const categoryColors: Record<string, string> = {
  mercado: "#00C4FF",
  marketplaces: "#22D3A5",
  ecommerce: "#A78BFA",
  estrategia: "#F59E0B",
};

const categoryLabels: Record<string, string> = {
  mercado: "Mercado",
  marketplaces: "Marketplaces",
  ecommerce: "E-commerce",
  estrategia: "Estratégia",
};

const STATIC_POSTS = [
  {
    slug: "ecommerce-brasil-crescimento",
    title: "O E-commerce Brasileiro Cresceu 87% em 3 Anos. Você Está Dentro ou Fora?",
    description: "Dados mostram que o mercado digital nunca cresceu tão rápido. Veja por que 2024 é o melhor momento para migrar sua loja para o digital.",
    date: "2024-11-15",
    category: "mercado" as const,
    readTime: "4 min",
    content: "",
  },
  {
    slug: "como-sair-da-loja-fisica-para-o-digital",
    title: "Como Migrar sua Loja Física para o Digital em 30 Dias (Sem Perder Clientes)",
    description: "Guia prático para lojistas que querem reduzir custos fixos e criar uma presença digital lucrativa.",
    date: "2024-11-08",
    category: "ecommerce" as const,
    readTime: "6 min",
    content: "",
  },
  {
    slug: "vender-mercado-livre-iniciante",
    title: "Mercado Livre para Iniciantes: Do Cadastro à Primeira Venda em 7 Dias",
    description: "Passo a passo completo para quem nunca vendeu online e quer começar pelo maior marketplace do Brasil.",
    date: "2024-11-01",
    category: "marketplaces" as const,
    readTime: "5 min",
    content: "",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function BlogPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        background: "#0B2545",
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
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "48px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <span style={{
              color: "#00C4FF",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "8px",
            }}>
              Blog & Conteúdo
            </span>
            <h2 style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 900,
              color: "#F0F6FF",
              letterSpacing: "-0.02em",
            }}>
              Aprenda com quem{" "}
              <span className="gradient-text">já fez</span>
            </h2>
          </div>
          <motion.div whileHover={{ x: 4 }}>
            <Link
              href="/blog"
              id="blog-preview-see-all"
              style={{
                color: "#00C4FF",
                fontWeight: 700,
                fontSize: "15px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
              }}
            >
              Ver todos os posts <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Blog Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {STATIC_POSTS.map((post, i) => {
            const color = categoryColors[post.category] ?? "#00C4FF";
            const label = categoryLabels[post.category] ?? post.category;
            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  id={`blog-card-${post.slug}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    className="glow-card"
                    style={{
                      padding: "28px 24px",
                      borderRadius: "20px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                    }}
                  >
                    {/* Category tag */}
                    <span style={{
                      display: "inline-block",
                      background: `${color}18`,
                      border: `1px solid ${color}40`,
                      color: color,
                      padding: "4px 12px",
                      borderRadius: "100px",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      alignSelf: "flex-start",
                    }}>
                      {label}
                    </span>

                    {/* Title */}
                    <h3 style={{
                      color: "#F0F6FF",
                      fontWeight: 800,
                      fontSize: "1.05rem",
                      lineHeight: 1.4,
                      flex: 1,
                    }}>
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p style={{
                      color: "#7A9CC2",
                      fontSize: "14px",
                      lineHeight: 1.65,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                      {post.description}
                    </p>

                    {/* Meta */}
                    <div style={{
                      display: "flex",
                      gap: "16px",
                      paddingTop: "12px",
                      borderTop: "1px solid rgba(0,196,255,0.08)",
                    }}>
                      <span style={{ color: "#7A9CC2", fontSize: "12px", display: "flex", alignItems: "center", gap: "5px" }}>
                        <Calendar size={12} /> {formatDate(post.date)}
                      </span>
                      <span style={{ color: "#7A9CC2", fontSize: "12px", display: "flex", alignItems: "center", gap: "5px" }}>
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
