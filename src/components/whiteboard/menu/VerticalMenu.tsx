import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWhiteboardStore } from '../../../store/whiteboard';
import { useKeyboardShortcut } from '../../../hooks/useKeyboardShortcut';
import { MENU_ITEMS } from './constants';
import { MenuButton } from './MenuButton';
import { ShapesSubmenu } from './ShapesSubmenu';
import { EraserSubmenu } from './EraserSubmenu';
import { FreehandSubmenu } from './FreehandSubmenu';

export const VerticalMenu = () => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { setTool, currentTool } = useWhiteboardStore();

  // Register keyboard shortcuts
  MENU_ITEMS.forEach(({ id, shortcut }) => {
    useKeyboardShortcut(shortcut, () => {
      setTool(id);
      if (!['shape', 'eraser', 'freehand'].includes(id)) {
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
      className="absolute left-4 top-1/3 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 flex flex-col gap-2"
    >
      {MENU_ITEMS.map(({ id, icon, label }) => (
        <div key={id} className="relative">
          <MenuButton
            id={id}
            icon={icon}
            label={label}
            isActive={currentTool === id || ['pen', 'highlighter'].includes(currentTool)}
            hasSubmenu={id === 'shape' || id === 'eraser' || id === 'freehand'}
            isSubmenuOpen={activeSubmenu === id}
            onClick={() => {
              setTool(id);
              if (id === 'shape' || id === 'eraser' || id === 'freehand') {
                setActiveSubmenu(activeSubmenu === id ? null : id);
              } else {
                setActiveSubmenu(null);
              }
            }}
          />

          <AnimatePresence>
            {activeSubmenu === 'shape' && id === 'shape' && <ShapesSubmenu />}
            {activeSubmenu === 'eraser' && id === 'eraser' && <EraserSubmenu />}
            {activeSubmenu === 'freehand' && id === 'freehand' && <FreehandSubmenu />}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
};