export type Project = {
  slug: string;
  stack: string[];
  video: string;
  poster: string;
  github: string;
  demo: string;
};

export const projects: Project[] = [
  {
    slug: 'allmada',
    stack: ['Angular', 'NestJS', 'MongoDB', 'Docker', 'Stripe'],
    video: '/videos/allmada.mp4',
    poster: '/videos/posters/allmada.webp',
    github: 'https://github.com/mahazoasy/AllMada_Web.git',
    demo: ''
  },
  {
    slug: 'speaker',
    stack: ['Python', 'PyTorch', 'SpeechBrain', 'ECAPA-TDNN'],
    video: '/videos/speaker.mp4',
    poster: '/videos/posters/speaker.png',
    github: 'https://github.com/mahazoasy',
    demo: ''
  },
  {
    slug: 'ocr',
    stack: ['Angular', 'NestJS', 'Python', 'KNN', 'Chart.js'],
    video: '/videos/ocr.mp4',
    poster: '/videos/posters/ocr.png',
    github: 'https://github.com/mahazoasy',
    demo: ''
  },
  {
    slug: 'bible',
    stack: ['React Native', 'Expo', 'TypeScript', 'Supabase'],
    video: '/videos/bible.mp4',
    poster: '/videos/posters/bible.webp',
    github: 'https://github.com/mahazoasy',
    demo: ''
  }
];
