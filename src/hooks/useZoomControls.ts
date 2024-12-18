import { useCallback, useEffect } from 'react';
import { useWhiteboardStore } from '../store/whiteboard';

const MIN_SCALE = 0.1;
const MAX_SCALE = 5;
const ZOOM_FACTOR = 1.2;

export const useZoomControls = () => {
  const { scale, setScale, offset, setOffset } = useWhiteboardStore();

  const zoomTo = useCallback((newScale: number, center?: { x: number; y: number }) => {
    const boundedScale = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);
    
    if (center) {
      // Zoom towards cursor position
      const scaleChange = boundedScale / scale;
      const newOffset = {
        x: center.x - (center.x - offset.x) * scaleChange,
        y: center.y - (center.y - offset.y) * scaleChange,
      };
      setOffset(newOffset);
    }
    
    setScale(boundedScale);
  }, [scale, offset, setScale, setOffset]);

  const zoomIn = useCallback((center?: { x: number; y: number }) => {
    zoomTo(scale * ZOOM_FACTOR, center);
  }, [scale, zoomTo]);

  const zoomOut = useCallback((center?: { x: number; y: number }) => {
    zoomTo(scale / ZOOM_FACTOR, center);
  }, [scale, zoomTo]);

  const resetZoom = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, [setScale, setOffset]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        if (e.key === '=' || e.key === '+') {
          e.preventDefault();
          zoomIn();
        } else if (e.key === '-') {
          e.preventDefault();
          zoomOut();
        } else if (e.key === '0') {
          e.preventDefault();
          resetZoom();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomIn, zoomOut, resetZoom]);

  // Wheel zoom
  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const center = { x: e.clientX, y: e.clientY };
      if (e.deltaY < 0) {
        zoomIn(center);
      } else {
        zoomOut(center);
      }
    }
  }, [zoomIn, zoomOut]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  return {
    scale,
    zoomIn,
    zoomOut,
    resetZoom,
  };
};