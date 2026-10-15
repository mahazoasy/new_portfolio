'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Experience() {
  const t = useTranslations('experience');
  const items = t.raw('items') as string[];

  return (
    <section id="experience" className="relative py-24 px-10 bg-[#08080e]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-cyan-400 uppercase tracking-widest mb-3">
            {t('subtitle')}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="gradient-text">{t('title')}</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/30 to-transparent" />

          <ul className="space-y-8">
            {items.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`relative flex items-start gap-6 ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 mt-2 z-10">
                  <span className="block w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                </div>

                {/* Content */}
                <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                  <div className="rounded-xl border border-[#1f1f2e] bg-[#0f0f16] p-5 card-hover">
                    <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}