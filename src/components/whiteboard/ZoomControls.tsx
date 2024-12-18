import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useZoomControls } from '../../hooks/useZoomControls';

export const ZoomControls = () => {
  const { scale, zoomIn, zoomOut, resetZoom } = useZoomControls();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 flex items-center gap-2"
    >
      <button
        onClick={() => zoomOut()}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group relative"
        title="Zoom Out (Ctrl + -)"
      >
        <ZoomOut className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        <span className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Zoom Out (Ctrl + -)
        </span>
      </button>

      <div className="px-2 min-w-[4rem] text-center text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
        {Math.round(scale * 100)}%
      </div>

      <button
        onClick={() => zoomIn()}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group relative"
        title="Zoom In (Ctrl + +)"
      >
        <ZoomIn className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        <span className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Zoom In (Ctrl + +)
        </span>
      </button>

      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

      <button
        onClick={resetZoom}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group relative"
        title="Reset Zoom (Ctrl + 0)"
      >
        <RotateCcw className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        <span className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Reset Zoom (Ctrl + 0)
        </span>
      </button>
    </motion.div>
  );
};