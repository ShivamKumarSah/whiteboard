import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Clock, Share2, Archive } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMyBoards } from '../../hooks/useMyBoards';
import { BoardCard } from './BoardCard';
import { EmptyBoards } from './EmptyBoards';

export const WhiteboardGrid = () => {
  const navigate = useNavigate();
  const { boards, isLoading, error } = useMyBoards();

  const handleBoardClick = (id: string) => {
    navigate(`/board/${id}`);
  };

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Error loading boards: {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleBoardClick('new')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Whiteboard
          </button>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <Clock className="w-4 h-4" /> Recent
            </button>
            <button className="flex items-center gap-1 px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <Share2 className="w-4 h-4" /> Shared
            </button>
            <button className="flex items-center gap-1 px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <Archive className="w-4 h-4" /> Archived
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse"
            >
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-4" />
              <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded mb-2" />
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : boards.length === 0 ? (
        <EmptyBoards />
      ) : (
        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {boards.map((board) => (
              <BoardCard
                key={board.id}
                board={board}
                onClick={() => handleBoardClick(board.id)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};