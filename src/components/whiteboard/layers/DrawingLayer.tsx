import React from 'react';
import { Group, Line } from 'react-konva';
import { useWhiteboardStore } from '../../../store/whiteboard';
import { ShapeElement } from '../shapes/ShapeElement';
import { TextElement } from '../shapes/TextElement';

export const DrawingLayer = () => {
  const { operations, selectedElement, setSelectedElement } = useWhiteboardStore();

  return (
    <Group>
      {operations.map((operation) => {
        const isSelected = selectedElement?.id === operation.id;

        if (['rectangle', 'circle', 'triangle', 'star'].includes(operation.type)) {
          return (
            <ShapeElement
              key={operation.id}
              operation={operation}
              isSelected={isSelected}
              onSelect={() => setSelectedElement(operation)}
            />
          );
        }

        if (operation.type === 'text') {
          return (
            <TextElement
              key={operation.id}
              operation={operation}
              isSelected={isSelected}
              onSelect={() => setSelectedElement(operation)}
            />
          );
        }

        // Default line/path drawing
        return (
          <Line
            key={operation.id}
            points={operation.points.flatMap((p, i) => [p.x, p.y])}
            stroke={operation.color}
            strokeWidth={operation.width}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation={
              operation.type === 'eraser' ? 'destination-out' : 'source-over'
            }
            opacity={operation.opacity}
            onClick={() => setSelectedElement(operation)}
          />
        );
      })}
    </Group>
  );
};