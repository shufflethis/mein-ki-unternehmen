import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { answers, score, domain, timestamp } = body;

        const companyName = (answers?.company_name as string) || "Unbekannt";
        const contactName = (answers?.contact_name as string) || "";
        const contactEmail = (answers?.contact_email as string) || "";
        const contactPhone = (answers?.contact_phone as string) || "";
        const industry = (answers?.industry as string) || "";
        const companySize = (answers?.company_size as string) || "";
        const kiBudget = (answers?.ki_budget as string) || "";
        const kiTimeline = (answers?.ki_timeline as string) || "";
        const kiUsage = (answers?.ki_usage as string) || "";
        const wantAnalysis = (answers?.want_analysis as string) || "";

        const maturityLabel = score?.maturityLevel?.label || "";
        const maturityEmoji = score?.maturityLevel?.emoji || "";
        const totalPercent = score?.totalPercent || 0;

        const savingsEuro = score?.savingsPotential?.eurosPerYear
            ? `${score.savingsPotential.eurosPerYear.toLocaleString("de-DE")} €/Jahr`
            : "Nicht berechnet";

        // ── Slack: Survey Channel ───────────────────────────────
        const surveyBlocks = [
            {
                type: "header",
                text: {
                    type: "plain_text",
                    text: `📊 Neuer KI-Readiness Check — ${companyName}`,
                },
            },
            {
                type: "section",
                fields: [
                    { type: "mrkdwn", text: `*Score:*\n${maturityEmoji} ${totalPercent}/100 — ${maturityLabel}` },
                    { type: "mrkdwn", text: `*Einsparpotenzial:*\n${savingsEuro}` },
                    { type: "mrkdwn", text: `*Kontakt:*\n${contactName}` },
                    { type: "mrkdwn", text: `*E-Mail:*\n${contactEmail}` },
                    { type: "mrkdwn", text: `*Telefon:*\n${contactPhone || "—"}` },
                    { type: "mrkdwn", text: `*Unternehmen:*\n${companyName}` },
                    { type: "mrkdwn", text: `*Branche:*\n${industry}` },
                    { type: "mrkdwn", text: `*Größe:*\n${companySize}` },
                    { type: "mrkdwn", text: `*KI-Nutzung:*\n${kiUsage}` },
                    { type: "mrkdwn", text: `*Budget:*\n${kiBudget}` },
                ],
            },
            {
                type: "context",
                elements: [
                    {
                        type: "mrkdwn",
                        text: `Domain: ${domain} | ${timestamp}`,
                    },
                ],
            },
        ];

        // ── Slack: Leads Channel ────────────────────────────────
        const leadsBlocks = [
            {
                type: "header",
                text: {
                    type: "plain_text",
                    text: `🔔 Neuer Lead — ${companyName} (${totalPercent}%)`,
                },
            },
            {
                type: "section",
                fields: [
                    { type: "mrkdwn", text: `*Name:*\n${contactName}` },
                    { type: "mrkdwn", text: `*E-Mail:*\n${contactEmail}` },
                    { type: "mrkdwn", text: `*Telefon:*\n${contactPhone || "—"}` },
                    { type: "mrkdwn", text: `*Score:*\n${maturityEmoji} ${totalPercent}% — ${maturityLabel}` },
                    { type: "mrkdwn", text: `*Budget:*\n${kiBudget}` },
                    { type: "mrkdwn", text: `*Timeline:*\n${kiTimeline}` },
                    { type: "mrkdwn", text: `*Analyse gewünscht:*\n${wantAnalysis === "yes" ? "✅ Ja" : "❌ Nein"}` },
                ],
            },
            {
                type: "actions",
                elements: [
                    {
                        type: "button",
                        text: { type: "plain_text", text: "📧 E-Mail senden" },
                        url: `mailto:${contactEmail}`,
                    },
                    ...(contactPhone
                        ? [
                            {
                                type: "button",
                                text: { type: "plain_text", text: "📞 Anrufen" },
                                url: `tel:${contactPhone}`,
                            },
                        ]
                        : []),
                ],
            },
        ];

        // Try Slack Bot Token first, fallback to Webhook
        const slackBotToken = process.env.SLACK_BOT_TOKEN;
        const surveyChannel = process.env.SLACK_SURVEY_CHANNEL;
        const leadsChannel = process.env.SLACK_LEADS_CHANNEL;
        const webhookUrl = process.env.SLACK_WEBHOOK_URL;

        if (slackBotToken && surveyChannel) {
            await fetch("https://slack.com/api/chat.postMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${slackBotToken}`,
                },
                body: JSON.stringify({
                    channel: surveyChannel,
                    blocks: surveyBlocks,
                    text: `Neuer KI-Readiness Check — ${companyName} (${totalPercent}%)`,
                }),
            }).catch(console.error);
        }

        if (slackBotToken && leadsChannel) {
            await fetch("https://slack.com/api/chat.postMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${slackBotToken}`,
                },
                body: JSON.stringify({
                    channel: leadsChannel,
                    blocks: leadsBlocks,
                    text: `Neuer Lead — ${companyName} (${totalPercent}%)`,
                }),
            }).catch(console.error);
        } else if (webhookUrl) {
            await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ blocks: surveyBlocks }),
            }).catch(console.error);
        }

        // ── Resend Email ────────────────────────────────────────
        const resendKey = process.env.RESEND_API_KEY;
        if (resendKey && contactEmail) {
            const categoryRows = (score?.categories || [])
                .map(
                    (c: { label: string; percent: number }) =>
                        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:14px;">${c.label}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:14px;text-align:right;font-weight:600;">${c.percent}%</td></tr>`
                )
                .join("");

            const emailHtml = `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#fafaf8;font-family:'Open Sans',system-ui,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:20px;">
    <div style="background:#0D0D0D;color:#fff;padding:32px;border-radius:16px 16px 0 0;text-align:center;">
      <h1 style="margin:0;font-size:22px;font-weight:700;">Ihr KI-Readiness Ergebnis</h1>
      <p style="margin:8px 0 0;opacity:0.7;font-size:14px;">${companyName}</p>
    </div>
    <div style="background:#fff;padding:32px;border:1px solid #eee;border-top:none;">
      <div style="text-align:center;margin-bottom:24px;">
        <div style="font-size:48px;margin-bottom:4px;">${maturityEmoji}</div>
        <div style="font-size:36px;font-weight:700;color:#0D0D0D;">${totalPercent} / 100</div>
        <div style="font-size:16px;color:#a387c1;font-weight:600;">${maturityLabel}</div>
        <div style="font-size:13px;color:#999;">Level ${score?.maturityLevel?.level || 0} von 5</div>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <thead><tr><th style="text-align:left;padding:8px 12px;border-bottom:2px solid #eee;font-size:13px;color:#999;">Kategorie</th><th style="text-align:right;padding:8px 12px;border-bottom:2px solid #eee;font-size:13px;color:#999;">Score</th></tr></thead>
        <tbody>${categoryRows}</tbody>
      </table>
      ${score?.savingsPotential ? `<div style="background:linear-gradient(135deg,#DDEBD3,#DEEBF7);padding:20px;border-radius:12px;text-align:center;margin-bottom:24px;"><p style="font-size:13px;color:#555;margin:0 0 4px;">Geschätztes Einsparpotenzial</p><p style="font-size:24px;font-weight:700;color:#0D0D0D;margin:0;">${savingsEuro}</p></div>` : ""}
      <div style="text-align:center;">
        <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ37vXtNEiJgPdMVYb5dssJ2SCErLPRc8WZDQ6PSOp4QPwZU2IJIoKqEExVDt6xnCYrcpQCiQjwu" style="display:inline-block;padding:14px 28px;background:#bbd8a7;color:#0D0D0D;font-weight:600;text-decoration:none;border-radius:12px;font-size:14px;">Kostenloses Beratungsgespräch buchen</a>
      </div>
    </div>
    <div style="text-align:center;padding:16px;font-size:11px;color:#999;border-radius:0 0 16px 16px;">
      track by track GmbH · Schliemannstraße 23 · 10437 Berlin
    </div>
  </div>
</body>
</html>`;

            await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${resendKey}`,
                },
                body: JSON.stringify({
                    from: "KI-Readiness Check <noreply@mein-ki-unternehmen.de>",
                    to: [contactEmail],
                    subject: `Ihr KI-Readiness Ergebnis: ${maturityEmoji} ${totalPercent}% — ${maturityLabel}`,
                    html: emailHtml,
                }),
            }).catch(console.error);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Submit error:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
