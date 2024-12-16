import React from 'react';
import { motion } from 'framer-motion';
import { useWhiteboardStore } from '../../store/whiteboard';

export const Grid = () => {
  const { zoomLevel } = useWhiteboardStore();
  const gridSize = 20 * zoomLevel;

  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(to right, #e5e7eb 1px, transparent 1px),
          linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
        opacity: 0.5,
      }}
    />
  );
};