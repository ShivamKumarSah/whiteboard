import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import type { Board } from '../../types';

interface BoardCardProps {
  board: Board;
  onClick: () => void;
}

export const BoardCard: React.FC<BoardCardProps> = ({ board, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 overflow-hidden">
        {board.thumbnail ? (
          <img
            src={board.thumbnail}
            alt={board.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
            No Preview
          </div>
        )}
      </div>
      <h3 className="font-medium text-gray-900 dark:text-white truncate">
        {board.title || 'Untitled Board'}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Created {formatDistanceToNow(new Date(board.created_at), { addSuffix: true })}
      </p>
    </motion.div>
  );
};