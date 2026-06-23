import { QuizQuestion, QuizAnswers, QuizResult } from "@/types/quiz";
import { COURSES, Course } from "@/lib/courses";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual é o seu nível de experiência com vendas online?",
    subtitle: "Isso nos ajuda a entender seu ponto de partida.",
    options: [
      {
        id: "iniciante_absoluto",
        label: "😅 Sou iniciante absoluto, nunca vendi nada online",
        weight: {
          "course-ecommerce-completo": 3,
          "course-marketplace-geral": 2,
        },
      },
      {
        id: "vendedor_informal",
        label: "📱 Já vendo informalmente pelas redes sociais (WhatsApp/Instagram)",
        weight: {
          "course-ecommerce-completo": 3,
          "course-loja-e-trafego": 2,
          "course-marketplace-geral": 3,
        },
      },
      {
        id: "lojista_fisico",
        label: "🏪 Tenho loja física e quero criar meu canal digital",
        weight: {
          "course-ecommerce-completo": 4,
          "course-loja-e-trafego": 3,
          "course-marketplace-geral": 2,
        },
      },
      {
        id: "ja_vendo_online",
        label: "📈 Já tenho operação online rodando mas quero escalar",
        weight: {
          "course-trafego-pago-avancado": 4,
          "course-automacao-ecommerce": 4,
          "course-loja-e-trafego": 1,
        },
      },
    ],
  },
  {
    id: 2,
    question: "Quanto tempo por dia você tem disponível para se dedicar?",
    options: [
      {
        id: "tempo_pouco",
        label: "⏱️ Menos de 2 horas por dia",
        weight: {
          "course-marketplace-geral": 3,
        },
      },
      {
        id: "tempo_medio",
        label: "⏰ Entre 2 e 4 horas por dia",
        weight: {
          "course-ecommerce-completo": 3,
          "course-loja-e-trafego": 2,
          "course-amazon-fba-eua": 2,
        },
      },
      {
        id: "tempo_integral",
        label: "🔥 Dedicação exclusiva / mais de 4 horas",
        weight: {
          "course-ecommerce-completo": 4,
          "course-loja-e-trafego": 3,
          "course-amazon-fba-eua": 4,
          "course-trafego-pago-avancado": 2,
        },
      },
    ],
  },
  {
    id: 3,
    question: "Qual o seu orçamento inicial disponível para investir?",
    options: [
      {
        id: "invest_baixo",
        label: "💸 Menos de R$ 500",
        weight: {
          "course-marketplace-geral": 1,
        },
      },
      {
        id: "invest_medio",
        label: "💵 Entre R$ 500 e R$ 2.000",
        weight: {
          "course-ecommerce-completo": 4,
          "course-marketplace-geral": 4,
          "course-loja-e-trafego": 1,
        },
      },
      {
        id: "invest_alto",
        label: "💰 Acima de R$ 2.000",
        weight: {
          "course-loja-e-trafego": 4,
          "course-amazon-fba-eua": 4,
          "course-trafego-pago-avancado": 3,
          "course-automacao-ecommerce": 2,
        },
      },
    ],
  },
  {
    id: 4,
    question: "Qual é o seu principal objetivo a curto/médio prazo?",
    options: [
      {
        id: "obj_marca",
        label: "🌐 Construir minha marca própria e ter controle do meu canal",
        weight: {
          "course-ecommerce-completo": 4,
          "course-loja-e-trafego": 4,
        },
      },
      {
        id: "obj_marketplace",
        label: "🛒 Aproveitar tráfego de grandes plataformas sem ter que criar site",
        weight: {
          "course-marketplace-geral": 4,
        },
      },
      {
        id: "obj_sem_estoque",
        label: "📦 Quero construir minha marca e vender online mas não possuo estoque",
        weight: {
          "course-amazon-fba-eua": 4,
        },
      },
      {
        id: "obj_otimizar",
        label: "⚙️ Otimizar e automatizar processos de vendas que já existem",
        weight: {
          "course-trafego-pago-avancado": 3,
          "course-automacao-ecommerce": 4,
        },
      },
    ],
  },
  {
    id: 5,
    question: "Você tem interesse em vender para o mercado internacional e faturar em dólar?",
    options: [
      {
        id: "dolar_sim",
        label: "💵 Sim, gostaria de faturar em dólar morando no Brasil",
        weight: {
          "course-amazon-fba-eua": 5,
        },
      },
      {
        id: "dolar_nao",
        label: "🇧🇷 Não, prefiro focar no mercado brasileiro no momento",
        weight: {
          "course-ecommerce-completo": 3,
          "course-loja-e-trafego": 2,
          "course-marketplace-geral": 3,
        },
      },
    ],
  },
  {
    id: 6,
    question: "Qual tipo de estratégia de vendas te atrai mais?",
    options: [
      {
        id: "estr_videos",
        label: "🎵 Vender por vídeos rápidos, tendências virais e redes sociais",
        weight: {
          "course-loja-e-trafego": 3,
          "course-marketplace-geral": 2,
        },
      },
      {
        id: "estr_buscas",
        label: "🛍️ Vender na maior vitrine do país onde o cliente já está buscando",
        weight: {
          "course-marketplace-geral": 4,
          "course-ecommerce-completo": 2,
        },
      },
      {
        id: "estr_anuncios",
        label: "🎯 Criar uma estrutura de anúncios diretos focados em conversão",
        weight: {
          "course-loja-e-trafego": 3,
          "course-trafego-pago-avancado": 4,
        },
      },
    ],
  },
  {
    id: 7,
    question: "Qual é o seu maior gargalo ou receio hoje?",
    options: [
      {
        id: "receio_logistica",
        label: "🚚 Custos logísticos e gastar muito comprando estoque antecipadamente",
        weight: {
          "course-amazon-fba-eua": 4,
        },
      },
      {
        id: "receio_anuncios",
        label: "💸 Gastar dinheiro em anúncios sem ter resultados",
        weight: {
          "course-loja-e-trafego": 2,
          "course-trafego-pago-avancado": 4,
          "course-ecommerce-completo": 1,
        },
      },
      {
        id: "receio_integracao",
        label: "🛠️ Burocracia fiscal e falta de orientação para integrar processos",
        weight: {
          "course-ecommerce-completo": 3,
          "course-automacao-ecommerce": 4,
        },
      },
    ],
  },
];

const DIAGNOSIS_MAP: Record<
  string,
  { headline: string; diagnosis: string }
> = {
  "course-ecommerce-completo": {
    headline: "🎯 Seu Plano: Estrutura Geral e Base Sólida Multicanal",
    diagnosis: "Seu perfil indica que você precisa de uma base sólida abrangente. Recomendamos focar no curso E-commerce Completo, que cobre desde a criação de sua loja própria até estratégias básicas em múltiplos canais. Ele ajudará você a entender a engrenagem digital como um todo.",
  },
  "course-loja-e-trafego": {
    headline: "⚡ Seu Plano: Construção de Marca Própria e Conversão Direta",
    diagnosis: "Você está inclinado a construir seu próprio canal com controle de tráfego. O ideal é o curso Criação de Loja Própria e Tráfego, que ensina de forma prática a montar sua loja Nuvemshop ou Shopify e estruturar funis de captação focados em vendas no seu domínio.",
  },
  "course-marketplace-geral": {
    headline: "🛒 Seu Plano: Venda Onde o Tráfego de Compradores Já Existe",
    diagnosis: "Você prefere ter vendas ativas rápidas sem a complexidade técnica de gerenciar um site. A Formação Marketplace Geral é perfeita por consolidar as melhores estratégias no Mercado Livre, Shopee e Amazon em um único aprendizado focado em conversão.",
  },
  "course-amazon-fba-eua": {
    headline: "💵 Seu Plano: Operação Internacional e Faturamento em Dólar",
    diagnosis: "Você quer faturar em dólar de forma séria. O curso Amazon FBA nos EUA é a indicação certa, mostrando como enviar produtos para os centros de distribuição da Amazon americana e terceirizar todo o envio e pós-venda na maior economia mundial.",
  },
  "course-trafego-pago-avancado": {
    headline: "🎯 Seu Plano: Otimização de ROI e Escala com Tráfego Pago",
    diagnosis: "Você já está vendendo ou possui experiência, mas sofre com o CAC elevado. Focar no curso Tráfego Pago Avançado ajudará você a otimizar a distribuição de mídia no Meta, Google e TikTok Ads para consolidar suas margens de lucro.",
  },
  "course-automacao-ecommerce": {
    headline: "🤖 Seu Plano: Automação e Redução de Custos Operacionais",
    diagnosis: "Sua barreira é a operação manual cansativa ou a integração de sistemas. O curso de Automação de E-commerce ensinará a organizar ERPs, controlar estoques entre canais e rodar um negócio eficiente que cresce de forma automatizada.",
  },
};

export function calcularResultado(answers: QuizAnswers): QuizResult {
  // Initialize scores for each course at 0
  const scores: Record<string, number> = {};
  COURSES.forEach((c) => {
    scores[c.id] = 0;
  });

  // Calculate scores based on weights
  QUIZ_QUESTIONS.forEach((q) => {
    const selectedId = answers[q.id];
    const option = q.options.find((o) => o.id === selectedId);
    if (option) {
      Object.entries(option.weight).forEach(([courseId, pts]) => {
        if (scores[courseId] !== undefined) {
          scores[courseId] += pts;
        }
      });
    }
  });

  // Sort courses by score descending
  const sortedCourses = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([courseId]) => COURSES.find((c) => c.id === courseId) as Course);

  const recommendedCourse = sortedCourses[0];
  // Select the next 2 highest scoring courses that belong to different IDs
  const secondaryCourses = sortedCourses.slice(1, 3);

  const diag = DIAGNOSIS_MAP[recommendedCourse.id] || {
    headline: "✨ Seu Plano de Vendas Personalizado",
    diagnosis: "Com base nas suas respostas, estruturamos uma combinação de cursos ideal para você iniciar ou acelerar sua presença no comércio eletrônico com segurança.",
  };

  return {
    profile: recommendedCourse.id,
    headline: diag.headline,
    diagnosis: diag.diagnosis,
    recommendedCourse,
    secondaryCourses,
  };
}
