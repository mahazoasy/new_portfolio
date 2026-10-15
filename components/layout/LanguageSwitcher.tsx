'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';

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
  const [isPending, startTransition] = useTransition();

  // Précharge les deux locales au montage
  useEffect(() => {
    router.prefetch('/fr');
    router.prefetch('/en');
  }, [router]);

  const switchLocale = (next: string) => {
    if (next === locale) return;
    const segments = pathname.split('/');
    segments[1] = next;
    const newPath = segments.join('/') || `/${next}`;

    startTransition(() => {
      // scroll: false ne saute pas en haut de la page
      router.replace(newPath, { scroll: false });
    });
  };

  const baseBtn =
    'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer hover:scale-105 disabled:cursor-wait disabled:opacity-70';
  const active =
    'bg-cyan-500/20 text-white border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.3)]';
  const inactive = 'text-gray-400 hover:text-white border border-transparent';

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[#1f1f2e] bg-[#0f0f16]/80 backdrop-blur p-1">
      <button
        onClick={() => switchLocale('fr')}
        disabled={isPending}
        aria-label="Français"
        className={`${baseBtn} ${locale === 'fr' ? active : inactive}`}
      >
        <FlagFR />
        <span>FR</span>
      </button>
      <button
        onClick={() => switchLocale('en')}
        disabled={isPending}
        aria-label="English"
        className={`${baseBtn} ${locale === 'en' ? active : inactive}`}
      >
        <FlagUK />
        <span>EN</span>
      </button>
    </div>
  );
}