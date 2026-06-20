"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COURSES, CATEGORIES } from "@/lib/courses";

export default function FeaturedCourses() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const getCategoryName = (categorySlug: string) => {
    const cat = CATEGORIES.find((c) => c.slug === categorySlug);
    return cat ? cat.title : categorySlug;
  };

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
      {/* Floating Isometric Shapes */}
      <div className="isometric-shape isometric-shape-cyan" style={{ top: "10%", left: "5%", animationDelay: "1s" }} />
      <div className="isometric-shape isometric-shape-purple" style={{ top: "80%", left: "90%", animationDelay: "3s" }} />
      <div className="isometric-shape isometric-shape-cyan" style={{ top: "45%", left: "87%", animationDelay: "5s", width: "35px", height: "35px" }} />

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
          <p style={{ color: "#1E3A5F", fontSize: "1rem", marginTop: "12px", maxWidth: "600px", margin: "12px auto 0", lineHeight: 1.6 }}>
            Indicações estruturadas para ajudar você a dar o próximo passo de forma segura, do básico às vendas consolidadas, categorizadas e avaliadas.
          </p>
        </motion.div>

        {/* Course Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
          }}
        >
          {COURSES.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.05 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glow-card"
              style={{
                padding: "32px 24px",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                position: "relative",
                overflow: "hidden",
                border: course.tag === "Recomendado" ? "2px solid rgba(0, 196, 255, 0.4)" : "1px solid rgba(11, 37, 69, 0.08)",
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

              {/* Badges Container */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: "8px", flexWrap: "wrap", zIndex: 10 }}>
                {/* Category Badge */}
                <span
                  style={{
                    display: "inline-block",
                    background: "rgba(11, 37, 69, 0.05)",
                    border: "1px solid rgba(11, 37, 69, 0.12)",
                    color: "#0B2545",
                    padding: "3px 10px",
                    borderRadius: "100px",
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                  }}
                >
                  {getCategoryName(course.category)}
                </span>

                {/* Tag Badge */}
                <span
                  style={{
                    display: "inline-block",
                    background: `${course.tagColor}20`,
                    border: `1px solid ${course.tagColor}44`,
                    color: course.tagColor,
                    padding: "3px 10px",
                    borderRadius: "100px",
                    fontSize: "10px",
                    fontWeight: 800,
                    letterSpacing: "0.05em",
                  }}
                >
                  {course.tag}
                </span>
              </div>

              {/* Icon */}
              <motion.div
                className="glow-card-icon"
                style={{ fontSize: "2.3rem", marginTop: "4px", zIndex: 10 }}
                whileHover={{ scale: 1.15, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {course.icon}
              </motion.div>

              {/* Content */}
              <h3 style={{ color: "#0B2545", fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.01em", zIndex: 10 }}>
                {course.title}
              </h3>
              <p style={{ color: "#1E3A5F", fontSize: "13.5px", lineHeight: 1.65, flex: 1, zIndex: 10 }}>
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
                  marginTop: "8px",
                  zIndex: 10,
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
