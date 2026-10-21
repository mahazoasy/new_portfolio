'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Calendar, MapPin, ArrowUpRight, Clock } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import SpotlightCard from '@/components/motion/SpotlightCard';
import SectionHeader from './SectionHeader';

export default function Education() {
  const t = useTranslations('education');
  const skills = t.raw('skills') as string[];

  return (
    <section id="education" className="relative px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow={t('subtitle')} title={t('title')} />

        <Reveal delay={0.1} className="mt-16">
          <SpotlightCard className="p-8 md:p-14">
            <div
              aria-hidden
              className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
            />
            
            <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
              
              <div className="flex flex-col gap-6 flex-1">
                <div className="flex items-start gap-5">
                  
                  {/* LOGO UAZ CLIQUABLE */}
                  <a 
                    href="https://registrar.zurcher.edu.mg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-1 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-sm border border-border/50 hover:scale-105 transition-transform"
                  >
                    <Image 
                      src="/images/logo-uaz.png" 
                      alt="Logo Université Adventiste Zurcher" 
                      width={48} 
                      height={48} 
                      className="object-contain"
                    />
                  </a>
                  
                  <div>
                    <h3 className="text-2xl font-semibold leading-tight tracking-tight text-balance text-foreground md:text-3xl">
                      {t('degree')}
                    </h3>
                    <p className="mt-2 inline-flex items-center gap-2 text-muted text-sm md:text-base">
                      <MapPin size={16} className="shrink-0 text-accent" />
                      {t('school')}
                    </p>
                  </div>
                </div>

                <p className="text-sm md:text-base leading-relaxed text-muted">
                  {t('description')}
                </p>
              </div>

              <div className="flex flex-col items-start gap-3 md:items-end shrink-0 md:mt-1">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-muted mb-2">
                  <Clock size={16} className="text-accent" />
                  {t('period')}
                </span>
                <span aria-hidden className="text-gradient text-6xl font-semibold leading-none tracking-[-0.06em] md:text-7xl lg:text-8xl">
                  2026
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card-2 px-4 py-1.5 text-sm text-muted">
                  <Calendar size={14} className="text-accent" />
                  {t('date')}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-sm font-semibold text-foreground mb-3">Compétences clés</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-card-2 px-3 py-1 text-xs font-mono text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <a
                href="https://registrar.zurcher.edu.mg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-on-accent"
              >
                En savoir plus
                <ArrowUpRight size={16} />
              </a>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}