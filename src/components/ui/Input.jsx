import React from 'react';
import { cn } from '../../lib/cn';

export const Input = React.forwardRef(({
  label,
  error,
  className,
  type = 'text',
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs uppercase tracking-wider font-medium text-espresso/80 mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        className={cn(
          "w-full px-3.5 py-2.5 bg-brandWhite text-espresso placeholder:text-espresso/40 text-sm border border-sand-border rounded-[2px] transition-all duration-200",
          "focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne/40",
          error && "border-red-400 focus:border-red-500 focus:ring-red-200",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
