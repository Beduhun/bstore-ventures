import { getAllPosts } from "@/lib/blog";
import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import BlogCTA from "@/components/blog/BlogCTA";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
  mercado: "Mercado",
  marketplaces: "Marketplaces",
  ecommerce: "E-commerce",
  estrategia: "Estratégia",
};

function renderMarkdown(content: string): string {
  return content
    // Headers
    .replace(/^### (.+)$/gm, '<h3 style="color:#F0F6FF;font-size:1.15rem;font-weight:700;margin:28px 0 12px;letter-spacing:-0.01em">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="color:#F0F6FF;font-size:1.4rem;font-weight:800;margin:36px 0 14px;letter-spacing:-0.01em">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="color:#F0F6FF;font-size:1.8rem;font-weight:900;margin:40px 0 16px">$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#F0F6FF;font-weight:700">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```[\s\S]*?```/g, (match) => {
      const code = match.replace(/```\w*\n?/, '').replace(/```$/, '');
      return `<pre style="background:#071A38;border:1px solid rgba(0,196,255,0.15);border-radius:10px;padding:20px;overflow-x:auto;margin:20px 0"><code style="color:#00C4FF;font-family:monospace;font-size:13px">${code}</code></pre>`;
    })
    // Tables
    .replace(/\|(.+)\|/g, (match) => {
      if (match.includes('---')) return '';
      const cells = match.split('|').filter(c => c.trim());
      const isHeader = false;
      return `<tr>${cells.map(c => `<td style="padding:10px 14px;border-bottom:1px solid rgba(0,196,255,0.08);color:#7A9CC2;font-size:14px">${c.trim()}</td>`).join('')}</tr>`;
    })
    // Lists
    .replace(/^- (.+)$/gm, '<li style="color:#7A9CC2;font-size:15px;line-height:1.75;margin-bottom:6px;padding-left:8px">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (match) => `<ul style="list-style:none;margin:16px 0;padding-left:16px;border-left:2px solid rgba(0,196,255,0.2)">${match}</ul>`)
    // Paragraphs
    .replace(/^(?!<[hul]|<pre|<tr)(.+)$/gm, '<p style="color:#7A9CC2;font-size:15px;line-height:1.8;margin-bottom:16px">$1</p>')
    // Clean empty paragraphs
    .replace(/<p[^>]*><\/p>/g, '');
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
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(firstHalf) }} />

          {/* Mid CTA */}
          <BlogCTA position="middle" />

          {/* Second half */}
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(secondHalf) }} />

          {/* End CTA */}
          <BlogCTA position="end" />

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
