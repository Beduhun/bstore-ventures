import { getAllPosts } from "@/lib/blog";
import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import BlogCTA from "@/components/blog/BlogCTA";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Markdown from "markdown-to-jsx";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | B'Store Ventures`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og-image.png"],
    },
  };
}

const categoryLabels: Record<string, string> = {
  "loja-virtual": "Loja Virtual",
  marketplaces: "Marketplaces",
  "venda-sem-estoque": "Venda Sem Estoque",
  escalar: "Escalar E-commerce",
};

function CustomMarkdown({ children }: { children: string }) {
  return (
    <Markdown
      options={{
        overrides: {
          h1: {
            component: "h1",
            props: {
              style: { color: "#F0F6FF", fontSize: "1.8rem", fontWeight: 900, margin: "40px 0 16px" }
            }
          },
          h2: {
            component: "h2",
            props: {
              style: { color: "#F0F6FF", fontSize: "1.4rem", fontWeight: 800, margin: "36px 0 14px", letterSpacing: "-0.01em" }
            }
          },
          h3: {
            component: "h3",
            props: {
              style: { color: "#F0F6FF", fontSize: "1.15rem", fontWeight: 700, margin: "28px 0 12px", letterSpacing: "-0.01em" }
            }
          },
          p: {
            component: "p",
            props: {
              style: { color: "#9EBDDF", fontSize: "15px", lineHeight: 1.8, marginBottom: "16px" }
            }
          },
          strong: {
            component: "strong",
            props: {
              style: { color: "#F0F6FF", fontWeight: 700 }
            }
          },
          li: {
            component: "li",
            props: {
              style: { color: "#9EBDDF", fontSize: "15px", lineHeight: 1.75, marginBottom: "6px", paddingLeft: "8px" }
            }
          },
          ul: {
            component: "ul",
            props: {
              style: { listStyle: "none", margin: "16px 0", paddingLeft: "16px", borderLeft: "2px solid rgba(0,196,255,0.2)" }
            }
          },
          pre: {
            component: "pre",
            props: {
              style: { background: "#071A38", border: "1px solid rgba(0,196,255,0.15)", borderRadius: "10px", padding: "20px", overflowX: "auto", margin: "20px 0" }
            }
          },
          code: {
            component: "code",
            props: {
              style: { color: "#00C4FF", fontFamily: "monospace", fontSize: "13px" }
            }
          },
          td: {
            component: "td",
            props: {
              style: { padding: "10px 14px", borderBottom: "1px solid rgba(0,196,255,0.08)", color: "#9EBDDF", fontSize: "14px" }
            }
          },
          table: {
            component: "table",
            props: {
              style: { width: "100%", borderCollapse: "collapse", margin: "24px 0" }
            }
          }
        }
      }}
    >
      {children}
    </Markdown>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Split content at ~50% for mid-CTA
  const contentLines = post.content.split('\n');
  const midPoint = Math.floor(contentLines.length / 2);
  const firstHalf = contentLines.slice(0, midPoint).join('\n');
  const secondHalf = contentLines.slice(midPoint).join('\n');

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "publisher": {
      "@type": "Organization",
      "name": "B'Store Ventures",
      "logo": { "@type": "ImageObject", "url": "https://bstoreventures.com.br/logo-bstore.svg" },
    },
    "image": "https://bstoreventures.com.br/og-image.png",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main style={{ background: "#0B2545", minHeight: "100vh", paddingTop: "72px" }}>
        {/* Hero */}
        <div style={{
          background: "linear-gradient(180deg, #071A38 0%, #0B2545 100%)",
          padding: "60px 24px 48px",
          borderBottom: "1px solid rgba(0,196,255,0.08)",
        }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            {/* Breadcrumb */}
            <nav style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "24px", flexWrap: "wrap" }}>
              {[
                { href: "/", label: "Home" },
                { href: "/blog", label: "Blog" },
                { href: `/blog`, label: categoryLabels[post.category] ?? post.category },
              ].map((crumb, i, arr) => (
                <span key={crumb.href} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Link href={crumb.href} style={{ color: i === arr.length - 1 ? "#7A9CC2" : "#00C4FF", fontSize: "13px", textDecoration: "none", fontWeight: 500 }}>
                    {crumb.label}
                  </Link>
                  {i < arr.length - 1 && <span style={{ color: "#1A3A72", fontSize: "13px" }}>/</span>}
                </span>
              ))}
            </nav>

            {/* Category */}
            <span style={{
              display: "inline-block",
              background: "rgba(0,196,255,0.1)",
              border: "1px solid rgba(0,196,255,0.25)",
              color: "#00C4FF",
              padding: "4px 14px",
              borderRadius: "100px",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              marginBottom: "18px",
            }}>
              {categoryLabels[post.category]}
            </span>

            <h1 style={{
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 900,
              color: "#F0F6FF",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}>
              {post.title}
            </h1>

            <p style={{ color: "#7A9CC2", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "24px" }}>
              {post.description}
            </p>

            <div style={{ display: "flex", gap: "20px", color: "#7A9CC2", fontSize: "13px", flexWrap: "wrap" }}>
              <span>📅 {new Date(post.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</span>
              <span>⏱️ {post.readTime} de leitura</span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article style={{ maxWidth: "760px", margin: "0 auto", padding: "52px 24px 80px" }}>
          {/* First half */}
          <CustomMarkdown>{firstHalf}</CustomMarkdown>

          {/* Mid CTA */}
          <BlogCTA position="middle" category={post.category} />

          {/* Second half */}
          <CustomMarkdown>{secondHalf}</CustomMarkdown>

          {/* End CTA */}
          <BlogCTA position="end" category={post.category} />

          {/* Back to blog */}
          <div style={{ marginTop: "40px", paddingTop: "32px", borderTop: "1px solid rgba(0,196,255,0.08)" }}>
            <Link
              href="/blog"
              id="blog-post-back"
              style={{
                color: "#00C4FF",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              ← Voltar para o Blog
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
