'use client';

import { useTranslations } from 'next-intl';
import {
  Globe, Smartphone, Server, Wrench, Brain, Gauge, ArrowRight
} from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import SpotlightCard from '@/components/motion/SpotlightCard';
import SectionHeader from './SectionHeader';

export default function Services() {
  const t = useTranslations('services');

  const services = [
    {
      key: 'web',
      icon: Globe,
      tags: ['Angular', 'React', 'Next.js', 'TypeScript', 'Tailwind']
    },
    {
      key: 'mobile',
      icon: Smartphone,
      tags: ['React Native', 'Expo', 'Kotlin']
    },
    {
      key: 'backend',
      icon: Server,
      tags: ['Node.js', 'NestJS', 'Express', 'REST API', 'JWT', 'Swagger', 'PostgreSQL', 'MongoDB', 'Laravel']
    },
    {
      key: 'tools',
      icon: Wrench,
      tags: ['Supabase', 'Firebase', 'PostgreSQL', 'MySQL', 'MongoDB', 'Rôles & accès']
    },
    {
      key: 'ai',
      icon: Brain,
      tags: ['Python', 'PyTorch', 'SpeechBrain']
    },
    {
      key: 'perf',
      icon: Gauge,
      tags: ['Requêtes SQL', 'Bundle size', 'Temps de chargement', 'Audit']
    }
  ];

  return (
    <section id="services" className="relative px-6 py-10 md:px-10 md:py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={t('subtitle')} title={t('title')} />

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted">
            {t('intro')}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ key, icon: Icon, tags }, i) => (
            <Reveal key={key} delay={0.1 + i * 0.06}>
              <SpotlightCard className="h-full p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                  <Icon size={20} />
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {t(`${key}.desc`)}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border bg-card-2 px-3 py-1 text-xs text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 flex flex-col items-center gap-6 rounded-[2rem] border border-border bg-card p-10 text-center md:p-14">
            <h3 className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {t('ctaTitle')}
            </h3>
            <a
              href="#contact"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-7 text-sm font-medium text-background transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              {t('ctaButton')}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}