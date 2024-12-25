import React from 'react';
import { Toggle } from '../../settings/ui/Toggle';

export const NotificationsTab = () => {
  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Email Notifications
        </h3>
        <div className="space-y-4">
          <Toggle
            label="Board activity"
            description="Get notified when someone comments on or shares your boards"
            defaultChecked={true}
          />
          <Toggle
            label="Mentions"
            description="Get notified when someone mentions you in comments"
            defaultChecked={true}
          />
          <Toggle
            label="Team updates"
            description="Receive updates about your team's activity"
            defaultChecked={true}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Push Notifications
        </h3>
        <div className="space-y-4">
          <Toggle
            label="Real-time collaboration"
            description="Get notified when someone joins your board"
            defaultChecked={true}
          />
          <Toggle
            label="Comments"
            description="Receive notifications for new comments"
            defaultChecked={true}
          />
          <Toggle
            label="Board shares"
            description="Get notified when someone shares a board with you"
            defaultChecked={true}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Marketing Communications
        </h3>
        <div className="space-y-4">
          <Toggle
            label="Product updates"
            description="Receive updates about new features and improvements"
            defaultChecked={false}
          />
          <Toggle
            label="Newsletter"
            description="Subscribe to our monthly newsletter"
            defaultChecked={false}
          />
        </div>
      </div>
    </div>
  );
};