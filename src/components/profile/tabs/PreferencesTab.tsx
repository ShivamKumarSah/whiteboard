import React from 'react';
import { useThemeStore } from '../../../store/theme';
import { Toggle } from '../../settings/ui/Toggle';

export const PreferencesTab = () => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Appearance
        </h3>
        <div className="space-y-4">
          <Toggle
            label="Dark Mode"
            description="Use dark theme across the application"
            defaultChecked={isDark}
            onChange={toggleTheme}
          />
          <Toggle
            label="Reduce Motion"
            description="Minimize animations throughout the interface"
            defaultChecked={false}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Language & Region
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Language
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Time Zone
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="CST">Central Time</option>
              <option value="PST">Pacific Time</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Accessibility
        </h3>
        <div className="space-y-4">
          <Toggle
            label="Screen Reader Optimizations"
            description="Enable enhanced support for screen readers"
            defaultChecked={false}
          />
          <Toggle
            label="High Contrast Mode"
            description="Increase contrast for better visibility"
            defaultChecked={false}
          />
        </div>
      </div>
    </div>
  );
};