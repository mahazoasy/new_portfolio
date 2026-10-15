'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Mail, MapPin, Download, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import Image from 'next/image';

const techStack = [
  'React', 'Next.js', 'Angular', 'Vue.js', 'TypeScript', 'Node.js',
  'NestJS', 'Laravel', 'MongoDB', 'SQL', 'Docker', 'Tailwind',
  'React Native', 'Kotlin', 'Python', 'PyTorch',
];

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const roles = t.raw('roles') as string[];

  return (
    <section id="home" className="relative min-h-screen flex flex-col">
      {/* Contenu principal */}
      <div className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-24 pb-16">
          {/* Gauche - Texte */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/40 bg-accent-soft text-accent text-xs font-medium mb-6">
              <Sparkles size={14} />
              {t('greeting')}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-[1.1] text-accent">
              {t('name')}
            </h1>

            <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-6">
              <span className="text-muted">{'< '}</span>
              <span className="text-accent">{roles.join(' · ')}</span>
              <span className="text-muted">{' />'}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-sm text-muted mb-8">
              <span className="flex items-center gap-1.5">
                <MapPin size={16} className="text-accent" /> {t('location')}
              </span>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-faint" />
              <span className="flex items-center gap-1.5 text-emerald-600">
                <span className="inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                {t('availability')}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent-strong transition-colors"
              >
                {t('ctaProjects')}
                <ArrowRight size={18} />
              </a>
              <a
                href={`/cv/CV_Mahazoasy_Heritiana_Judicael_${locale.toUpperCase()}.pdf`}
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent-soft transition-colors"
              >
                <Download size={18} /> {t('ctaCv')}
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3">
              {[
                { href: 'https://github.com/mahazoasy', icon: <FaGithub size={18} />, label: 'GitHub' },
                { href: 'mailto:mahazoasy.h@zurcher.edu.mg', icon: <Mail size={18} />, label: 'Email' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 rounded-full border border-border bg-card flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Droite - Photo */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-[400px] lg:h-[480px]">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-2 border-accent bg-card">
                <Image
                  src="/images/pdp_judi.jpg"
                  alt="Mahazoasy Heritiana Judicaël"
                  fill
                  priority
                  sizes="(max-width: 768px) 288px, 400px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lien "scroll" statique */}
      <a
        href="#about"
        className="hidden lg:flex flex-col items-center gap-1 pb-4 text-muted hover:text-accent transition-colors"
      >
        <span className="text-xs uppercase tracking-widest">{t('scroll')}</span>
        <ChevronDown size={18} />
      </a>

      {/* Technos (statique) */}
      <div className="border-t border-border bg-card py-4 px-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {techStack.map((tech) => (
            <span key={tech} className="text-sm text-muted hover:text-accent transition-colors">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}