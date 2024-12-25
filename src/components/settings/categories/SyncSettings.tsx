import React from 'react';
import { Cloud, RefreshCw, Share2 } from 'lucide-react';
import { SettingsCard } from '../ui/SettingsCard';
import { Toggle } from '../ui/Toggle';

export const SyncSettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Sync & Sharing</h2>

      <SettingsCard
        icon={Cloud}
        title="Cloud Sync"
        description="Configure cloud synchronization settings"
      >
        <div className="space-y-4">
          <Toggle
            label="Auto-sync"
            description="Automatically sync changes across devices"
            defaultChecked={true}
          />
          <Toggle
            label="Background sync"
            description="Sync changes while the app is in the background"
            defaultChecked={true}
          />
          <div className="pt-2">
            <button className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" />
              Sync Now
            </button>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard
        icon={Share2}
        title="Sharing Preferences"
        description="Manage default sharing settings"
      >
        <div className="space-y-4">
          <Toggle
            label="Link sharing"
            description="Allow sharing boards via links"
            defaultChecked={true}
          />
          <Toggle
            label="Public boards"
            description="Allow creating public boards"
            defaultChecked={false}
          />
          <div className="pt-2">
            <button className="text-sm text-red-600 hover:text-red-700 dark:hover:text-red-400">
              Revoke All Shared Links
            </button>
          </div>
        </div>
      </SettingsCard>
    </div>
  );
};