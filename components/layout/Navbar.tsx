"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#quiz", label: "Diagnóstico" },
  { href: "/#cursos", label: "Cursos" },
  { href: "/blog", label: "Blog" },
  { href: "/#categorias", label: "Categorias" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
        <div style={{
          background: scrolled ? "transparent" : "#FFFFFF",
          padding: scrolled ? "0" : "4px 10px",
          borderRadius: scrolled ? "0" : "6px",
          display: "flex",
          alignItems: "center",
          transition: "all 0.3s ease"
        }}>
          <img
            src={`${basePath}/logo-bstore.jpg`}
            alt="B'Store Ventures"
            style={{ height: scrolled ? "40px" : "32px", width: "auto" }}
          />
        </div>
      </Link>

      {/* Desktop Nav */}
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden-mobile">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            style={{
              color: scrolled ? "#0B2545" : "#7A9CC2",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: scrolled ? 600 : 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = scrolled ? "#0070B8" : "#F0F6FF")}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = scrolled ? "#0B2545" : "#7A9CC2")}
          >
            {link.label}
          </Link>
        ))}
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
              gap: "20px",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: scrolled ? "#0B2545" : "#F0F6FF",
                  textDecoration: "none",
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                {link.label}
              </Link>
            ))}
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
