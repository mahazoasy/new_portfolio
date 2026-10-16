'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useSpring } from 'framer-motion';
import { EASE } from '@/components/motion/Reveal';
import SectionHeader from './SectionHeader';

export default function Experience() {
  const t = useTranslations('experience');
  const items = t.raw('items') as string[];

  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative bg-card-2/50 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader eyebrow={t('subtitle')} title={t('title')} align="left" />
        </div>

        <ol ref={listRef} className="relative">
          <span aria-hidden className="absolute bottom-0 left-[15px] top-0 w-px bg-border" />
          <motion.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-0 left-[15px] top-0 w-px origin-top bg-accent"
          />

          {items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 24, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: EASE }}
              className="group relative flex gap-6 pb-10 last:pb-0"
            >
              <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background font-mono text-[11px] text-muted transition-colors duration-500 group-hover:border-accent group-hover:text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="pt-0.5 text-lg leading-relaxed text-pretty text-muted transition-colors duration-500 group-hover:text-foreground md:text-xl">
                {item}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
