import React from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { SearchBar } from './SearchBar';
import { UserMenu } from './UserMenu';
import { useThemeStore } from '../../store/theme';

export const Navbar = () => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Whiteboard</h1>
      </div>

      <SearchBar />

      <div className="flex items-center gap-3">
        <button 
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          onClick={toggleTheme}
        >
          {isDark ? (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>
        <UserMenu />
      </div>
    </motion.nav>
  );
};