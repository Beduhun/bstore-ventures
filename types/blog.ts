export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: "loja-virtual" | "marketplaces" | "venda-sem-estoque" | "escalar";
  readTime: string;
  content: string;
}
