"use client";

import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Dictionary } from "@/data/dictionaries";
import { createContactSchema } from "@/lib/contact-schema";
import type { Locale } from "@/lib/i18n";

type FieldErrors = Partial<Record<"email" | "subject" | "message", string>>;
type FormStatus = {
  type: "idle" | "loading" | "success" | "error";
  message: string;
};

type ContactFormProps = {
  locale: Locale;
  copy: Dictionary["contact"]["form"];
};

export function ContactForm({ locale, copy }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtRef = useRef<number | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = createContactSchema(locale).safeParse({
      email: String(form.get("email") ?? ""),
      subject: String(form.get("subject") ?? ""),
      message: String(form.get("message") ?? ""),
      website: String(form.get("website") ?? ""),
      startedAt: startedAtRef.current ?? 0,
    });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        subject: fieldErrors.subject?.[0],
        message: fieldErrors.message?.[0],
      });
      setStatus({ type: "error", message: copy.invalid });
      window.requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
      return;
    }

    setErrors({});
    setStatus({ type: "loading", message: copy.sending });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Content-Language": locale },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json().catch(() => ({})) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? copy.failure);
      }

      formRef.current?.reset();
      startedAtRef.current = Date.now();
      setStatus({
        type: "success",
        message: result.message ?? copy.success,
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : copy.failure,
      });
    }
  };

  return (
    <form
      ref={formRef}
      className="contact-form"
      onSubmit={onSubmit}
      noValidate
      aria-label={copy.ariaLabel}
      aria-busy={status.type === "loading"}
    >
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">{copy.honeypot}</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-field">
        <label htmlFor="email">{copy.email}</label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          required
          placeholder={copy.emailPlaceholder}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email ? <span id="email-error" className="field-error">{errors.email}</span> : null}
      </div>
      <div className="form-field">
        <label htmlFor="subject">{copy.subject}</label>
        <input
          id="subject"
          name="subject"
          type="text"
          autoComplete="off"
          required
          placeholder={copy.subjectPlaceholder}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
        {errors.subject ? <span id="subject-error" className="field-error">{errors.subject}</span> : null}
      </div>
      <div className="form-field">
        <label htmlFor="message">{copy.message}</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          autoComplete="off"
          required
          placeholder={copy.messagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? <span id="message-error" className="field-error">{errors.message}</span> : null}
      </div>
      <button
        className="submit-button"
        type="submit"
        disabled={status.type === "loading"}
      >
        {status.type === "loading" ? copy.submitting : copy.submit}
        {status.type === "loading" ? (
          <LoaderCircle className="form-spinner" aria-hidden="true" size={19} strokeWidth={1.6} />
        ) : (
          <ArrowUpRight aria-hidden="true" size={19} strokeWidth={1.6} />
        )}
      </button>
      <div className="form-status" data-state={status.type} aria-live="polite" role="status">
        {status.message}
      </div>
    </form>
  );
}
