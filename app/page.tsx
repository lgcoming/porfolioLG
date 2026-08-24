import { Cursor } from "@/components/motion/Cursor";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Technologies } from "@/components/sections/Technologies";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lgcomin.com";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Luis Gómez",
      url: siteUrl,
      jobTitle: "Full Stack Web Developer",
      email: "mailto:luis.gomez.comin@gmail.com",
      sameAs: ["https://linkedin.com/in/lgcomin"],
      knowsAbout: ["Desarrollo web", "Next.js", "React", "Inteligencia artificial", "Automatización"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "LG / Luis Gómez",
      inLanguage: "es",
      author: { "@id": `${siteUrl}/#person` },
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
      <Cursor />
      <main id="main-content">
        <Hero />
        <About />
        <Technologies />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
    </>
  );
}

