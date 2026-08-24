"use client";

import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { contactSchema } from "@/lib/contact-schema";

type FieldErrors = Partial<Record<"email" | "subject" | "message", string>>;
type FormStatus = { type: "idle" | "loading" | "success" | "error"; message: string };

export function ContactForm() {
  const startedAtRef = useRef<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
      startedAt: startedAtRef.current ?? Date.now(),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        subject: fieldErrors.subject?.[0],
        message: fieldErrors.message?.[0],
      });
      setStatus({ type: "error", message: "Revisa los campos señalados." });
      window.requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
      return;
    }

    setErrors({});
    setStatus({ type: "loading", message: "Enviando mensaje…" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) throw new Error(result.message ?? "No se pudo enviar el mensaje.");

      formRef.current?.reset();
      startedAtRef.current = Date.now();
      setStatus({ type: "success", message: result.message ?? "Mensaje enviado." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "No se pudo enviar el mensaje.",
      });
    }
  };

  return (
    <form ref={formRef} className="contact-form" onSubmit={onSubmit} noValidate aria-label="Formulario de contacto">
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Sitio web</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          placeholder="nombre@empresa.com…"
        />
        {errors.email ? (
          <span className="field-error" id="email-error">
            {errors.email}
          </span>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="subject">Asunto</label>
        <input
          id="subject"
          name="subject"
          type="text"
          autoComplete="off"
          required
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          placeholder="Ej.: nueva web corporativa…"
        />
        {errors.subject ? (
          <span className="field-error" id="subject-error">
            {errors.subject}
          </span>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="message">Mensaje</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          autoComplete="off"
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="Háblame del proyecto, sus objetivos y el punto en el que estás…"
        />
        {errors.message ? (
          <span className="field-error" id="message-error">
            {errors.message}
          </span>
        ) : null}
      </div>

      <button className="button button-primary form-submit" type="submit" disabled={status.type === "loading"}>
        {status.type === "loading" ? <LoaderCircle className="form-spinner" aria-hidden="true" /> : null}
        {status.type === "loading" ? "Enviando" : "Enviar mensaje"}
        {status.type !== "loading" ? <ArrowUpRight aria-hidden="true" size={16} /> : null}
      </button>

      <p className={`form-status is-${status.type}`} aria-live="polite" role="status">
        {status.message}
      </p>
    </form>
  );
}
