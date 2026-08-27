import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { getResend } from "@/lib/resend";
import { contactDetails } from "@/data/contact";

export const runtime = "nodejs";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_BODY_LENGTH = 8_000;
const MIN_FORM_TIME_MS = 1_800;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;
const attempts = new Map<string, number[]>();

function getIdentifier(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? request.headers.get("x-real-ip")
    ?? "unknown";
}

function isRateLimited(identifier: string, now: number) {
  const recent = (attempts.get(identifier) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  recent.push(now);
  attempts.set(identifier, recent);

  if (attempts.size > 500) {
    for (const [key, timestamps] of attempts) {
      if (!timestamps.some((timestamp) => now - timestamp < WINDOW_MS)) attempts.delete(key);
    }
  }

  return recent.length > MAX_REQUESTS;
}

function escapeHtml(value: string) {
  const replacements: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return value.replace(/[&<>"']/g, (character) => replacements[character] ?? character);
}

export async function POST(request: Request) {
  const now = Date.now();

  if (!(request.headers.get("content-type") ?? "").startsWith("application/json")) {
    return NextResponse.json({ message: "El formato del formulario no es válido." }, { status: 415 });
  }

  if (isRateLimited(getIdentifier(request), now)) {
    return NextResponse.json(
      { message: "Has enviado varios mensajes seguidos. Espera unos minutos y vuelve a intentarlo." },
      { status: 429 },
    );
  }

  let input: unknown;
  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_LENGTH) {
      return NextResponse.json({ message: "El mensaje es demasiado grande." }, { status: 413 });
    }
    input = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: "No se pudo leer el formulario." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(input);
  const elapsed = parsed.success ? now - parsed.data.startedAt : 0;

  if (!parsed.success || elapsed < MIN_FORM_TIME_MS || elapsed > MAX_FORM_AGE_MS) {
    return NextResponse.json(
      { message: "Revisa los campos del formulario e inténtalo de nuevo." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "El formulario aún no está conectado. Puedes usar el email directo mientras tanto." },
      { status: 503 },
    );
  }

  const recipient = process.env.CONTACT_TO_EMAIL?.trim() || contactDetails.email;
  const sender = process.env.CONTACT_FROM_EMAIL?.trim()
    || "LGCOMIN Portfolio <onboarding@resend.dev>";
  const idempotencyKey = createHash("sha256")
    .update(`${Math.floor(now / WINDOW_MS)}:${parsed.data.email}:${parsed.data.subject}:${parsed.data.message}`)
    .digest("hex");
  const safeEmail = escapeHtml(parsed.data.email);
  const safeSubject = escapeHtml(parsed.data.subject);
  const safeMessage = escapeHtml(parsed.data.message).replaceAll("\n", "<br />");
  const resend = getResend(apiKey);

  try {
    const { error } = await resend.emails.send(
      {
        from: sender,
        to: recipient,
        replyTo: parsed.data.email,
        subject: `[LGCOMIN] ${parsed.data.subject}`,
        text: `Nuevo mensaje desde lgcomin.com\n\nEmail: ${parsed.data.email}\nAsunto: ${parsed.data.subject}\n\n${parsed.data.message}`,
        html: `
          <div style="background:#020403;color:#f4f7f5;font-family:ui-monospace,monospace;padding:32px">
            <p style="color:#00ff66;font-size:12px;letter-spacing:.16em;text-transform:uppercase">
              Nuevo contacto · lgcomin.com
            </p>
            <h1 style="font-size:24px;font-weight:500">${safeSubject}</h1>
            <p style="color:#b7c1bd">
              Responder a:
              <a href="mailto:${safeEmail}" style="color:#00d9ff">${safeEmail}</a>
            </p>
            <div style="border-left:2px solid #00ff66;margin-top:24px;padding-left:18px;line-height:1.7">
              ${safeMessage}
            </div>
          </div>
        `,
      },
      { idempotencyKey },
    );

    if (error) throw new Error(error.message);
  } catch (error) {
    console.error(
      "Contact email delivery failed",
      error instanceof Error ? error.message : "Unknown error",
    );
    return NextResponse.json(
      { message: "No he podido enviar el mensaje ahora mismo. Prueba de nuevo o utiliza el email directo." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Mensaje enviado. Te responderé en menos de 48 horas." });
}
