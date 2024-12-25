import React from 'react';
import { Keyboard } from 'lucide-react';
import { SettingsCard } from '../ui/SettingsCard';
import { ShortcutKey } from '../ui/ShortcutKey';

const SHORTCUTS = [
  { category: 'General', shortcuts: [
    { keys: ['Ctrl', 'S'], description: 'Save board' },
    { keys: ['Ctrl', 'Z'], description: 'Undo' },
    { keys: ['Ctrl', 'Y'], description: 'Redo' },
    { keys: ['Ctrl', '+'], description: 'Zoom in' },
    { keys: ['Ctrl', '-'], description: 'Zoom out' },
  ]},
  { category: 'Tools', shortcuts: [
    { keys: ['V'], description: 'Select tool' },
    { keys: ['P'], description: 'Pen tool' },
    { keys: ['E'], description: 'Eraser tool' },
    { keys: ['T'], description: 'Text tool' },
    { keys: ['S'], description: 'Shape tool' },
  ]},
];

export const ShortcutSettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Keyboard Shortcuts</h2>

      {SHORTCUTS.map((section) => (
        <SettingsCard
          key={section.category}
          icon={Keyboard}
          title={section.category}
          description={`${section.category} keyboard shortcuts`}
        >
          <div className="space-y-4">
            {section.shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {shortcut.description}
                </span>
                <div className="flex items-center gap-2">
                  {shortcut.keys.map((key, keyIndex) => (
                    <React.Fragment key={keyIndex}>
                      <ShortcutKey>{key}</ShortcutKey>
                      {keyIndex < shortcut.keys.length - 1 && (
                        <span className="text-gray-400">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SettingsCard>
      ))}
    </div>
  );
};