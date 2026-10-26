import React from 'react';

interface HayleysLogoProps {
  className?: string;
  variant?: 'green' | 'white' | 'dark' | 'original';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const HayleysLogo: React.FC<HayleysLogoProps> = ({
  className = '',
  variant = 'green',
  size = 'md',
  showSubtitle = true,
}) => {
  const isWhite = variant === 'white';

  // Sizing scale for the emblem and typography
  const config = {
    sm: {
      emblemSize: 'h-8 w-8',
      titleSize: 'text-lg',
      subSize: 'text-[7.5px]',
      gap: 'gap-2',
      offsetY: '-space-y-0.5',
    },
    md: {
      emblemSize: 'h-10 w-10',
      titleSize: 'text-2xl',
      subSize: 'text-[9px]',
      gap: 'gap-2.5',
      offsetY: '-space-y-0.5',
    },
    lg: {
      emblemSize: 'h-14 w-14',
      titleSize: 'text-3xl',
      subSize: 'text-[11px]',
      gap: 'gap-3',
      offsetY: '-space-y-1',
    },
    xl: {
      emblemSize: 'h-18 w-18',
      titleSize: 'text-4xl',
      subSize: 'text-xs',
      gap: 'gap-3.5',
      offsetY: '-space-y-1',
    },
  }[size];

  // Official Hayleys Green: #006837 (R:0, G:104, B:55)
  // When on dark surfaces (variant='white'), use crisp white with emerald accents
  const emblemSrc = isWhite
    ? '/assets/aistudio/hayleys_emblem_white.png'
    : '/assets/aistudio/hayleys_emblem_green.png';

  const titleColor = isWhite
    ? 'text-white'
    : variant === 'dark'
    ? 'text-slate-900'
    : 'text-[#006837]'; // Official Hayleys Deep Green

  const subColor = isWhite
    ? 'text-emerald-300'
    : variant === 'dark'
    ? 'text-slate-500'
    : 'text-[#006837]'; // Exact matching Hayleys Green

  return (
    <div className={`inline-flex items-center ${config.gap} select-none ${className}`}>
      {/* Official Circular Emblem from uploaded asset */}
      <img
        src={emblemSrc}
        alt="Hayleys Emblem"
        className={`${config.emblemSize} aspect-square object-contain shrink-0`}
        loading="eager"
      />

      {/* Brand Wordmark and Heritage Subtitle in exact font and colour */}
      <div className={`flex flex-col justify-center ${config.offsetY} leading-tight`}>
        <span
          className={`font-extrabold tracking-[-0.03em] ${config.titleSize} ${titleColor}`}
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
        >
          Hayleys
        </span>
        {showSubtitle && (
          <span
            className={`font-bold tracking-[0.22em] uppercase ${config.subSize} ${subColor}`}
            style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
          >
            Since 1878
          </span>
        )}
      </div>
    </div>
  );
};
