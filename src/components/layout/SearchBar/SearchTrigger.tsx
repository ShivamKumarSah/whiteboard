import React from 'react';
import { Search } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

export const SearchTrigger = () => {
  return (
    <Dialog.Trigger asChild>
      <div 
        role="button"
        tabIndex={0}
        className="relative flex-1 max-w-2xl mx-4 cursor-pointer group"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 w-5 h-5 transition-colors" />
        <div className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:border-gray-400 dark:group-hover:border-gray-500 transition-colors">
          Search whiteboards... (Press '/' to search)
        </div>
      </div>
    </Dialog.Trigger>
  );
};