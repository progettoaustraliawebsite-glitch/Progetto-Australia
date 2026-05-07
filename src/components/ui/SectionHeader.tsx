import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}: SectionHeaderProps) {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align];

  return (
    <div className={cn('flex flex-col gap-3 mb-12', alignClass, className)}>
      {label && (
        <span
          className={cn(
            'text-xs font-sans uppercase tracking-[0.3em] font-medium',
            light ? 'text-gold-light' : 'text-gold'
          )}
        >
          {label}
        </span>
      )}
      <h2
        className={cn(
          'font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight',
          light ? 'text-white' : 'text-charcoal'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-base md:text-lg max-w-2xl leading-relaxed',
            light ? 'text-white/70' : 'text-charcoal/60'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
