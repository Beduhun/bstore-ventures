import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bstoreventures.com.br"),
  title: "B'Store Ventures — Acelere sua Transição para o Digital",
  description:
    "Descubra qual canal de vendas online é ideal para o seu perfil. Quiz personalizado + cursos recomendados por especialistas.",
  keywords: [
    "e-commerce",
    "vender online",
    "mercado livre",
    "shopee",
    "amazon",
    "loja virtual",
    "migrar loja física",
  ],
  openGraph: {
    title: "B'Store Ventures — Acelere sua Transição para o Digital",
    description:
      "Acelerando a transição do comércio físico para o ecossistema digital.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website",
    siteName: "B'Store Ventures",
  },
  twitter: {
    card: "summary_large_image",
    title: "B'Store Ventures",
    description: "Acelerando a transição do comércio físico para o ecossistema digital.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable} data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0B2545" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
