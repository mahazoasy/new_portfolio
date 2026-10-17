'use client';

import { useTranslations } from 'next-intl';
import SectionHeader from './SectionHeader';
import Reveal from '@/components/motion/Reveal';

export default function SoftSkills() {
  const t = useTranslations('softskills');
  const items = t.raw('items') as string[];
  const loop = [...items, ...items];

  return (
    <section className="relative overflow-hidden border-y border-border bg-card-2/50 py-16 md:py-24">
      <div className="px-6 md:px-10">
        <SectionHeader title={t('title')} />
      </div>

      <Reveal delay={0.1} className="mt-14 space-y-4">
        <ul className="sr-only">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {[false, true].map((reverse) => (
          <div key={String(reverse)} aria-hidden className="mask-fade-x overflow-hidden">
            <div
              className={`flex w-max gap-4 hover:[animation-play-state:paused] ${
                reverse ? 'animate-marquee-reverse' : 'animate-marquee'
              }`}
            >
              {loop.map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="flex shrink-0 items-center gap-4 rounded-full border border-border bg-card px-7 py-4 text-xl font-medium tracking-tight text-muted transition-colors duration-300 hover:border-accent hover:text-foreground md:text-2xl"
                >
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
