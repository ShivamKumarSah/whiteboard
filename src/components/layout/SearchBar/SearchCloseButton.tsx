import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

export const SearchCloseButton = () => {
  return (
    <Dialog.Close className="absolute top-3 right-3">
      <div 
        role="button"
        tabIndex={0}
        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      >
        <span className="sr-only">Close</span>
        <X className="w-5 h-5" />
      </div>
    </Dialog.Close>
  );
};