"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface BlogListProps {
  posts: BlogPost[];
}

const CATEGORY_TABS = [
  { slug: "all", label: "Todos os Artigos" },
  { slug: "loja-virtual", label: "Loja Virtual Própria" },
  { slug: "marketplaces", label: "Marketplaces" },
  { slug: "venda-sem-estoque", label: "Venda Sem Estoque" },
  { slug: "escalar", label: "Escalar E-commerce" },
];
const categoryColors: Record<string, string> = {
  "loja-virtual": "#0070B8",
  marketplaces: "#10B981",
  "venda-sem-estoque": "#D97706",
  escalar: "#8B5CF6",
};

const categoryLabels: Record<string, string> = {
  "loja-virtual": "Loja Virtual",
  marketplaces: "Marketplaces",
  "venda-sem-estoque": "Venda Sem Estoque",
  escalar: "Escalar E-commerce",
};

export default function BlogList({ posts }: BlogListProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts = posts.filter(
    (post) => activeCategory === "all" || post.category === activeCategory
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* Category Tabs / Filters */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
          borderBottom: "1px solid rgba(11, 37, 69, 0.08)",
          paddingBottom: "20px",
        }}
      >
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeCategory === tab.slug;
          return (
            <button
              key={tab.slug}
              onClick={() => setActiveCategory(tab.slug)}
              style={{
                background: isActive ? "#0070B8" : "#F7FAFC",
                border: isActive ? "1px solid #0070B8" : "1px solid rgba(11, 37, 69, 0.12)",
                color: isActive ? "#FFFFFF" : "#1E3A5F",
                padding: "8px 18px",
                borderRadius: "100px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "#0070B8";
                  e.currentTarget.style.background = "rgba(0, 112, 184, 0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "#1E3A5F";
                  e.currentTarget.style.background = "#F7FAFC";
                }
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Grid of posts */}
      {filteredPosts.length === 0 ? (
        <p style={{ color: "#4A6B82", textAlign: "center", fontSize: "16px", padding: "40px 0" }}>
          Nenhum artigo encontrado nesta categoria.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {filteredPosts.map((post) => {
            const color = categoryColors[post.category] ?? "#0070B8";
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
                    background: "#FFFFFF",
                    border: "1px solid rgba(11, 37, 69, 0.08)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {/* Category Tag */}
                  <span
                    style={{
                      display: "inline-block",
                      background: `${color}10`,
                      border: `1px solid ${color}30`,
                      color,
                      padding: "4px 12px",
                      borderRadius: "100px",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      alignSelf: "flex-start",
                    }}
                  >
                    {label}
                  </span>

                  {/* Title */}
                  <h2
                    style={{
                      color: "#0B2545",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      lineHeight: 1.4,
                      flex: 1,
                    }}
                  >
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p
                    style={{
                      color: "#1E3A5F",
                      fontSize: "13.5px",
                      lineHeight: 1.65,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.description}
                  </p>

                  {/* Footer */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "12px",
                      borderTop: "1px solid rgba(11, 37, 69, 0.06)",
                      marginTop: "4px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "14px" }}>
                      <span
                        style={{
                          color: "#4A6B82",
                          fontSize: "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Calendar size={12} />
                        {new Date(post.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </span>
                      <span
                        style={{
                          color: "#4A6B82",
                          fontSize: "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>
                    <ArrowRight size={16} style={{ color: "#0070B8" }} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
