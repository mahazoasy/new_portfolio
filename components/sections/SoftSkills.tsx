'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function SoftSkills() {
  const t = useTranslations('softskills');
  const items = t.raw('items') as string[];

  return (
    <section className="py-24 px-10 bg-[#0d0d14]">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          <span className="gradient-text">{t('title')}</span>
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-3">
          {items.map((item, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="px-5 py-2.5 rounded-full bg-[#14141c] border border-[#262633] text-gray-300 hover:border-cyan-500 transition-colors"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}