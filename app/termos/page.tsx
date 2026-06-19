import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso | B'Store Ventures",
  description: "Leia as regras de utilização do nosso portal e os termos legais de responsabilidade e afiliação.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#0B2545", minHeight: "100vh", paddingTop: "72px", color: "#9EBDDF" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px 80px" }}>
          <h1 style={{ color: "#F0F6FF", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, marginBottom: "8px", letterSpacing: "-0.02em" }}>
            Termos de Uso
          </h1>
          <p style={{ color: "#7A9CC2", fontSize: "14px", marginBottom: "40px" }}>
            Última atualização: 19 de Junho de 2026
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "28px", lineHeight: 1.8, fontSize: "15px" }}>
            <section>
              <h2 style={{ color: "#F0F6FF", fontSize: "1.4rem", fontWeight: 800, marginBottom: "12px", letterSpacing: "-0.01em" }}>
                1. Aceitação dos Termos
              </h2>
              <p>
                Ao acessar e utilizar o site da B'Store Ventures e nosso diagnóstico personalizado, você concorda em cumprir e estar vinculado a estes Termos de Uso. Caso não concorde com qualquer uma das condições estabelecidas aqui, orientamos que interrompa imediatamente o uso do site.
              </p>
            </section>

            <section>
              <h2 style={{ color: "#F0F6FF", fontSize: "1.4rem", fontWeight: 800, marginBottom: "12px", letterSpacing: "-0.01em" }}>
                2. Natureza Informativa e Isenção de Garantias
              </h2>
              <p>
                O conteúdo disponibilizado neste site, incluindo os artigos do blog e as recomendações de cursos do diagnóstico personalizado, possui caráter puramente educativo e informativo.
              </p>
              <p style={{ marginTop: "10px" }}>
                ⚠️ <strong>Aviso Importante (Políticas de Ads):</strong> A B'Store Ventures <strong>não garante</strong> resultados financeiros rápidos, faturamento garantido ou retornos específicos decorrentes do aprendizado ou aquisição de cursos terceiros. O sucesso em qualquer modelo de e-commerce (seja loja própria, marketplaces ou venda sem estoque) depende do esforço individual, estratégia de mercado, gestão financeira e dedicação do próprio aluno.
              </p>
            </section>

            <section>
              <h2 style={{ color: "#F0F6FF", fontSize: "1.4rem", fontWeight: 800, marginBottom: "12px", letterSpacing: "-0.01em" }}>
                3. Divulgação de Links de Afiliados
              </h2>
              <p>
                Para manter nosso portal ativo e gratuito para os leitores, participamos de programas de afiliação. Isso significa que as recomendações de cursos na página de resultados e nas categorias direcionam para plataformas parceiras autorizadas (como Hotmart, Kiwify, Monetizze, etc.). Ao realizar a compra através de nossos links, nós poderemos receber uma comissão de afiliado, sem qualquer custo adicional para você.
              </p>
            </section>

            <section>
              <h2 style={{ color: "#F0F6FF", fontSize: "1.4rem", fontWeight: 800, marginBottom: "12px", letterSpacing: "-0.01em" }}>
                4. Uso Autorizado e Restrições
              </h2>
              <p>
                Você concorda em usar nosso site apenas para fins lícitos. É terminantemente proibido:
              </p>
              <ul style={{ listStyle: "circle", paddingLeft: "20px", marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>Tentar corromper ou invadir a segurança do site, banco de dados ou sistemas de armazenamento.</li>
                <li>Utilizar robôs ou scripts de extração automatizada de conteúdo (scrapers) sem autorização prévia por escrito.</li>
                <li>Falsificar informações (como e-mails ou nomes no formulário de leads) para burlar o sistema de cadastro.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ color: "#F0F6FF", fontSize: "1.4rem", fontWeight: 800, marginBottom: "12px", letterSpacing: "-0.01em" }}>
                5. Propriedade Intelectual
              </h2>
              <p>
                Todo o conteúdo visual, design do site, código-fonte, artigos de blog e a marca B'Store Ventures são de propriedade exclusiva deste portal e protegidos pelas leis brasileiras de propriedade intelectual e direitos autorais. A reprodução parcial ou integral não autorizada de nossos materiais pedagógicos e identidade corporativa constitui violação legal.
              </p>
            </section>

            <section>
              <h2 style={{ color: "#F0F6FF", fontSize: "1.4rem", fontWeight: 800, marginBottom: "12px", letterSpacing: "-0.01em" }}>
                6. Jurisdição e Legislação Aplicável
              </h2>
              <p>
                Estes termos são regidos pelas leis vigentes na República Federativa do Brasil. Fica eleito o foro da comarca da sede administrativa da B'Store Ventures para dirimir quaisquer controvérsias decorrentes destes Termos de Uso.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
