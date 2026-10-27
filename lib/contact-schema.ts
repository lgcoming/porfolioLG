import { z } from "zod";
import type { Locale } from "@/lib/i18n";

const validationMessages = {
  es: {
    email: "Introduce un email válido.",
    emailLength: "El email es demasiado largo.",
    subjectMin: "El asunto necesita al menos 3 caracteres.",
    subjectMax: "El asunto no puede superar los 120 caracteres.",
    messageMin: "Cuéntame un poco más sobre tu proyecto.",
    messageMax: "El mensaje no puede superar los 4000 caracteres.",
  },
  en: {
    email: "Enter a valid email address.",
    emailLength: "The email is too long.",
    subjectMin: "The subject needs at least 3 characters.",
    subjectMax: "The subject cannot exceed 120 characters.",
    messageMin: "Tell me a bit more about your project.",
    messageMax: "The message cannot exceed 4000 characters.",
  },
} satisfies Record<Locale, Record<string, string>>;

export const createContactSchema = (locale: Locale) => {
  const messages = validationMessages[locale];
  return z.object({
    email: z.email(messages.email).max(254, messages.emailLength),
    subject: z.string().trim().min(3, messages.subjectMin).max(120, messages.subjectMax),
    message: z.string().trim().min(12, messages.messageMin).max(4000, messages.messageMax),
    website: z.string().max(0).default(""),
    startedAt: z.number().int().positive(),
  });
};

export type ContactFields = z.infer<ReturnType<typeof createContactSchema>>;
