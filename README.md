# B'Store Ventures — Hub de Transição Digital e Afiliados

A B'Store Ventures é uma plataforma premium de direcionamento empreendedor. O site foi desenvolvido para ajudar lojistas físicos tradicionais (que enfrentam altos custos de aluguel e queda no fluxo de clientes) e iniciantes digitais a encontrarem o melhor modelo de vendas online (Mercado Livre, Shopee, Amazon ou Loja Virtual Própria) com baixo risco, por meio de um diagnóstico interativo de 7 perguntas.

---

## 🚀 Tecnologias Utilizadas

* **Framework:** Next.js 16.2.9 (App Router, Turbopack)
* **Biblioteca Visual:** React 19.2.4
* **Estilização:** Tailwind CSS v4 e Vanilla CSS para alto controle e performance
* **Animações:** Framer Motion (para transições fluidas e micro-interações de circuitos)
* **Gráficos:** Recharts (para visualização interativa do crescimento do e-commerce brasileiro)
* **Markdown:** `markdown-to-jsx` (para renderização rápida e 100% segura de posts de blog)
* **Ícones:** Lucide React

---

## 📁 Estrutura do Projeto

* `app/`: Páginas do site, incluindo a página inicial (`page.tsx`), layout global (`layout.tsx`), estilos globais (`globals.css`) e rotas dinâmicas do blog (`blog/[slug]/page.tsx`).
* `components/`:
  * `layout/`: Navbar, Footer e a Logo vetorial animada.
  * `sections/`: Seções da página inicial (Hero, Pain, Categories, Quiz, Testimonials, BlogPreview).
  * `quiz/`: Motor do quiz de diagnóstico e formulário de captura de leads.
  * `ui/`: Componentes visuais utilitários reutilizáveis (PageTransition, SmoothReveal).
* `docs/`: Documentos de inteligência de marketing criados durante a modelagem do nicho, público-alvo e personas (Carlos, Juliana, Rafael).
* `lib/`: Dados e lógicas centralizados (dados do blog, links de afiliados, tokens visuais e dados estatísticos consolidados).
* `public/`: Imagens estáticas e recursos públicos (incluindo o robô de sitemap e robots.txt).

---

## 💻 Como Rodar o Projeto Localmente

### 1. Instalar as dependências
```bash
npm install
```

### 2. Executar o servidor de desenvolvimento
```bash
npm run dev
```
O projeto estará rodando localmente em **[http://localhost:3000](http://localhost:3000)**.

### 3. Compilar para produção (Static Export)
Como a plataforma é hospedada de forma estática (GitHub Pages / Hostinger), execute o comando abaixo para compilar todos os arquivos para HTML, CSS e JS puros na pasta `/out`:
```bash
npm run build
```

---

## 🌐 Deploy Automático (CI/CD)

O projeto está configurado com **GitHub Actions** na pasta `.github/workflows/`:
1. **GitHub Pages:** Toda vez que um commit é enviado para a branch `main`, a Action compila a aplicação automaticamente com Next.js static export e publica o site estático na branch `gh-pages`.
2. **Hostinger FTP:** Também há suporte pronto para deploy automático por FTP na hospedagem Hostinger configurando as Secrets do repositório no GitHub (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`).
