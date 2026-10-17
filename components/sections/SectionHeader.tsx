'use client';

import Reveal from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className
}: SectionHeaderProps) {
  const centered = align === 'center';

  return (
    <Reveal className={cn(centered ? 'mx-auto text-center' : 'text-left', 'max-w-3xl', className)}>
      {eyebrow && (
        <p
          className={cn(
            'inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-accent',
            centered && 'justify-center'
          )}
        >
          <span aria-hidden className="h-px w-6 bg-accent" />
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-4xl font-semibold tracking-[-0.035em] text-balance text-gradient md:text-6xl md:leading-[1.05]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-5 text-lg leading-relaxed text-pretty text-muted',
            centered && 'mx-auto max-w-2xl'
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
