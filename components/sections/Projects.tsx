'use client';

import { useRef, useState, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Play, ChevronDown, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { projects, type Project } from '@/lib/projects';
import SpotlightCard from '@/components/motion/SpotlightCard';
import { EASE } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';
import SectionHeader from './SectionHeader';

type Filter = 'all' | 'web' | 'mobile';

// ────────────────────────────────────────────────────────
// Modal de détails
// ────────────────────────────────────────────────────────
function ProjectDetailModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const t = useTranslations('projects');
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  const title = t(`${project.slug}.title`);
  const subtitle = t(`${project.slug}.subtitle`);
  const description = t(`${project.slug}.description`);
  const highlights = t.raw(`${project.slug}.highlights`) as string[] || [];
  
  const isMobile = project.category === 'mobile' && project.slug !== 'plume-relais';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: EASE }}
        className={cn(
          "relative flex max-h-[92vh] w-full overflow-hidden rounded-3xl border border-border bg-card shadow-2xl",
          isMobile ? "max-w-6xl flex-col md:flex-row" : "max-w-4xl flex-col"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-muted backdrop-blur-md transition-colors hover:bg-background hover:text-foreground"
        >
          <X size={20} />
        </button>

        {/* ZONE VIDÉO () */}
        <div
          className={cn(
            "relative flex shrink-0 items-center justify-center overflow-hidden",
            isMobile
              ? "h-[45vh] min-h-[320px] w-full bg-[#1a1a1a] p-4 sm:h-[55vh] md:h-auto md:min-h-[650px] md:w-1/2 md:p-6"
              : "aspect-video w-full bg-black"
          )}
        >
          {isMobile ? (
            <div className="relative flex h-full max-h-[65vh] aspect-[9/19] shrink-0 items-center justify-center overflow-hidden rounded-[2rem] border-[6px] border-[#333] bg-black shadow-2xl">
              {/* Encoche */}
              <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-[#333]" />
              
              <video
                key={project.video}
                src={project.video}
                poster={project.poster}
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>
          ) : (
            <video
              key={project.video}
              src={project.video}
              poster={project.poster}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-contain"
            />
          )}
        </div>

        {/* ZONE TEXTE */}
        <div className={cn(
          "flex flex-col overflow-y-auto p-6 md:p-10 custom-scrollbar",
          isMobile ? "w-full md:w-1/2" : "w-full"
        )}>
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-4xl">
                {title}
              </h2>
              <span className="shrink-0 rounded-full border border-border bg-card-2 px-3 py-1 text-xs font-medium text-muted md:text-sm">
                {project.year}
              </span>
            </div>
            <p className="text-base font-medium text-accent md:text-lg">{subtitle}</p>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
            {description}
          </p>

          {highlights.length > 0 && (
            <ul className="mt-6 space-y-3">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted md:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8">
            <h4 className="text-sm font-semibold text-foreground mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-card-2 px-3 py-1 text-xs font-mono text-muted md:text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-10 flex flex-wrap items-center gap-4 border-t border-border">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-105"
              >
                <FaGithub size={18} /> {t('viewCode')}
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <ExternalLink size={18} /> {t('viewDemo')}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────
// ProjectCard
// ────────────────────────────────────────────────────────
type ProjectCardProps = {
  project: Project;
  index: number;
  featured?: boolean;
  onWatch: (project: Project) => void;
  onDetails: (project: Project) => void;
  t: (key: string) => string;
};

function ProjectCard({ project, index, featured = false, onWatch, onDetails, t }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  
  const title = t(`${project.slug}.title`);
  const description = t(`${project.slug}.description`);
  const isImage = project.isImage === true;
  const isMobile = project.category === 'mobile' && project.slug !== 'plume-relais';

  const handleEnter = () => {
    if (isImage) return;
    videoRef.current?.play().catch(() => {});
  };

  const handleLeave = () => {
    if (isImage) return;
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setPlaying(false);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: EASE }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="h-full group"
    >
      <SpotlightCard className="h-full p-2 flex flex-col">
        <div className={cn('flex h-full flex-col', featured && 'lg:grid lg:grid-cols-[1.4fr_1fr] lg:items-stretch')}>
          
          {/* Zone Vidéo / Image (Carte) */}
          <div
            onClick={() => !isImage && onDetails(project)}
            className={cn(
              'relative flex overflow-hidden rounded-[1.25rem] border border-border bg-card-2 text-left',
              featured && !isMobile ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[440px]' : 'aspect-[16/10]',
              isMobile && 'items-center justify-center bg-[#1a1a1a] p-4', 
              isImage ? 'cursor-default' : 'cursor-pointer'
            )}
          >
            {isMobile && !isImage ? (
              // Cadre téléphone sur la carte
              <div className="relative h-full max-h-[90%] aspect-[9/19] rounded-[1.5rem] border-[4px] border-[#333] bg-black shadow-xl overflow-hidden">
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-3 bg-[#333] rounded-b-lg z-10" />
                <Image
                  src={project.poster}
                  alt={title}
                  fill
                  className="object-cover"
                />
                <video
                  ref={videoRef}
                  src={project.video}
                  muted
                  loop
                  playsInline
                  preload="none"
                  onPlaying={() => setPlaying(true)}
                  className={cn(
                    'absolute inset-0 h-full w-full object-contain transition-opacity duration-500', // Déjà correct
                    playing ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </div>
            ) : (
              // Design Web
              <>
                <Image
                  src={project.poster}
                  alt={title}
                  fill
                  className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  sizes={featured ? '(max-width: 1024px) 100vw, 60vw' : '(max-width: 1024px) 100vw, 33vw'}
                />
                {!isImage && (
                  <video
                    ref={videoRef}
                    src={project.video}
                    muted
                    loop
                    playsInline
                    preload="none"
                    onPlaying={() => setPlaying(true)}
                    className={cn(
                      'absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500',
                      playing ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                )}
              </>
            )}

            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1 font-mono text-[11px] text-[#fafafa] backdrop-blur-xl z-10">
              {String(index + 1).padStart(2, '0')}
            </span>

            {!isImage && !playing && (
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-[#fafafa] py-1.5 pl-1.5 pr-4 text-xs font-medium text-[#0a0a0b] shadow-lg z-10">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-on-accent">
                  <Play size={10} fill="currentColor" className="ml-0.5" />
                </span>
                {t('watchVideo')}
              </span>
            )}
          </div>

          {/* Zone Texte */}
          <div className={cn('flex flex-1 flex-col p-5 md:p-6', featured && 'lg:p-10')}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className={cn('font-semibold tracking-tight text-foreground', featured ? 'text-3xl md:text-4xl' : 'text-xl')}>
                  {title}
                </h3>
              </div>
            </div>

            <p className={cn('mt-4 text-sm leading-relaxed text-pretty text-muted', featured ? 'md:text-base' : 'line-clamp-3')}>
              {description}
            </p>

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-full border border-border bg-card-2 px-2.5 py-1 font-mono text-[11px] text-muted">
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center gap-4 pt-8 text-sm">
              <button
                onClick={() => onDetails(project)}
                className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 font-medium text-accent transition-colors hover:bg-accent hover:text-on-accent"
              >
                {t('viewDetails')}
                <ArrowUpRight size={16} />
              </button>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-foreground underline-offset-4 hover:underline">
                  <FaGithub size={15} /> {t('viewCode')}
                </a>
              )}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.article>
  );
}

// ────────────────────────────────────────────────────────
// Composant Principal
// ────────────────────────────────────────────────────────
const INITIAL_VISIBLE = 4;

export default function Projects() {
  const t = useTranslations('projects');
  const [activeDetail, setActiveDetail] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [showAll, setShowAll] = useState(false);

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t('filters.all') },
    { key: 'web', label: t('filters.web') },
    { key: 'mobile', label: t('filters.mobile') }
  ];

  const filtered = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter((p) => p.category.toLowerCase() === filter.toLowerCase());
  }, [filter]);

  const visible = useMemo(() => {
    if (showAll) return filtered;
    return filtered.slice(0, INITIAL_VISIBLE);
  }, [filtered, showAll]);

  const hasMore = filtered.length > INITIAL_VISIBLE;
  const hiddenCount = filtered.length - INITIAL_VISIBLE;

  return (
    <>
      <section id="projects" className="relative px-6 py-28 md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={t('subtitle')} title={t('title')} />

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {filters.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => { setFilter(key); setShowAll(false); }}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  filter === key
                    ? 'border-accent bg-accent text-on-accent'
                    : 'border-border bg-card text-muted hover:border-border-strong hover:text-foreground'
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="mt-16 text-center text-muted">{t('empty')}</p>
          ) : (
            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {visible.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    layout
                    className={cn(!showAll && filter === 'all' && index === 0 && 'md:col-span-2 lg:col-span-3')}
                  >
                    <ProjectCard
                      project={project}
                      index={index}
                      featured={!showAll && filter === 'all' && index === 0}
                      onWatch={setActiveDetail}
                      onDetails={setActiveDetail}
                      t={t}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {hasMore && !showAll && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="group inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent hover:bg-accent hover:text-on-accent"
              >
                {t('viewAll')}
                <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs text-accent group-hover:bg-on-accent/20 group-hover:text-on-accent">
                  +{hiddenCount}
                </span>
                <ChevronDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {activeDetail && (
          <ProjectDetailModal
            project={activeDetail}
            onClose={() => setActiveDetail(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}