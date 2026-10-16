'use client';

import { useTranslations } from 'next-intl';
import { Calendar, GraduationCap, MapPin } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import SpotlightCard from '@/components/motion/SpotlightCard';
import SectionHeader from './SectionHeader';

export default function Education() {
  const t = useTranslations('education');

  return (
    <section id="education" className="relative px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow={t('subtitle')} title={t('title')} />

        <Reveal delay={0.1} className="mt-16">
          <SpotlightCard className="p-8 md:p-14" size={600}>
            <div
              aria-hidden
              className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
            />
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                  <GraduationCap size={26} />
                </span>
                <h3 className="mt-8 text-2xl font-semibold leading-tight tracking-tight text-balance text-foreground md:text-4xl">
                  {t('degree')}
                </h3>
                <p className="mt-4 inline-flex items-start gap-2 text-muted">
                  <MapPin size={16} className="mt-1 shrink-0 text-accent" />
                  {t('school')}
                </p>
              </div>

              <div className="flex flex-col items-start gap-3 md:items-end">
                <span aria-hidden className="text-gradient text-7xl font-semibold leading-none tracking-[-0.06em] md:text-8xl">
                  2026
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card-2 px-4 py-1.5 text-sm text-muted">
                  <Calendar size={14} className="text-accent" />
                  {t('date')}
                </span>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
