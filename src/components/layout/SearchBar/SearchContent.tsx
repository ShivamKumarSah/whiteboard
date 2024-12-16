import React from 'react';
import { Search } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchResult } from './SearchResult';
import { SearchCloseButton } from './SearchCloseButton';
import type { SearchResultType } from '../../../types';

interface SearchContentProps {
  query: string;
  results: SearchResultType[];
  onQueryChange: (value: string) => void;
}

export const SearchContent: React.FC<SearchContentProps> = ({
  query,
  results,
  onQueryChange,
}) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
      />
      <Dialog.Content 
        className="fixed top-1/2 left-1/2 w-full max-w-2xl -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-4 animate-scale-in"
      >
        <Dialog.Title className="sr-only">Search Whiteboards</Dialog.Title>
        <Dialog.Description className="sr-only">
          Search through your whiteboards and recent items
        </Dialog.Description>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search whiteboards..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            autoFocus
          />
        </div>

        <motion.div 
          className="mt-4 space-y-2 max-h-[60vh] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {results.map((result) => (
              <SearchResult key={result.id} result={result} />
            ))}
          </AnimatePresence>
        </motion.div>

        <SearchCloseButton />
      </Dialog.Content>
    </Dialog.Portal>
  );
};