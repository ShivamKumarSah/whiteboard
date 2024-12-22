import React from 'react';
import { Group, Rect } from 'react-konva';
import { useWhiteboardStore } from '../../../store/whiteboard';

export const SelectionLayer = () => {
  const { currentTool, currentOperation } = useWhiteboardStore();

  if (currentTool !== 'select' || !currentOperation) {
    return null;
  }

  const points = currentOperation.points;
  if (points.length < 2) return null;

  const minX = Math.min(...points.map(p => p.x));
  const minY = Math.min(...points.map(p => p.y));
  const maxX = Math.max(...points.map(p => p.x));
  const maxY = Math.max(...points.map(p => p.y));

  return (
    <Group>
      <Rect
        x={minX}
        y={minY}
        width={maxX - minX}
        height={maxY - minY}
        stroke="#4299e1"
        strokeWidth={1}
        dash={[5, 5]}
        fill="rgba(66, 153, 225, 0.1)"
      />
    </Group>
  );
};