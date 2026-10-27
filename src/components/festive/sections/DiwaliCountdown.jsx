import React from 'react';
import { useFestiveMode } from '../../../hooks/useFestiveMode';
import { useFestiveCountdown } from '../../../hooks/useFestiveCountdown';

export const DiwaliCountdown = ({ className = "" }) => {
  const { isActive, countdownEndDate } = useFestiveMode();
  const { days, hours, minutes, seconds, isExpired } = useFestiveCountdown(countdownEndDate);

  // Never render if no target date is set or if already expired
  if (!isActive || !countdownEndDate || isExpired) return null;

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <div className={`text-center space-y-3 py-4 ${className}`}>
      <span className="eyebrow text-champagne-dark text-[10px] tracking-widest block">
        Limited Festive Window
      </span>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {units.map((u, i) => (
          <div
            key={i}
            className="w-14 sm:w-16 p-2 bg-ivory border border-champagne/80 rounded-[3px] shadow-sm text-center"
          >
            <span className="font-serif text-lg sm:text-2xl font-bold text-espresso block leading-none">
              {String(u.value).padStart(2, '0')}
            </span>
            <span className="font-sans text-[9px] uppercase tracking-wider text-espresso/60 block mt-1">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
