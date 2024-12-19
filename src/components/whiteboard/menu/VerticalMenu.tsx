import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWhiteboardStore } from '../../../store/whiteboard';
import { useKeyboardShortcut } from '../../../hooks/useKeyboardShortcut';
import { MENU_ITEMS } from './constants';
import { MenuButton } from './MenuButton';
import { ShapesSubmenu } from './ShapesSubmenu';

export const VerticalMenu = () => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { setTool, currentTool } = useWhiteboardStore();

  // Register keyboard shortcuts
  MENU_ITEMS.forEach(({ id, shortcut }) => {
    useKeyboardShortcut(shortcut, () => {
      setTool(id);
      if (id !== 'shape') setActiveSubmenu(null);
      else setActiveSubmenu(activeSubmenu === 'shape' ? null : 'shape');
    });
  });

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 flex flex-col gap-2"
    >
      {MENU_ITEMS.map(({ id, icon, label }) => (
        <div key={id} className="relative">
          <MenuButton
            id={id}
            icon={icon}
            label={label}
            isActive={currentTool === id}
            hasSubmenu={id === 'shape'}
            isSubmenuOpen={activeSubmenu === 'shape'}
            onClick={() => {
              setTool(id);
              if (id === 'shape') {
                setActiveSubmenu(activeSubmenu === 'shape' ? null : 'shape');
              } else {
                setActiveSubmenu(null);
              }
            }}
          />

          {id === 'shape' && activeSubmenu === 'shape' && <ShapesSubmenu />}
        </div>
      ))}
    </motion.div>
  );
};