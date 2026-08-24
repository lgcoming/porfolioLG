import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const attempts = new Map<string, number[]>();

function isRateLimited(identifier: string, now: number) {
  const recent = (attempts.get(identifier) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  recent.push(now);
  attempts.set(identifier, recent);
  return recent.length > MAX_REQUESTS;
}

export async function POST(request: Request) {
  const now = Date.now();
  const identifier = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(identifier, now)) {
    return NextResponse.json(
      { message: "Has enviado varios mensajes seguidos. Espera unos minutos y vuelve a intentarlo." },
      { status: 429 },
    );
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ message: "No se pudo leer el formulario." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(input);
  if (!parsed.success || now - parsed.data.startedAt < 2000) {
    return NextResponse.json({ message: "Revisa los campos del formulario e inténtalo de nuevo." }, { status: 400 });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { message: "El formulario todavía no está conectado. Puedes escribirme directamente por email." },
      { status: 503 },
    );
  }

  const headers = new Headers({ "Content-Type": "application/json" });
  if (process.env.CONTACT_WEBHOOK_TOKEN) {
    headers.set("Authorization", `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}`);
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email: parsed.data.email,
        subject: parsed.data.subject,
        message: parsed.data.message,
        source: "lgcomin.com",
        receivedAt: new Date(now).toISOString(),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) throw new Error(`Webhook returned ${response.status}`);
  } catch {
    return NextResponse.json(
      { message: "No he podido enviar el mensaje ahora mismo. Prueba de nuevo o utiliza el email directo." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Mensaje enviado. Gracias por escribirme." });
}

