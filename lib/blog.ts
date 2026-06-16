import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(BLOG_DIR)) return [];
    const files = fs.readdirSync(BLOG_DIR);
    return files
      .filter((f) => f.endsWith(".mdx"))
      .map((file) => {
        const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
        const { data, content } = matter(raw);
        return {
          slug: file.replace(".mdx", ""),
          title: data.title ?? "",
          description: data.description ?? "",
          date: data.date ?? "",
          category: data.category ?? "mercado",
          readTime: data.readTime ?? "5 min",
          content,
        } as BlogPost;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf-8");
    const { data, content } = matter(raw);
    return { slug, ...data, content } as BlogPost;
  } catch {
    return null;
  }
}
