export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  tag: string;
  tagColor: string;
  href: string;
}

export interface Category {
  slug: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  id: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "loja-virtual",
    title: "Loja Virtual Própria",
    description: "Construa sua própria marca e tenha controle total do seu canal de vendas e clientes.",
    icon: "🌐",
    href: "/categorias/loja-virtual",
    id: "cat-loja-virtual",
  },
  {
    slug: "marketplaces",
    title: "Marketplaces",
    description: "Venda onde milhões de compradores já buscam ativamente por produtos todos os dias.",
    icon: "🛒",
    href: "/categorias/marketplaces",
    id: "cat-marketplace",
  },
  {
    slug: "venda-sem-estoque",
    title: "Venda Sem Estoque",
    description: "Modelos com baixo estoque próprio: venda em dólar com a logística da Amazon (FBA) e importe sob demanda com fornecedores parceiros.",
    icon: "📦",
    href: "/categorias/venda-sem-estoque",
    id: "cat-venda-sem-estoque",
  },
  {
    slug: "escalar",
    title: "Escalar E-commerce",
    description: "Multiplique seus resultados otimizando campanhas de tráfego e automatizando processos.",
    icon: "📈",
    href: "/categorias/escalar",
    id: "cat-escalar",
  },
];

export const COURSES: Course[] = [
  {
    id: "course-ecommerce-completo",
    title: "E-commerce Completo",
    description: "O curso central do site. Ensina a estruturar e rodar um negócio online do básico ao avançado: loja própria, marketplaces (Shopee, Mercado Livre), tráfego pago e trade-go. Recomendado como ponto de partida definitivo.",
    category: "loja-virtual",
    icon: "🌐",
    tag: "Recomendado",
    tagColor: "#10B981",
    href: "#LINK_AFILIADO_ECOMMERCE",
  },
  {
    id: "course-loja-e-trafego",
    title: "Criação de Loja Própria e Tráfego",
    description: "Curso focado no desenvolvimento de sua plataforma própria (Nuvemshop/Shopify) e na atração de clientes via tráfego direto (Facebook/Google Ads) focado em conversão.",
    category: "loja-virtual",
    icon: "⚡",
    tag: "Alto Potencial",
    tagColor: "#D97706",
    href: "#LINK_AFILIADO_LOJA_TRAFEGO",
  },
  {
    id: "course-marketplace-geral",
    title: "Formação Marketplace Geral",
    description: "Domine de ponta a ponta os maiores marketplaces da América Latina (Mercado Livre, Shopee e Amazon) em um único treinamento unificado e estratégico.",
    category: "marketplaces",
    icon: "🛒",
    tag: "Mais Vendido",
    tagColor: "#0070B8",
    href: "#LINK_AFILIADO_ML_GERAL",
  },
  {
    id: "course-amazon-fba-eua",
    title: "Amazon FBA nos Estados Unidos",
    description: "Ganhe em dólar vendendo online sem estoque próprio. Use toda a infraestrutura e logística da Amazon nos EUA para armazenar e entregar suas mercadorias.",
    category: "venda-sem-estoque",
    icon: "💵",
    tag: "Ganhe em Dólar",
    tagColor: "#10B981",
    href: "#LINK_AFILIADO_AMAZON_FBA",
  },
  {
    id: "course-trafego-pago-avancado",
    title: "Tráfego Pago Avançado",
    description: "Escalar vendas exige inteligência de dados. Domine os segredos de otimização de campanhas no Meta Ads, Google Ads e TikTok Ads para obter ROI elevado.",
    category: "escalar",
    icon: "🎯",
    tag: "Escala Rápida",
    tagColor: "#3B82F6",
    href: "#LINK_AFILIADO_TRAFEGO",
  },
  {
    id: "course-automacao-ecommerce",
    title: "Automação de E-commerce",
    description: "Aprenda a integrar ERPs, hubs de marketplaces e fluxos automatizados de pós-venda para economizar tempo e expandir sua operação de forma inteligente.",
    category: "escalar",
    icon: "🤖",
    tag: "Eficiência",
    tagColor: "#F59E0B",
    href: "#LINK_AFILIADO_AUTOMACAO",
  },
  {
    id: "course-mercado-livre",
    title: "Mercado Livre Profissional",
    description: "Domine de ponta a ponta o maior marketplace do Brasil: anúncios otimizados (SEO de busca), construção de reputação, Mercado Envios/Full e anúncios internos para vender todos os dias.",
    category: "marketplaces",
    icon: "🛒",
    tag: "Mais Procurado",
    tagColor: "#0070B8",
    href: "#LINK_AFILIADO_MERCADO_LIVRE",
  },
  {
    id: "course-importacao-fornecedores",
    title: "Importação Inteligente e Fornecedores",
    description: "Encontre e negocie com fornecedores nacionais e internacionais (China), importe com segurança e baixo risco e garanta produtos com boa margem para revender sem manter um grande estoque próprio.",
    category: "venda-sem-estoque",
    icon: "📦",
    tag: "Sourcing",
    tagColor: "#8B5CF6",
    href: "#LINK_AFILIADO_IMPORTACAO",
  },
  {
    id: "course-gestao-precificacao",
    title: "Gestão e Precificação de E-commerce",
    description: "A parte que separa quem fatura de quem lucra: precificação correta, controle de margem e fluxo de caixa, impostos e gestão de estoque para construir um e-commerce financeiramente saudável.",
    category: "loja-virtual",
    icon: "🧮",
    tag: "Lucro Real",
    tagColor: "#10B981",
    href: "#LINK_AFILIADO_GESTAO",
  },
  {
    id: "course-cro-conversao",
    title: "Otimização de Conversão (CRO e SEO)",
    description: "Transforme visitantes em compradores: otimização de páginas, SEO para e-commerce, testes A/B e gatilhos de conversão para vender mais com o mesmo tráfego que você já paga.",
    category: "escalar",
    icon: "📊",
    tag: "Mais Vendas",
    tagColor: "#3B82F6",
    href: "#LINK_AFILIADO_CRO",
  },
];
