'use client';

import { useState, type ComponentType, type CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiAngular, SiVuedotjs, SiTailwindcss, SiNodedotjs, SiNestjs,
  SiPhp, SiLaravel, SiSharp, SiGraphql, SiMongodb, SiPostgresql,
  SiMysql, SiAndroid, SiKotlin, SiExpo, SiPython,
  SiPytorch, SiGit, SiGithub, SiDocker, SiFigma, SiSupabase, SiFirebase,
  SiVercel, SiGithubactions, SiPostman, SiSwagger, SiLinux, SiNpm
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';
import { VscVscode } from 'react-icons/vsc';
import { Code2, Image as ImageIcon, PenTool, Palette, Paintbrush, Layers } from 'lucide-react';
import Reveal, { EASE } from '@/components/motion/Reveal';
import SectionHeader from './SectionHeader';

type Skill = {
  name: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  color: string;
  category: Category;
};

const categories = ['frontend', 'backend', 'database', 'mobile', 'ai', 'devops', 'design'] as const;
type Category = (typeof categories)[number];

const MONO = 'var(--foreground)';

const skills: Skill[] = [
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26', category: 'frontend' },
  { name: 'CSS3', icon: SiCss, color: '#1572B6', category: 'frontend' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', category: 'frontend' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: 'frontend' },
  { name: 'React', icon: SiReact, color: '#61DAFB', category: 'frontend' },
  { name: 'Next.js', icon: SiNextdotjs, color: MONO, category: 'frontend' },
  { name: 'Angular', icon: SiAngular, color: '#DD0031', category: 'frontend' },
  { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D', category: 'frontend' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', category: 'frontend' },

  { name: 'Node.js', icon: SiNodedotjs, color: '#339933', category: 'backend' },
  { name: 'NestJS', icon: SiNestjs, color: '#E0234E', category: 'backend' },
  { name: 'PHP', icon: SiPhp, color: '#777BB4', category: 'backend' },
  { name: 'Laravel', icon: SiLaravel, color: '#FF2D20', category: 'backend' },
  { name: 'C#', icon: SiSharp, color: '#239120', category: 'backend' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098', category: 'backend' },

  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', category: 'database' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', category: 'database' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1', category: 'database' },
  { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E', category: 'database' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', category: 'database' },

  { name: 'Android', icon: SiAndroid, color: '#34A853', category: 'mobile' },
  { name: 'Kotlin', icon: SiKotlin, color: '#7F52FF', category: 'mobile' },
  { name: 'Jetpack Compose', icon: Layers, color: '#4285F4', category: 'mobile' },
  { name: 'React Native', icon: TbBrandReactNative, color: '#61DAFB', category: 'mobile' },
  { name: 'Expo', icon: SiExpo, color: MONO, category: 'mobile' },

  { name: 'Python', icon: SiPython, color: '#3776AB', category: 'ai' },
  { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C', category: 'ai' },

  { name: 'Git', icon: SiGit, color: '#F05032', category: 'devops' },
  { name: 'GitHub', icon: SiGithub, color: MONO, category: 'devops' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED', category: 'devops' },
  { name: 'VS Code', icon: VscVscode, color: '#007ACC', category: 'devops' },
  { name: 'Android Studio', icon: SiAndroid, color: '#3DDC84', category: 'devops' },
  { name: 'Vercel', icon: SiVercel, color: MONO, category: 'devops' },
  { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF', category: 'devops' },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37', category: 'devops' },
  { name: 'Swagger', icon: SiSwagger, color: '#85EA2D', category: 'devops' },
  { name: 'Linux', icon: SiLinux, color: '#FCC624', category: 'devops' },
  { name: 'npm', icon: SiNpm, color: '#CB3837', category: 'devops' },

  { name: 'Figma', icon: SiFigma, color: '#F24E1E', category: 'design' },
  { name: 'Adobe Photoshop', icon: ImageIcon, color: '#31A8FF', category: 'design' },
  { name: 'Adobe Illustrator', icon: PenTool, color: '#FF9A00', category: 'design' },
  { name: 'Adobe XD', icon: Palette, color: '#FF61F6', category: 'design' },
  { name: 'Canva', icon: Paintbrush, color: '#00C4CC', category: 'design' },
  { name: 'Photopea', icon: Code2, color: '#18A497', category: 'design' }
];

const alsoUsed = [
  'SpeechBrain', 'KNN', 'Image Processing', 'Retrofit', 'Docker Compose', 'Swagger',
  'UML', 'Visual Paradigm', 'Agile', 'Scrum', 'REST API', 'JWT Auth', 'Stripe'
];

export default function Skills() {
  const t = useTranslations('skills');
  const [active, setActive] = useState<Category>('frontend');
  const visible = skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="relative overflow-hidden bg-card-2/50 px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={t('subtitle')} title={t('title')} />

        <Reveal delay={0.1} className="mt-14 flex justify-center">
          <div
            role="tablist"
            aria-label={t('title')}
            className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full border border-border bg-card p-1.5 shadow-sm"
          >
            {categories.map((category) => {
              const selected = category === active;
              const count = skills.filter((s) => s.category === category).length;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="skills-panel"
                  onClick={() => setActive(category)}
                  className={`relative flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    selected ? 'text-background' : 'text-muted hover:text-foreground'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="skills-tab"
                      className="absolute inset-0 rounded-full bg-foreground"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{t(category)}</span>
                  <span className={`relative font-mono text-[10px] ${selected ? 'opacity-60' : 'text-faint'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          id="skills-panel"
          role="tabpanel"
          className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={`${active}-${skill.name}`}
                  layout
                  initial={{ opacity: 0, y: 16, scale: 0.96, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
                  transition={{ duration: 0.5, delay: i * 0.035, ease: EASE }}
                  style={{ '--brand': skill.color } as CSSProperties}
                  className="group relative flex aspect-[5/4] flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border border-border bg-card transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-1/2 h-full rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                    style={{ background: 'var(--brand)' }}
                  />
                  <span className="relative text-muted transition-all duration-500 group-hover:scale-110 group-hover:text-[var(--brand)]">
                    <Icon size={40} />
                  </span>
                  <span className="relative px-2 text-center text-sm font-medium text-foreground">{skill.name}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <Reveal delay={0.1} className="mt-20">
          <p className="text-center text-xs font-medium uppercase tracking-[0.22em] text-faint">{t('alsoUsed')}</p>
          <div className="mask-fade-x mt-6 overflow-hidden">
            <ul className="flex w-max animate-marquee-reverse gap-3 hover:[animation-play-state:paused]">
              {[...alsoUsed, ...alsoUsed].map((item, i) => (
                <li
                  key={`${item}-${i}`}
                  aria-hidden={i >= alsoUsed.length}
                  className="shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
