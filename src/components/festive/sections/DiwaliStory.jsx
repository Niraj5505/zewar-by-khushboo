import React from 'react';
import { DiyaIcon } from '../DiyaIcon';
import { DiwaliDivider } from './DiwaliDivider';
import { useFestiveMode } from '../../../hooks/useFestiveMode';

export const DiwaliStory = () => {
  const { isActive, storyTitle, storyText } = useFestiveMode();

  if (!isActive) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
      <DiwaliDivider />

      <div className="bg-sand/30 border border-sand-border rounded-[4px] p-6 sm:p-12 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text (7 cols) */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="eyebrow text-champagne-dark flex items-center gap-1.5">
              <DiyaIcon className="w-3.5 h-3.5" />
              <span>Festive Heritage</span>
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-espresso font-medium leading-snug">
              {storyTitle || 'Why We Celebrate Diwali at Zewar'}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-espresso/75 leading-relaxed">
              {storyText ||
                'Diwali represents the timeless triumph of radiance, honoring artisan traditions passed down through generations. At Zewar, our karigars hand-knot every seed pearl and hand-set each uncut polki stone with devotion, crafting heirlooms meant to illuminate your festive celebrations with ancestral warmth.'}
            </p>

            <div className="pt-2 text-xs font-serif italic text-espresso/60">
              — Khushboo & The Zewar Studio Karigars
            </div>
          </div>

          {/* Right Image (5 cols) */}
          <div className="lg:col-span-5 aspect-[4/3] rounded-[3px] overflow-hidden border border-sand-border shadow-sm bg-sand">
            <img
              src="/images/brand-story.jpg"
              alt="Artisan Crafting Jewellery"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
