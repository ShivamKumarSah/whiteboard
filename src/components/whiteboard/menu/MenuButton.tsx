import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { Tool } from '../../../types';
import type { LucideIcon } from 'lucide-react';

interface MenuButtonProps {
  id: Tool;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
  onClick: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  id,
  icon: Icon,
  label,
  isActive,
  hasSubmenu,
  isSubmenuOpen,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors relative group ${
        isActive
          ? 'bg-indigo-50 dark:bg-indigo-900/20'
          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <Icon className={`w-5 h-5 ${
        isActive
          ? 'text-indigo-600 dark:text-indigo-400'
          : 'text-gray-700 dark:text-gray-300'
      }`} />
      
      {/* Tooltip */}
      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {label}
      </div>

      {/* Submenu indicator */}
      {hasSubmenu && (
        <ChevronRight className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 transition-transform ${
          isSubmenuOpen ? 'rotate-90' : ''
        } ${
          isActive
            ? 'text-indigo-600 dark:text-indigo-400'
            : 'text-gray-400'
        }`} />
      )}
    </button>
  );
};