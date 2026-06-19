"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import QuizEngine from "./QuizEngine";

export default function QuizModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check initial hash
    const handleHashChange = () => {
      if (window.location.hash === "#quiz") {
        setIsOpen(true);
        // Disable body scroll when modal is open
        document.body.style.overflow = "hidden";
      } else {
        setIsOpen(false);
        document.body.style.overflow = "unset";
      }
    };

    handleHashChange(); // Run on mount
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
    // Clear hash from URL without reloading
    if (window.location.hash === "#quiz") {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(7, 26, 56, 0.8)",
              backdropFilter: "blur(8px)",
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "760px",
              background: "#FFFFFF",
              border: "1px solid rgba(11, 37, 69, 0.1)",
              borderRadius: "28px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 60px rgba(0, 196, 255, 0.05)",
              padding: "clamp(24px, 5vw, 44px)",
              maxHeight: "90vh",
              overflowY: "auto",
              zIndex: 10000,
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              id="quiz-modal-close-btn"
              aria-label="Fechar"
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "none",
                border: "none",
                color: "#4A6B82",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(11, 37, 69, 0.05)";
                (e.currentTarget as HTMLButtonElement).style.color = "#0B2545";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "none";
                (e.currentTarget as HTMLButtonElement).style.color = "#4A6B82";
              }}
            >
              <X size={20} />
            </button>

            {/* Quiz Engine Component */}
            <QuizEngine />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
