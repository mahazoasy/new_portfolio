'use client';

import { useRef, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Play } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { projects, type Project, type ProjectCategory } from '@/lib/projects';
import VideoModal from '@/components/ui/VideoModal';
import SpotlightCard from '@/components/motion/SpotlightCard';
import { EASE } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';
import SectionHeader from './SectionHeader';

type ActiveVideo = { src: string; poster: string; title: string };

type Filter = 'all' | ProjectCategory;

type ProjectCardProps = {
  project: Project;
  index: number;
  featured?: boolean;
  onWatch: (video: ActiveVideo) => void;
  t: (key: string) => string;
};

function ProjectCard({ project, index, featured = false, onWatch, t }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const title = t(`${project.slug}.title`);
  const [name, ...rest] = title.split(' — ');
  const tagline = rest.join(' — ');

  const handleEnter = () => {
    videoRef.current?.play().catch(() => {});
  };

  const handleLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setPlaying(false);
  };

  const watch = () => onWatch({ src: project.video, poster: project.poster, title });

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: EASE }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="h-full"
    >
      <SpotlightCard className="h-full p-2">
        <div className={cn('flex h-full flex-col', featured && 'lg:grid lg:grid-cols-[1.4fr_1fr] lg:items-stretch')}>
          <button
            type="button"
            onClick={watch}
            aria-label={`${t('watchVideo')} — ${title}`}
            className={cn(
              'relative block overflow-hidden rounded-[1.25rem] border border-border bg-card-2 text-left',
              featured ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[440px]' : 'aspect-[16/10]'
            )}
          >
            <Image
              src={project.poster}
              alt=""
              fill
              sizes={featured ? '(max-width: 1024px) 100vw, 60vw' : '(max-width: 1024px) 100vw, 33vw'}
              className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
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
                'absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500',
                playing ? 'opacity-100' : 'opacity-0'
              )}
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1 font-mono text-[11px] text-[#fafafa] backdrop-blur-xl">
              {String(index + 1).padStart(2, '0')}
            </span>

            <span
              className={cn(
                'absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-[#fafafa] py-1.5 pl-1.5 pr-4 text-xs font-medium text-[#0a0a0b] shadow-lg transition-all duration-500',
                playing ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
              )}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-on-accent">
                <Play size={10} fill="currentColor" className="ml-0.5" />
              </span>
              {t('watchVideo')}
            </span>
          </button>

          <div className={cn('flex flex-1 flex-col p-5 md:p-6', featured && 'lg:p-10')}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  className={cn(
                    'font-semibold tracking-tight text-foreground',
                    featured ? 'text-3xl md:text-4xl' : 'text-xl'
                  )}
                >
                  {name}
                </h3>
                {tagline && <p className="mt-1 text-sm text-accent">{tagline}</p>}
              </div>
              <span
                aria-hidden
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent"
              >
                <ArrowUpRight size={16} />
              </span>
            </div>

            <p
              className={cn(
                'mt-4 text-sm leading-relaxed text-pretty text-muted',
                featured ? 'md:text-base' : 'line-clamp-3'
              )}
            >
              {t(`${project.slug}.description`)}
            </p>

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-border bg-card-2 px-2.5 py-1 font-mono text-[11px] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center gap-5 pt-8 text-sm">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-foreground underline-offset-4 hover:underline"
                >
                  <FaGithub size={15} /> {t('viewCode')}
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-foreground underline-offset-4 hover:underline"
                >
                  <ExternalLink size={15} /> {t('viewDemo')}
                </a>
              )}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.article>
  );
}

export default function Projects() {
  const t = useTranslations('projects');
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t('filters.all') },
    { key: 'web', label: t('filters.web') },
    { key: 'mobile', label: t('filters.mobile') },
    { key: 'api', label: t('filters.api') }
  ];

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <>
      <section id="projects" className="relative px-6 py-28 md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={t('subtitle')} title={t('title')} />

          {/* Filtres */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {filters.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
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

          {/* Grille de projets filtrés */}
          {filtered.length === 0 ? (
            <p className="mt-16 text-center text-muted">{t('empty')}</p>
          ) : (
            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    layout
                    className={cn(
                      filter === 'all' && index === 0 && 'md:col-span-2 lg:col-span-3'
                    )}
                  >
                    <ProjectCard
                      project={project}
                      index={index}
                      featured={filter === 'all' && index === 0}
                      onWatch={setActiveVideo}
                      t={t}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <VideoModal
        open={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        src={activeVideo?.src || ''}
        poster={activeVideo?.poster}
        title={activeVideo?.title || ''}
      />
    </>
  );
}