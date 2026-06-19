import { NextResponse } from "next/server";
import { getLeads } from "@/lib/leads-db";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Senha inválida." }, { status: 401 });
    }

    const leads = await getLeads();

    // Sort leads by creation date descending
    const sortedLeads = leads.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({
      success: true,
      total: sortedLeads.length,
      leads: sortedLeads.map((lead) => ({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        profile: lead.profile,
        answers: lead.answers,
        createdAt: lead.createdAt,
        consent: lead.consent,
        emailsSent: lead.emailsSent ?? ["welcome"],
      })),
    });
  } catch (err) {
    console.error("[admin-leads] Error reading leads:", err);
    return NextResponse.json(
      { error: "Erro interno no servidor ao obter contatos." },
      { status: 500 }
    );
  }
}
