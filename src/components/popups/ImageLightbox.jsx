import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollLock } from '../../hooks/useScrollLock';

export const ImageLightbox = ({ isOpen, onClose, images = [], initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useScrollLock(isOpen);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen || !images.length) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      className="fixed inset-0 z-50 bg-[#1A1411]/95 backdrop-blur-md flex flex-col justify-between select-none animate-in fade-in-0 duration-200"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between p-4 sm:p-6 text-ivory/80 z-10">
        <span className="text-xs uppercase tracking-widest font-mono">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image lightbox"
          className="p-2 text-ivory/80 hover:text-ivory rounded-full hover:bg-ivory/10 transition-colors focus:ring-2 focus:ring-champagne"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {images.length > 1 && (
          <button
            type="button"
            onClick={prevImage}
            aria-label="Previous image"
            className="absolute left-3 sm:left-8 p-3 rounded-full bg-espresso/60 text-ivory hover:bg-espresso border border-champagne/30 transition-all z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="max-w-4xl max-h-[75vh] flex items-center justify-center">
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Jewellery view ${currentIndex + 1}`}
            className="max-h-[75vh] max-w-full object-contain rounded-[2px] shadow-2xl animate-in zoom-in-95 duration-200"
          />
        </div>

        {images.length > 1 && (
          <button
            type="button"
            onClick={nextImage}
            aria-label="Next image"
            className="absolute right-3 sm:right-8 p-3 rounded-full bg-espresso/60 text-ivory hover:bg-espresso border border-champagne/30 transition-all z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="p-4 sm:p-6 flex justify-center gap-3 overflow-x-auto z-10">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`w-14 h-16 sm:w-16 sm:h-20 rounded-[2px] overflow-hidden border-2 transition-all flex-shrink-0 ${
                currentIndex === idx
                  ? 'border-champagne scale-105'
                  : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
