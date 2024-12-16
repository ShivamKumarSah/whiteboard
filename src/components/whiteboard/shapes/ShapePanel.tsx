import React from 'react';
import { motion } from 'framer-motion';
import { useWhiteboardStore } from '../../../store/whiteboard';

const shapes = [
  { id: 'rectangle', label: 'Rectangle' },
  { id: 'circle', label: 'Circle' },
  { id: 'triangle', label: 'Triangle' },
  { id: 'diamond', label: 'Diamond' },
  { id: 'arrow', label: 'Arrow' },
  { id: 'line', label: 'Line' },
];

export const ShapePanel = () => {
  const { setTool } = useWhiteboardStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 flex flex-col gap-2"
    >
      {shapes.map((shape) => (
        <button
          key={shape.id}
          onClick={() => setTool(shape.id)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title={shape.label}
        >
          <div className="w-6 h-6 border-2 border-gray-600 dark:border-gray-400 rounded" />
        </button>
      ))}
    </motion.div>
  );
};