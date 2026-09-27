import React from 'react';
import { BookOpen } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'horizontal' | 'stacked' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  variant = 'horizontal',
  size = 'md',
}) => {
  // Size dimensions
  const sizeMap = {
    sm: {
      container: 'w-8 h-8 rounded-lg',
      icon: 'w-4 h-4',
      title: 'text-base',
      arabic: 'text-[10px]',
      english: 'text-[9px]',
    },
    md: {
      container: 'w-10 h-10 sm:w-11 sm:h-11 rounded-xl',
      icon: 'w-5 h-5 sm:w-6 sm:h-6',
      title: 'text-lg sm:text-xl',
      arabic: 'text-[11px]',
      english: 'text-[10px]',
    },
    lg: {
      container: 'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl',
      icon: 'w-9 h-9 sm:w-11 sm:h-11',
      title: 'text-2xl sm:text-3xl',
      arabic: 'text-sm',
      english: 'text-xs',
    },
  }[size];

  // If stacked variant requested (e.g. splash, hero, or about page)
  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        <div
          className={`${sizeMap.container} bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md border border-amber-300/60 mb-3`}
        >
          <BookOpen className={`${sizeMap.icon} text-white drop-shadow-xs`} />
        </div>
        <span className={`font-arabic ${sizeMap.arabic} text-amber-700 font-semibold tracking-wider mb-1`}>
          مَكْتَبُ الْهِدَايَةِ
        </span>
        <span className={`font-bengali ${sizeMap.title} font-extrabold text-gray-900 tracking-tight leading-tight`}>
          মাকতাব আল হিদায়াহ
        </span>
        <span className={`${sizeMap.english} text-amber-600 font-medium tracking-wider uppercase mt-1`}>
          Maktab Al Hidayah
        </span>
      </div>
    );
  }

  // If icon-only variant
  if (variant === 'icon' || !showText) {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <div
          className={`${sizeMap.container} bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-white shadow-sm border border-amber-300/60`}
        >
          <BookOpen className={`${sizeMap.icon} text-white drop-shadow-xs`} />
        </div>
      </div>
    );
  }

  // Default: Horizontal Header / Footer Brand Layout (The original Demo Logo)
  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Demo Emblem: Gold Holy Book Tile */}
      <div
        className={`${sizeMap.container} bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-white shadow-sm border border-amber-300/60 shrink-0 transition-transform duration-200 group-hover:scale-105`}
      >
        <BookOpen className={`${sizeMap.icon} text-white drop-shadow-xs`} />
      </div>

      {/* Demo Typography: Unified Brand Title & Arabic Calligraphy */}
      <div className="flex flex-col text-left leading-none justify-center">
        <span className={`font-arabic ${sizeMap.arabic} text-amber-700 font-semibold tracking-wide mb-0.5`}>
          مَكْتَبُ الْهِدَايَةِ
        </span>
        <span className={`font-bengali ${sizeMap.title} font-extrabold text-gray-900 tracking-tight leading-tight`}>
          মাকতাব আল হিদায়াহ
        </span>
        <span className={`${sizeMap.english} text-amber-600 font-medium tracking-wider uppercase mt-0.5`}>
          Maktab Al Hidayah
        </span>
      </div>
    </div>
  );
};
