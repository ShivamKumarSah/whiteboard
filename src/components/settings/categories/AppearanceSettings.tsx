import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useThemeStore } from '../../../store/theme';
import { SettingsCard } from '../ui/SettingsCard';

export const AppearanceSettings = () => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Appearance Settings</h2>

      <SettingsCard
        icon={Monitor}
        title="Theme"
        description="Choose your preferred color theme"
      >
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => toggleTheme()}
            className={`p-4 rounded-lg border-2 transition-colors ${
              !isDark
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <Sun className="w-6 h-6 mx-auto mb-2 text-gray-700 dark:text-gray-300" />
            <span className="block text-sm font-medium text-gray-900 dark:text-white">Light</span>
          </button>

          <button
            onClick={() => toggleTheme()}
            className={`p-4 rounded-lg border-2 transition-colors ${
              isDark
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <Moon className="w-6 h-6 mx-auto mb-2 text-gray-700 dark:text-gray-300" />
            <span className="block text-sm font-medium text-gray-900 dark:text-white">Dark</span>
          </button>

          <button
            className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700"
          >
            <Monitor className="w-6 h-6 mx-auto mb-2 text-gray-700 dark:text-gray-300" />
            <span className="block text-sm font-medium text-gray-900 dark:text-white">System</span>
          </button>
        </div>
      </SettingsCard>
    </div>
  );
};