import React from 'react';
import { motion } from 'framer-motion';
import { useWhiteboardStore } from '../../../store/whiteboard';
import { FREEHAND_TOOLS, BRUSH_SIZES } from './constants';
import type { Tool } from '../../../types';

export const FreehandSubmenu = () => {
  const { 
    currentTool,
    strokeWidth,
    setTool,
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
      {/* Freehand Tools */}
      <div className="mb-4">
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">
          Tool Type
        </div>
        <div className="space-y-1">
          {FREEHAND_TOOLS.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleToolSelect(tool.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors group ${
                currentTool === tool.id
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <tool.icon className="w-4 h-4" />
              <span className="text-sm">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Brush Size */}
      <div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">
          Brush Size
        </div>
        <div className="px-2">
          <input
            type="range"
            min="1"
            max="12"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            {BRUSH_SIZES.map((size) => (
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

        {/* Preview */}
        <div className="mt-3 px-2">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
            Preview
          </div>
          <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div 
              className={`rounded-full ${currentTool === 'highlighter' ? 'opacity-50' : ''}`}
              style={{
                width: `${strokeWidth}px`,
                height: `${strokeWidth}px`,
                backgroundColor: 'currentColor',
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};