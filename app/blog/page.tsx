import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | B'Store Ventures",
  description: "Artigos e guias práticos sobre e-commerce, marketplaces e migração do físico para o digital.",
  openGraph: {
    title: "Blog | B'Store Ventures",
    description: "Aprenda com quem já fez. Guias práticos sobre e-commerce e vendas online.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website",
  },
};

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

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main style={{ background: "#0B2545", minHeight: "100vh", paddingTop: "72px" }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(180deg, #071A38 0%, #0B2545 100%)",
          padding: "80px 24px 60px",
          borderBottom: "1px solid rgba(0,196,255,0.08)",
          textAlign: "center",
        }}>
          <span style={{
            display: "inline-block",
            color: "#00C4FF",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "16px",
            background: "rgba(0,196,255,0.08)",
            padding: "6px 18px",
            borderRadius: "100px",
            border: "1px solid rgba(0,196,255,0.2)",
          }}>
            Blog & Conteúdo
          </span>
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 900,
            color: "#F0F6FF",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
          }}>
            Aprenda com quem já{" "}
            <span style={{ color: "#00C4FF" }}>fez</span>
          </h1>
          <p style={{ color: "#7A9CC2", fontSize: "1.1rem", maxWidth: "520px", margin: "0 auto" }}>
            Guias práticos, dados de mercado e estratégias para você migrar e crescer no digital.
          </p>
        </div>

        {/* Posts Grid */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px 80px" }}>
          {posts.length === 0 ? (
            <p style={{ color: "#7A9CC2", textAlign: "center", fontSize: "16px" }}>
              Nenhum post encontrado.
            </p>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
            }}>
              {posts.map((post) => {
                const color = categoryColors[post.category] ?? "#00C4FF";
                const label = categoryLabels[post.category] ?? post.category;
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    id={`blog-list-${post.slug}`}
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
                      {/* Category */}
                      <span style={{
                        display: "inline-block",
                        background: `${color}18`,
                        border: `1px solid ${color}40`,
                        color,
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
                      <h2 style={{
                        color: "#F0F6FF",
                        fontWeight: 800,
                        fontSize: "1.05rem",
                        lineHeight: 1.4,
                        flex: 1,
                      }}>
                        {post.title}
                      </h2>

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

                      {/* Footer */}
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "12px",
                        borderTop: "1px solid rgba(0,196,255,0.08)",
                      }}>
                        <div style={{ display: "flex", gap: "14px" }}>
                          <span style={{ color: "#7A9CC2", fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
                            <Calendar size={11} />
                            {new Date(post.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
                          </span>
                          <span style={{ color: "#7A9CC2", fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
                            <Clock size={11} /> {post.readTime}
                          </span>
                        </div>
                        <ArrowRight size={16} style={{ color: "#00C4FF" }} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* CTA */}
          <div style={{
            marginTop: "64px",
            textAlign: "center",
            background: "rgba(0,196,255,0.05)",
            border: "1px solid rgba(0,196,255,0.15)",
            borderRadius: "20px",
            padding: "48px 24px",
          }}>
            <h3 style={{ color: "#F0F6FF", fontWeight: 800, fontSize: "1.5rem", marginBottom: "12px" }}>
              Quer um plano personalizado? 🚀
            </h3>
            <p style={{ color: "#7A9CC2", fontSize: "15px", marginBottom: "28px" }}>
              Faça nosso diagnóstico gratuito e descubra qual estratégia é ideal para você.
            </p>
            <Link
              href="/#quiz"
              id="blog-list-cta"
              className="btn-cyan"
              style={{
                padding: "14px 32px",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: 700,
                textDecoration: "none",
                color: "#0B2545",
                display: "inline-block",
              }}
            >
              Fazer o Diagnóstico Gratuito →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
