import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { ProjectIndex } from "@/components/sections/ProjectIndex";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <ProjectIndex />
      <Experience />
      <About />
      <Contact />
      <PersonJsonLd />
    </>
  );
}
