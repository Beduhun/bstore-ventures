import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CATEGORIES, COURSES } from "@/lib/courses";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import CategoryChart from "@/components/sections/CategoryChart";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.title} | Cursos | B'Store Ventures`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryCourses = COURSES.filter((c) => c.category === slug);

  return (
    <>
      <Navbar />
      <main style={{ background: "#FFFFFF", minHeight: "100vh", paddingTop: "72px" }}>
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #F7FAFC 100%)",
            padding: "80px 24px 60px",
            borderBottom: "1px solid rgba(11, 37, 69, 0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Floating Isometric Shapes */}
          <div className="isometric-shape isometric-shape-cyan" style={{ top: "15%", left: "80%", animationDelay: "0s" }} />
          <div className="isometric-shape isometric-shape-purple" style={{ top: "60%", left: "10%", animationDelay: "2s" }} />
          <div className="isometric-shape isometric-shape-cyan" style={{ top: "70%", left: "85%", animationDelay: "4s", width: "30px", height: "30px" }} />

          <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            {/* Back Button */}
            <Link
              href="/#categorias"
              id="category-back-link"
              style={{
                color: "#0070B8",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "24px",
                transition: "color 0.2s",
              }}
            >
              <ArrowLeft size={16} />
              Voltar para Categorias
            </Link>

            {/* Title / Description */}
            <div>
              <span
                style={{
                  display: "inline-block",
                  color: "#0070B8",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                  background: "rgba(0, 112, 184, 0.06)",
                  padding: "6px 18px",
                  borderRadius: "100px",
                  border: "1px solid rgba(0, 112, 184, 0.15)",
                }}
              >
                Direcionamento Focado
              </span>
              <h1
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontWeight: 900,
                  color: "#0B2545",
                  letterSpacing: "-0.02em",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span>{category.icon}</span> {category.title}
              </h1>
              <p style={{ color: "#1E3A5F", fontSize: "1.1rem", maxWidth: "650px", lineHeight: 1.6 }}>
                {category.description}
              </p>
            </div>
          </div>
        </div>

        {/* Courses List Container */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 80px" }}>
          
          {/* Custom Interactive animated chart for this specific category */}
          <CategoryChart slug={slug} />

          <h2
            style={{
              color: "#0B2545",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginTop: "52px",
              marginBottom: "32px",
              borderBottom: "1px solid rgba(11, 37, 69, 0.08)",
              paddingBottom: "12px",
            }}
          >
            Cursos Recomendados nesta Categoria
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {categoryCourses.map((course) => (
              <div
                key={course.id}
                className="glow-card"
                style={{
                  border: course.tag === "Recomendado" ? "2px solid #0070B8" : "1px solid rgba(11, 37, 69, 0.08)",
                  borderRadius: "20px",
                  padding: "36px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                  position: "relative",
                }}
              >
                {/* Tag */}
                <span
                  style={{
                    position: "absolute",
                    top: "24px",
                    right: "24px",
                    background: `${course.tagColor}15`,
                    border: `1px solid ${course.tagColor}33`,
                    color: course.tagColor,
                    padding: "4px 12px",
                    borderRadius: "100px",
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "0.05em",
                  }}
                >
                  {course.tag}
                </span>

                {/* Icon */}
                <div className="glow-card-icon" style={{ fontSize: "2.8rem" }}>{course.icon}</div>

                {/* Content */}
                <div>
                  <h3
                    style={{
                      color: "#0B2545",
                      fontWeight: 800,
                      fontSize: "1.3rem",
                      marginBottom: "10px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {course.title}
                  </h3>
                  <p style={{ color: "#1E3A5F", fontSize: "14.5px", lineHeight: 1.7 }}>
                    {course.description}
                  </p>
                </div>

                {/* CTA */}
                <div style={{ marginTop: "auto", paddingTop: "12px" }}>
                  <a
                    href={course.href}
                    id={course.id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cyan"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "14px 24px",
                      borderRadius: "10px",
                      fontSize: "15px",
                      fontWeight: 700,
                      textDecoration: "none",
                      color: "#0B2545",
                      transition: "all 0.2s",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    Acessar Curso <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Diagnostics CTA */}
          <div
            style={{
              marginTop: "80px",
              background: "#F7FAFC",
              border: "1px solid rgba(11, 37, 69, 0.08)",
              borderRadius: "24px",
              padding: "48px 32px",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "#0B2545", fontWeight: 800, fontSize: "1.6rem", marginBottom: "12px", letterSpacing: "-0.01em" }}>
              Ainda em dúvida de qual escolher? 🤔
            </h3>
            <p style={{ color: "#1E3A5F", fontSize: "15px", marginBottom: "28px", maxWidth: "520px", margin: "0 auto 28px", lineHeight: 1.6 }}>
              Faça nosso diagnóstico de 2 minutos e receba o plano de ação ideal e personalizado para o seu perfil e momento.
            </p>
            <Link
              href="/#quiz"
              id="category-cta-quiz"
              className="btn-cyan"
              style={{
                padding: "16px 36px",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: 700,
                textDecoration: "none",
                color: "#0B2545",
                display: "inline-block",
              }}
            >
              Fazer Diagnóstico Gratuito →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
