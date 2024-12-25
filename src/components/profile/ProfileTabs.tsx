import React, { useState } from 'react';
import { PersonalInfoTab } from './tabs/PersonalInfoTab';
import { SecurityTab } from './tabs/SecurityTab';
import { NotificationsTab } from './tabs/NotificationsTab';
import { PreferencesTab } from './tabs/PreferencesTab';

const TABS = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'security', label: 'Security' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'preferences', label: 'Preferences' },
] as const;

export const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]['id']>('personal');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoTab />;
      case 'security':
        return <SecurityTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'preferences':
        return <PreferencesTab />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex gap-4 px-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">{renderTabContent()}</div>
    </div>
  );
};