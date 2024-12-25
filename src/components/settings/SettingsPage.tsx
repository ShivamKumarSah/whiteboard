import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Palette, Lock, Bell, Database, Zap, Keyboard, Cloud } from 'lucide-react';
import { SettingsCategory } from './SettingsCategory';
import { SettingsSearch } from './SettingsSearch';
import { useThemeStore } from '../../store/theme';

const SETTINGS_CATEGORIES = [
  {
    id: 'account',
    label: 'Account',
    icon: User,
    description: 'Manage your account settings and preferences',
  },
  {
    id: 'appearance',
    label: 'Appearance',
    icon: Palette,
    description: 'Customize the look and feel of your workspace',
  },
  {
    id: 'privacy',
    label: 'Privacy & Security',
    icon: Lock,
    description: 'Control your privacy and security settings',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    description: 'Manage your notification preferences',
  },
  {
    id: 'storage',
    label: 'Storage & Backup',
    icon: Database,
    description: 'Configure storage and backup settings',
  },
  {
    id: 'performance',
    label: 'Performance',
    icon: Zap,
    description: 'Optimize application performance',
  },
  {
    id: 'shortcuts',
    label: 'Keyboard Shortcuts',
    icon: Keyboard,
    description: 'View and customize keyboard shortcuts',
  },
  {
    id: 'sync',
    label: 'Sync & Sharing',
    icon: Cloud,
    description: 'Manage synchronization and sharing settings',
  },
];

export const SettingsPage = () => {
  const [activeCategory, setActiveCategory] = React.useState('account');
  const [searchQuery, setSearchQuery] = React.useState('');
  const isDark = useThemeStore((state) => state.isDark);

  const filteredCategories = SETTINGS_CATEGORIES.filter(
    category => 
      category.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        </div>

        <SettingsSearch value={searchQuery} onChange={setSearchQuery} />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  activeCategory === category.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span className="font-medium">{category.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Settings Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:col-span-2 lg:col-span-3"
          >
            <SettingsCategory category={activeCategory} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};