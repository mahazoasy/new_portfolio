'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-[68px] h-9" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      className="relative w-[68px] h-9 rounded-full cursor-pointer border transition-all duration-500 overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan-400/50 hover:scale-105"
      style={{
        borderColor: isDark ? '#312e81' : '#bae6fd',
        background: isDark
          ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)'
          : 'linear-gradient(135deg, #7dd3fc 0%, #bae6fd 50%, #e0f2fe 100%)'
      }}
    >
      {/* Étoiles (mode sombre) */}
      <span
        className={`absolute inset-0 transition-opacity duration-500 ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="absolute top-1.5 left-3 w-1 h-1 bg-white rounded-full" />
        <span className="absolute top-3 left-6 w-0.5 h-0.5 bg-white/80 rounded-full" />
        <span className="absolute top-5 left-4 w-0.5 h-0.5 bg-white/60 rounded-full" />
        <span className="absolute top-2 left-9 w-1 h-1 bg-white/70 rounded-full" />
        <span className="absolute top-6 left-11 w-0.5 h-0.5 bg-white/50 rounded-full" />
        <span className="absolute top-4 left-7 w-0.5 h-0.5 bg-white/70 rounded-full" />
      </span>

      {/* Nuages (mode clair) */}
      <span
        className={`absolute inset-0 transition-opacity duration-500 ${
          isDark ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="absolute top-2 left-3 w-5 h-2 bg-white/70 rounded-full blur-[1px]" />
        <span className="absolute bottom-2 left-2 w-7 h-2 bg-white/50 rounded-full blur-[1px]" />
        <span className="absolute top-3 left-10 w-4 h-1.5 bg-white/60 rounded-full blur-[1px]" />
      </span>

      {/* Knob coulissant */}
      <span
        className={`absolute top-1 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-500 ease-in-out ${
          isDark ? 'translate-x-[37px]' : 'translate-x-1'
        }`}
      >
        {isDark ? (
          <Moon size={14} className="text-indigo-900" fill="currentColor" />
        ) : (
          <Sun size={14} className="text-amber-500" fill="currentColor" />
        )}
      </span>
    </button>
  );
}