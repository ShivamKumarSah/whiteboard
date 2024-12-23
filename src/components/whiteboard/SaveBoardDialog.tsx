import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/auth';
import type { DrawOperation } from '../../types';

interface SaveBoardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  operations: DrawOperation[];
  onSaveSuccess: () => void;
}

export const SaveBoardDialog: React.FC<SaveBoardDialogProps> = ({
  isOpen,
  onClose,
  operations,
  onSaveSuccess
}) => {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!user) {
      setError('You must be logged in to save a board');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Generate thumbnail
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Set white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Scale operations to fit thumbnail
      const scale = 0.2;
      ctx.scale(scale, scale);

      // Draw operations
      operations.forEach(op => {
        if (op.points.length < 2) return;

        ctx.beginPath();
        ctx.strokeStyle = op.color;
        ctx.lineWidth = op.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = op.opacity ?? 1;

        ctx.moveTo(op.points[0].x, op.points[0].y);
        op.points.forEach(point => {
          ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();
      });

      const thumbnail = canvas.toDataURL('image/png');

      const { error: saveError } = await supabase
        .from('boards')
        .insert([
          {
            title: title.trim() || 'Untitled Board',
            content: operations,
            thumbnail,
            owner_id: user.id
          }
        ]);

      if (saveError) throw saveError;

      onSaveSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save board');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full mx-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Save Board
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Board Name
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter board name"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            autoFocus
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save Board'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};