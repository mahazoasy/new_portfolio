'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function FlagFR({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" className={`${className} rounded-sm`}>
      <rect width="1" height="2" fill="#002395" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#ED2939" />
    </svg>
  );
}

function FlagUK({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={`${className} rounded-sm`}>
      <clipPath id="t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        clipPath="url(#t)"
        stroke="#C8102E"
        strokeWidth="4"
      />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isSwitching, setIsSwitching] = useState(false);

  // Précharge les deux locales avec les chemins actuels
  useEffect(() => {
    const otherLocale = locale === 'fr' ? 'en' : 'fr';
    const segments = pathname.split('/');
    segments[1] = otherLocale;
    const otherPath = segments.join('/') || `/${otherLocale}`;
    router.prefetch(otherPath);
  }, [locale, pathname, router]);

  const switchLocale = (next: string) => {
    if (next === locale || isSwitching) return;

    setIsSwitching(true);

    const segments = pathname.split('/');
    segments[1] = next;
    const newPath = segments.join('/') || `/${next}`;

    // Préserve le hash (#projects, #contact, etc.)
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const fullPath = hash ? `${newPath}${hash}` : newPath;

    router.replace(fullPath, { scroll: false });

    // Reset l'état après un court délai
    setTimeout(() => setIsSwitching(false), 300);
  };

  const baseBtn =
    'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer hover:scale-105 disabled:cursor-wait disabled:opacity-70';
  const active =
    'bg-accent/20 text-foreground border border-accent/50 shadow-[0_0_15px_var(--accent-soft)]';
  const inactive = 'text-muted hover:text-foreground border border-transparent';

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card/80 backdrop-blur p-1">
      <button
        onClick={() => switchLocale('fr')}
        disabled={isSwitching}
        aria-label="Français"
        className={`${baseBtn} ${locale === 'fr' ? active : inactive}`}
      >
        <FlagFR />
        <span>FR</span>
      </button>
      <button
        onClick={() => switchLocale('en')}
        disabled={isSwitching}
        aria-label="English"
        className={`${baseBtn} ${locale === 'en' ? active : inactive}`}
      >
        <FlagUK />
        <span>EN</span>
      </button>
    </div>
  );
}