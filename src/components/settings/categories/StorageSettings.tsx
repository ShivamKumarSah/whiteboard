import React from 'react';
import { Database, HardDrive, Cloud } from 'lucide-react';
import { SettingsCard } from '../ui/SettingsCard';
import { Toggle } from '../ui/Toggle';

export const StorageSettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Storage & Backup</h2>

      <SettingsCard
        icon={Cloud}
        title="Cloud Storage"
        description="Manage your cloud storage settings"
      >
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Storage Used</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">2.5 GB / 5 GB</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>
          <Toggle
            label="Auto-backup"
            description="Automatically backup your boards to cloud storage"
            defaultChecked={true}
          />
        </div>
      </SettingsCard>

      <SettingsCard
        icon={HardDrive}
        title="Local Storage"
        description="Configure local storage options"
      >
        <div className="space-y-4">
          <Toggle
            label="Offline mode"
            description="Enable offline access to recent boards"
            defaultChecked={true}
          />
          <button className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
            Clear Local Storage
          </button>
        </div>
      </SettingsCard>
    </div>
  );
};