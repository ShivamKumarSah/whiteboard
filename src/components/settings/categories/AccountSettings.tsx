import React from 'react';
import { User, Mail, Key } from 'lucide-react';
import { useAuthStore } from '../../../store/auth';
import { SettingsCard } from '../ui/SettingsCard';

export const AccountSettings = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Account Settings</h2>

      <SettingsCard
        icon={User}
        title="Profile Information"
        description="Update your profile details and personal information"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Display Name
            </label>
            <input
              type="text"
              defaultValue={user?.name}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </SettingsCard>

      <SettingsCard
        icon={Mail}
        title="Email Settings"
        description="Manage your email preferences and notifications"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              defaultValue={user?.email}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </SettingsCard>

      <SettingsCard
        icon={Key}
        title="Password & Security"
        description="Update your password and security settings"
      >
        <div className="space-y-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Change Password
          </button>
        </div>
      </SettingsCard>
    </div>
  );
};