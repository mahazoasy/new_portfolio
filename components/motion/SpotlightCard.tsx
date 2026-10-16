'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

export default function SpotlightCard({ children, className }: SpotlightCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-border bg-card transition-[border-color,box-shadow] duration-500 hover:border-border-strong hover:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.35)]',
        className
      )}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}