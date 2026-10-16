export type ProjectCategory = 'web' | 'mobile' | 'api';

export type Project = {
  slug: string;
  stack: string[];
  video: string;
  poster: string;
  github: string;
  demo: string;
  category: ProjectCategory;
};

export const projects: Project[] = [
  {
    slug: 'allmada',
    stack: ['Angular', 'NestJS', 'MongoDB', 'Docker', 'Stripe'],
    video: '/videos/allmada.mp4',
    poster: '/videos/posters/allmada.webp',
    github: 'https://github.com/mahazoasy/AllMada_Web.git',
    demo: '',
    category: 'web'
  },
  {
    slug: 'plume-relais',
    stack: ['React Native', 'Expo', 'Supabase', 'TypeScript'],
    video: '/videos/plume-relais.mp4',
    poster: '/videos/posters/plume-relais.webp',
    github: 'https://github.com/mahazoasy/plume-relais-autre.git',
    demo: '',
    category: 'mobile'
  },
  {
    slug: 'speaker',
    stack: ['Python', 'PyTorch', 'SpeechBrain', 'ECAPA-TDNN'],
    video: '/videos/speaker.mp4',
    poster: '/videos/posters/speaker.png',
    github: 'https://github.com/mahazoasy',
    demo: '',
    category: 'api'
  },
  {
    slug: 'ocr',
    stack: ['Angular', 'NestJS', 'Python', 'KNN', 'Chart.js'],
    video: '/videos/ocr.mp4',
    poster: '/videos/posters/ocr.png',
    github: 'https://github.com/mahazoasy',
    demo: '',
    category: 'web'
  },
  {
    slug: 'bible',
    stack: ['React Native', 'Expo', 'TypeScript', 'Supabase'],
    video: '/videos/bible.mp4',
    poster: '/videos/posters/bible.webp',
    github: 'https://github.com/mahazoasy',
    demo: '',
    category: 'mobile'
  }
];