import React from 'react';
import { useWhiteboardStore } from '../../store/whiteboard';

const colors = [
  '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
  '#ffff00', '#ff00ff', '#00ffff', '#ff9900', '#9900ff',
];

export const ColorPicker = () => {
  const { color, setColor } = useWhiteboardStore();

  return (
    <div className="flex items-center gap-1">
      {colors.map((c) => (
        <button
          key={c}
          onClick={() => setColor(c)}
          className={`w-6 h-6 rounded-full border-2 ${
            color === c ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'
          }`}
          style={{ backgroundColor: c }}
          title={`Color: ${c}`}
        />
      ))}
    </div>
  );
};