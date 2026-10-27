import React from 'react';
import { cn } from '../../lib/cn';

export const Button = React.forwardRef(({
  children,
  className,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold'
  size = 'md', // 'sm' | 'md' | 'lg' | 'icon'
  disabled = false,
  isLoading = false,
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-champagne/40 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-[3px]";

  const variants = {
    // Deep espresso primary with soft gold hover
    primary: "bg-espresso text-ivory hover:bg-espresso-light active:bg-espresso shadow-sm",
    // Champagne gold accent - CRITICAL RULE: "Never white text on champagne — use espresso text on gold buttons"
    secondary: "bg-champagne text-espresso hover:bg-champagne-hover font-semibold active:bg-champagne-dark shadow-sm",
    gold: "bg-[#C6A15B] text-[#30251F] hover:bg-[#A8843F] font-semibold active:bg-[#8C6C2E] shadow-sm",
    // Outline with thin sand/espresso border
    outline: "border border-espresso/25 text-espresso bg-transparent hover:border-espresso hover:bg-espresso/5 active:bg-espresso/10",
    outlineGold: "border border-champagne text-espresso bg-transparent hover:bg-champagne/10",
    // Ghost
    ghost: "text-espresso hover:bg-espresso/5 active:bg-espresso/10",
    white: "bg-brandWhite text-espresso border border-sand-border hover:bg-ivory shadow-subtle",
  };

  const sizes = {
    sm: "text-xs px-3.5 py-1.5 uppercase tracking-wider",
    md: "text-xs tracking-widest uppercase px-5 py-3",
    lg: "text-sm tracking-widest uppercase px-7 py-3.5",
    icon: "p-2.5 rounded-full",
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = 'Button';
