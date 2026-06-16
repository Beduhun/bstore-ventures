import { ResultProfile, AffiliateRecommendation } from "@/types/quiz";

export const AFFILIATE_LINKS: Record<ResultProfile, AffiliateRecommendation[]> = {
  MARKETPLACE_INICIANTE: [
    { label: "Mercado Livre do Zero ao Primeiro Pedido", href: "#LINK_AFILIADO_ML", icon: "🛍️", badge: "Mais Popular" },
    { label: "Shopee para Iniciantes — Comece Hoje", href: "#LINK_AFILIADO_SHOPEE", icon: "📦" },
  ],
  LOJISTA_MIGRANDO: [
    { label: "Como Criar Sua Loja Virtual do Zero", href: "#LINK_AFILIADO_LOJA_VIRTUAL", icon: "🌐", badge: "Urgente" },
    { label: "E-commerce Completo — Da Loja Física ao Digital", href: "#LINK_AFILIADO_ECOMMERCE", icon: "🔄" },
  ],
  AMAZON_FOCO: [
    { label: "Amazon FBA Brasil — Venda em Dólar", href: "#LINK_AFILIADO_AMAZON_FBA", icon: "💵", badge: "Alto Potencial" },
  ],
  SHOPEE_FOCO: [
    { label: "Shopee do Zero — Primeiros R$5.000 no Mês", href: "#LINK_AFILIADO_SHOPEE_ZERO", icon: "📦", badge: "Baixo Investimento" },
  ],
  MULTICANAL: [
    { label: "E-commerce Multicanal Completo", href: "#LINK_AFILIADO_MULTICANAL", icon: "🚀", badge: "Visão Completa" },
  ],
  DIGITAL_SEM_ROI: [
    { label: "Otimização de Conversão para E-commerce", href: "#LINK_AFILIADO_CRO", icon: "📊", badge: "Aumento Médio 34%" },
  ],
  INICIANTE_SEM_CAPITAL: [
    { label: "Dropshipping do Zero — Sem Estoque, Sem Capital", href: "#LINK_AFILIADO_DROPSHIPPING", icon: "🚚", badge: "Começo Ideal" },
  ],
  PRECISA_ORIENTACAO: [
    { label: "Guia Completo: Qual Canal de Vendas Escolher?", href: "#LINK_AFILIADO_GUIA", icon: "🧭", badge: "Comece Aqui" },
  ],
};
