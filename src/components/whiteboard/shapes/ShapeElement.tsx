import React from 'react';
import { Rect, Circle, RegularPolygon, Star } from 'react-konva';
import type { DrawOperation } from '../../../types';

interface ShapeElementProps {
  operation: DrawOperation;
  isSelected: boolean;
  onSelect: () => void;
}

export const ShapeElement: React.FC<ShapeElementProps> = ({
  operation,
  isSelected,
  onSelect,
}) => {
  const shapeProps = {
    id: operation.id,
    fill: operation.color,
    stroke: operation.color,
    strokeWidth: operation.width,
    draggable: true,
    onClick: onSelect,
    onTap: onSelect,
  };

  const getBounds = () => {
    const points = operation.points;
    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    return {
      x: Math.min(...xs),
      y: Math.min(...ys),
      width: Math.max(...xs) - Math.min(...xs),
      height: Math.max(...ys) - Math.min(...ys),
    };
  };

  const bounds = getBounds();

  switch (operation.type) {
    case 'rectangle':
      return (
        <Rect
          {...shapeProps}
          {...bounds}
        />
      );

    case 'circle':
      const radius = Math.sqrt(
        Math.pow(bounds.width, 2) + Math.pow(bounds.height, 2)
      ) / 2;
      return (
        <Circle
          {...shapeProps}
          x={bounds.x + bounds.width / 2}
          y={bounds.y + bounds.height / 2}
          radius={radius}
        />
      );

    case 'triangle':
      return (
        <RegularPolygon
          {...shapeProps}
          x={bounds.x + bounds.width / 2}
          y={bounds.y + bounds.height / 2}
          sides={3}
          radius={Math.min(bounds.width, bounds.height) / 2}
        />
      );

    case 'star':
      return (
        <Star
          {...shapeProps}
          x={bounds.x + bounds.width / 2}
          y={bounds.y + bounds.height / 2}
          numPoints={5}
          innerRadius={Math.min(bounds.width, bounds.height) / 4}
          outerRadius={Math.min(bounds.width, bounds.height) / 2}
        />
      );

    default:
      return null;
  }
};