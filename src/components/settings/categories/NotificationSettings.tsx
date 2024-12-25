import React from 'react';
import { Bell, Mail, MessageSquare, Users } from 'lucide-react';
import { SettingsCard } from '../ui/SettingsCard';
import { Toggle } from '../ui/Toggle';

export const NotificationSettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Notification Settings</h2>

      <SettingsCard
        icon={Bell}
        title="Push Notifications"
        description="Configure your push notification preferences"
      >
        <div className="space-y-4">
          <Toggle
            label="Board activity"
            description="Get notified about updates to your boards"
            defaultChecked={true}
          />
          <Toggle
            label="Comments and mentions"
            description="Receive notifications when someone mentions you"
            defaultChecked={true}
          />
        </div>
      </SettingsCard>

      <SettingsCard
        icon={Mail}
        title="Email Notifications"
        description="Manage your email notification settings"
      >
        <div className="space-y-4">
          <Toggle
            label="Weekly digest"
            description="Receive a weekly summary of your board activity"
            defaultChecked={true}
          />
          <Toggle
            label="Important updates"
            description="Get notified about important system updates"
            defaultChecked={true}
          />
        </div>
      </SettingsCard>
    </div>
  );
};