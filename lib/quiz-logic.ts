import { QuizQuestion, QuizAnswers, QuizResult, ResultProfile } from "@/types/quiz";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual é a sua situação atual?",
    subtitle: "Isso nos ajuda a entender seu ponto de partida.",
    options: [
      { id: "loja_mais1ano", label: "🏪 Tenho loja física há mais de 1 ano",
        weight: { LOJISTA_MIGRANDO: 3 } },
      { id: "loja_menos1ano", label: "🏗️ Tenho loja física há menos de 1 ano",
        weight: { LOJISTA_MIGRANDO: 2, MARKETPLACE_INICIANTE: 1 } },
      { id: "nunca_tive", label: "🚀 Nunca tive loja, quero começar do zero",
        weight: { MARKETPLACE_INICIANTE: 2, INICIANTE_SEM_CAPITAL: 1 } },
      { id: "ja_online", label: "💻 Já vendo online mas sem resultado",
        weight: { DIGITAL_SEM_ROI: 3 } },
    ],
  },
  {
    id: 2,
    question: "Qual é o seu objetivo principal?",
    options: [
      { id: "substituir_renda", label: "💰 Substituir ou complementar minha renda",
        weight: { MARKETPLACE_INICIANTE: 2, INICIANTE_SEM_CAPITAL: 1 } },
      { id: "primeiro_negocio", label: "🌱 Abrir meu primeiro negócio",
        weight: { MARKETPLACE_INICIANTE: 1, INICIANTE_SEM_CAPITAL: 2 } },
      { id: "migrar", label: "🔄 Migrar do físico para o digital",
        weight: { LOJISTA_MIGRANDO: 3 } },
      { id: "escalar", label: "📈 Escalar um negócio que já existe",
        weight: { DIGITAL_SEM_ROI: 2, MULTICANAL: 2 } },
    ],
  },
  {
    id: 3,
    question: "Qual o seu nível de experiência com vendas online?",
    options: [
      { id: "zero", label: "😅 Zero — nunca vendi nada online",
        weight: { INICIANTE_SEM_CAPITAL: 2, MARKETPLACE_INICIANTE: 1 } },
      { id: "informal", label: "📱 Já vendi informal pelo WhatsApp ou Instagram",
        weight: { MARKETPLACE_INICIANTE: 2 } },
      { id: "marketplace_exp", label: "🛒 Tenho experiência com Mercado Livre ou Shopee",
        weight: { MULTICANAL: 2, DIGITAL_SEM_ROI: 1 } },
      { id: "loja_virtual", label: "🌐 Tenho loja virtual mas não converte bem",
        weight: { DIGITAL_SEM_ROI: 3 } },
    ],
  },
  {
    id: 4,
    question: "Onde você quer vender?",
    subtitle: "Pode ser o canal dos seus sonhos ou onde já tem experiência.",
    options: [
      { id: "amazon", label: "💵 Amazon — quero vender em dólar",
        weight: { AMAZON_FOCO: 4 } },
      { id: "mercado_livre", label: "🛍️ Mercado Livre",
        weight: { MARKETPLACE_INICIANTE: 3 } },
      { id: "shopee", label: "📦 Shopee",
        weight: { SHOPEE_FOCO: 4 } },
      { id: "loja_propria", label: "🌐 Quero minha própria loja virtual",
        weight: { LOJISTA_MIGRANDO: 2, DIGITAL_SEM_ROI: 1 } },
      { id: "todos", label: "🚀 Quero estar em todos os canais",
        weight: { MULTICANAL: 4 } },
      { id: "nao_sei", label: "🤷 Ainda não sei, preciso de orientação",
        weight: { PRECISA_ORIENTACAO: 3, MARKETPLACE_INICIANTE: 1 } },
    ],
  },
  {
    id: 5,
    question: "Quanto você pode investir para começar?",
    options: [
      { id: "menos500", label: "💸 Menos de R$500",
        weight: { INICIANTE_SEM_CAPITAL: 3, SHOPEE_FOCO: 1 } },
      { id: "ate2000", label: "💵 Entre R$500 e R$2.000",
        weight: { MARKETPLACE_INICIANTE: 2, SHOPEE_FOCO: 1 } },
      { id: "acima2000", label: "💰 Acima de R$2.000",
        weight: { LOJISTA_MIGRANDO: 1, AMAZON_FOCO: 1, MULTICANAL: 2 } },
    ],
  },
  {
    id: 6,
    question: "Qual é a sua maior barreira hoje?",
    options: [
      { id: "nao_sei_comecar", label: "🧭 Não sei por onde começar",
        weight: { PRECISA_ORIENTACAO: 2, INICIANTE_SEM_CAPITAL: 1 } },
      { id: "medo_burocracia", label: "😰 Medo de burocracia e custos fixos",
        weight: { LOJISTA_MIGRANDO: 2, INICIANTE_SEM_CAPITAL: 1 } },
      { id: "tentei_falhou", label: "😔 Já tentei vender online e não consegui",
        weight: { DIGITAL_SEM_ROI: 3 } },
      { id: "custo_fisico", label: "💸 Meu negócio físico está me custando muito",
        weight: { LOJISTA_MIGRANDO: 3 } },
    ],
  },
  {
    id: 7,
    question: "Quanto tempo por dia você pode dedicar ao negócio digital?",
    options: [
      { id: "menos1h", label: "⏱️ Menos de 1 hora por dia",
        weight: { SHOPEE_FOCO: 1, MARKETPLACE_INICIANTE: 1 } },
      { id: "1a3h", label: "⏰ Entre 1 e 3 horas por dia",
        weight: { MARKETPLACE_INICIANTE: 1, AMAZON_FOCO: 1 } },
      { id: "integral", label: "🔥 Tenho tempo integral disponível",
        weight: { MULTICANAL: 2, LOJISTA_MIGRANDO: 1, AMAZON_FOCO: 1 } },
    ],
  },
];

export function calcularResultado(answers: QuizAnswers): QuizResult {
  const score: Record<ResultProfile, number> = {
    MARKETPLACE_INICIANTE: 0,
    LOJISTA_MIGRANDO: 0,
    AMAZON_FOCO: 0,
    SHOPEE_FOCO: 0,
    MULTICANAL: 0,
    DIGITAL_SEM_ROI: 0,
    INICIANTE_SEM_CAPITAL: 0,
    PRECISA_ORIENTACAO: 0,
  };

  QUIZ_QUESTIONS.forEach((q) => {
    const answerId = answers[q.id];
    const option = q.options.find((o) => o.id === answerId);
    if (option) {
      Object.entries(option.weight).forEach(([profile, pts]) => {
        score[profile as ResultProfile] += pts ?? 0;
      });
    }
  });

  const profile = Object.entries(score)
    .sort((a, b) => b[1] - a[1])[0][0] as ResultProfile;

  return RESULT_MAP[profile];
}

export const RESULT_MAP: Record<ResultProfile, QuizResult> = {
  MARKETPLACE_INICIANTE: {
    profile: "MARKETPLACE_INICIANTE",
    headline: "✅ Seu Plano: Comece Vendendo Onde os Clientes Já Estão",
    diagnosis: "Você está no momento ideal para entrar nos grandes marketplaces brasileiros. Com baixo investimento inicial e sem precisar criar sua própria loja, você pode ter sua primeira venda em dias.",
    recommendations: [
      { label: "Mercado Livre do Zero ao Primeiro Pedido", href: "#LINK_AFILIADO_ML", icon: "🛍️", badge: "Mais Popular" },
      { label: "Shopee para Iniciantes — Comece Hoje", href: "#LINK_AFILIADO_SHOPEE", icon: "📦" },
    ],
  },
  LOJISTA_MIGRANDO: {
    profile: "LOJISTA_MIGRANDO",
    headline: "⚡ Seu Plano: Migre do Físico para o Digital Sem Perder Clientes",
    diagnosis: "Seus custos fixos estão consumindo sua margem enquanto o tráfego de rua encolhe. O plano ideal cria um canal digital que funciona 24h e permite reduzir sua dependência do ponto físico com segurança.",
    recommendations: [
      { label: "Como Criar Sua Loja Virtual do Zero", href: "#LINK_AFILIADO_LOJA_VIRTUAL", icon: "🌐", badge: "Urgente" },
      { label: "E-commerce Completo — Da Loja Física ao Digital", href: "#LINK_AFILIADO_ECOMMERCE", icon: "🔄" },
      { label: "Gestão de Estoque para E-commerce", href: "#LINK_AFILIADO_GESTAO", icon: "📦" },
    ],
  },
  AMAZON_FOCO: {
    profile: "AMAZON_FOCO",
    headline: "💵 Seu Plano: Ganhe em Dólar Morando no Brasil",
    diagnosis: "A Amazon é o maior marketplace do mundo e aceita vendedores brasileiros. Com o modelo FBA (Fulfillment by Amazon), você vende para os EUA e a Europa sem sair de casa e sem falar inglês.",
    recommendations: [
      { label: "Amazon FBA Brasil — Venda em Dólar", href: "#LINK_AFILIADO_AMAZON_FBA", icon: "💵", badge: "Alto Potencial" },
      { label: "Private Label na Amazon — Marca Própria Internacional", href: "#LINK_AFILIADO_AMAZON_PL", icon: "🏷️" },
    ],
  },
  SHOPEE_FOCO: {
    profile: "SHOPEE_FOCO",
    headline: "📦 Seu Plano: Shopee — O Marketplace que Mais Cresce no Brasil",
    diagnosis: "A Shopee tem o menor custo de entrada entre os grandes marketplaces e cobra 0% de comissão em várias categorias. É o ambiente ideal para quem começa com pouco capital e quer resultado rápido.",
    recommendations: [
      { label: "Shopee do Zero — Primeiros R$5.000 no Mês", href: "#LINK_AFILIADO_SHOPEE_ZERO", icon: "📦", badge: "Baixo Investimento" },
      { label: "Dropshipping na Shopee — Sem Estoque", href: "#LINK_AFILIADO_DROP_SHOPEE", icon: "🚚" },
    ],
  },
  MULTICANAL: {
    profile: "MULTICANAL",
    headline: "🚀 Seu Plano: Presença Total — Venda em Todos os Canais",
    diagnosis: "Você tem visão estratégica e quer construir um negócio digital completo. A abordagem multicanal é a que gera maior receita a longo prazo: marketplace + loja própria + redes sociais funcionando juntos.",
    recommendations: [
      { label: "E-commerce Multicanal Completo", href: "#LINK_AFILIADO_MULTICANAL", icon: "🚀", badge: "Visão Completa" },
      { label: "Tráfego Pago para E-commerce — Google e Meta Ads", href: "#LINK_AFILIADO_TRAFEGO", icon: "📈" },
      { label: "Automação de Vendas Online", href: "#LINK_AFILIADO_AUTOMACAO", icon: "🤖" },
    ],
  },
  DIGITAL_SEM_ROI: {
    profile: "DIGITAL_SEM_ROI",
    headline: "🔬 Seu Plano: Você Investe, Mas Não Converte — Isso Tem Solução",
    diagnosis: "O problema raramente é o produto ou o orçamento de mídia. É a ausência de uma estrutura otimizada para conversão. Uma plataforma certa + funil bem configurado pode multiplicar seus resultados sem aumentar o investimento.",
    recommendations: [
      { label: "Otimização de Conversão para E-commerce", href: "#LINK_AFILIADO_CRO", icon: "📊", badge: "Alta Conversão" },
      { label: "Google Ads para E-commerce — ROI Real", href: "#LINK_AFILIADO_GADS", icon: "🎯" },
      { label: "Plataforma de E-commerce de Alta Conversão", href: "#LINK_AFILIADO_PLATAFORMA", icon: "🌐" },
    ],
  },
  INICIANTE_SEM_CAPITAL: {
    profile: "INICIANTE_SEM_CAPITAL",
    headline: "💡 Seu Plano: Comece Hoje Sem Investimento Inicial",
    diagnosis: "Falta de capital não é barreira para entrar no digital. Os modelos de dropshipping e marketplace permitem vender sem estoque e sem loja física. Com menos de R$100 você pode ter seu negócio ativo esta semana.",
    recommendations: [
      { label: "Dropshipping do Zero — Sem Estoque, Sem Capital", href: "#LINK_AFILIADO_DROPSHIPPING", icon: "🚚", badge: "Começo Ideal" },
      { label: "Shopee Sem Estoque — Modelo Dropshipping", href: "#LINK_AFILIADO_DROP_SHOPEE", icon: "📦" },
    ],
  },
  PRECISA_ORIENTACAO: {
    profile: "PRECISA_ORIENTACAO",
    headline: "🧭 Seu Plano: Primeiro, Vamos Escolher o Melhor Caminho Para Você",
    diagnosis: "Não saber por onde começar é o primeiro passo honesto de qualquer empreendedor inteligente. Com base no seu perfil, o caminho mais seguro é começar pelos marketplaces: baixo risco, zero burocracia e primeiros resultados em dias.",
    recommendations: [
      { label: "Guia Completo: Qual Canal de Vendas Escolher?", href: "#LINK_AFILIADO_GUIA", icon: "🧭", badge: "Comece Aqui" },
      { label: "Mercado Livre para Iniciantes Absolutos", href: "#LINK_AFILIADO_ML", icon: "🛍️" },
    ],
  },
};
