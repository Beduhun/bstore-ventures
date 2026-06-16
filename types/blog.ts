export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: "mercado" | "marketplaces" | "ecommerce" | "estrategia";
  readTime: string;
  content: string;
}
