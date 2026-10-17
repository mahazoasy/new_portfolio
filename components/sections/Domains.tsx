'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EASE } from '@/components/motion/Reveal';
import SpotlightCard from '@/components/motion/SpotlightCard';
import SectionHeader from './SectionHeader';

export default function Domains() {
  const t = useTranslations('domains');
  const items = t.raw('items') as string[];

  return (
    <section className="relative px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title={t('title')} />

        <ul className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
            >
              <SpotlightCard className="flex h-full min-h-[150px] flex-col justify-between p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, '0')}</span>
                  <ArrowUpRight
                    size={18}
                    className="text-faint transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </div>
                <p className="mt-10 text-lg font-medium tracking-tight text-foreground">{item}</p>
              </SpotlightCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
