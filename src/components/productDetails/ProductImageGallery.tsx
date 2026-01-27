import { useState } from 'react';
import { cn } from '../../utils/cn';

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

export function ProductImageGallery({
  images,
  title,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Ensure we have at least one image
  const galleryImages =
    images.length > 0 ? images : ['/placeholder-product.png'];
  const selectedImage = galleryImages[selectedIndex];

  return (
    <div className="flex flex-col gap-4 bg-white p-2 shadow border border-slate-100 rounded-xl">
      {/* Main Image */}
      <div className="relative aspect-square bg-slate-50 rounded-xl max-h-96 overflow-hidden border border-slate-200">
        <img
          src={selectedImage}
          alt={`${title} - Image ${selectedIndex + 1}`}
          className="w-full h-full object-contain p-4"
        />
      </div>

      {/* Thumbnail Strip */}
      {galleryImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all',
                'hover:border-slate-300',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
                selectedIndex === index
                  ? 'border-indigo-500 ring-2 ring-indigo-100'
                  : 'border-slate-200',
              )}
            >
              <img
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
