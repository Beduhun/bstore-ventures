import nodemailer from "nodemailer";
import { COURSES, Course } from "./courses";

// Helper to get SMTP transporter
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    // If not configured, print warning and return null (mock mode)
    console.warn("[email-sender] SMTP not configured. Emails will be logged to console only.");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for others
    auth: {
      user,
      pass,
    },
  });
}

// Map course ID to specific email template content
const EMAIL_TEMPLATES: Record<
  string,
  { subject: string; intro: string; body: string; blogSlugs: string[] }
> = {
  "course-ecommerce-completo": {
    subject: "Seu Diagnóstico B'Store: Plano E-commerce Completo 🌐",
    intro: "Parabéns por dar o primeiro passo para estruturar seu negócio online!",
    body: "Seu perfil indicou que o **E-commerce Completo** é o ponto de partida ideal para você. Este curso é o coração do nosso site e ensina a base de tudo: como estruturar seu canal próprio de vendas, posicionar-se nos principais marketplaces e atrair seus primeiros clientes com tráfego direto. Recomendamos que você comece com este método para ter uma visão geral consolidada antes de se aprofundar em conhecimentos específicos.",
    blogSlugs: ["como-sair-da-loja-fisica-para-o-digital", "plataformas-ecommerce-comparativo"],
  },
  "course-loja-e-trafego": {
    subject: "Seu Diagnóstico B'Store: Criação de Loja Própria e Tráfego Pago ⚡",
    intro: "É hora de construir sua marca e ter controle total de suas vendas!",
    body: "Com base nas suas respostas, você deve focar em **Criação de Loja Própria e Tráfego**. Ter sua própria vitrine (em plataformas como Shopify ou Nuvemshop) protege suas margens de lucro contra as comissões de terceiros. Seu foco imediato deve ser aprender a configurar a parte técnica do site e criar campanhas de anúncios diretos no Google e no Facebook Ads para atrair compradores qualificados.",
    blogSlugs: ["plataformas-ecommerce-comparativo", "comportamento-consumidor-frete-gratis-dados"],
  },
  "course-marketplace-geral": {
    subject: "Seu Diagnóstico B'Store: Formação Marketplace Geral 🛒",
    intro: "Aproveite o tráfego dos maiores gigantes do varejo nacional!",
    body: "Seu perfil aponta que a **Formação Marketplace Geral** é o seu caminho ideal. Vender no Mercado Livre, Shopee e Amazon permite que você anuncie para milhões de compradores ativos diários sem precisar investir alto em tráfego pago ou criar um site próprio do zero. Seu foco deve ser aprender a otimizar títulos (SEO de anúncios), preencher fichas técnicas e utilizar a logística integrada deles (como o Full do Mercado Livre) para ganhar destaque rápido.",
    blogSlugs: ["mercado-livre-recorde-entregas-rapidas", "dados-faturamento-shopee-brasil-2025"],
  },
  "course-tiktok-shop": {
    subject: "Seu Diagnóstico B'Store: Venda Viral no TikTok Shop 🎵",
    intro: "Surfe a maior novidade do social commerce mundial!",
    body: "O resultado do seu diagnóstico indica que o **TikTok Shop** é a sua melhor oportunidade. Sendo a mais recente novidade de mercado, o TikTok Shop permite vender produtos de forma nativa e rápida por meio de vídeos curtos. Se você gosta de produzir conteúdo ou quer aproveitar o tráfego orgânico gerado pelo algoritmo de vídeos virais, este é o canal certo para se posicionar antes da concorrência.",
    blogSlugs: ["tiktok-shop-nova-onda-vendas", "crescimento-social-commerce-brasil-dados"],
  },
  "course-dropshipping-padrao": {
    subject: "Seu Diagnóstico B'Store: Operação Dropshipping Padrão 🚚",
    intro: "Abra sua loja online e venda sem precisar investir em estoque!",
    body: "Seu principal gargalo é o capital para estoque, por isso o **Dropshipping Padrão** é o modelo de negócio ideal para o seu momento. Ele permite criar sua vitrine virtual e intermediar vendas conectando-se a fornecedores parceiros que realizam o despacho da mercadoria direto para o cliente final. O segredo é focar em validar fornecedores locais no Brasil para oferecer entregas rápidas e de qualidade.",
    blogSlugs: ["dropshipping-em-2026-vale-a-pena", "taxacao-compras-internacionais-impacto-dropshipping"],
  },
  "course-amazon-fba-eua": {
    subject: "Seu Diagnóstico B'Store: Amazon FBA EUA — Faturamento em Dólar 💵",
    intro: "Venda no maior mercado consumidor do mundo morando no Brasil!",
    body: "Seu interesse em internacionalização e ganhos em dólar aponta para o **Amazon FBA nos Estados Unidos**. Com esse modelo, você envia mercadorias em lote direto para os centros de distribuição da Amazon americana (Fulfillment Center) e deixa que eles cuidem do armazenamento, envio rápido Prime e pós-venda em inglês, permitindo que você gerencie uma empresa global do conforto de sua casa.",
    blogSlugs: ["amazon-fba-eua-lucro-2026", "importar-para-vender-na-amazon-eua-passos"],
  },
  "course-trafego-pago-avancado": {
    subject: "Seu Diagnóstico B'Store: Escala Avançada de Tráfego Pago 🎯",
    intro: "Reduza o seu CAC e multiplique a margem de suas campanhas!",
    body: "Você já possui vendas ou operação, mas precisa reduzir custos. O curso de **Tráfego Pago Avançado** ajudará você a refinar suas estratégias no Facebook, Instagram, Google e TikTok Ads. Você aprenderá a fazer análises de atribuição de dados, remarketing focado em carrinhos abandonados e otimizar criativos para converter mais com o menor custo de aquisição possível.",
    blogSlugs: ["trafego-pago-e-commerce-2026", "velocidade-carregamento-conversao-dados"],
  },
  "course-automacao-ecommerce": {
    subject: "Seu Diagnóstico B'Store: Automação e Processos de Escala 🤖",
    intro: "Aumente a eficiência operacional e reduza erros manuais em sua loja!",
    body: "Sua operação cresceu e o trabalho manual está limitando seu tempo. O curso de **Automação de E-commerce** é o indicado para você. Aprenda a configurar ERPs (como o Bling) para emitir notas fiscais de forma automática, integrar estoques entre múltiplos canais simultaneamente e criar fluxos integrados de rastreio e atendimento para otimizar suas margens de lucro.",
    blogSlugs: ["tendencias-inteligencia-artificial-atendimento-ecommerce", "ecommerce-brasil-crescimento"],
  },
};

export async function sendWelcomeEmail(
  toEmail: string,
  toName: string,
  recommendedCourse: Course
): Promise<boolean> {
  const template = EMAIL_TEMPLATES[recommendedCourse.id];
  if (!template) return false;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bstoreventures.com.br";
  const categoryLink = `${siteUrl}/categorias/${recommendedCourse.category}`;

  const blogLinksHtml = template.blogSlugs
    .map((slug) => {
      const url = `${siteUrl}/blog/${slug}`;
      const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      return `<li><a href="${url}" style="color: #00C4FF; text-decoration: underline; font-weight: 600;">${title}</a></li>`;
    })
    .join("");

  const emailHtml = `
    <div style="background-color: #071A38; color: #F0F6FF; font-family: sans-serif; padding: 40px 20px; text-align: center;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #0B2545; border: 1px solid #00C4FF33; border-radius: 20px; padding: 40px 30px; text-align: left; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
        <h2 style="color: #FFFFFF; font-size: 24px; border-bottom: 2px solid #00C4FF; padding-bottom: 12px; margin-top: 0; font-weight: 900;">B'Store Ventures</h2>
        <p style="font-size: 16px; color: #F0F6FF; font-weight: 600;">Olá, ${toName}!</p>
        <p style="font-size: 14.5px; color: #9EBDDF; line-height: 1.6;">${template.intro}</p>
        <p style="font-size: 14.5px; color: #9EBDDF; line-height: 1.6;">${template.body}</p>
        
        <div style="background: rgba(0, 196, 255, 0.05); border: 1px solid #00C4FF55; border-radius: 12px; padding: 20px; margin: 24px 0;">
          <h3 style="margin-top: 0; color: #00C4FF; font-size: 18px; font-weight: 800;">🏆 Recomendação Principal</h3>
          <p style="font-size: 15px; color: #FFFFFF; font-weight: 700; margin: 8px 0;">${recommendedCourse.icon} ${recommendedCourse.title}</p>
          <p style="font-size: 13.5px; color: #9EBDDF; line-height: 1.5; margin-bottom: 16px;">${recommendedCourse.description}</p>
          <a href="${recommendedCourse.href}" style="background-color: #00C4FF; color: #0B2545; padding: 12px 24px; border-radius: 8px; font-weight: 700; text-decoration: none; display: inline-block; text-align: center;">Acessar Curso Indicado →</a>
        </div>

        <h3 style="color: #FFFFFF; font-size: 16px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 18px;">📚 Artigos recomendados para você ler hoje:</h3>
        <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
          ${blogLinksHtml}
        </ul>

        <p style="font-size: 14.5px; color: #9EBDDF; margin-top: 28px;">
          Se deseja explorar outros cursos da mesma categoria, acesse nosso portal dedicado:
          <br/>
          <a href="${categoryLink}" style="color: #00C4FF; text-decoration: underline; font-weight: 600;">Ver Todos os Cursos da Categoria</a>
        </p>

        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 30px 0;" />
        
        <p style="font-size: 11px; color: #7A9CC2; text-align: center; line-height: 1.5;">
          Você recebeu este e-mail porque preencheu o diagnóstico em nosso site e autorizou o envio de comunicações de acordo com a LGPD.
          <br/>
          Se deseja parar de receber nossos e-mails ou excluir seus dados cadastrados, envie uma solicitação para <a href="mailto:bstore.ventures@gmail.com" style="color: #00C4FF;">bstore.ventures@gmail.com</a>.
        </p>
      </div>
    </div>
  `;

  const transporter = getTransporter();
  if (!transporter) {
    // Mock mode: log HTML to console/logs
    console.log(`\n=================== [MOCK EMAIL SENT] ===================`);
    console.log(`Para: ${toEmail} (${toName})`);
    console.log(`Assunto: ${template.subject}`);
    console.log(`Curso Recomendado: ${recommendedCourse.title}`);
    console.log(`Corpo (resumo): ${template.intro}`);
    console.log(`===========================================================\n`);
    return true;
  }

  try {
    const fromEmail = process.env.SMTP_FROM || `"B'Store Ventures" <noreply@bstoreventures.com.br>`;
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: template.subject,
      html: emailHtml,
    });
    console.log(`[email-sender] Welcome email sent successfully to ${toEmail}`);
    return true;
  } catch (err) {
    console.error("[email-sender] Failed to send email via SMTP:", err);
    return false;
  }
}

export const FOLLOWUP_TEMPLATES: Record<
  string,
  Record<
    number,
    { subject: string; intro: string; body: string; promoteCourseId: string; blogSlugs: string[] }
  >
> = {
  "course-ecommerce-completo": {
    1: {
      subject: "Dica B'Store: A importância de ter sua Loja Virtual própria! 🌐",
      intro: "No e-commerce, depender apenas de um canal é um risco. Você precisa da sua marca própria!",
      body: "No primeiro e-mail te apresentamos o método E-commerce Completo. Hoje queremos destacar a importância de ter sua própria vitrine de vendas (com plataformas como Shopify ou Nuvemshop). Isso garante que você não dependa das comissões abusivas e das regras instáveis dos marketplaces. O curso **Criação de Loja Própria e Tráfego** é o complemento perfeito para você dominar anúncios diretos e reter seus próprios clientes.",
      promoteCourseId: "course-loja-e-trafego",
      blogSlugs: ["plataformas-ecommerce-comparativo", "velocidade-carregamento-conversao-dados"],
    },
    2: {
      subject: "Mini-Curso Grátis: Dominando Marketplaces no Orgânico 🚀",
      intro: "Quer faturar sem gastar rios de dinheiro com anúncios pagos? Aprenda a vender em marketplaces!",
      body: "Para fechar seu plano, queremos te apresentar o potencial dos marketplaces (Mercado Livre e Shopee). O curso **Formação Marketplace Geral** te ensinará a ranquear seus anúncios de graça na busca orgânica deles. Criamos um guia com mini-cursos práticos para você dar seus primeiros passos hoje.",
      promoteCourseId: "course-marketplace-geral",
      blogSlugs: ["minicurso-mercadolivre-primeira-venda", "minicurso-shopee-cadastro-produtos-otimizado"],
    }
  },
  "course-loja-e-trafego": {
    1: {
      subject: "Dica B'Store: Como escalar suas vendas com Tráfego Avançado ⚡",
      intro: "Sua loja está no ar? Agora o combustível é o tráfego qualificado!",
      body: "Você já sabe criar sua loja própria, mas para vender de verdade, o tráfego precisa ser cirúrgico. A indicação perfeita para este passo é o curso **Tráfego Pago Avançado**. Nele você aprenderá escala real de orçamento no Facebook Ads, Instagram e Google Ads sem queimar caixa.",
      promoteCourseId: "course-trafego-pago-avancado",
      blogSlugs: ["trafego-pago-e-commerce-2026", "minicurso-facebook-ads-pixel-conversao"],
    },
    2: {
      subject: "Automação e ERP: Como gerenciar 100+ pedidos por dia sem estresse 🤖",
      intro: "Escalar sem organização gera caos. Prepare-se para faturar alto automatizando tudo!",
      body: "Quando suas campanhas de tráfego começarem a converter, você precisará automatizar a emissão de notas fiscais e controle de estoque. O curso **Automação de E-commerce** ensina a integrar o Bling ERP à sua loja de forma perfeita.",
      promoteCourseId: "course-automacao-ecommerce",
      blogSlugs: ["tendencias-inteligencia-artificial-atendimento-ecommerce", "minicurso-configurar-erp-bling-ecommerce"],
    }
  },
  "course-marketplace-geral": {
    1: {
      subject: "Novidade: Como vender no TikTok Shop e surfar o novo algoritmo! 🎵",
      intro: "O TikTok Shop acabou de chegar e está entregando muito tráfego orgânico gratuito!",
      body: "Vender nos grandes marketplaces é ótimo, mas se posicionar no **TikTok Shop** agora é uma oportunidade de ouro. Aprenda como criar vídeos rápidos que viralizam e vendem de forma nativa no aplicativo.",
      promoteCourseId: "course-tiktok-shop",
      blogSlugs: ["tiktok-shop-nova-onda-vendas", "minicurso-tiktok-criativos-que-vendem"],
    },
    2: {
      subject: "Escalando Marketplaces: Integre tudo via ERP e multiplique seus canais 🤖",
      intro: "Controlar estoque de Shopee, Mercado Livre e Amazon manualmente é impossível. Automatize!",
      body: "Agora que você já está anunciando nos marketplaces, conecte todos eles a um ERP central para controle unificado de estoque e emissão de notas. O curso **Automação de E-commerce** te mostrará o passo a passo técnico.",
      promoteCourseId: "course-automacao-ecommerce",
      blogSlugs: ["minicurso-configurar-erp-bling-ecommerce", "tendencias-inteligencia-artificial-atendimento-ecommerce"],
    }
  },
  "course-tiktok-shop": {
    1: {
      subject: "Expandindo canais: Como cadastrar seus produtos nos grandes Marketplaces 🛒",
      intro: "Não dependa apenas de um canal de vendas. Venda no Mercado Livre e Shopee!",
      body: "O TikTok Shop é espetacular para tráfego rápido de criadores, mas consolidar suas ofertas na **Formação Marketplace Geral** garantirá um fluxo estável de faturamento diário passivo nos maiores varejistas.",
      promoteCourseId: "course-marketplace-geral",
      blogSlugs: ["dados-faturamento-shopee-brasil-2025", "minicurso-shopee-cadastro-produtos-otimizado"],
    },
    2: {
      subject: "Construindo sua Marca: Dê o próximo passo com sua Loja Virtual própria 🌐",
      intro: "Saia do aluguel de plataformas de terceiros e crie sua própria marca forte!",
      body: "Para estruturar um ativo real de negócios e ter uma base de clientes própria, você precisa do curso **E-commerce Completo**. Ele te ensinará a criar um site unificado integrado e sustentável a longo prazo.",
      promoteCourseId: "course-ecommerce-completo",
      blogSlugs: ["crescimento-social-commerce-brasil-dados", "como-sair-da-loja-fisica-para-o-digital"],
    }
  },
  "course-dropshipping-padrao": {
    1: {
      subject: "Oportunidade Global: Como faturar em Dólar vendendo na Amazon EUA 💵",
      intro: "Venda sem estoque no maior e-commerce do planeta morando no Brasil!",
      body: "Você já compreende o dropshipping nacional. O próximo nível lógico é a escala em dólar. Com o curso **Amazon FBA nos Estados Unidos**, você vende direto na Amazon americana enviando estoque sob demanda via parceiros, faturando na moeda mais forte do mundo.",
      promoteCourseId: "course-amazon-fba-eua",
      blogSlugs: ["amazon-fba-eua-lucro-2026", "minicurso-amazon-fba-calculo-margem"],
    },
    2: {
      subject: "Escala de Dropshipping: Otimize anúncios e domine o Pixel de Conversão 🎯",
      intro: "O segredo do dropshipping lucrativo está na otimização de campanhas e copy!",
      body: "Com o dropshipping estruturado, você precisa dominar mídia paga. A indicação certa para alavancar seu tráfego é o curso **Tráfego Pago Avançado**, que aborda escala de Meta e Google Ads.",
      promoteCourseId: "course-trafego-pago-avancado",
      blogSlugs: ["trafego-pago-e-commerce-2026", "minicurso-facebook-ads-pixel-conversao"],
    }
  },
  "course-amazon-fba-eua": {
    1: {
      subject: "Trabalhando no Brasil: Como iniciar no Dropshipping Nacional sem estoque 🚚",
      intro: "Quer diversificar seus ganhos e vender localmente no Brasil sem estoque?",
      body: "Faturar in dólar é fantástico. Mas o mercado de dropshipping nacional no Brasil está aquecido e com entregas de 2 a 5 dias. O curso **Dropshipping Padrão** ensinará você a encontrar fornecedores locais confiáveis.",
      promoteCourseId: "course-dropshipping-padrao",
      blogSlugs: ["dropshipping-em-2026-vale-a-pena", "minicurso-dropshipping-nacional-fornecedores"],
    },
    2: {
      subject: "Mídia Paga Avançada: Como escalar suas vendas globais de forma assertiva 🎯",
      intro: "Quer posicionar seus produtos da Amazon EUA nos topos de busca? Domine tráfego!",
      body: "Aprenda a criar anúncios de alta conversão para alavancar suas listagens de produtos. O curso **Tráfego Pago Avançado** vai te dar o direcionamento exato sobre criativos e funis de marketing.",
      promoteCourseId: "course-trafego-pago-avancado",
      blogSlugs: ["trafego-pago-e-commerce-2026", "minicurso-facebook-ads-pixel-conversao"],
    }
  },
  "course-trafego-pago-avancado": {
    1: {
      subject: "Automação Operacional: Integre suas campanhas ao controle de ERP 🤖",
      intro: "Evite gargalos operacionais! Quando as vendas escalam, a automação é obrigatória.",
      body: "Suas campanhas estão otimizadas e o tráfego está bombando? Agora você precisa de automação para emissão automática de notas fiscais e gestão de estoque. Conheça o curso **Automação de E-commerce**.",
      promoteCourseId: "course-automacao-ecommerce",
      blogSlugs: ["tendencias-inteligencia-artificial-atendimento-ecommerce", "minicurso-configurar-erp-bling-ecommerce"],
    },
    2: {
      subject: "Visão Geral: O método definitivo do E-commerce Multicanal 🌐",
      intro: "Consolide toda a sua operação e atue em múltiplos canais integrados de forma profissional.",
      body: "Para ter um panorama completo e atuar como um verdadeiro executivo de e-commerce, o curso **E-commerce Completo** te dará o direcionamento unificado de todas as áreas de negócios.",
      promoteCourseId: "course-ecommerce-completo",
      blogSlugs: ["como-sair-da-loja-fisica-para-o-digital", "velocidade-carregamento-conversao-dados"],
    }
  },
  "course-automacao-ecommerce": {
    1: {
      subject: "Escala em Mídia: Otimize anúncios e melhore o ROI das integrações 🎯",
      intro: "Sua operação está automatizada? Agora aumente o volume de pedidos sem medo!",
      body: "Com a estrutura técnica rodando no piloto automático, seu único foco deve ser atrair mais clientes. Conheça o curso **Tráfego Pago Avançado** para explodir suas taxas de conversão.",
      promoteCourseId: "course-trafego-pago-avancado",
      blogSlugs: ["trafego-pago-e-commerce-2026", "minicurso-facebook-ads-pixel-conversao"],
    },
    2: {
      subject: "E-commerce Multicanal: Aumente seus canais de vendas com segurança 🌐",
      intro: "Aprenda a estruturar novos canais de forma profissional e escalável.",
      body: "Com ERP e fluxos operacionais estruturados, comece a expandir para novos canais próprios e marketplaces. O curso **E-commerce Completo** oferece o plano definitivo para essa expansão.",
      promoteCourseId: "course-ecommerce-completo",
      blogSlugs: ["como-sair-da-loja-fisica-para-o-digital", "velocidade-carregamento-conversao-dados"],
    }
  }
};

export async function sendFollowUpEmail(
  toEmail: string,
  toName: string,
  profile: string,
  step: number
): Promise<boolean> {
  const profileTemplates = FOLLOWUP_TEMPLATES[profile];
  if (!profileTemplates) return false;
  const template = profileTemplates[step];
  if (!template) return false;

  const promotedCourse = COURSES.find((c) => c.id === template.promoteCourseId);
  if (!promotedCourse) return false;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bstoreventures.com.br";
  const categoryLink = `${siteUrl}/categorias/${promotedCourse.category}`;

  const blogLinksHtml = template.blogSlugs
    .map((slug) => {
      const url = `${siteUrl}/blog/${slug}`;
      const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      return `<li><a href="${url}" style="color: #00C4FF; text-decoration: underline; font-weight: 600;">${title}</a></li>`;
    })
    .join("");

  const emailHtml = `
    <div style="background-color: #071A38; color: #F0F6FF; font-family: sans-serif; padding: 40px 20px; text-align: center;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #0B2545; border: 1px solid #00C4FF33; border-radius: 20px; padding: 40px 30px; text-align: left; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
        <h2 style="color: #FFFFFF; font-size: 24px; border-bottom: 2px solid #00C4FF; padding-bottom: 12px; margin-top: 0; font-weight: 900;">B'Store Ventures</h2>
        <p style="font-size: 16px; color: #F0F6FF; font-weight: 600;">Olá, ${toName}!</p>
        <p style="font-size: 14.5px; color: #9EBDDF; line-height: 1.6;">${template.intro}</p>
        <p style="font-size: 14.5px; color: #9EBDDF; line-height: 1.6;">${template.body}</p>
        
        <div style="background: rgba(0, 196, 255, 0.05); border: 1px solid #00C4FF55; border-radius: 12px; padding: 20px; margin: 24px 0;">
          <h3 style="margin-top: 0; color: #00C4FF; font-size: 18px; font-weight: 800;">🚀 Sugestão de Curso Complementar</h3>
          <p style="font-size: 15px; color: #FFFFFF; font-weight: 700; margin: 8px 0;">${promotedCourse.icon} ${promotedCourse.title}</p>
          <p style="font-size: 13.5px; color: #9EBDDF; line-height: 1.5; margin-bottom: 16px;">${promotedCourse.description}</p>
          <a href="${promotedCourse.href}" style="background-color: #00C4FF; color: #0B2545; padding: 12px 24px; border-radius: 8px; font-weight: 700; text-decoration: none; display: inline-block; text-align: center;">Ver Curso Indicado →</a>
        </div>

        <h3 style="color: #FFFFFF; font-size: 16px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 18px;">📚 Artigos recomendados de e-commerce:</h3>
        <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
          ${blogLinksHtml}
        </ul>

        <p style="font-size: 14.5px; color: #9EBDDF; margin-top: 28px;">
          Se deseja explorar outros cursos da mesma categoria, acesse nosso portal dedicado:
          <br/>
          <a href="${categoryLink}" style="color: #00C4FF; text-decoration: underline; font-weight: 600;">Ver Todos os Cursos da Categoria</a>
        </p>

        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 30px 0;" />
        
        <p style="font-size: 11px; color: #7A9CC2; text-align: center; line-height: 1.5;">
          Você recebeu este e-mail porque preencheu o diagnóstico em nosso site e autorizou o envio de comunicações de acordo com a LGPD.
          <br/>
          Se deseja parar de receber nossos e-mails ou excluir seus dados cadastrados, envie uma solicitação para <a href="mailto:bstore.ventures@gmail.com" style="color: #00C4FF;">bstore.ventures@gmail.com</a>.
        </p>
      </div>
    </div>
  `;

  const transporter = getTransporter();
  if (!transporter) {
    // Mock mode: log HTML to console/logs
    console.log(`\n=================== [MOCK EMAIL SENT] ===================`);
    console.log(`Para: ${toEmail} (${toName})`);
    console.log(`Campanha: Follow-up Passo ${step}`);
    console.log(`Assunto: ${template.subject}`);
    console.log(`Curso Promovido: ${promotedCourse.title}`);
    console.log(`Corpo (resumo): ${template.intro}`);
    console.log(`===========================================================\n`);
    return true;
  }

  try {
    const fromEmail = process.env.SMTP_FROM || `"B'Store Ventures" <noreply@bstoreventures.com.br>`;
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: template.subject,
      html: emailHtml,
    });
    console.log(`[email-sender] Follow-up step ${step} email sent successfully to ${toEmail}`);
    return true;
  } catch (err) {
    console.error(`[email-sender] Failed to send follow-up step ${step} email via SMTP:`, err);
    return false;
  }
}

