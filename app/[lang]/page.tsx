import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Technologies } from "@/components/sections/Technologies";
import { BackToTop } from "@/components/ui/BackToTop";
import { contactDetails } from "@/data/contact";
import { getDictionary } from "@/data/dictionaries";
import { hasLocale, localePath, type Locale } from "@/lib/i18n";

const knowsAbout: Record<Locale, string[]> = {
  es: ["Desarrollo web", "Inteligencia artificial", "Automatización"],
  en: ["Web development", "Artificial intelligence", "Automation"],
};

const getStructuredData = (locale: Locale) => {
  const url = `https://lgcomin.com${localePath(locale)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://lgcomin.com/#person",
        name: "Luis Gomez",
        url,
        image: "https://lgcomin.com/og-logo-lg.png",
        jobTitle: "Full Stack Web Developer",
        sameAs: [contactDetails.linkedinUrl, contactDetails.githubUrl],
        knowsAbout: knowsAbout[locale],
      },
      {
        "@type": "WebSite",
        "@id": "https://lgcomin.com/#website",
        url,
        name: "LGCOMIN",
        inLanguage: locale,
        author: { "@id": "https://lgcomin.com/#person" },
      },
    ],
  };
};

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dictionary = getDictionary(lang);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {dictionary.skipLink}
      </a>
      <Navbar locale={lang} copy={dictionary.nav} />
      <main id="main-content">
        <Hero copy={dictionary.hero} />
        <About copy={dictionary.about} />
        <Technologies copy={dictionary.technologies} />
        <Projects locale={lang} copy={dictionary.projects} />
        <Services locale={lang} copy={dictionary.services} />
        <Contact locale={lang} copy={dictionary.contact} />
      </main>
      <Footer copy={dictionary.footer} />
      <BackToTop label={dictionary.backToTop} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData(lang)) }}
      />
    </>
  );
}
