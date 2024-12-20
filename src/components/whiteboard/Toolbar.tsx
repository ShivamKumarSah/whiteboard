import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Save,
  Undo2,
  Redo2,
  RotateCcw,
  Download,
  ChevronDown,
  Palette,
  LogOut,
} from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useWhiteboardStore } from '../../store/whiteboard';
import { cn } from '../../lib/utils';
import { ExitDialog } from './ExitDialog';
import { useNavigate } from 'react-router-dom';

const PRESET_COLORS = [
  // First row
  '#000000', '#343434', '#787878', '#9E9E9E', '#B4B4B4', '#CDCDCD', '#E1E1E1', '#FFFFFF', '#FF8A8A', '#FFB86C',
  // Second row
  '#FF0000', '#FF8C00', '#FFD700', '#008000', '#0000FF', '#4B0082', '#800080', '#FF1493', '#00CED1', '#98FB98',
];

const EXPORT_OPTIONS = [
  { label: 'PNG Image', value: 'png' },
  { label: 'JPEG Image', value: 'jpeg' },
  { label: 'SVG Vector', value: 'svg' },
  { label: 'PDF Document', value: 'pdf' },
];

export const Toolbar = () => {
  const {
    currentColor,
    setColor,
    undo,
    redo,
  } = useWhiteboardStore();

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const navigate = useNavigate();

  const handleExit = () => {
    setShowExitDialog(true);
  };

  const handleExitWithSave = async () => {
    await handleSave();
    navigate('/');
  };

  const handleExitWithoutSave = () => {
    navigate('/');
  };


  const handleSave = () => {
    // Implement save functionality
    console.log('Saving board...');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the board? This action cannot be undone.')) {
      // Implement reset functionality
      console.log('Resetting board...');
    }
  };

  const handleExport = (format: string) => {
    // Implement export functionality
    console.log(`Exporting as ${format}...`);
  };

  return (
    <div className="absolute top-4 left-0 right-0 flex justify-between px-4">
      {/* Left Side Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2"
      >
        <button
          onClick={handleExit}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Exit
        </button>

        <button
          onClick={handleSave}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Board
        </button>

        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

        <div className="flex items-center gap-1">
          <button
            onClick={undo}
            className="p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Undo"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={redo}
            className="p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Redo"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

        <button
          onClick={handleReset}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Board
        </button>
      </motion.div>

      {/* Right Side Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2"
      >
        {/* Color Selection Area */}
        <div className="flex items-center gap-4">
          {/* Current Color Display */}
          <div
            className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-700 shadow-inner cursor-pointer"
            style={{ backgroundColor: currentColor }}
            onClick={() => setShowColorPicker(!showColorPicker)}
          />

          {/* Color Grid */}
          <div className="grid grid-cols-10 gap-1">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setColor(color)}
                className={cn(
                  "w-5 h-5 rounded-full transition-transform hover:scale-110",
                  currentColor === color ? "ring-2 ring-offset-2 ring-indigo-500" : ""
                )}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>

          {/* Custom Color Picker */}
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={currentColor}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer"
              title="Custom color"
            />
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Color picker"
            >
              <Palette className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

        {/* Export Options */}
        <div className="flex items-center gap-2">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                Export
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content className="min-w-[160px] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 animate-fade-in">
                {EXPORT_OPTIONS.map((option) => (
                  <DropdownMenu.Item
                    key={option.value}
                    className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
                    onClick={() => handleExport(option.value)}
                  >
                    {option.label}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <button
            onClick={() => handleExport('png')}
            className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
      <ExitDialog
        isOpen={showExitDialog}
        onClose={() => setShowExitDialog(false)}
        onDiscard={handleExitWithoutSave}
        onSave={handleExitWithSave}
      />

    </div>
  );
};