'use client';

import { useTranslations } from 'next-intl';
import { Mail, Phone, ArrowUp } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  const socials = [
    { href: 'https://github.com/mahazoasy', icon: <FaGithub size={18} />, label: 'GitHub' },
    { href: 'mailto:mahazoasyheritiana@gmail.com', icon: <Mail size={18} />, label: 'Email' },
    { href: 'tel:+261380836502', icon: <Phone size={18} />, label: 'Phone' }
  ];

  return (
    <footer className="relative border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-10 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <a href="#home" className="font-bold text-2xl text-accent inline-block mb-2">
              Mahazoasy
            </a>
            <p className="text-sm text-muted">
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
                className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted hover:text-accent hover:border-accent/50 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-xs text-faint">{t('builtWith')}</p>
            <a
              href="#home"
              className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors"
            >
              <ArrowUp size={14} /> {t('backToTop')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}