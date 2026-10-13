import React, { useState, useRef } from 'react';
import { UploadCloud, X, Star, ArrowLeft, ArrowRight, Image as ImageIcon, Link as LinkIcon, Plus } from 'lucide-react';

export const ImageUploader = ({
  images = [],
  onChange,
  maxFiles = 8,
  maxSizeMb = 5,
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [showUrlBox, setShowUrlBox] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Normalize images to array of objects: { url, alt } or strings
  const normalizedImages = images.map((img) =>
    typeof img === 'string' ? { url: img, alt: '' } : img
  );

  const handleFiles = (files) => {
    setError('');
    const newItems = [];
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!validTypes.includes(file.type)) {
        setError(`"${file.name}" is not a supported format (JPG, PNG, WEBP, AVIF only).`);
        continue;
      }
      if (file.size > maxSizeMb * 1024 * 1024) {
        setError(`"${file.name}" exceeds the ${maxSizeMb}MB maximum file size limit.`);
        continue;
      }

      // Create object URL for instant preview
      const objectUrl = URL.createObjectURL(file);
      newItems.push({
        url: objectUrl,
        alt: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' '),
      });
    }

    if (newItems.length > 0) {
      const combined = [...normalizedImages, ...newItems].slice(0, maxFiles);
      onChange(combined);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleAddUrl = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    const combined = [...normalizedImages, { url: urlInput.trim(), alt: '' }].slice(0, maxFiles);
    onChange(combined);
    setUrlInput('');
    setShowUrlBox(false);
  };

  const handleRemove = (index) => {
    const updated = normalizedImages.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleSetPrimary = (index) => {
    if (index === 0) return;
    const selected = normalizedImages[index];
    const rest = normalizedImages.filter((_, i) => i !== index);
    onChange([selected, ...rest]);
  };

  const handleMove = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= normalizedImages.length) return;
    const copy = [...normalizedImages];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    onChange(copy);
  };

  const handleAltChange = (index, alt) => {
    const copy = [...normalizedImages];
    copy[index] = { ...copy[index], alt };
    onChange(copy);
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-sand-border hover:border-champagne bg-ivory/40 hover:bg-sand/20 rounded-[4px] p-6 text-center cursor-pointer transition-all duration-200 group"
      >
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-sand/60 flex items-center justify-center text-champagne-dark group-hover:scale-105 transition-transform">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-espresso font-sans">
              Click or drag jewellery photographs here
            </p>
            <p className="text-[11px] text-espresso/50 font-sans mt-0.5">
              Supports JPG, PNG, WebP, AVIF up to {maxSizeMb}MB. High resolution recommended.
            </p>
          </div>
        </div>
      </div>

      {/* Manual URL Link Button */}
      <div className="flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={() => setShowUrlBox(!showUrlBox)}
          className="inline-flex items-center gap-1.5 text-champagne-dark hover:text-espresso font-semibold font-sans transition-colors"
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>{showUrlBox ? 'Hide image URL input' : 'Add image via URL / CDN'}</span>
        </button>
        <span className="text-[11px] text-espresso/50">
          {normalizedImages.length} of {maxFiles} images added
        </span>
      </div>

      {showUrlBox && (
        <form onSubmit={handleAddUrl} className="flex gap-2 p-3 bg-sand/20 border border-sand-border rounded-[2px]">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/jewellery-necklace.jpg or /images/pearl-bloom-earrings.jpg"
            className="flex-1 px-3 py-1.5 text-xs bg-white border border-sand-border rounded-[2px] text-espresso outline-none focus:ring-2 focus:ring-champagne"
          />
          <button
            type="submit"
            className="px-4 py-1.5 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors"
          >
            Add URL
          </button>
        </form>
      )}

      {error && (
        <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 p-2.5 rounded-[2px] font-sans">
          {error}
        </p>
      )}

      {/* Gallery Grid */}
      {normalizedImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
          {normalizedImages.map((item, index) => (
            <div
              key={index}
              className={`relative group bg-white border rounded-[3px] overflow-hidden shadow-subtle flex flex-col ${
                index === 0 ? 'border-champagne ring-1 ring-champagne' : 'border-sand-border'
              }`}
            >
              {/* Image Preview */}
              <div className="relative aspect-[4/5] bg-sand/30 overflow-hidden">
                <img
                  src={item.url}
                  alt={item.alt || `Product image ${index + 1}`}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.src = '/images/hero-jewellery.jpg';
                  }}
                />

                {/* Primary Badge */}
                {index === 0 && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-champagne text-espresso text-[10px] font-bold tracking-wider uppercase rounded-[2px] shadow-sm flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-espresso" />
                    Cover
                  </span>
                )}

                {/* Action buttons overlay */}
                <div className="absolute inset-0 bg-espresso/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2">
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimary(index)}
                      title="Set as primary cover"
                      className="p-1.5 bg-white text-espresso hover:bg-champagne rounded transition-colors text-xs"
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleMove(index, -1)}
                      title="Move left"
                      className="p-1.5 bg-white text-espresso hover:bg-champagne rounded transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {index < normalizedImages.length - 1 && (
                    <button
                      type="button"
                      onClick={() => handleMove(index, 1)}
                      title="Move right"
                      className="p-1.5 bg-white text-espresso hover:bg-champagne rounded transition-colors"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    title="Remove image"
                    className="p-1.5 bg-white text-rose-600 hover:bg-rose-50 rounded transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Alt Text Input */}
              <div className="p-2 border-t border-sand-border/60 bg-ivory/30">
                <input
                  type="text"
                  value={item.alt || ''}
                  onChange={(e) => handleAltChange(index, e.target.value)}
                  placeholder="Alt text (SEO)..."
                  className="w-full px-2 py-1 text-[11px] bg-white border border-sand-border rounded-[2px] text-espresso placeholder:text-espresso/40 focus:ring-1 focus:ring-champagne outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
