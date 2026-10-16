'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform
} from 'framer-motion';
import { ArrowRight, Download, Mail, MapPin, Check } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { EASE } from '@/components/motion/Reveal';

const techStack = [
  'React', 'Next.js', 'Angular', 'Vue.js', 'TypeScript', 'Node.js',
  'NestJS', 'Laravel', 'MongoDB', 'SQL', 'Docker', 'Tailwind',
  'React Native', 'Kotlin', 'Python', 'PyTorch'
];

const socials = [
  { href: 'https://github.com/mahazoasy', icon: FaGithub, label: 'GitHub', value: 'GitHub' },
  { href: 'https://www.linkedin.com/in/mahazoasy-judicael', icon: FaLinkedin, label: 'LinkedIn', value: 'LinkedIn' },
  { href: 'mailto:mahazoasyheritiana@gmail.com', icon: Mail, label: 'Email', value: 'mahazoasyheritiana@gmail.com' }
];

function RotatingRole({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <span className="relative inline-grid h-[1.35em] overflow-hidden align-bottom" aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={roles[index]}
          initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="whitespace-nowrap text-gradient-accent"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Portrait() {
  const t = useTranslations('hero');
  const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 10);
    rotateX.set(-y * 10);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
      className="relative mx-auto w-full max-w-[420px] [perspective:1200px]"
    >
      <div
        aria-hidden
        className="absolute -inset-10 rounded-[3rem] bg-[radial-gradient(closest-side,var(--accent-soft),transparent)] blur-2xl"
      />

      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative aspect-[4/5] rounded-[2.25rem] border border-border bg-card p-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.45)]"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[1.75rem]">
          <Image
            src="/images/pdp_judi.jpg"
            alt="Mahazoasy Heritiana Judicaël"
            fill
            priority
            sizes="(max-width: 1024px) 80vw, 420px"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transform: 'translateZ(40px)' }}
          className="absolute -left-6 top-10 hidden items-center gap-3 rounded-2xl border border-border bg-card/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:flex"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft font-mono text-sm font-semibold text-accent">
            {'</>'}
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-foreground">Full-Stack</p>
            <p className="text-xs text-muted">Web & Mobile</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute -right-5 bottom-12 hidden items-center gap-2.5 rounded-2xl border border-border bg-card/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:flex"
        >
          <MapPin size={16} className="text-accent" />
          <p className="text-sm font-medium text-foreground">{t('locationShort')}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function TechMarquee() {
  const items = [...techStack, ...techStack];

  return (
    <div className="relative border-y border-border bg-card/50 py-5 backdrop-blur-sm">
      <div className="mask-fade-x overflow-hidden">
        <ul className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
          {items.map((tech, i) => (
            <li
              key={`${tech}-${i}`}
              aria-hidden={i >= techStack.length}
              className="flex items-center gap-10 font-mono text-sm tracking-tight text-muted transition-colors hover:text-foreground"
            >
              {tech}
              <span aria-hidden className="h-1 w-1 rounded-full bg-faint" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const roles = t.raw('roles') as string[];
  const nameWords = t('name').split(' ');

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const trust = [t('trust1'), t('trust2'), t('trust3')];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="flex flex-1 items-center">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-6 pb-20 pt-32 md:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/70 py-1.5 pl-2 pr-4 text-xs font-medium text-muted backdrop-blur-xl"
            >
              <span className="relative flex h-5 items-center gap-1.5 rounded-full bg-success/10 px-2 text-success">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                {t('availability')}
              </span>
              <span className="hidden sm:inline">{t('greeting')}</span>
            </motion.div>

            <h1 className="mt-7 text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
              <span className="sr-only">{t('name')}</span>
              <span aria-hidden>
                {nameWords.map((word, i) => (
                  <span key={word} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0">
                    <motion.span
                      className="inline-block text-gradient"
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 1, delay: 0.15 + i * 0.09, ease: EASE }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
              className="mt-6 text-2xl font-medium tracking-tight text-muted sm:text-3xl"
            >
              <RotatingRole roles={roles} />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted lg:mx-0"
            >
              {t('pitch')}
            </motion.p>

            {/* Points de confiance */}
            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted lg:justify-start"
            >
              {trust.map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <Check size={14} className="text-success" />
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <a
                href="#contact"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                {t('ctaContact')}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={`/cv/CV_Mahazoasy_Heritiana_Judicael_${locale.toUpperCase()}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card/60 px-6 text-sm font-medium text-foreground backdrop-blur-xl transition-colors duration-300 hover:border-border-strong hover:bg-card"
              >
                <Download size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                {t('ctaCv')}
              </a>
            </motion.div>

            {/* Localisation + Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="mt-10 flex flex-col items-center gap-4 lg:items-start"
            >
              <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                <MapPin size={15} className="text-accent" />
                {t('location')}
              </span>

              <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                {socials.map(({ href, icon: Icon, label, value }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 py-1.5 pl-3 pr-4 text-xs font-medium text-muted backdrop-blur-xl transition-colors duration-300 hover:border-border-strong hover:text-foreground"
                  >
                    <Icon size={14} />
                    <span>{value}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <Portrait />
        </div>
      </motion.div>

      <a
        href="#about"
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint transition-colors hover:text-foreground lg:flex"
      >
        <span className="flex h-9 w-5 justify-center rounded-full border border-current pt-1.5">
          <span className="h-1.5 w-1 animate-scroll-dot rounded-full bg-current" />
        </span>
        <span className="sr-only">{t('scroll')}</span>
      </a>

      <TechMarquee />
    </section>
  );
}