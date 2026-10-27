import type { Locale } from "@/lib/i18n";

// Respuestas del endpoint de contacto en el idioma desde el que se envía el formulario.
export const contactResponses = {
  es: {
    invalidFormat: "El formato del formulario no es válido.",
    rateLimited: "Has enviado varios mensajes seguidos. Espera unos minutos y vuelve a intentarlo.",
    tooLarge: "El mensaje es demasiado grande.",
    unreadable: "No se pudo leer el formulario.",
    invalidFields: "Revisa los campos del formulario e inténtalo de nuevo.",
    notConfigured: "El formulario aún no está conectado. Puedes usar el email directo mientras tanto.",
    invalidSender: "El remitente del formulario no está configurado correctamente. Contacta por email directo mientras se corrige.",
    deliveryFailed: "No he podido enviar el mensaje ahora mismo. Prueba de nuevo o utiliza el email directo.",
    sent: "Mensaje enviado. Te responderé en menos de 48 horas.",
  },
  en: {
    invalidFormat: "The form format is not valid.",
    rateLimited: "You have sent several messages in a row. Please wait a few minutes and try again.",
    tooLarge: "The message is too large.",
    unreadable: "The form could not be read.",
    invalidFields: "Please check the form fields and try again.",
    notConfigured: "The form is not connected yet. You can use the direct email in the meantime.",
    invalidSender: "The form sender is not configured correctly. Please use the direct email while it is fixed.",
    deliveryFailed: "I couldn't send the message right now. Please try again or use the direct email.",
    sent: "Message sent. I'll get back to you in less than 48 hours.",
  },
} satisfies Record<Locale, Record<string, string>>;
