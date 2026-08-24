import { z } from "zod";

export const contactSchema = z.object({
  email: z.email("Introduce un email válido."),
  subject: z.string().trim().min(3, "El asunto debe tener al menos 3 caracteres.").max(120),
  message: z.string().trim().min(20, "Cuéntame un poco más sobre tu idea.").max(3000),
  website: z.string().max(0, "Solicitud no válida."),
  startedAt: z.number().int().positive(),
});

export type ContactPayload = z.infer<typeof contactSchema>;

