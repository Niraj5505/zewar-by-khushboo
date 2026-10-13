import React from 'react';

export const FormField = ({
  label,
  name,
  error,
  helperText,
  required = false,
  children,
  className = '',
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={name}
            className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-espresso/70 font-sans"
          >
            {label}
            {required && <span className="text-rose-600 ml-1">*</span>}
          </label>
        </div>
      )}

      {children}

      {error ? (
        <p className="text-xs text-rose-600 font-medium font-sans flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-espresso/50 font-sans leading-normal">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};
