import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-sans font-medium tracking-widest uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer';

    const variants = {
      primary: 'bg-gold text-white hover:bg-gold-dark',
      secondary: 'bg-charcoal text-white hover:bg-hero',
      outline: 'border border-gold text-gold hover:bg-gold hover:text-white',
      ghost: 'text-gold hover:text-gold-dark underline-offset-4 hover:underline',
    };

    const sizes = {
      sm: 'px-5 py-2 text-xs',
      md: 'px-8 py-3 text-xs',
      lg: 'px-12 py-4 text-sm',
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
