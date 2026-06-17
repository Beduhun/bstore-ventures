"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { QuizAnswers } from "@/types/quiz";
import { ChevronLeft, Loader2 } from "lucide-react";

interface EmailCaptureProps {
  onSubmit: () => void;
  onBack: () => void;
  answers: QuizAnswers;
}

export default function EmailCapture({ onSubmit, onBack, answers }: EmailCaptureProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) { setError("Por favor, informe seu nome."); return; }
    if (!email.trim() || !email.includes("@")) { setError("Por favor, informe um e-mail válido."); return; }

    setLoading(true);
    try {
      // Save lead locally in localStorage (always works, even offline)
      const lead = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        answers,
        timestamp: new Date().toISOString(),
      };
      const existingLeads = JSON.parse(localStorage.getItem("bstore_leads") || "[]");
      // Update if email exists, otherwise add new
      const idx = existingLeads.findIndex((l: { email: string }) => l.email === lead.email);
      if (idx >= 0) {
        existingLeads[idx] = lead;
      } else {
        existingLeads.push(lead);
      }
      localStorage.setItem("bstore_leads", JSON.stringify(existingLeads));

      // Try Formspree (optional — configure NEXT_PUBLIC_FORMSPREE_ID in .env.local)
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
      if (formspreeId) {
        try {
          await fetch(`https://formspree.io/f/${formspreeId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({
              name: lead.name,
              email: lead.email,
              profile: JSON.stringify(answers),
              _subject: `Novo Lead B'Store: ${lead.name}`,
            }),
          });
        } catch {
          // Formspree failed — lead is saved locally, continue
        }
      }
    } catch {
      // Silently continue — show result even if save fails
    } finally {
      setLoading(false);
      onSubmit();
    }
  };

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ textAlign: "center", marginBottom: "36px" }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🎯</div>
        <h3
          style={{
            fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
            fontWeight: 800,
            color: "#0B2545",
            marginBottom: "10px",
            letterSpacing: "-0.01em",
          }}
        >
          Seu diagnóstico está pronto!
        </h3>
        <p style={{ color: "#4A6B82", fontSize: "15px", maxWidth: "400px", margin: "0 auto" }}>
          Para onde enviamos seu plano personalizado?
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <div>
          <label
            htmlFor="email-capture-name"
            style={{ display: "block", color: "#4A6B82", fontSize: "13px", fontWeight: 600, marginBottom: "8px", letterSpacing: "0.04em" }}
          >
            SEU NOME *
          </label>
          <input
            id="email-capture-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Como podemos te chamar?"
            required
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "10px",
              border: "2px solid rgba(11,37,69,0.12)",
              background: "#F7FAFC",
              color: "#0B2545",
              fontSize: "15px",
              fontFamily: "inherit",
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#00C4FF")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(11,37,69,0.12)")}
          />
        </div>

        <div>
          <label
            htmlFor="email-capture-email"
            style={{ display: "block", color: "#4A6B82", fontSize: "13px", fontWeight: 600, marginBottom: "8px", letterSpacing: "0.04em" }}
          >
            SEU MELHOR E-MAIL *
          </label>
          <input
            id="email-capture-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "10px",
              border: "2px solid rgba(11,37,69,0.12)",
              background: "#F7FAFC",
              color: "#0B2545",
              fontSize: "15px",
              fontFamily: "inherit",
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#00C4FF")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(11,37,69,0.12)")}
          />
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: "#F87171", fontSize: "14px", background: "rgba(248,113,113,0.1)", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(248,113,113,0.3)" }}>
            ⚠️ {error}
          </p>
        )}

        {/* Privacy note */}
        <p style={{ color: "#4A6B82", fontSize: "12px", textAlign: "center" }}>
          🔒 Sem spam. Prometemos enviar apenas conteúdo relevante para o seu perfil.
        </p>

        {/* Submit */}
        <motion.button
          type="submit"
          id="email-capture-submit"
          disabled={loading}
          whileHover={!loading ? { scale: 1.02 } : {}}
          className="btn-cyan"
          style={{
            padding: "16px 24px",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: 700,
            width: "100%",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.8 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            color: "#0B2545",
            fontFamily: "inherit",
          }}
        >
          {loading ? (
            <>
              <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
              Processando...
            </>
          ) : (
            "Ver Meu Resultado Personalizado →"
          )}
        </motion.button>

        {/* Back */}
        <button
          type="button"
          id="email-capture-back"
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "#4A6B82",
            cursor: "pointer",
            fontSize: "14px",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "4px",
          }}
        >
          <ChevronLeft size={16} />
          Voltar para o quiz
        </button>
      </motion.form>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
