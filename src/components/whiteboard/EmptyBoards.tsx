import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EmptyBoards = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <img
        src="https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=500"
        alt="Empty boards"
        className="w-64 h-64 object-cover rounded-lg opacity-50 mb-6"
      />
      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
        No boards yet
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
        Create your first board to start collaborating with your team
      </p>
      <button
        onClick={() => navigate('/board/new')}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        <Plus className="w-5 h-5" />
        Create New Board
      </button>
    </motion.div>
  );
};