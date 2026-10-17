export type ProjectCategory = 'web' | 'mobile' | 'api';

export type Project = {
  slug: string;
  stack: string[];
  video: string;
  poster: string;
  github: string;
  demo: string;
  category: ProjectCategory;
  isImage?: boolean;
  year: string; 
};

export const projects: Project[] = [
  {
    slug: 'allmada',
    stack: ['Angular', 'NestJS', 'MongoDB', 'Docker', 'Stripe'],
    video: '/videos/allmada.mp4',
    poster: '/videos/posters/allmada.webp',
    github: 'https://github.com/mahazoasy/AllMada_Web.git',
    demo: '',
    category: 'web',
    year: '2026'
  },
  {
    slug: 'portfolio',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vercel'],
    video: '/videos/portfolio.mp4',
    poster: '/videos/posters/portfolio.webp',
    github: 'https://github.com/mahazoasy/new_portfolio',
    demo: '',
    category: 'web',
    year: '2026'
  },
  {
    slug: 'plume-relais',
    stack: ['React Native', 'Expo', 'Supabase', 'TypeScript'],
    video: '/videos/plume-relais.mp4',
    poster: '/videos/posters/plume-relais.webp',
    github: 'https://github.com/mahazoasy/plume-relais-autre.git',
    demo: '',
    category: 'mobile',
    year: '2025'
  },
  {
    slug: 'invisible-queue',
    stack: ['React Native', 'Expo', 'Supabase', 'TypeScript', 'Geolocation'],
    video: '/videos/invisible-queue.mp4',
    poster: '/videos/posters/invisible-queue.webp',
    github: 'https://github.com/mahazoasy/InvisibleQueue.git',
    demo: '',
    category: 'mobile',
    year: '2026'
  },
  // ── Projets cachés ──
  {
    slug: 'sonicflow',
    stack: ['Kotlin', 'Jetpack Compose', 'Media3', 'Room', 'Hilt'],
    video: '/videos/sonicflow.mp4',
    poster: '/videos/posters/sonicflow.webp',
    github: 'https://github.com/mahazoasy/SonicFlow.git',
    demo: '',
    category: 'mobile',
    year: '2026'
  },
  {
    slug: 'bible',
    stack: ['React Native', 'Expo', 'TypeScript', 'Supabase'],
    video: '/videos/bible.mp4',
    poster: '/videos/posters/bible.webp',
    github: 'https://github.com/mahazoasy/ma-bibles.git',
    demo: '',
    category: 'mobile',
    year: '2025'
  }
];