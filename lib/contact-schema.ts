import { z } from "zod";

export const contactSchema = z.object({
  email: z.email("Introduce un email válido.").max(254, "El email es demasiado largo."),
  subject: z
    .string()
    .trim()
    .min(3, "El asunto necesita al menos 3 caracteres.")
    .max(120, "El asunto no puede superar los 120 caracteres."),
  message: z
    .string()
    .trim()
    .min(12, "Cuéntame un poco más sobre tu proyecto.")
    .max(4000, "El mensaje no puede superar los 4000 caracteres."),
  website: z.string().max(0).default(""),
  startedAt: z.number().int().positive(),
});

export type ContactFields = z.infer<typeof contactSchema>;
