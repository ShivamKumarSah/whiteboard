import { useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

export const useZoom = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPosition, setLastPosition] = useState<Position | null>(null);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.min(Math.max(scale * delta, 0.1), 5);
      
      // Zoom toward cursor position
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / scale;
      const y = (e.clientY - rect.top) / scale;
      
      setScale(newScale);
      setPosition(prev => ({
        x: x - (x - prev.x) * (newScale / scale),
        y: y - (y - prev.y) * (newScale / scale),
      }));
    } else {
      setPosition(prev => ({
        x: prev.x - e.deltaX / scale,
        y: prev.y - e.deltaY / scale,
      }));
    }
  }, [scale]);

  const handlePan = useCallback((e: React.MouseEvent | null) => {
    if (!e) {
      setIsPanning(false);
      setLastPosition(null);
      return;
    }

    if (e.buttons === 1 && e.altKey) { // Left click + Alt key for panning
      if (!isPanning) {
        setIsPanning(true);
        setLastPosition({ x: e.clientX, y: e.clientY });
      } else if (lastPosition) {
        const dx = (e.clientX - lastPosition.x) / scale;
        const dy = (e.clientY - lastPosition.y) / scale;
        setPosition(prev => ({
          x: prev.x + dx,
          y: prev.y + dy,
        }));
        setLastPosition({ x: e.clientX, y: e.clientY });
      }
    }
  }, [isPanning, lastPosition, scale]);

  return {
    scale,
    position,
    isPanning,
    handleWheel,
    handlePan,
  };
};