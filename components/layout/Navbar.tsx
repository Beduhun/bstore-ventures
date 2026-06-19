"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { CATEGORIES } from "@/lib/courses";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 24px",
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backdropFilter: scrolled ? "blur(20px) saturate(1.2)" : "none",
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(11, 37, 69, 0.08)" : "1px solid transparent",
        transition: "all 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          transition: "all 0.3s ease"
        }}>
          <Logo light={!scrolled} height={scrolled ? 34 : 40} />
        </div>
      </Link>

      {/* Desktop Nav */}
      <div style={{ display: "flex", alignItems: "center", gap: "32px", position: "relative" }} className="hidden-mobile">
        <Link
          href={`${basePath}/#quiz`}
          id="nav-link-diagnostico"
          style={{
            color: scrolled ? "#0B2545" : "#9EBDDF",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: scrolled ? 600 : 500,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = scrolled ? "#0070B8" : "#F0F6FF")}
          onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = scrolled ? "#0B2545" : "#9EBDDF")}
        >
          Diagnóstico
        </Link>

        {/* Dropdown Link (Cursos) */}
        <div
          style={{ position: "relative", padding: "10px 0" }}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            id="nav-dropdown-btn"
            style={{
              color: scrolled ? "#0B2545" : "#9EBDDF",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: scrolled ? 600 : 500,
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: 0,
              fontFamily: "inherit",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = scrolled ? "#0070B8" : "#F0F6FF")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = scrolled ? "#0B2545" : "#9EBDDF")}
          >
            Cursos
            <ChevronDown size={14} style={{ transform: dropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>

          {/* Desktop Dropdown Content */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "-20px",
                  width: "280px",
                  background: "#071A38",
                  border: "1px solid rgba(0, 196, 255, 0.25)",
                  borderRadius: "14px",
                  padding: "12px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={cat.href}
                    id={`nav-dropdown-item-${cat.slug}`}
                    style={{
                      color: "#9EBDDF",
                      textDecoration: "none",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: 500,
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#00C4FF";
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0, 196, 255, 0.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#9EBDDF";
                      (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    }}
                  >
                    <span style={{ fontWeight: 700, color: "#F0F6FF", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>{cat.icon}</span> {cat.title}
                    </span>
                    <span style={{ fontSize: "11px", opacity: 0.8, color: "#7A9CC2" }}>
                      {cat.slug === "venda-sem-estoque" ? "Ganhe em dólar e dropshipping" : "Ver cursos disponíveis"}
                    </span>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link
          href="/blog"
          id="nav-link-blog"
          style={{
            color: scrolled ? "#0B2545" : "#9EBDDF",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: scrolled ? 600 : 500,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = scrolled ? "#0070B8" : "#F0F6FF")}
          onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = scrolled ? "#0B2545" : "#9EBDDF")}
        >
          Blog
        </Link>

        <Link
          href={`${basePath}/#categorias`}
          id="nav-link-categorias"
          style={{
            color: scrolled ? "#0B2545" : "#9EBDDF",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: scrolled ? 600 : 500,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = scrolled ? "#0070B8" : "#F0F6FF")}
          onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = scrolled ? "#0B2545" : "#9EBDDF")}
        >
          Categorias
        </Link>

        <a
          href={`${basePath}/#quiz`}
          id="navbar-cta"
          className="btn-cyan pulse-glow"
          style={{
            padding: "10px 22px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 700,
            textDecoration: "none",
            color: "#0B2545",
            display: "inline-block",
          }}
        >
          Iniciar Quiz →
        </a>
      </div>

      {/* Mobile Hamburger */}
      <button
        id="navbar-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: "none",
          border: "none",
          color: scrolled ? "#0B2545" : "#F0F6FF",
          cursor: "pointer",
          display: "none",
          padding: "8px",
        }}
        className="show-mobile"
        aria-label="Menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "fixed",
              top: "72px",
              left: 0,
              right: 0,
              background: scrolled ? "rgba(255, 255, 255, 0.98)" : "rgba(11, 37, 69, 0.98)",
              backdropFilter: "blur(20px)",
              borderBottom: scrolled ? "1px solid rgba(11, 37, 69, 0.08)" : "1px solid rgba(0, 196, 255, 0.12)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              maxHeight: "calc(100vh - 72px)",
              overflowY: "auto",
            }}
          >
            <Link
              href={`${basePath}/#quiz`}
              onClick={() => setMenuOpen(false)}
              style={{
                color: scrolled ? "#0B2545" : "#F0F6FF",
                textDecoration: "none",
                fontSize: "17px",
                fontWeight: 600,
              }}
            >
              Diagnóstico
            </Link>

            {/* Mobile Accordion (Cursos) */}
            <div>
              <button
                onClick={() => setMobileAccordionOpen(!mobileAccordionOpen)}
                style={{
                  color: scrolled ? "#0B2545" : "#F0F6FF",
                  background: "none",
                  border: "none",
                  width: "100%",
                  textAlign: "left",
                  fontSize: "17px",
                  fontWeight: 600,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 0,
                  fontFamily: "inherit",
                }}
              >
                Cursos
                <ChevronDown size={18} style={{ transform: mobileAccordionOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </button>
              <AnimatePresence>
                {mobileAccordionOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      paddingLeft: "16px",
                      marginTop: "12px",
                      borderLeft: "2px solid rgba(0, 196, 255, 0.25)",
                    }}
                  >
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={cat.href}
                        onClick={() => {
                          setMenuOpen(false);
                          setMobileAccordionOpen(false);
                        }}
                        style={{
                          color: scrolled ? "#1E3A5F" : "#9EBDDF",
                          textDecoration: "none",
                          fontSize: "15px",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "4px 0",
                        }}
                      >
                        <span>{cat.icon}</span> {cat.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              style={{
                color: scrolled ? "#0B2545" : "#F0F6FF",
                textDecoration: "none",
                fontSize: "17px",
                fontWeight: 600,
              }}
            >
              Blog
            </Link>

            <Link
              href={`${basePath}/#categorias`}
              onClick={() => setMenuOpen(false)}
              style={{
                color: scrolled ? "#0B2545" : "#F0F6FF",
                textDecoration: "none",
                fontSize: "17px",
                fontWeight: 600,
              }}
            >
              Categorias
            </Link>

            <a
              href={`${basePath}/#quiz`}
              onClick={() => setMenuOpen(false)}
              className="btn-cyan"
              style={{
                padding: "14px 24px",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: 700,
                textDecoration: "none",
                color: "#0B2545",
                textAlign: "center",
                marginTop: "8px",
              }}
            >
              Iniciar Quiz →
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
}
