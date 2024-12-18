import React from 'react';
import { useWhiteboardStore } from '../../store/whiteboard';

export const Background = () => {
  const { scale, offset } = useWhiteboardStore();
  const gridSize = 20 * scale;
  const minorGridSize = gridSize / 4;

  return (
    <div 
      className="absolute inset-0 pointer-events-none bg-white dark:bg-gray-900"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(229, 231, 235, 0.2) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(229, 231, 235, 0.2) 1px, transparent 1px),
          linear-gradient(to right, rgba(229, 231, 235, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(229, 231, 235, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px, ${gridSize}px ${gridSize}px, ${minorGridSize}px ${minorGridSize}px, ${minorGridSize}px ${minorGridSize}px`,
        backgroundPosition: `${offset.x}px ${offset.y}px`,
        transition: 'background-size 0.2s ease-out',
      }}
    />
  );
};