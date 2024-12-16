import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import type { SearchResultType } from '../../../types';

interface SearchResultProps {
  result: SearchResultType;
}

export const SearchResult: React.FC<SearchResultProps> = ({ result }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.15 }}
      className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer group"
      role="button"
      tabIndex={0}
      onClick={() => {/* Handle click */}}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          /* Handle click */
        }
      }}
    >
      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center group-hover:bg-gray-300 dark:group-hover:bg-gray-600 transition-colors">
        <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>
      <div className="text-left">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{result.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{result.type}</p>
      </div>
    </motion.div>
  );
};