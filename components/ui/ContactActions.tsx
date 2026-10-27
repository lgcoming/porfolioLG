import { ExternalLink } from "lucide-react";
import { siWhatsapp } from "simple-icons";
import { contactDetails } from "@/data/contact";

function BrandIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={path} fill="currentColor" />
    </svg>
  );
}

export function ContactActions({ whatsappLabel }: { whatsappLabel: string }) {
  return (
    <div className="contact-actions contact-actions-contact">
      <a href={contactDetails.linkedinUrl} target="_blank" rel="noreferrer">
        <ExternalLink aria-hidden="true" />
        <span>LinkedIn</span>
      </a>
      <a href={contactDetails.whatsappUrl} target="_blank" rel="noreferrer">
        <BrandIcon path={siWhatsapp.path} />
        <span>{whatsappLabel}</span>
      </a>
    </div>
  );
}
