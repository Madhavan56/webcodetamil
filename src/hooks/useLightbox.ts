import { useState, useCallback, useEffect } from 'react';

interface LightboxState {
  isOpen: boolean;
  currentIndex: number;
  images: { src: string; alt: string }[];
}

export const useLightbox = () => {
  const [state, setState] = useState<LightboxState>({
    isOpen: false,
    currentIndex: 0,
    images: [],
  });

  const open = useCallback((images: { src: string; alt: string }[], startIndex = 0) => {
    setState({
      isOpen: true,
      currentIndex: startIndex,
      images,
    });
  }, []);

  const close = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const goTo = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      currentIndex: Math.max(0, Math.min(index, prev.images.length - 1)),
    }));
  }, []);

  const next = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }));
  }, []);

  const prev = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
    }));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!state.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          close();
          break;
        case 'ArrowRight':
          next();
          break;
        case 'ArrowLeft':
          prev();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isOpen, close, next, prev]);

  // Prevent body scroll
  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [state.isOpen]);

  return {
    ...state,
    open,
    close,
    goTo,
    next,
    prev,
  };
};
