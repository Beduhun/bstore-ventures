import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogList from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog | B'Store Ventures",
  description: "Artigos e guias práticos sobre e-commerce, marketplaces e estratégias de vendas online.",
  openGraph: {
    title: "Blog | B'Store Ventures",
    description: "Aprenda com quem já fez. Guias práticos sobre e-commerce e vendas online.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main style={{ background: "#FFFFFF", minHeight: "100vh", paddingTop: "72px" }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F7FAFC 100%)",
          padding: "80px 24px 60px",
          borderBottom: "1px solid rgba(11, 37, 69, 0.08)",
          textAlign: "center",
        }}>
          <span style={{
            display: "inline-block",
            color: "#0070B8",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "16px",
            background: "rgba(0,112,184,0.06)",
            padding: "6px 18px",
            borderRadius: "100px",
            border: "1px solid rgba(0,112,184,0.15)",
          }}>
            Blog & Conteúdo
          </span>
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 900,
            color: "#0B2545",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
          }}>
            Aprenda com quem já <span style={{ color: "#0070B8" }}>fez</span>
          </h1>
          <p style={{ color: "#1E3A5F", fontSize: "1.1rem", maxWidth: "520px", margin: "0 auto" }}>
            Guias práticos com dados reais, notícias e minicursos para você acelerar suas vendas no digital.
          </p>
        </div>

        {/* Dynamic Interactive Posts List */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px 80px" }}>
          <BlogList posts={posts} />

          {/* Diagnostics CTA Banner */}
          <div style={{
            marginTop: "64px",
            textAlign: "center",
            background: "#F7FAFC",
            border: "1px solid rgba(11, 37, 69, 0.08)",
            borderRadius: "20px",
            padding: "48px 24px",
          }}>
            <h3 style={{ color: "#0B2545", fontWeight: 800, fontSize: "1.5rem", marginBottom: "12px" }}>
              Quer um plano personalizado? 🚀
            </h3>
            <p style={{ color: "#1E3A5F", fontSize: "15px", marginBottom: "28px" }}>
              Faça nosso diagnóstico gratuito e descubra qual estratégia de e-commerce é ideal para você.
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
