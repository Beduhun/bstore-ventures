"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  Lock, 
  Search, 
  Download, 
  Mail, 
  Database, 
  Users, 
  CheckCircle, 
  Loader2, 
  X, 
  Eye, 
  LogOut,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

interface Lead {
  id: string;
  name: string;
  email: string;
  profile?: string;
  answers: Record<string, string>;
  createdAt: string;
  consent: boolean;
  emailsSent: string[];
}

export default function AdminLeadsPage() {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [profileFilter, setProfileFilter] = useState("all");
  
  // Follow-up status states
  const [campaignLoading, setCampaignLoading] = useState(false);
  const [campaignResult, setCampaignResult] = useState<{ success: boolean; sentCount: number } | null>(null);

  // Check sessionStorage on mount
  useEffect(() => {
    const savedPassword = sessionStorage.getItem("bstore_admin_password");
    if (savedPassword) {
      verifyPassword(savedPassword);
    }
  }, []);

  const verifyPassword = async (pass: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pass }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAuthorized(true);
        setLeads(data.leads);
        sessionStorage.setItem("bstore_admin_password", pass);
      } else {
        setError(data.error || "Senha incorreta.");
        sessionStorage.removeItem("bstore_admin_password");
      }
    } catch (err) {
      setError("Erro ao se conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    verifyPassword(password.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem("bstore_admin_password");
    setAuthorized(false);
    setLeads([]);
    setPassword("");
  };

  // Trigger follow-up email campaigns
  const triggerFollowups = async () => {
    const pass = sessionStorage.getItem("bstore_admin_password") || password;
    if (!pass) return;

    setCampaignLoading(true);
    setCampaignResult(null);

    try {
      const res = await fetch("/api/admin-leads/send-followups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pass }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCampaignResult({ success: true, sentCount: data.sentCount });
        // Refresh leads list to update emailsSent status
        verifyPassword(pass);
      } else {
        setCampaignResult({ success: false, sentCount: 0 });
      }
    } catch {
      setCampaignResult({ success: false, sentCount: 0 });
    } finally {
      setCampaignLoading(false);
    }
  };

  // Filter and search logic
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesProfile = 
        profileFilter === "all" || 
        lead.profile === profileFilter;

      return matchesSearch && matchesProfile;
    });
  }, [leads, searchTerm, profileFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = leads.length;
    const consentTrue = leads.filter(l => l.consent).length;
    
    // Emails history count
    let totalEmails = 0;
    leads.forEach(l => {
      totalEmails += (l.emailsSent || []).length;
    });

    const profilesDistribution: Record<string, number> = {};
    leads.forEach(l => {
      if (l.profile) {
        profilesDistribution[l.profile] = (profilesDistribution[l.profile] || 0) + 1;
      }
    });

    return {
      total,
      consentTrue,
      totalEmails,
      profilesDistribution
    };
  }, [leads]);

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredLeads.length === 0) return;

    const headers = ["ID", "Nome", "E-mail", "Perfil Recomendado", "Consentimento LGPD", "Histórico de E-mails", "Data de Cadastro"];
    const rows = filteredLeads.map(l => [
      l.id,
      l.name,
      l.email,
      l.profile || "Não calculado",
      l.consent ? "Sim" : "Não",
      (l.emailsSent || []).join(" | "),
      new Date(l.createdAt).toLocaleString("pt-BR")
    ]);

    const csvContent = [headers, ...rows]
      .map(e => e.map(val => `"${val.toString().replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `leads_bstore_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Convert profile ID to human readable category label
  const getProfileLabel = (profileId?: string) => {
    if (!profileId) return "Não calculado";
    const mapping: Record<string, string> = {
      "course-ecommerce-completo": "E-commerce Completo",
      "course-loja-e-trafego": "Loja Própria & Tráfego",
      "course-marketplace-geral": "Marketplace Geral",
      "course-tiktok-shop": "TikTok Shop",
      "course-dropshipping-padrao": "Dropshipping Padrão",
      "course-amazon-fba-eua": "Amazon FBA EUA",
      "course-trafego-pago-avancado": "Tráfego Avançado",
      "course-automacao-ecommerce": "Automação E-commerce"
    };
    return mapping[profileId] || profileId;
  };

  // Profile list for filter select
  const profilesList = [
    { id: "course-ecommerce-completo", name: "E-commerce Completo" },
    { id: "course-loja-e-trafego", name: "Loja Própria & Tráfego" },
    { id: "course-marketplace-geral", name: "Marketplace Geral" },
    { id: "course-tiktok-shop", name: "TikTok Shop" },
    { id: "course-dropshipping-padrao", name: "Dropshipping Padrão" },
    { id: "course-amazon-fba-eua", name: "Amazon FBA EUA" },
    { id: "course-trafego-pago-avancado", name: "Tráfego Avançado" },
    { id: "course-automacao-ecommerce", name: "Automação E-commerce" }
  ];

  // Render Login Lock Screen
  if (!authorized) {
    return (
      <div 
        style={{ 
          minHeight: "100vh", 
          background: "#071A38", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center", 
          padding: "24px",
          fontFamily: "system-ui, sans-serif"
        }}
      >
        <div style={{
          maxWidth: "400px",
          width: "100%",
          background: "rgba(11, 37, 69, 0.7)",
          border: "2px solid rgba(0, 196, 255, 0.2)",
          borderRadius: "24px",
          padding: "40px 32px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          backdropFilter: "blur(12px)",
          textAlign: "center"
        }}>
          <div style={{ 
            width: "64px", 
            height: "64px", 
            background: "rgba(0, 196, 255, 0.1)", 
            borderRadius: "50%", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            margin: "0 auto 24px",
            border: "1px solid rgba(0, 196, 255, 0.3)"
          }}>
            <Lock size={28} style={{ color: "#00C4FF" }} />
          </div>

          <h1 style={{ color: "#F0F6FF", fontSize: "24px", fontWeight: 800, marginBottom: "8px" }}>
            Painel de Leads
          </h1>
          <p style={{ color: "#9EBDDF", fontSize: "14.5px", marginBottom: "32px", lineHeight: 1.5 }}>
            Acesso restrito. Digite a senha administrativa para consultar e exportar os leads do site.
          </p>

          <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <input
              type="password"
              placeholder="Digite a senha admin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "10px",
                background: "#071A38",
                border: "2px solid rgba(0, 196, 255, 0.15)",
                color: "#F0F6FF",
                fontSize: "15px",
                outline: "none",
                textAlign: "center",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => (e.target.style.borderColor = "#00C4FF")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(0, 196, 255, 0.15)")}
            />

            {error && (
              <p style={{ color: "#F87171", fontSize: "13.5px", margin: "4px 0", background: "rgba(248,113,113,0.1)", padding: "10px", borderRadius: "8px", border: "1px solid rgba(248,113,113,0.2)" }}>
                ⚠️ {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "#00C4FF",
                color: "#0B2545",
                padding: "14px 20px",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "15px",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                transition: "transform 0.2s, opacity 0.2s"
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                  Autenticando...
                </>
              ) : (
                "Acessar Contatos →"
              )}
            </button>
          </form>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Render Dashboard
  return (
    <div 
      style={{ 
        minHeight: "100vh", 
        background: "#071A38", 
        color: "#F0F6FF",
        padding: "40px 24px",
        fontFamily: "system-ui, sans-serif"
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Top Header */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", borderBottom: "1px solid rgba(0, 196, 255, 0.15)", paddingBottom: "20px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span style={{ fontSize: "20px" }}>🛡️</span>
              <span style={{ color: "#00C4FF", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Administração</span>
            </div>
            <h1 style={{ fontSize: "28px", fontWeight: 900, color: "#FFFFFF" }}>B'Store Ventures Leads</h1>
          </div>
          <button 
            onClick={handleLogout}
            style={{
              background: "rgba(248, 113, 113, 0.1)",
              border: "1px solid rgba(248, 113, 113, 0.3)",
              color: "#F87171",
              padding: "10px 16px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(248, 113, 113, 0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(248, 113, 113, 0.1)")}
          >
            <LogOut size={16} />
            Sair
          </button>
        </header>

        {/* Campaign feedback toast */}
        {campaignResult && (
          <div style={{
            background: campaignResult.success ? "rgba(16, 185, 129, 0.1)" : "rgba(248, 113, 113, 0.1)",
            border: `1px solid ${campaignResult.success ? "rgba(16, 185, 129, 0.3)" : "rgba(248, 113, 113, 0.3)"}`,
            borderRadius: "12px",
            padding: "16px 20px",
            marginBottom: "28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>{campaignResult.success ? "✅" : "❌"}</span>
              <p style={{ color: "#F0F6FF", fontSize: "14.5px", margin: 0 }}>
                {campaignResult.success 
                  ? `Sucesso! Disparos concluídos. Foram enviados ${campaignResult.sentCount} e-mails de marketing de follow-up.` 
                  : "Falha ao processar disparos das campanhas. Tente novamente."}
              </p>
            </div>
            <button 
              onClick={() => setCampaignResult(null)} 
              style={{ background: "none", border: "none", color: "#9EBDDF", cursor: "pointer" }}
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Stats Row */}
        <section style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
          gap: "20px", 
          marginBottom: "40px" 
        }}>
          <div style={{ background: "rgba(11, 37, 69, 0.4)", border: "1px solid rgba(0, 196, 255, 0.12)", borderRadius: "16px", padding: "24px", display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ padding: "12px", background: "rgba(0, 196, 255, 0.1)", borderRadius: "12px" }}>
              <Users size={24} style={{ color: "#00C4FF" }} />
            </div>
            <div>
              <p style={{ color: "#9EBDDF", fontSize: "13px", margin: 0, textTransform: "uppercase", fontWeight: 700 }}>Total de Leads</p>
              <h3 style={{ fontSize: "28px", fontWeight: 900, margin: "4px 0 0", color: "#FFFFFF" }}>{stats.total}</h3>
            </div>
          </div>

          <div style={{ background: "rgba(11, 37, 69, 0.4)", border: "1px solid rgba(0, 196, 255, 0.12)", borderRadius: "16px", padding: "24px", display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ padding: "12px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "12px" }}>
              <CheckCircle size={24} style={{ color: "#10B981" }} />
            </div>
            <div>
              <p style={{ color: "#9EBDDF", fontSize: "13px", margin: 0, textTransform: "uppercase", fontWeight: 700 }}>Consentimento LGPD</p>
              <h3 style={{ fontSize: "28px", fontWeight: 900, margin: "4px 0 0", color: "#FFFFFF" }}>{stats.consentTrue}</h3>
            </div>
          </div>

          <div style={{ background: "rgba(11, 37, 69, 0.4)", border: "1px solid rgba(0, 196, 255, 0.12)", borderRadius: "16px", padding: "24px", display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ padding: "12px", background: "rgba(124, 58, 237, 0.1)", borderRadius: "12px" }}>
              <Mail size={24} style={{ color: "#8B5CF6" }} />
            </div>
            <div>
              <p style={{ color: "#9EBDDF", fontSize: "13px", margin: 0, textTransform: "uppercase", fontWeight: 700 }}>E-mails Disparados</p>
              <h3 style={{ fontSize: "28px", fontWeight: 900, margin: "4px 0 0", color: "#FFFFFF" }}>{stats.totalEmails}</h3>
            </div>
          </div>

          <div style={{ background: "rgba(11, 37, 69, 0.4)", border: "1px solid rgba(0, 196, 255, 0.12)", borderRadius: "16px", padding: "24px", display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ padding: "12px", background: "rgba(245, 158, 11, 0.1)", borderRadius: "12px" }}>
              <Database size={24} style={{ color: "#F59E0B" }} />
            </div>
            <div>
              <p style={{ color: "#9EBDDF", fontSize: "13px", margin: 0, textTransform: "uppercase", fontWeight: 700 }}>Banco de Dados</p>
              <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "8px 0 0", color: "#FFFFFF" }}>leads.enc.json</h3>
            </div>
          </div>
        </section>

        {/* Filter and Control Bar */}
        <section style={{ 
          background: "rgba(11, 37, 69, 0.2)", 
          border: "1px solid rgba(0, 196, 255, 0.08)",
          borderRadius: "16px",
          padding: "20px 24px",
          marginBottom: "28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          {/* Search and Filters */}
          <div style={{ display: "flex", gap: "12px", flex: 1, minWidth: "280px", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
              <Search size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#9EBDDF" }} />
              <input
                type="text"
                placeholder="Buscar por nome ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 16px 10px 42px",
                  borderRadius: "8px",
                  background: "#071A38",
                  border: "1px solid rgba(0, 196, 255, 0.15)",
                  color: "#F0F6FF",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
            </div>

            <select
              value={profileFilter}
              onChange={(e) => setProfileFilter(e.target.value)}
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                background: "#071A38",
                border: "1px solid rgba(0, 196, 255, 0.15)",
                color: "#F0F6FF",
                fontSize: "14px",
                outline: "none",
                cursor: "pointer"
              }}
            >
              <option value="all">Filtrar por Perfil (Todos)</option>
              {profilesList.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            {/* Trigger Campaigns Button */}
            <button
              onClick={triggerFollowups}
              disabled={campaignLoading || leads.length === 0}
              style={{
                background: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
                border: "none",
                color: "#FFFFFF",
                padding: "11px 20px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "14px",
                cursor: (campaignLoading || leads.length === 0) ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                opacity: (campaignLoading || leads.length === 0) ? 0.6 : 1,
                boxShadow: "0 4px 12px rgba(139, 92, 246, 0.2)"
              }}
            >
              {campaignLoading ? (
                <>
                  <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                  Disparando...
                </>
              ) : (
                <>
                  <Mail size={16} />
                  Disparar Campanhas Sequenciais (Follow-up)
                </>
              )}
            </button>

            {/* Export CSV Button */}
            <button
              onClick={handleExportCSV}
              disabled={filteredLeads.length === 0}
              style={{
                background: "#00C4FF",
                border: "none",
                color: "#0B2545",
                padding: "11px 20px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "14px",
                cursor: filteredLeads.length === 0 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                opacity: filteredLeads.length === 0 ? 0.6 : 1
              }}
            >
              <Download size={16} />
              Exportar CSV ({filteredLeads.length})
            </button>
          </div>
        </section>

        {/* Table container */}
        <section style={{ 
          background: "rgba(11, 37, 69, 0.3)", 
          border: "1px solid rgba(0, 196, 255, 0.1)",
          borderRadius: "16px",
          overflow: "hidden"
        }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(11, 37, 69, 0.5)", borderBottom: "1px solid rgba(0, 196, 255, 0.15)" }}>
                  <th style={{ padding: "16px 20px", color: "#00C4FF", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Nome</th>
                  <th style={{ padding: "16px 20px", color: "#00C4FF", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>E-mail</th>
                  <th style={{ padding: "16px 20px", color: "#00C4FF", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Perfil Recomendado</th>
                  <th style={{ padding: "16px 20px", color: "#00C4FF", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Trilha de E-mails</th>
                  <th style={{ padding: "16px 20px", color: "#00C4FF", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Cadastro</th>
                  <th style={{ padding: "16px 20px", color: "#00C4FF", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>LGPD</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#9EBDDF" }}>
                      Nenhum contato encontrado no banco de dados.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      style={{ 
                        borderBottom: "1px solid rgba(0, 196, 255, 0.06)", 
                        transition: "background 0.2s" 
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0, 196, 255, 0.02)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "16px 20px", fontWeight: 600, color: "#FFFFFF" }}>{lead.name}</td>
                      <td style={{ padding: "16px 20px", color: "#9EBDDF" }}>{lead.email}</td>
                      <td style={{ padding: "16px 20px" }}>
                        <span style={{
                          fontSize: "12.5px",
                          color: "#00C4FF",
                          background: "rgba(0, 196, 255, 0.06)",
                          border: "1px solid rgba(0, 196, 255, 0.15)",
                          padding: "4px 10px",
                          borderRadius: "100px",
                          fontWeight: 600
                        }}>
                          {getProfileLabel(lead.profile)}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                          {(lead.emailsSent || ["welcome"]).map((emailId) => (
                            <span 
                              key={emailId} 
                              style={{ 
                                fontSize: "11px",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                padding: "2px 8px",
                                borderRadius: "4px",
                                background: emailId === "welcome" 
                                  ? "rgba(16, 185, 129, 0.15)" 
                                  : "rgba(139, 92, 246, 0.15)",
                                border: emailId === "welcome"
                                  ? "1px solid rgba(16, 185, 129, 0.3)"
                                  : "1px solid rgba(139, 92, 246, 0.3)",
                                color: emailId === "welcome" ? "#10B981" : "#A78BFA"
                              }}
                            >
                              {emailId}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: "16px 20px", color: "#9EBDDF", fontSize: "13.5px" }}>
                        {new Date(lead.createdAt).toLocaleDateString("pt-BR")}
                        <span style={{ fontSize: "11px", display: "block", color: "#7A9CC2", marginTop: "2px" }}>
                          {new Date(lead.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <span style={{
                          fontSize: "11px",
                          fontWeight: 850,
                          color: lead.consent ? "#10B981" : "#EF4444",
                          background: lead.consent ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                          padding: "2px 8px",
                          borderRadius: "4px"
                        }}>
                          {lead.consent ? "ACEITO" : "PENDENTE"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
