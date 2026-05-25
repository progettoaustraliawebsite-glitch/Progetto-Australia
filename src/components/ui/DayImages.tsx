'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  images: string[];
  altPrefix: string;
}

export default function DayImages({ images, altPrefix }: Props) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className={`mt-4 flex flex-wrap gap-3`}>
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${altPrefix} ${i + 1}`}
            onClick={() => setLightbox(src)}
            className="h-64 w-auto object-contain rounded cursor-zoom-in hover:opacity-90 transition-opacity"
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            aria-label="Chiudi"
          >
            <X size={32} />
          </button>
          <img
            src={lightbox}
            alt="Ingrandimento"
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[90vh] object-contain rounded shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
