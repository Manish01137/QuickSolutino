// Recipients live on the server and are picked by form type, so a tampered request
// can't turn this endpoint into a relay for mailing arbitrary addresses.
// Each form can use its own Resend API key (e.g. one Resend account per inbox),
// falling back to a shared RESEND_API_KEY.
const FORMS = {
  customer: { to: "sales@quick-solutions.in", label: "Customer Inquiry", keyEnv: "RESEND_API_KEY_CUSTOMER" },
  partner: { to: "partnermanagement@quick-solutions.in", label: "Partner Inquiry", keyEnv: "RESEND_API_KEY_PARTNER" },
} as const;

// Resend's shared test sender; it only delivers to the Resend account owner's address,
// so replace with an address on a verified domain to send to any inbox.
const DEFAULT_FROM = "Quick Solutions Website <onboarding@resend.dev>";

type FormType = keyof typeof FORMS;

const MAX_LENGTH = { name: 120, company: 160, email: 254, phone: 40, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort per-instance limit: serverless instances don't share this map.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  for (const [key, entry] of hits) {
    if (entry.resetAt <= now) hits.delete(key);
  }
  const entry = hits.get(ip);
  if (!entry) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function field(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const singleLine = (text: string) => text.replace(/[\r\n]+/g, " ");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }

  // Honeypot: hidden from people, so only bots fill it. Pretend success so they don't adapt.
  if (field(body.website, 200)) return Response.json({ ok: true });

  const type = body.type;
  if (type !== "customer" && type !== "partner") {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }
  const form = FORMS[type as FormType];

  const name = singleLine(field(body.name, MAX_LENGTH.name));
  const company = singleLine(field(body.company, MAX_LENGTH.company));
  const email = singleLine(field(body.email, MAX_LENGTH.email));
  const phone = singleLine(field(body.phone, MAX_LENGTH.phone));
  const message = field(body.message, MAX_LENGTH.message);

  if (!name || !message || !EMAIL_RE.test(email)) {
    return Response.json({ error: "invalid_fields" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env[form.keyEnv] || process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;
  if (!apiKey) {
    console.error(`Contact form: ${form.keyEnv} (or RESEND_API_KEY) is not set`);
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Company", company || "-"],
    ["Email", email],
    ["Phone", phone || "-"],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${message}`;
  const html = `<h2 style="margin:0 0 16px;font-family:Arial,sans-serif;color:#d62027">New ${form.label}</h2>
<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:4px 16px 4px 0;color:#5b6472">${k}</td><td style="padding:4px 0;color:#0f172a">${escapeHtml(v)}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="margin:16px 0 4px;font-family:Arial,sans-serif;font-size:14px;color:#5b6472">Message</p>
<p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#0f172a;white-space:pre-wrap">${escapeHtml(message)}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: form.to,
        reply_to: email,
        subject: `${form.label}: ${name}${company ? ` (${company})` : ""}`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      console.error("Contact form: Resend responded with", res.status, await res.text());
      return Response.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("Contact form: request to Resend failed", error);
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
