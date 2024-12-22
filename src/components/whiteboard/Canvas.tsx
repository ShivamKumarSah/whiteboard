import React, { useRef, useEffect } from 'react';
import { Stage, Layer, Transformer } from 'react-konva';
import { useWhiteboardStore } from '../../store/whiteboard';
import { useDrawingHandlers } from '../../hooks/useDrawingHandlers';
import { usePanZoom } from '../../hooks/usePanZoom';
import { DrawingLayer } from './layers/DrawingLayer';
import { SelectionLayer } from './layers/SelectionLayer';
import { CURSOR_STYLES } from './menu/constants';

export const Canvas = () => {
  const stageRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);
  const { currentTool, selectedElement } = useWhiteboardStore();
  const { handleMouseDown, handleMouseMove, handleMouseUp } = useDrawingHandlers();
  const { scale, offset } = usePanZoom();

  useEffect(() => {
    if (selectedElement && transformerRef.current) {
      const node = stageRef.current?.findOne(`#${selectedElement.id}`);
      if (node) {
        transformerRef.current.nodes([node]);
        transformerRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedElement]);

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      scaleX={scale}
      scaleY={scale}
      x={offset.x}
      y={offset.y}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ cursor: CURSOR_STYLES[currentTool] }}
    >
      <Layer>
        <DrawingLayer />
        <SelectionLayer />
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => ({
            ...newBox,
            width: Math.max(5, newBox.width),
            height: Math.max(5, newBox.height)
          })}
        />
      </Layer>
    </Stage>
  );
};