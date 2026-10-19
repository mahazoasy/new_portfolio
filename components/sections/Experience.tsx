'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, Heart, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { EASE } from '@/components/motion/Reveal';
import SpotlightCard from '@/components/motion/SpotlightCard';
import SectionHeader from './SectionHeader';

type ExperienceItem = {
  role: string;
  company: string;
  website?: string;
  location: string;
  period: string;
  description: string;
  tasks: string[];
  stack: string[];
  link?: string;
};

export default function Experience() {
  const t = useTranslations('experience');
  const items = t.raw('items') as ExperienceItem[];

  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative bg-card-2/50 px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader eyebrow={t('subtitle')} title={t('title')} align="left" />
        </div>

        <div ref={listRef} className="relative">
          {/* Ligne verticale */}
          <span aria-hidden className="absolute bottom-0 left-[19px] top-0 w-px bg-border" />
          <motion.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-0 left-[19px] top-0 w-px origin-top bg-accent"
          />

          {items.map((item, i) => {
            const Icon = item.company.includes('ONG') ? Heart : Briefcase;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: EASE }}
                className="group relative flex gap-6 pb-12 last:pb-0"
              >
                {/* Icône timeline */}
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted transition-colors duration-500 group-hover:border-accent group-hover:text-accent">
                  <Icon size={18} />
                </span>

                <SpotlightCard className="flex-1 p-6 md:p-8">
                  {/* En-tête */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                        {item.role}
                      </h3>
                      {item.website ? (
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block text-sm font-medium text-accent hover:underline decoration-accent underline-offset-4 transition-all"
                        >
                          {item.company}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm font-medium text-accent">{item.company}</p>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card-2 px-3 py-1 text-xs text-muted">
                      <Calendar size={12} />
                      {item.period}
                    </span>
                  </div>

                  {/* Localisation */}
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-faint">
                    <MapPin size={12} />
                    {item.location}
                  </p>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-relaxed text-pretty text-muted">
                    {item.description}
                  </p>

                  {/* Tâches */}
                  <ul className="mt-5 space-y-2">
                    {item.tasks.map((task, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted">
                        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
                        {task}
                      </li>
                    ))}
                  </ul>

                  {/* Stack */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-card-2 px-2.5 py-1 font-mono text-[11px] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Lien (si existe) */}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
                    >
                      <ExternalLink size={14} />
                      Voir le site
                    </a>
                  )}
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}