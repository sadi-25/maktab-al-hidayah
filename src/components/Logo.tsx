import React, { useState } from 'react';
import { resolveAssetUrl } from '../services/dataService.ts';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'horizontal' | 'stacked' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * High-fidelity Vector Icon of the Official Maktab Al Hidayah Logo:
 * Vibrant orange squircle tile with the Holy Quran resting on a crossed wooden Rehal stand and soft diagonal shadow.
 */
export const QuranLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="মাকতাব আল হিদায়াহ প্রতীক"
  >
    <defs>
      <linearGradient id="quranLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FA8500" />
        <stop offset="45%" stopColor="#F57400" />
        <stop offset="100%" stopColor="#E65800" />
      </linearGradient>
      <clipPath id="squircleLogoClip">
        <rect x="0" y="0" width="512" height="512" rx="115" ry="115" />
      </clipPath>
    </defs>

    <rect x="0" y="0" width="512" height="512" rx="115" ry="115" fill="url(#quranLogoGrad)" />

    <g clipPath="url(#squircleLogoClip)">
      <path
        d="M 256,282 L 512,538 L 512,310 L 438,236 L 380,224 L 380,148 L 512,280 L 512,512 L 410,512 L 395,410 L 256,282 Z"
        fill="#9C3000"
        opacity="0.32"
      />
      <g>
        <path
          d="M 120,242 L 388,382 C 397,387 400,398 395,407 C 390,416 379,419 370,414 L 115,268 C 106,263 103,252 108,243 C 113,234 124,231 133,236 Z"
          fill="#FFFFFF"
        />
        <rect
          x="295"
          y="322"
          width="62"
          height="13"
          rx="6.5"
          ry="6.5"
          transform="rotate(27.5, 326, 328)"
          fill="url(#quranLogoGrad)"
        />
      </g>
      <g>
        <path
          d="M 392,242 L 124,382 C 115,387 112,398 117,407 C 122,416 133,419 142,414 L 397,268 C 406,263 409,252 404,243 C 399,234 388,231 379,236 Z"
          fill="#FFFFFF"
        />
        <rect
          x="155"
          y="322"
          width="62"
          height="13"
          rx="6.5"
          ry="6.5"
          transform="rotate(-27.5, 186, 328)"
          fill="url(#quranLogoGrad)"
        />
      </g>
      <rect x="253" y="182" width="6" height="98" rx="3" ry="3" fill="#FFFFFF" />
      <path
        d="M 253,180 L 155,138 C 148,135 140,138 136,144 L 74,236 C 70,242 72,248 78,250 L 116,260 L 253,283 L 253,270 L 122,247 L 88,238 L 142,154 L 253,194 Z"
        fill="#FFFFFF"
      />
      <path
        d="M 259,180 L 357,138 C 364,135 372,138 376,144 L 438,236 C 442,242 440,248 434,250 L 396,260 L 259,283 L 259,270 L 390,247 L 424,238 L 370,154 L 259,194 Z"
        fill="#FFFFFF"
      />
      <path
        d="M 248,192 L 162,152 C 158,150 153,152 150,156 L 128,218 C 126,222 128,226 132,228 L 248,266 Z"
        fill="#FFFFFF"
      />
      <path
        d="M 264,192 L 350,152 C 354,150 359,152 362,156 L 384,218 C 386,222 384,226 380,228 L 264,266 Z"
        fill="#FFFFFF"
      />
    </g>
  </svg>
);

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  variant = 'horizontal',
  size = 'md',
}) => {
  const [imgError, setImgError] = useState(false);

  const iconSizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
  }[size];

  const fullLogoHeightMap = {
    sm: 'h-9 w-auto',
    md: 'h-11 sm:h-12 w-auto',
    lg: 'h-16 sm:h-20 w-auto',
  }[size];

  // If icon-only variant requested
  if (variant === 'icon' || !showText) {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <div className={`${iconSizeMap} shrink-0 drop-shadow-sm`}>
          <QuranLogoIcon />
        </div>
      </div>
    );
  }

  // Official Horizontal Logo Image (contains icon + مَكْتَبُ الْهِدَايَةِ + মাকতাব আল হিদায়াহ)
  // No extra text next to the logo.
  return (
    <div className={`inline-flex items-center select-none group ${className}`}>
      {!imgError ? (
        <img
          src={resolveAssetUrl('/assets/images/logo.png')}
          alt="মাকতাব আল হিদায়াহ"
          className={`${fullLogoHeightMap} object-contain transition-transform duration-200 group-hover:scale-[1.02]`}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={`${iconSizeMap} shrink-0`}>
          <QuranLogoIcon />
        </div>
      )}
    </div>
  );
};
