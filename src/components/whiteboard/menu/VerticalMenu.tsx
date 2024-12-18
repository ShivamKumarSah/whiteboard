import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWhiteboardStore } from '../../../store/whiteboard';
import { useKeyboardShortcut } from '../../../hooks/useKeyboardShortcut';
import { MENU_ITEMS } from './constants';
import { MenuButton } from './MenuButton';
import { ShapesSubmenu } from './ShapesSubmenu';
import { EraserSubmenu } from './EraserSubmenu';

export const VerticalMenu = () => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { setTool, currentTool } = useWhiteboardStore();

  // Register keyboard shortcuts
  MENU_ITEMS.forEach(({ id, shortcut }) => {
    useKeyboardShortcut(shortcut, () => {
      setTool(id);
      if (!['shape', 'eraser'].includes(id)) {
        setActiveSubmenu(null);
      } else {
        setActiveSubmenu(activeSubmenu === id ? null : id);
      }
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
            isActive={currentTool === id || currentTool.includes(id)}
            hasSubmenu={id === 'shape' || id === 'eraser'}
            isSubmenuOpen={activeSubmenu === id}
            onClick={() => {
              setTool(id);
              if (id === 'shape' || id === 'eraser') {
                setActiveSubmenu(activeSubmenu === id ? null : id);
              } else {
                setActiveSubmenu(null);
              }
            }}
          />

          <AnimatePresence>
            {activeSubmenu === 'shape' && id === 'shape' && <ShapesSubmenu />}
            {activeSubmenu === 'eraser' && id === 'eraser' && <EraserSubmenu />}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
};