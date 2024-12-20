import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Clock, Share2, Archive } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const WhiteboardGrid = () => {
  const navigate = useNavigate();

  const handleBoardClick = (id: string) => {
    navigate(`/board/${id}`);
  };

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

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            variants={item}
            className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleBoardClick(i.toString())}
          >
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-4"></div>
            <h3 className="font-medium text-gray-900 dark:text-white">Whiteboard {i}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Last modified: 2 days ago</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};