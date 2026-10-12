import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';

export const Accordion = ({
  items = [],
  allowMultiple = false,
  className,
}) => {
  const [openIndices, setOpenIndices] = useState([0]); // default first item open

  const toggleIndex = (index) => {
    if (allowMultiple) {
      if (openIndices.includes(index)) {
        setOpenIndices(openIndices.filter((i) => i !== index));
      } else {
        setOpenIndices([...openIndices, index]);
      }
    } else {
      setOpenIndices(openIndices.includes(index) ? [] : [index]);
    }
  };

  return (
    <div className={cn("divide-y divide-sand-border/80 border-y border-sand-border/80", className)}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div key={item.id || index} className="py-3.5">
            <button
              type="button"
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between text-left font-serif text-base text-espresso hover:text-champagne-dark transition-colors duration-200"
              aria-expanded={isOpen}
            >
              <span className="font-medium tracking-wide flex items-center gap-2">
                {item.icon && <span className="text-champagne">{item.icon}</span>}
                {item.title}
              </span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-espresso/60 transition-transform duration-300",
                  isOpen && "transform rotate-180 text-champagne"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out text-sm text-espresso/80 font-sans leading-relaxed overflow-hidden",
                isOpen ? "grid-rows-[1fr] opacity-100 pt-3" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                {typeof item.content === 'string' ? (
                  <p className="text-espresso/75 text-sm">{item.content}</p>
                ) : (
                  item.content
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
