import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | B'Store Ventures",
  description: "Entenda como coletamos, protegemos e utilizamos seus dados de acordo com as diretrizes da LGPD.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#0B2545", minHeight: "100vh", paddingTop: "72px", color: "#9EBDDF" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px 80px" }}>
          <h1 style={{ color: "#F0F6FF", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, marginBottom: "8px", letterSpacing: "-0.02em" }}>
            Política de Privacidade
          </h1>
          <p style={{ color: "#7A9CC2", fontSize: "14px", marginBottom: "40px" }}>
            Última atualização: 19 de Junho de 2026
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "28px", lineHeight: 1.8, fontSize: "15px" }}>
            <section>
              <h2 style={{ color: "#F0F6FF", fontSize: "1.4rem", fontWeight: 800, marginBottom: "12px", letterSpacing: "-0.01em" }}>
                1. Introdução e Compromisso
              </h2>
              <p>
                A B'Store Ventures está comprometida com a segurança e a privacidade dos dados de nossos usuários. Esta política descreve como tratamos os dados pessoais que coletamos durante sua navegação e o uso de nosso diagnóstico (quiz), em estrita conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e o Marco Civil da Internet (Lei nº 12.965/2014).
              </p>
            </section>

            <section>
              <h2 style={{ color: "#F0F6FF", fontSize: "1.4rem", fontWeight: 800, marginBottom: "12px", letterSpacing: "-0.01em" }}>
                2. Quais dados coletamos?
              </h2>
              <p>
                Coletamos apenas as informações estritamente necessárias para fornecer a recomendação de plano ideal e enviar conteúdos educativos relevantes:
              </p>
              <ul style={{ listStyle: "circle", paddingLeft: "20px", marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li><strong>Nome e E-mail:</strong> Informados voluntariamente por você ao finalizar o quiz para recebimento do resultado.</li>
                <li><strong>Respostas do Diagnóstico:</strong> Suas opções selecionadas no quiz para calcular a compatibilidade de perfil.</li>
                <li><strong>Dados de Navegação (Cookies):</strong> Informações básicas de tráfego analítico para entender padrões de acesso e aprimorar a experiência do site (ex: visualizações de página, tipo de dispositivo).</li>
              </ul>
            </section>

            <section>
              <h2 style={{ color: "#F0F6FF", fontSize: "1.4rem", fontWeight: 800, marginBottom: "12px", letterSpacing: "-0.01em" }}>
                3. Finalidade do Tratamento de Dados
              </h2>
              <p>
                Utilizamos os dados coletados exclusivamente para:
              </p>
              <ul style={{ listStyle: "circle", paddingLeft: "20px", marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>Gerar e exibir seu diagnóstico personalizado de e-commerce.</li>
                <li>Enviar o resultado detalhado e materiais educativos diretamente para o e-mail informado.</li>
                <li>Garantir a conformidade legal com regras brasileiras e políticas de segurança das redes de anúncios (Google Ads, Meta Ads).</li>
              </ul>
            </section>

            <section>
              <h2 style={{ color: "#F0F6FF", fontSize: "1.4rem", fontWeight: 800, marginBottom: "12px", letterSpacing: "-0.01em" }}>
                4. Direitos do Titular dos Dados (Seus Direitos)
              </h2>
              <p>
                Como titular dos dados sob as diretrizes da LGPD, você possui o direito de, a qualquer momento, solicitar:
              </p>
              <ul style={{ listStyle: "circle", paddingLeft: "20px", marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>A confirmação da existência de tratamento de seus dados.</li>
                <li>A correção de dados incompletos, inexatos ou desatualizados.</li>
                <li>A exclusão definitiva de seus dados de nossa base de leads local ou de envio de comunicações.</li>
                <li>A revogação do consentimento concedido anteriormente para envio de informativos.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ color: "#F0F6FF", fontSize: "1.4rem", fontWeight: 800, marginBottom: "12px", letterSpacing: "-0.01em" }}>
                5. Canal de Comunicação do Encarregado de Dados (DPO)
              </h2>
              <p>
                Se você deseja exercer qualquer um de seus direitos descritos acima, solicitar a exclusão de seus dados ou tirar dúvidas sobre esta política, envie um e-mail com a sua solicitação para nosso encarregado no seguinte endereço eletrônico:
              </p>
              <p style={{ marginTop: "12px" }}>
                📧 <strong>Email de Contato:</strong> <a href="mailto:bstore.ventures@gmail.com" style={{ color: "#00C4FF", fontWeight: 600, textDecoration: "underline" }}>bstore.ventures@gmail.com</a>
              </p>
              <p style={{ marginTop: "8px" }}>
                Comprometemo-nos a analisar e responder à sua solicitação de acesso, alteração ou exclusão em até 15 dias úteis, conforme estipulado por lei.
              </p>
            </section>

            <section>
              <h2 style={{ color: "#F0F6FF", fontSize: "1.4rem", fontWeight: 800, marginBottom: "12px", letterSpacing: "-0.01em" }}>
                6. Segurança dos Dados
              </h2>
              <p>
                Adotamos medidas administrativas e tecnológicas adequadas para proteger os dados pessoais sob nossa custódia contra acessos não autorizados, perdas, destruições ou divulgações indevidas. Todos os dados coletados de leads locais são armazenados sob criptografia e chaves seguras.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
