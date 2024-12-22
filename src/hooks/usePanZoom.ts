import { useCallback, useEffect } from 'react';
import { useWhiteboardStore } from '../store/whiteboard';

export const usePanZoom = () => {
  const { scale, setScale, offset, setOffset } = useWhiteboardStore();

  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.min(Math.max(scale * delta, 0.1), 5);
      
      const mouseX = (e.clientX - offset.x) / scale;
      const mouseY = (e.clientY - offset.y) / scale;
      
      setScale(newScale);
      setOffset({
        x: e.clientX - mouseX * newScale,
        y: e.clientY - mouseY * newScale
      });
    }
  }, [scale, offset]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  return { scale, offset };
};