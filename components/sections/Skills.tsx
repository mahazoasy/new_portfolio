'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
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
import {
  Code2,
  Image as ImageIcon,
  PenTool,
  Palette,
  Paintbrush,
  Layers
} from 'lucide-react';

type Skill = {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  category: string;
};

const skills: Skill[] = [
  // Frontend
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26', category: 'frontend' },
  { name: 'CSS3', icon: SiCss, color: '#1572B6', category: 'frontend' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', category: 'frontend' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: 'frontend' },
  { name: 'React', icon: SiReact, color: '#61DAFB', category: 'frontend' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff', category: 'frontend' },
  { name: 'Angular', icon: SiAngular, color: '#DD0031', category: 'frontend' },
  { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D', category: 'frontend' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', category: 'frontend' },

  // Backend
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933', category: 'backend' },
  { name: 'NestJS', icon: SiNestjs, color: '#E0234E', category: 'backend' },
  { name: 'PHP', icon: SiPhp, color: '#777BB4', category: 'backend' },
  { name: 'Laravel', icon: SiLaravel, color: '#FF2D20', category: 'backend' },
  { name: 'C#', icon: SiSharp, color: '#239120', category: 'backend' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098', category: 'backend' },

  // Database
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', category: 'database' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', category: 'database' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1', category: 'database' },
  { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E', category: 'database' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', category: 'database' },

  // Mobile
  { name: 'Android', icon: SiAndroid, color: '#34A853', category: 'mobile' },
  { name: 'Kotlin', icon: SiKotlin, color: '#7F52FF', category: 'mobile' },
  { name: 'Jetpack Compose', icon: Layers, color: '#4285F4', category: 'mobile' },
  { name: 'React Native', icon: TbBrandReactNative, color: '#61DAFB', category: 'mobile' },
  { name: 'Expo', icon: SiExpo, color: '#ffffff', category: 'mobile' },

  // AI & Data
  { name: 'Python', icon: SiPython, color: '#3776AB', category: 'ai' },
  { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C', category: 'ai' },

  // DevOps & Outils
  { name: 'Git', icon: SiGit, color: '#F05032', category: 'devops' },
  { name: 'GitHub', icon: SiGithub, color: '#ffffff', category: 'devops' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED', category: 'devops' },
  { name: 'VS Code', icon: VscVscode, color: '#007ACC', category: 'devops' },
  { name: 'Android Studio', icon: SiAndroid, color: '#3DDC84', category: 'devops' },
  { name: 'Vercel', icon: SiVercel, color: '#ffffff', category: 'devops' },
  { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF', category: 'devops' },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37', category: 'devops' },
  { name: 'Swagger', icon: SiSwagger, color: '#85EA2D', category: 'devops' },
  { name: 'Linux', icon: SiLinux, color: '#FCC624', category: 'devops' },
  { name: 'npm', icon: SiNpm, color: '#CB3837', category: 'devops' },

  // Design
  { name: 'Figma', icon: SiFigma, color: '#F24E1E', category: 'design' },
  { name: 'Adobe Photoshop', icon: ImageIcon, color: '#31A8FF', category: 'design' },
  { name: 'Adobe Illustrator', icon: PenTool, color: '#FF9A00', category: 'design' },
  { name: 'Adobe XD', icon: Palette, color: '#FF61F6', category: 'design' },
  { name: 'Canva', icon: Paintbrush, color: '#00C4CC', category: 'design' },
  { name: 'Photopea', icon: Code2, color: '#18A497', category: 'design' }
];

const categories = ['frontend', 'backend', 'database', 'mobile', 'ai', 'devops', 'design'] as const;

export default function Skills() {
  const t = useTranslations('skills');

  return (
    <section id="skills" className="relative py-24 px-10 bg-[#08080e]">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative max-w-7xl mx-auto">
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

        <div className="space-y-14">
          {categories.map((category, catIdx) => {
            const catSkills = skills.filter((s) => s.category === category);
            if (catSkills.length === 0) return null;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.05 }}
              >
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-3">
                  <span className="w-8 h-px bg-gradient-to-r from-cyan-400 to-purple-500" />
                  {t(category)}
                  <span className="flex-1 h-px bg-[#1f1f2e]" />
                </h3>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {catSkills.map((skill, idx) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.03 }}
                        className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#1f1f2e] bg-[#0f0f16] p-4 hover:border-cyan-500/40 hover:bg-[#14141c] hover:-translate-y-1 transition-all cursor-pointer"
                      >
                        <div
                          className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-110"
                          style={{ color: skill.color }}
                        >
                          <Icon size={36} />
                        </div>
                        <span className="text-xs font-medium text-gray-300 text-center group-hover:text-white transition-colors leading-tight">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-10 border-t border-[#1f1f2e]"
        >
          <p className="text-sm text-gray-500">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mr-3">
              {t('alsoUsed')}
            </span>
            <span className="text-gray-400">
              SpeechBrain · KNN · Image Processing · Retrofit · Docker Compose · Swagger ·
              UML · Visual Paradigm · Agile · Scrum · REST API · JWT Auth · Stripe
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}