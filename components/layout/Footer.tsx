'use client';

import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  const socials = [
    { href: 'https://github.com/mahazoasy', icon: <FaGithub size={18} />, label: 'GitHub' },
    { href: 'mailto:mahazoasyheritiana@gmail.com ', icon: <Mail size={18} />, label: 'Email' },
    { href: 'tel:+261380836502', icon: <Phone size={18} />, label: 'Phone' }
  ];

  return (
    <footer className="relative border-t border-[#1f1f2e] mt-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-10 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <a href="#home" className="font-bold text-2xl gradient-text inline-block mb-2">
              Mahazoasy
            </a>
            <p className="text-sm text-gray-500">
              © {year} Mahazoasy Heritiana Judicaël. {t('rights')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full border border-[#1f1f2e] bg-[#0f0f16] flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:-translate-y-1 transition-all"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-xs text-gray-600">{t('builtWith')}</p>
            <a
              href="#home"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowUp size={14} /> {t('backToTop')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}