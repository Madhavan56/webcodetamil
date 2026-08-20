import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: { src: string; alt: string }[];
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
}

export const Lightbox = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  onIndexChange,
}: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const currentImage = images[currentIndex];

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setIsZoomed(false);
    setImageLoaded(false);
    setImageError(false);
  }, [initialIndex, images]);

  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(currentIndex);
    }
  }, [currentIndex, onIndexChange]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
      setIsZoomed(false);
      setImageLoaded(false);
      setImageError(false);
    }
  }, [images.length]);

  const next = useCallback(() => {
    goTo((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, goTo]);

  const prev = useCallback(() => {
    goTo((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, goTo]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowRight':
        next();
        break;
      case 'ArrowLeft':
        prev();
        break;
      case ' ':
        e.preventDefault();
        setIsZoomed(!isZoomed);
        break;
    }
  }, [isOpen, onClose, next, prev, isZoomed]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!isZoomed) return;
    e.preventDefault();
    const img = imageRef.current;
    if (img) {
      img.scrollLeft += e.deltaY;
    }
  }, [isZoomed]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (e.target === containerRef.current) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleClick}
        role="dialog"
        aria-modal="true"
        aria-label="Image preview"
      >
        <button
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-surface/80 backdrop-blur text-textMuted hover:text-text hover:bg-surfaceHover transition-colors"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <X className="h-6 w-6" />
        </button>

        {images.length > 1 && (
          <>
            <button
              className="absolute left-4 z-10 p-2 rounded-full bg-surface/80 backdrop-blur text-textMuted hover:text-text hover:bg-surfaceHover transition-colors hidden md:flex"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              className="absolute right-4 z-10 p-2 rounded-full bg-surface/80 backdrop-blur text-textMuted hover:text-text hover:bg-surfaceHover transition-colors hidden md:flex"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        <div
          className={cn(
            'relative max-w-[90vw] max-h-[85vh] w-full h-full flex items-center justify-center',
            isZoomed && 'cursor-grab active:cursor-grabbing'
          )}
          onWheel={handleWheel}
        >
          <AnimatePresence mode="wait">
            {!imageError && currentImage && (
              <motion.img
                ref={imageRef}
                key={currentIndex}
                src={currentImage.src}
                alt={currentImage.alt}
                className={cn(
                  'max-w-full max-h-[85vh] object-contain',
                  isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                )}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                style={isZoomed ? { transformOrigin: 'center center' } : undefined}
                onClick={(e) => {
                  if (!isZoomed) {
                    e.stopPropagation();
                    setIsZoomed(true);
                  }
                }}
              />
            )}
          </AnimatePresence>

          {imageError && (
            <div className="flex flex-col items-center justify-center gap-4 p-8 text-textMuted bg-surface rounded-2xl border border-border min-w-[300px] min-h-[200px]">
              <svg className="h-12 w-12 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <p className="text-body">Failed to load image</p>
              <p className="text-body-sm">{currentImage?.alt}</p>
            </div>
          )}

          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          )}
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {images.length > 1 && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 backdrop-blur border border-border/50">
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous"
                className="p-1 text-textMuted hover:text-text transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-body-sm text-text font-mono px-2">
                {currentIndex + 1} / {images.length}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next"
                className="p-1 text-textMuted hover:text-text transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
            aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
            className="p-2 rounded-full bg-surface/80 backdrop-blur text-textMuted hover:text-text hover:bg-surfaceHover transition-colors"
          >
            {isZoomed ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};