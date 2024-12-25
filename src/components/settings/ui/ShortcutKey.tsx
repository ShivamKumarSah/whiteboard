import React from 'react';

interface ShortcutKeyProps {
  children: React.ReactNode;
}

export const ShortcutKey: React.FC<ShortcutKeyProps> = ({ children }) => {
  return (
    <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-sm font-medium text-gray-700 dark:text-gray-300">
      {children}
    </span>
  );
};