'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ExternalLink, Play, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { useRef, useState } from 'react';
import { projects, type Project } from '@/lib/projects';
import VideoModal from '@/components/ui/VideoModal';

type ActiveVideo = { src: string; poster: string; title: string };

function ProjectCard({
  project,
  idx,
  onWatch,
  t
}: {
  project: Project;
  idx: number;
  onWatch: (v: ActiveVideo) => void;
  t: (key: string) => string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const title = t(`${project.slug}.title`);

  const handleEnter = () => {
    setIsHovering(true);
    const v = videoRef.current;
    if (v) {
      const playPromise = v.play();
      if (playPromise) playPromise.catch(() => {});
    }
  };

  const handleLeave = () => {
    setIsHovering(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  const handleWatch = () => {
    onWatch({ src: project.video, poster: project.poster, title });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative rounded-2xl border border-[#1f1f2e] bg-[#0f0f16] overflow-hidden card-hover"
    >
      {/* Video preview */}
      <div
        className="relative aspect-video overflow-hidden bg-[#06060a] border-b border-[#1f1f2e] cursor-pointer"
        onClick={handleWatch}
      >
        <video
          ref={videoRef}
          src={project.video}
          poster={project.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />

        {/* Overlay dégradé */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f16]/80 via-transparent to-transparent pointer-events-none" />

        {/* Play button */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isHovering ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <span className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-cyan-500/30 hover:border-cyan-400/50 transition-all">
            <Play size={22} className="ml-1" fill="currentColor" />
          </span>
        </div>

        {/* Label "regarder" en bas à gauche */}
        <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur border border-white/10 text-xs text-white flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Play size={12} fill="currentColor" />
          {t('watchVideo')}
        </div>

        {/* Icône expand en haut à droite */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:rotate-12">
          <ArrowUpRight size={16} className="text-cyan-400" />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-5 line-clamp-4">
          {t(`${project.slug}.description`)}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-[#1f1f2e]">
          <button
            onClick={handleWatch}
            className="inline-flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
          >
            <Play size={14} fill="currentColor" /> {t('watchVideo')}
          </button>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <FaGithub size={16} /> {t('viewCode')}
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <ExternalLink size={16} /> {t('viewDemo')}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const t = useTranslations('projects');
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null);

  return (
    <>
      <section id="projects" className="relative py-24 px-10">
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

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <ProjectCard
                key={project.slug}
                project={project}
                idx={idx}
                onWatch={setActiveVideo}
                t={t}
              />
            ))}
          </div>
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