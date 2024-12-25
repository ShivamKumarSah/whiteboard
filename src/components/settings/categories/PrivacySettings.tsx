import React from 'react';
import { Shield, Eye, Share2 } from 'lucide-react';
import { SettingsCard } from '../ui/SettingsCard';
import { Toggle } from '../ui/Toggle';

export const PrivacySettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Privacy & Security</h2>

      <SettingsCard
        icon={Shield}
        title="Security Settings"
        description="Configure your account security preferences"
      >
        <div className="space-y-4">
          <Toggle
            label="Two-factor authentication"
            description="Add an extra layer of security to your account"
            defaultChecked={false}
          />
          <Toggle
            label="Login notifications"
            description="Get notified about new login attempts"
            defaultChecked={true}
          />
        </div>
      </SettingsCard>

      <SettingsCard
        icon={Eye}
        title="Privacy"
        description="Manage your privacy settings"
      >
        <div className="space-y-4">
          <Toggle
            label="Profile visibility"
            description="Make your profile visible to other users"
            defaultChecked={true}
          />
          <Toggle
            label="Activity status"
            description="Show when you're active on the platform"
            defaultChecked={true}
          />
        </div>
      </SettingsCard>

      <SettingsCard
        icon={Share2}
        title="Sharing"
        description="Control how your content is shared"
      >
        <div className="space-y-4">
          <Toggle
            label="Default to private boards"
            description="New boards will be private by default"
            defaultChecked={true}
          />
          <Toggle
            label="Allow board duplication"
            description="Let others duplicate your public boards"
            defaultChecked={false}
          />
        </div>
      </SettingsCard>
    </div>
  );
};