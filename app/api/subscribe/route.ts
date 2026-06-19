import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads-db";
import { calcularResultado } from "@/lib/quiz-logic";
import { sendWelcomeEmail } from "@/lib/email-sender";
import { QuizAnswers } from "@/types/quiz";

// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // max 10 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }

  return false;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Muitas requisições. Tente novamente em 1 minuto." },
        { status: 429 }
      );
    }

    const { name, email, answers, consent } = await req.json();

    // Validate input
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Nome inválido" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ error: "O consentimento LGPD é obrigatório." }, { status: 400 });
    }

    // Calculate quiz profile
    let profile: string | undefined;
    let recommendedCourse: any;
    try {
      if (answers && typeof answers === "object") {
        const result = calcularResultado(answers as QuizAnswers);
        profile = result.profile;
        recommendedCourse = result.recommendedCourse;
      }
    } catch (err) {
      console.error("[subscribe] Quiz calculation error:", err);
    }

    // 1. Save lead to Database (encrypted locally)
    let savedLead;
    try {
      savedLead = await saveLead({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        answers: answers ?? {},
        profile,
        ip,
        consent: true,
        emailsSent: ["welcome"],
      });
      console.log(`[subscribe] Lead saved locally: ${email}`);
    } catch (err) {
      console.error("[subscribe] Failed to save lead locally:", err);
      return NextResponse.json({ error: "Erro ao salvar contato no banco de dados." }, { status: 500 });
    }

    // 2. Disparar e-mail de boas-vindas imediatamente
    if (recommendedCourse) {
      try {
        await sendWelcomeEmail(
          email.trim().toLowerCase(),
          name.trim(),
          recommendedCourse
        );
      } catch (err) {
        console.error("[subscribe] Failed to send welcome email:", err);
      }
    }

    return NextResponse.json({ success: true, leadId: savedLead.id });
  } catch (err) {
    console.error("[subscribe] Unexpected error:", err);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}
