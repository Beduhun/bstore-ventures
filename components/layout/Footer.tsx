"use client";

import Link from "next/link";
// Inline social icons (lucide-react v1 compatible)
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const footerLinks = {
  Plataforma: [
    { href: "/#quiz", label: "Diagnóstico" },
    { href: "/#cursos", label: "Cursos em Destaque" },
    { href: "/#categorias", label: "Categorias" },
    { href: "/blog", label: "Blog" },
  ],
  Recursos: [
    { href: "/blog/ecommerce-brasil-crescimento", label: "E-commerce Brasil" },
    { href: "/blog/como-sair-da-loja-fisica-para-o-digital", label: "Migração Digital" },
    { href: "/blog/vender-mercado-livre-iniciante", label: "Mercado Livre" },
  ],
  Contato: [
    { href: "mailto:contato@bstoreventures.com.br", label: "contato@bstoreventures.com.br" },
    { href: "/#quiz", label: "Suporte" },
  ],
};

export default function Footer() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <footer
      style={{
        background: "#071A38",
        borderTop: "1px solid rgba(0,196,255,0.12)",
        padding: "60px 24px 32px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Top Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px",
            marginBottom: "48px",
          }}
        >
          {/* Brand Column */}
          <div>
            <img
              src={`${basePath}/logo-bstore.svg`}
              alt="B'Store Ventures"
              style={{ height: "44px", width: "auto", marginBottom: "16px" }}
            />
            <p style={{ color: "#7A9CC2", fontSize: "14px", lineHeight: 1.7, maxWidth: "240px" }}>
              Acelerando a transição do comércio físico para o ecossistema digital.
            </p>
            <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
              <a
                href="https://instagram.com/bstoreventures"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-instagram"
                style={{
                  color: "#7A9CC2",
                  transition: "color 0.2s",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#00C4FF")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#7A9CC2")}
              >
                <InstagramIcon />
              </a>
              <a
                href="https://youtube.com/@bstoreventures"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-youtube"
                style={{
                  color: "#7A9CC2",
                  transition: "color 0.2s",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#00C4FF")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#7A9CC2")}
              >
                <YoutubeIcon />
              </a>
              <a
                href="https://linkedin.com/company/bstoreventures"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-linkedin"
                style={{
                  color: "#7A9CC2",
                  transition: "color 0.2s",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#00C4FF")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#7A9CC2")}
              >
                <LinkedinIcon />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 style={{ color: "#F0F6FF", fontWeight: 700, fontSize: "14px", marginBottom: "16px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {category}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{ color: "#7A9CC2", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#00C4FF")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#7A9CC2")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #122D5B 0%, #1A3A72 100%)",
            border: "1px solid rgba(0,196,255,0.2)",
            borderRadius: "16px",
            padding: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            marginBottom: "48px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3 style={{ color: "#F0F6FF", fontWeight: 800, fontSize: "20px", marginBottom: "6px" }}>
              Explorar todos os cursos →
            </h3>
            <p style={{ color: "#7A9CC2", fontSize: "14px" }}>
              Centenas de cursos para transformar seu perfil em resultados.
            </p>
          </div>
          <a
            href={`${basePath}/#cursos`}
            id="footer-cta-cursos"
            className="btn-cyan"
            style={{
              padding: "12px 28px",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "none",
              color: "#0B2545",
              whiteSpace: "nowrap",
              display: "inline-block",
            }}
          >
            Ver Cursos
          </a>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: "1px solid rgba(0,196,255,0.08)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ color: "#7A9CC2", fontSize: "13px" }}>
            © {new Date().getFullYear()} B'Store Ventures. Todos os direitos reservados.
          </p>
          <p style={{ color: "#7A9CC2", fontSize: "12px" }}>
            Este site contém links de afiliados. Ao clicar e comprar, podemos receber uma comissão.
          </p>
        </div>
      </div>
    </footer>
  );
}
