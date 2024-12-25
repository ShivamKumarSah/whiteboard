import React from 'react';
import { motion } from 'framer-motion';
import { AccountSettings } from './categories/AccountSettings';
import { AppearanceSettings } from './categories/AppearanceSettings';
import { PrivacySettings } from './categories/PrivacySettings';
import { NotificationSettings } from './categories/NotificationSettings';
import { StorageSettings } from './categories/StorageSettings';
import { PerformanceSettings } from './categories/PerformanceSettings';
import { ShortcutSettings } from './categories/ShortcutSettings';
import { SyncSettings } from './categories/SyncSettings';

interface SettingsCategoryProps {
  category: string;
}

export const SettingsCategory: React.FC<SettingsCategoryProps> = ({ category }) => {
  const renderCategory = () => {
    switch (category) {
      case 'account':
        return <AccountSettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'privacy':
        return <PrivacySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'storage':
        return <StorageSettings />;
      case 'performance':
        return <PerformanceSettings />;
      case 'shortcuts':
        return <ShortcutSettings />;
      case 'sync':
        return <SyncSettings />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
    >
      {renderCategory()}
    </motion.div>
  );
};