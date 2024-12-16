import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchResult } from './SearchResult';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';

const MOCK_RESULTS = [
  { id: '1', name: 'Project Planning', type: 'board' },
  { id: '2', name: 'Design System', type: 'board' },
  { id: '3', name: 'Marketing Campaign', type: 'board' },
];

export const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(MOCK_RESULTS);

  useKeyboardShortcut('/', () => setIsOpen(true));

  useEffect(() => {
    if (query) {
      const filtered = MOCK_RESULTS.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults(MOCK_RESULTS);
    }
  }, [query]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <div className="relative flex-1 max-w-2xl mx-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search whiteboards... (Press '/' to search)"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            onClick={() => setIsOpen(true)}
            readOnly
          />
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in" />
        <Dialog.Content className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-4 animate-slide-up">
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
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>

          <div className="mt-4 space-y-2">
            {results.map((result) => (
              <SearchResult key={result.id} result={result} />
            ))}
          </div>

          <Dialog.Close className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <span className="sr-only">Close</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};