'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export default function Education() {
  const t = useTranslations('education');

  return (
    <section id="education" className="relative py-24 px-10">
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl border border-[#1f1f2e] bg-gradient-to-br from-[#0f0f16] to-[#0f0f16]/50 backdrop-blur p-8 card-hover overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-start gap-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 text-white shadow-lg flex-shrink-0">
              <GraduationCap size={32} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                {t('degree')}
              </h3>
              <p className="inline-flex items-center gap-2 text-gray-400 mb-4">
                <MapPin size={16} className="text-cyan-400" />
                {t('school')}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm">
                <Calendar size={14} /> {t('date')}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}