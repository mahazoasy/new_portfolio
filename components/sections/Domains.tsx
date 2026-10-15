'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

export default function Domains() {
  const t = useTranslations('domains');
  const items = t.raw('items') as string[];

  return (
    <section className="py-24 px-10">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          <span className="gradient-text">{t('title')}</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="flex items-center gap-3 bg-[#14141c] border border-[#262633] rounded-xl p-4 card-hover"
            >
              <Target size={18} className="text-cyan-400" />
              <span className="text-gray-300 text-sm">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}