import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import SoftSkills from '@/components/sections/SoftSkills';
import Domains from '@/components/sections/Domains';
import Contact from '@/components/sections/Contact';

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Services /> 
      <Projects />
      <Experience />
      <Education />
      <SoftSkills />
      <Domains />
      <Contact />
    </>
  );
}