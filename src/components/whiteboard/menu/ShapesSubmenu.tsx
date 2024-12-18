import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useWhiteboardStore } from '../../../store/whiteboard';
import { LINE_SHAPES, BASIC_SHAPES } from './constants';
import { ShapeButton } from './ShapeButton';

export const ShapesSubmenu = () => {
  const { setTool } = useWhiteboardStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="absolute left-full top-0 ml-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 min-w-[180px]"
    >
      {/* Lines Section */}
      <div className="mb-3">
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">
          Lines
        </div>
        <div className="grid grid-cols-2 gap-1">
          {LINE_SHAPES.map((shape) => (
            <ShapeButton key={shape.id} {...shape} onClick={setTool} />
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />

      {/* Shapes Section */}
      <div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">
          Shapes
        </div>
        <div className="grid grid-cols-3 gap-1">
          {BASIC_SHAPES.map((shape) => (
            <ShapeButton key={shape.id} {...shape} onClick={setTool} />
          ))}
        </div>
      </div>

      <button className="w-full mt-3 p-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center gap-1">
        <Plus className="w-4 h-4" />
        More Shapes
      </button>
    </motion.div>
  );
};