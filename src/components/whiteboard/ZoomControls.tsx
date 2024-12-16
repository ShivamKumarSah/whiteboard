import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWhiteboardStore } from '../../store/whiteboard';

export const ZoomControls = () => {
  const { zoomIn, zoomOut, resetZoom, zoomLevel } = useWhiteboardStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 flex items-center gap-2"
    >
      <button
        onClick={zoomOut}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title="Zoom Out"
      >
        <ZoomOut className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>

      <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem] text-center">
        {Math.round(zoomLevel * 100)}%
      </span>

      <button
        onClick={zoomIn}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title="Zoom In"
      >
        <ZoomIn className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>

      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />

      <button
        onClick={resetZoom}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title="Reset Zoom"
      >
        <RotateCcw className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
    </motion.div>
  );
};