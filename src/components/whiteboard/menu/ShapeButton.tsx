import React from 'react';
import type { Tool } from '../../../types';
import type { LucideIcon } from 'lucide-react';

interface ShapeButtonProps {
  id: Tool;
  icon: LucideIcon;
  label: string;
  onClick: (tool: Tool) => void;
}

export const ShapeButton: React.FC<ShapeButtonProps> = ({
  id,
  icon: Icon,
  label,
  onClick,
}) => {
  return (
    <button
      onClick={() => onClick(id)}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
      title={label}
    >
      <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
    </button>
  );
};