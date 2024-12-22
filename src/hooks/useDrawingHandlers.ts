import { useCallback } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { useWhiteboardStore } from '../store/whiteboard';
import { getCanvasPoint, snapPoints } from '../lib/drawing/coordinates';
import { TOOL_SETTINGS, SNAP_THRESHOLD } from '../lib/drawing/constants';
import { useEraser } from './useEraser';

export const useDrawingHandlers = () => {
  const {
    currentTool,
    scale,
    offset,
    isDragging,
    startOperation,
    addPoint,
    endOperation,
    startDragging,
    updateDragging,
    endDragging,
  } = useWhiteboardStore();

  const { handleErase, handleLassoStart, handleLassoEnd } = useEraser();

  const handleMouseDown = useCallback((e: KonvaEventObject<MouseEvent>) => {
    const point = getCanvasPoint(e.evt, scale, offset);

    if (e.evt.ctrlKey) {
      startDragging(point);
      return;
    }

    if (currentTool === 'select') {
      return;
    }

    if (currentTool.includes('eraser')) {
      if (currentTool === 'lasso-eraser') {
        handleLassoStart(point);
      } else {
        handleErase(point);
      }
      return;
    }

    const toolSettings = TOOL_SETTINGS[currentTool as keyof typeof TOOL_SETTINGS];
    startOperation(currentTool, point, toolSettings);
  }, [currentTool, scale, offset]);

  const handleMouseMove = useCallback((e: KonvaEventObject<MouseEvent>) => {
    const point = getCanvasPoint(e.evt, scale, offset);

    if (isDragging) {
      updateDragging(point);
      return;
    }

    if (currentTool.includes('eraser')) {
      handleErase(point);
      return;
    }

    addPoint(point);
  }, [currentTool, isDragging, scale, offset]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      endDragging();
      return;
    }

    if (currentTool === 'lasso-eraser') {
      handleLassoEnd();
      return;
    }

    // Snap points for shapes and lines
    if (['line', 'arrow', 'rectangle', 'circle'].includes(currentTool)) {
      snapPoints([], SNAP_THRESHOLD);
    }

    endOperation();
  }, [currentTool, isDragging]);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  };
};