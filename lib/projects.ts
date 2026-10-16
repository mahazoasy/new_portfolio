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
    slug: 'portfolio',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vercel'],
    video: '/videos/posters/portfolio.png',
    poster: '/videos/posters/portfolio.png',
    github: 'https://github.com/mahazoasy/new_portfolio',
    demo: 'https://mahazoasy-heritiana.vercel.app',
    category: 'web',
    isImage: true
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
    slug: 'invisible-queue',
    stack: ['React Native', 'Expo', 'Supabase', 'TypeScript', 'Geolocation'],
    video: '/videos/invisible-queue.mp4',
    poster: '/videos/posters/invisible-queue.webp',
    github: 'https://github.com/mahazoasy/InvisibleQueue.git',
    demo: '',
    category: 'mobile'
  },
  {
    slug: 'sonicflow',
    stack: ['Kotlin', 'Jetpack Compose', 'Media3', 'Room', 'Hilt'],
    video: '/videos/sonicflow.mp4',
    poster: '/videos/posters/sonicflow.webp',
    github: 'https://github.com/mahazoasy',
    demo: '',
    category: 'mobile'
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
  // 💤 Projets temporairement désactivés
  // {
  //   slug: 'speaker',
  //   stack: ['Python', 'PyTorch', 'SpeechBrain', 'ECAPA-TDNN'],
  //   video: '/videos/speaker.mp4',
  //   poster: '/videos/posters/speaker.png',
  //   github: 'https://github.com/mahazoasy/speaker_recognition_app.git',
  //   demo: '',
  //   category: 'api'
  // },
  // {
  //   slug: 'ocr',
  //   stack: ['Angular', 'NestJS', 'Python', 'KNN', 'Chart.js'],
  //   video: '/videos/ocr.mp4',
  //   poster: '/videos/posters/ocr.png',
  //   github: 'https://github.com/mahazoasy',
  //   demo: '',
  //   category: 'web'
  // }
];