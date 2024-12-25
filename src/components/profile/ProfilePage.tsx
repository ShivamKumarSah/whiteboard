import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { ProfileTabs } from './ProfileTabs';
import { ProfileHeader } from './ProfileHeader';

export const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <User className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm"
        >
          <ProfileHeader />
          <ProfileTabs />
        </motion.div>
      </div>
    </div>
  );
};