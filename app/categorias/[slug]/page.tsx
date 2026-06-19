import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CATEGORIES, COURSES } from "@/lib/courses";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

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
      <main style={{ background: "#0B2545", minHeight: "100vh", paddingTop: "72px" }}>
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(180deg, #071A38 0%, #0B2545 100%)",
            padding: "80px 24px 60px",
            borderBottom: "1px solid rgba(0, 196, 255, 0.08)",
          }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            {/* Back Button */}
            <Link
              href="/#categorias"
              id="category-back-link"
              style={{
                color: "#00C4FF",
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
            <span
              style={{
                display: "inline-block",
                color: "#00C4FF",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "12px",
                background: "rgba(0, 196, 255, 0.08)",
                padding: "4px 14px",
                borderRadius: "100px",
                border: "1px solid rgba(0, 196, 255, 0.15)",
              }}
            >
              Direcionamento Focado
            </span>
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 900,
                color: "#F0F6FF",
                letterSpacing: "-0.02em",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span>{category.icon}</span> {category.title}
            </h1>
            <p style={{ color: "#9EBDDF", fontSize: "1.1rem", maxWidth: "650px", lineHeight: 1.6 }}>
              {category.description}
            </p>
          </div>
        </div>

        {/* Courses List */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px 80px" }}>
          <h2
            style={{
              color: "#F0F6FF",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "32px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
              paddingBottom: "12px",
            }}
          >
            Cursos Disponíveis nesta Categoria
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
                style={{
                  background: "rgba(18, 45, 91, 0.4)",
                  border: course.tag === "Recomendado" ? "2px solid #00C4FF" : "1px solid rgba(0, 196, 255, 0.15)",
                  borderRadius: "20px",
                  padding: "36px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                  position: "relative",
                  boxShadow: "0 10px 35px rgba(7, 26, 56, 0.2)",
                }}
              >
                {/* Tag */}
                <span
                  style={{
                    position: "absolute",
                    top: "24px",
                    right: "24px",
                    background: `${course.tagColor}20`,
                    border: `1px solid ${course.tagColor}44`,
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
                <div style={{ fontSize: "2.8rem" }}>{course.icon}</div>

                {/* Content */}
                <div>
                  <h3
                    style={{
                      color: "#F0F6FF",
                      fontWeight: 800,
                      fontSize: "1.3rem",
                      marginBottom: "10px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {course.title}
                  </h3>
                  <p style={{ color: "#9EBDDF", fontSize: "14px", lineHeight: 1.7 }}>
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
              background: "linear-gradient(135deg, rgba(0, 196, 255, 0.05) 0%, rgba(18, 45, 91, 0.6) 100%)",
              border: "1px solid rgba(0, 196, 255, 0.2)",
              borderRadius: "24px",
              padding: "48px 32px",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "#F0F6FF", fontWeight: 800, fontSize: "1.6rem", marginBottom: "12px", letterSpacing: "-0.01em" }}>
              Ainda em dúvida de qual escolher? 🤔
            </h3>
            <p style={{ color: "#9EBDDF", fontSize: "15px", marginBottom: "28px", maxWidth: "520px", margin: "0 auto 28px", lineHeight: 1.6 }}>
              Faça nosso diagnóstico de 2 minutos e receba o plano de ação ideal e personalizado para o seu perfil e momento.
            </p>
            <Link
              href="/#quiz"
              id="category-cta-quiz"
              className="btn-cyan pulse-glow"
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
