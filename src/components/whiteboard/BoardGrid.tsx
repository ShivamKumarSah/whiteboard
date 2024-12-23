import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useBoards } from '../../hooks/useBoards';
import { EmptyBoards } from './EmptyBoards';
import { BoardCard } from './BoardCard';

export const BoardGrid = () => {
  const navigate = useNavigate();
  const { boards, isLoading, error } = useBoards();

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Error loading boards: {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
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
    );
  }

  if (!boards.length) {
    return <EmptyBoards />;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/board/new')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Board
        </button>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {boards.map((board) => (
          <BoardCard
            key={board.id}
            board={board}
            onClick={() => navigate(`/board/${board.id}`)}
          />
        ))}
      </motion.div>
    </div>
  );
};