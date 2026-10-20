'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { animate, useInView } from 'framer-motion';
import {
  Code2, Rocket, Globe2, GraduationCap, MapPin,
  Sparkles, RefreshCw, Heart,
  Briefcase, Languages, CalendarCheck, School
} from 'lucide-react';
import Reveal, { EASE } from '@/components/motion/Reveal';
import SpotlightCard from '@/components/motion/SpotlightCard';
import SectionHeader from './SectionHeader';

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const target = parseInt(value, 10);
  const suffix = value.replace(/^\d+/, '');

  useEffect(() => {
    if (!inView || !ref.current || Number.isNaN(target)) return;
    const from = target > 1000 ? target - 20 : 0;
    const controls = animate(from, target, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      }
    });
    return () => controls.stop();
  }, [inView, target, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}

export default function About() {
  const t = useTranslations('about');

  const stats = [
    { icon: Rocket, value: '10+', label: t('stats.projects') },
    { icon: Code2, value: '16+', label: t('stats.tech') },
    { icon: Globe2, value: '3', label: t('stats.languages') },
    { icon: GraduationCap, value: '2026', label: t('stats.graduated') }
  ];

  const pillars = [
    { icon: Sparkles, title: t('p1title'), desc: t('p1desc') },
    { icon: RefreshCw, title: t('p2title'), desc: t('p2desc') },
    { icon: Heart, title: t('p3title'), desc: t('p3desc') }
  ];

  const info = [
    { icon: MapPin, label: t('infoLocation'), value: t('infoLocationValue') },
    { icon: School, label: t('infoEducation'), value: t('infoEducationValue') },
    { icon: Languages, label: t('infoLanguages'), value: t('infoLanguagesValue') },
    { icon: CalendarCheck, label: t('infoAvailability'), value: t('infoAvailabilityValue') }
  ];

  return (
    <section id="about" className="relative px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={t('subtitle')} title={t('title')} />

        <div className="mt-16 grid gap-4 lg:grid-cols-6 lg:grid-rows-[auto_auto]">
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <SpotlightCard className="h-full p-2">
              <div className="relative h-full min-h-[420px] overflow-hidden rounded-[1.25rem]">
                <Image
                  src="/images/copy.jpg"
                  alt="Mahazoasy Heritiana Judicaël"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-black/30 p-3 backdrop-blur-xl">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-on-accent">
                    <MapPin size={16} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-xs text-[#e5e5ea]">{t('based')}</p>
                    <p className="text-sm font-semibold text-[#fafafa]">Toamasina, Madagascar</p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4">
            <SpotlightCard className="h-full p-8 md:p-12">
              <p className="text-2xl font-medium leading-snug tracking-tight text-pretty text-foreground md:text-3xl">
                {t('text1')}
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{t('text2')}</p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{t('text3')}</p>
            </SpotlightCard>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 lg:col-span-4 lg:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <Reveal key={label} delay={0.15 + i * 0.07}>
                <SpotlightCard className="h-full p-6">
                  <Icon size={18} className="text-accent" />
                  <p className="mt-8 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                    <AnimatedNumber value={value} />
                  </p>
                  <p className="mt-2 text-sm text-muted">{label}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 3 piliers */}
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={0.1 + i * 0.08}>
              <SpotlightCard className="h-full p-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon size={18} />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* Informations pratiques */}
        <Reveal delay={0.2}>
          <div className="mt-16">
            <h3 className="mb-8 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.22em] text-muted">
              <span aria-hidden className="h-px w-6 bg-accent" />
              {t('infoTitle')}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {info.map(({ icon: Icon, label, value }) => (
                <SpotlightCard key={label} className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-wider text-faint">{label}</p>
                      <p className="mt-1 text-base font-medium leading-snug text-foreground">
                        {value}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}