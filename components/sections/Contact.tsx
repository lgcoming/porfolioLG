import { HeroField } from "@/components/motion/HeroField";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ContactActions } from "@/components/ui/ContactActions";
import { ContactForm } from "@/components/ui/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactDetails } from "@/data/contact";
import type { Dictionary } from "@/data/dictionaries";
import type { Locale } from "@/lib/i18n";

type ContactProps = {
  locale: Locale;
  copy: Dictionary["contact"];
};

export function Contact({ locale, copy }: ContactProps) {
  return (
    <section id="contact" className="page-section contact-section" aria-labelledby="contact-title">
      <div className="section-constellation" aria-hidden="true">
        <HeroField density={0.72} />
      </div>
      <div className="contact-orbit contact-orbit-one" aria-hidden="true" />
      <div className="contact-orbit contact-orbit-two" aria-hidden="true" />
      <div className="contact-shell">
        <ScrollReveal variant="mask">
          <div id="contact-title"><SectionHeading index="05" eyebrow={copy.eyebrow} title={copy.title} /></div>
        </ScrollReveal>
        <div className="contact-layout">
          <ScrollReveal className="contact-copy" axis="x" direction={-1} variant="slide">
            <p className="contact-lead">{copy.lead}</p>
            <p>{copy.body}</p>
            <a className="contact-email" href={`mailto:${contactDetails.email}`}>
              {contactDetails.email} ↗
            </a>
            <ContactActions whatsappLabel={copy.whatsapp} />
          </ScrollReveal>
          <ScrollReveal className="contact-form-wrap" axis="x" variant="scale" delay={0.04}>
            <ContactForm locale={locale} copy={copy.form} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
