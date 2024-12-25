import React from 'react';
import { Camera } from 'lucide-react';
import { useAuthStore } from '../../store/auth';

export const ProfileHeader = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Camera className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {user?.name || 'Anonymous User'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};