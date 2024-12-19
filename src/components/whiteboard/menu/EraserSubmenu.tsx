import React from 'react';
import { motion } from 'framer-motion';
import { Eraser, XCircle, ZapOff } from 'lucide-react';
import { useWhiteboardStore } from '../../../store/whiteboard';
import type { Tool } from '../../../types';

const ERASER_SIZES = [
  { id: 'small', label: 'Small', size: 10 },
  { id: 'medium', label: 'Medium', size: 20 },
  { id: 'large', label: 'Large', size: 30 },
];

export const EraserSubmenu = () => {
  const { 
    setTool, 
    currentTool,
    strokeWidth,
    setStrokeWidth 
  } = useWhiteboardStore();

  const handleToolSelect = (tool: Tool) => {
    setTool(tool);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="absolute left-full top-0 ml-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 min-w-[200px]"
    >
      {/* Eraser Tools */}
      <div className="mb-4">
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">
          Eraser Type
        </div>
        <div className="space-y-1">
          <button
            onClick={() => handleToolSelect('eraser')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors group ${
              currentTool === 'eraser'
                ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Eraser className="w-4 h-4" />
            <span className="text-sm">Precision Eraser</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">
              E
            </span>
          </button>

          <button
            onClick={() => handleToolSelect('lasso-eraser')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors group ${
              currentTool === 'lasso-eraser'
                ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <ZapOff className="w-4 h-4" />
            <span className="text-sm">Area Eraser</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">
              L
            </span>
          </button>

          <button
            onClick={() => handleToolSelect('element-eraser')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors group ${
              currentTool === 'element-eraser'
                ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <XCircle className="w-4 h-4" />
            <span className="text-sm">Quick Delete</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">
              Del
            </span>
          </button>
        </div>
      </div>

      {/* Size Adjustment */}
      <div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">
          Eraser Size
        </div>
        <div className="px-2">
          <input
            type="range"
            min="10"
            max="30"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            {ERASER_SIZES.map((size) => (
              <button
                key={size.id}
                onClick={() => setStrokeWidth(size.size)}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  strokeWidth === size.size
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};