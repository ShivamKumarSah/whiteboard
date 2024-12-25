import React from 'react';
import { Zap, Monitor, Cpu } from 'lucide-react';
import { SettingsCard } from '../ui/SettingsCard';
import { Toggle } from '../ui/Toggle';
import { Slider } from '../ui/Slider';

export const PerformanceSettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Performance Settings</h2>

      <SettingsCard
        icon={Zap}
        title="Performance Mode"
        description="Optimize application performance"
      >
        <div className="space-y-4">
          <Toggle
            label="Hardware acceleration"
            description="Use GPU acceleration when available"
            defaultChecked={true}
          />
          <Toggle
            label="Smooth animations"
            description="Enable smooth transitions and animations"
            defaultChecked={true}
          />
        </div>
      </SettingsCard>

      <SettingsCard
        icon={Monitor}
        title="Canvas Settings"
        description="Configure canvas rendering options"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Canvas Quality
            </label>
            <Slider
              min={1}
              max={4}
              defaultValue={2}
              step={1}
              marks={[
                { value: 1, label: 'Low' },
                { value: 2, label: 'Medium' },
                { value: 3, label: 'High' },
                { value: 4, label: 'Ultra' },
              ]}
            />
          </div>
        </div>
      </SettingsCard>
    </div>
  );
};