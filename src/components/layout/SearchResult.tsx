import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchResultProps {
  result: {
    id: string;
    name: string;
    type: string;
  };
}

export const SearchResult: React.FC<SearchResultProps> = ({ result }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
    >
      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
        <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>
      <div className="text-left">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{result.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{result.type}</p>
      </div>
    </motion.button>
  );
};