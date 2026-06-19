import { NextResponse } from "next/server";
import { getLeads, saveLead } from "@/lib/leads-db";
import { sendFollowUpEmail } from "@/lib/email-sender";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Senha inválida." }, { status: 401 });
    }

    const leads = await getLeads();
    let sentCount = 0;
    const sentDetails: { email: string; campaign: string }[] = [];

    for (const lead of leads) {
      // Ensure LGPD consent is true (legal requirement)
      if (!lead.consent) continue;

      const history = lead.emailsSent ?? ["welcome"];
      let stepToSend = 0;
      let campaignName = "";

      if (!history.includes("followup_1")) {
        stepToSend = 1;
        campaignName = "followup_1";
      } else if (!history.includes("followup_2")) {
        stepToSend = 2;
        campaignName = "followup_2";
      }

      if (stepToSend > 0 && lead.profile) {
        try {
          const success = await sendFollowUpEmail(
            lead.email,
            lead.name,
            lead.profile,
            stepToSend
          );

          if (success) {
            sentCount++;
            const newHistory = [...history, campaignName];
            
            // Save the updated lead back to DB
            await saveLead({
              name: lead.name,
              email: lead.email,
              answers: lead.answers,
              profile: lead.profile,
              ip: lead.ip,
              consent: lead.consent,
              emailsSent: newHistory,
            });

            sentDetails.push({ email: lead.email, campaign: campaignName });
          }
        } catch (err) {
          console.error(`[send-followups] Failed to send to ${lead.email}:`, err);
        }
      }
    }

    return NextResponse.json({
      success: true,
      sentCount,
      details: sentDetails,
    });
  } catch (err) {
    console.error("[send-followups] Error processing followups:", err);
    return NextResponse.json(
      { error: "Erro interno no servidor ao disparar campanhas." },
      { status: 500 }
    );
  }
}
