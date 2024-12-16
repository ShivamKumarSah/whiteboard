import React from 'react';
import { motion } from 'framer-motion';
import { Settings, User, CreditCard, LayoutGrid, Clock, Share2, Archive, BookTemplate, Users, History } from 'lucide-react';

const menuItems = [
  { icon: LayoutGrid, label: 'My Boards' },
  { icon: BookTemplate, label: 'Templates' },
  { icon: Clock, label: 'Recent' },
  { icon: Share2, label: 'Projects' },
  { icon: Users, label: 'Team' },
  { icon: History, label: 'History' },
];

export const Sidebar = () => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col"
    >
      <div className="flex-1 py-6">
        <div className="px-4 mb-6">
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Workspace</h2>
          <nav className="mt-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-2 w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <nav className="space-y-1">
          <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Settings className="w-5 h-5" />
            Settings
          </button>
          <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <User className="w-5 h-5" />
            Profile
          </button>
          <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <CreditCard className="w-5 h-5" />
            Plan
          </button>
        </nav>
      </div>
    </motion.div>
  );
};