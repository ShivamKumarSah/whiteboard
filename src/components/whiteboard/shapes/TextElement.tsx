import React, { useState, useEffect } from 'react';
import { Text } from 'react-konva';
import type { DrawOperation } from '../../../types';

interface TextElementProps {
  operation: DrawOperation;
  isSelected: boolean;
  onSelect: () => void;
}

export const TextElement: React.FC<TextElementProps> = ({
  operation,
  isSelected,
  onSelect,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(operation.text || '');

  useEffect(() => {
    if (isSelected && !text) {
      setIsEditing(true);
    }
  }, [isSelected, text]);

  const handleDblClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <foreignObject
        x={operation.points[0].x}
        y={operation.points[0].y}
        width={300}
        height={100}
      >
        <textarea
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            padding: '5px',
            background: 'transparent',
            fontSize: '16px',
            fontFamily: 'inherit',
            resize: 'none',
            outline: 'none',
          }}
        />
      </foreignObject>
    );
  }

  return (
    <Text
      id={operation.id}
      x={operation.points[0].x}
      y={operation.points[0].y}
      text={text}
      fontSize={16}
      fill={operation.color}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onDblClick={handleDblClick}
      onDblTap={handleDblClick}
    />
  );
};