import React from 'react';
import { motion } from 'framer-motion';
import {
  MousePointer,
  Pen,
  Eraser,
  Square,
  Type,
  Image,
  Undo2,
  Redo2,
  Download,
} from 'lucide-react';
import { useWhiteboardStore } from '../../store/whiteboard';

const tools = [
  { id: 'select', icon: MousePointer, label: 'Select' },
  { id: 'pen', icon: Pen, label: 'Pen' },
  { id: 'eraser', icon: Eraser, label: 'Eraser' },
  { id: 'shape', icon: Square, label: 'Shape' },
  { id: 'text', icon: Type, label: 'Text' },
];

const colors = [
  '#000000',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
];

export const Toolbar = () => {
  const {
    currentTool,
    currentColor,
    strokeWidth,
    setTool,
    setColor,
    setStrokeWidth,
    undo,
    redo,
  } = useWhiteboardStore();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 flex items-center gap-2"
    >
      {tools.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setTool(id as any)}
          className={`p-2 rounded-lg transition-colors ${
            currentTool === id
              ? 'bg-gray-100 dark:bg-gray-700'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title={label}
        >
          <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      ))}

      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />

      <div className="flex items-center gap-1">
        {colors.map(color => (
          <button
            key={color}
            onClick={() => setColor(color)}
            className={`w-6 h-6 rounded-full border-2 transition-all ${
              currentColor === color
                ? 'border-blue-500 scale-110'
                : 'border-gray-200 dark:border-gray-700 hover:scale-110'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />

      <input
        type="range"
        min="1"
        max="20"
        value={strokeWidth}
        onChange={e => setStrokeWidth(Number(e.target.value))}
        className="w-32"
      />

      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />

      <button
        onClick={undo}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title="Undo"
      >
        <Undo2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>

      <button
        onClick={redo}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title="Redo"
      >
        <Redo2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>

      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />

      <button
        onClick={() => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          // Create a temporary canvas with all operations
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          // TODO: Draw all operations

          // Download the image
          const link = document.createElement('a');
          link.download = 'whiteboard.png';
          link.href = canvas.toDataURL();
          link.click();
        }}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title="Download"
      >
        <Download className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
    </motion.div>
  );
};