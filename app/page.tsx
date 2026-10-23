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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://lgcomin.com/#person",
      name: "Luis Gomez",
      url: "https://lgcomin.com/",
      image: "https://lgcomin.com/logo-lg.png",
      jobTitle: "Full Stack Web Developer",
      sameAs: [contactDetails.linkedinUrl, contactDetails.githubUrl],
      knowsAbout: ["Desarrollo web", "Inteligencia artificial", "Automatización"],
    },
    {
      "@type": "WebSite",
      "@id": "https://lgcomin.com/#website",
      url: "https://lgcomin.com/",
      name: "LGCOMIN",
      inLanguage: "es",
      author: { "@id": "https://lgcomin.com/#person" },
    },
  ],
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Saltar al contenido principal
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Technologies />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
