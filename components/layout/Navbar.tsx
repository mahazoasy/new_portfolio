'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'services', 'projects', 'experience', 'education', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const links = [
    { href: '#about', label: t('about'), id: 'about' },
    { href: '#skills', label: t('skills'), id: 'skills' },
    { href: '#services', label: t('services'), id: 'services' },
    { href: '#projects', label: t('projects'), id: 'projects' },
    { href: '#experience', label: t('experience'), id: 'experience' },
    { href: '#education', label: t('education'), id: 'education' },
    { href: '#contact', label: t('contact'), id: 'contact' }
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#06060a]/80 backdrop-blur-xl border-b border-[#1f1f2e]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-10 h-16 flex items-center justify-between">
        <a href="#home" className="relative font-bold text-xl">
          <span className="gradient-text">Mahazoasy</span>
          <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-cyan-400 to-purple-500" />
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative px-3 py-2 text-sm transition-colors ${
                active === link.id ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.label}
              {active === link.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-cyan-400 to-purple-500"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <button
          className="lg:hidden text-gray-200 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-[#06060a]/95 backdrop-blur-xl border-b border-[#1f1f2e]"
          >
            <nav className="px-10 py-4 flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 rounded-lg text-sm text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-[#1f1f2e] flex items-center justify-between">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}