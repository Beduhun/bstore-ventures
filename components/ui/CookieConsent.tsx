"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem("bstore_cookie_consent");
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("bstore_cookie_consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("bstore_cookie_consent", "declined");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: "fixed",
            bottom: "24px",
            left: "24px",
            right: "24px",
            maxWidth: "600px",
            background: "rgba(7, 26, 56, 0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(0, 196, 255, 0.3)",
            borderRadius: "16px",
            padding: "20px 24px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.35), 0 0 20px rgba(0, 196, 255, 0.05)",
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            // Center on tablet/mobile
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <h4 style={{ color: "#F0F6FF", fontWeight: 800, fontSize: "14px", letterSpacing: "0.02em" }}>
              🍪 Controle de Privacidade & Cookies
            </h4>
            <p style={{ color: "#9EBDDF", fontSize: "12.5px", lineHeight: 1.6 }}>
              Nós utilizamos cookies para coletar dados analíticos e personalizar recomendações de acordo com as diretrizes da LGPD. Ao continuar navegando, você aceita o uso de cookies. Leia nossa{" "}
              <Link href="/privacidade" style={{ color: "#00C4FF", fontWeight: 600, textDecoration: "underline" }}>
                Política de Privacidade
              </Link>.
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", alignSelf: "flex-end" }}>
            <button
              onClick={handleDecline}
              id="cookie-decline-btn"
              style={{
                background: "transparent",
                border: "1px solid rgba(0, 196, 255, 0.2)",
                color: "#9EBDDF",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 196, 255, 0.5)";
                e.currentTarget.style.color = "#F0F6FF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 196, 255, 0.2)";
                e.currentTarget.style.color = "#9EBDDF";
              }}
            >
              Rejeitar
            </button>
            <button
              onClick={handleAccept}
              id="cookie-accept-btn"
              className="btn-cyan"
              style={{
                border: "none",
                padding: "8px 20px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 700,
                color: "#0B2545",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              Aceitar Cookies
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
