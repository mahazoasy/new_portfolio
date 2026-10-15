'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Code2, Rocket, Globe2, GraduationCap } from 'lucide-react';

export default function About() {
  const t = useTranslations('about');
  const stats = [
    { icon: <Rocket size={20} />, value: '10+', label: t('stats.projects') },
    { icon: <Code2 size={20} />, value: '16+', label: t('stats.tech') },
    { icon: <Globe2 size={20} />, value: '2', label: t('stats.languages') },
    { icon: <GraduationCap size={20} />, value: '2026', label: t('stats.graduated') }
  ];

  return (
    <section id="about" className="relative py-24 px-10">
      <div className="max-w-7xl mx-auto">
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

        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex justify-center"
          >
            <div className="relative w-64 h-80 sm:w-72 sm:h-96">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-2xl" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-[#1f1f2e] p-1 bg-[#0f0f16]">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/images/profile1.jpg"
                    alt="Mahazoasy Heritiana Judicaël"
                    fill
                    sizes="(max-width: 768px) 256px, 288px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl bg-[#0f0f16] border border-cyan-500/30 backdrop-blur">
                <p className="text-xs text-gray-400">{t('based')}</p>
                <p className="text-sm font-bold text-cyan-400">Toamasina 🇲🇬</p>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 space-y-6"
          >
            <div className="space-y-4 text-gray-300 leading-relaxed text-base sm:text-lg">
              <p>{t('text1')}</p>
              <p>{t('text2')}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-[#1f1f2e] bg-[#0f0f16] p-4 text-center card-hover"
                >
                  <div className="flex justify-center mb-2 text-cyan-400">{s.icon}</div>
                  <p className="text-2xl font-bold gradient-text">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}