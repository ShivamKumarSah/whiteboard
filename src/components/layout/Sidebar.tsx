import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Settings, User, CreditCard, LayoutGrid, Clock, Share2, Archive, BookTemplate, Users, History } from 'lucide-react';
import { useSidebarStore } from '../../store/sidebar';
import { cn } from '../../lib/utils';

const menuItems = [
  { id: 'boards', icon: LayoutGrid, label: 'My Boards', path: '/' },
  { id: 'recent', icon: Clock, label: 'Recent', path: '/recent' },
  { id: 'templates', icon: BookTemplate, label: 'Templates', path: '/templates' },
  { id: 'projects', icon: Share2, label: 'Projects', path: '/projects' },
  { id: 'team', icon: Users, label: 'Team', path: '/team' },
  { id: 'history', icon: History, label: 'History', path: '/history' },
];

export const Sidebar = () => {
  const { isOpen } = useSidebarStore();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ width: isOpen ? 256 : 0 }}
        animate={{ width: isOpen ? 256 : 0 }}
        exit={{ width: 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col overflow-hidden",
          !isOpen && "w-0"
        )}
      >
        <div className="flex-1 py-6">
          <div className="px-4 mb-6">
            <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Workspace
            </h2>
            <nav className="mt-4 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className="flex items-center gap-2 w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <nav className="space-y-1">
            <button 
              onClick={() => navigate('/settings')}
              className="flex items-center gap-2 w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
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
    </AnimatePresence>
  );
};