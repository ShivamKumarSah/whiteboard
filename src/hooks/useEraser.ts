import { useCallback, useState } from 'react';
import { useWhiteboardStore } from '../store/whiteboard';
import { isPointNearLine, getElementsInLasso, getElementBounds } from '../lib/eraser/utils';
import type { Point, DrawOperation } from '../types';
import type { LassoSelection } from '../lib/eraser/types';

export const useEraser = () => {
  const {
    operations,
    currentTool,
    strokeWidth,
    removeOperation,
    removeOperations
  } = useWhiteboardStore();
  
  const [lassoSelection, setLassoSelection] = useState<LassoSelection>({
    points: [],
    isComplete: false
  });

  const handlePrecisionErase = useCallback((point: Point) => {
    operations.forEach(operation => {
      for (let i = 1; i < operation.points.length; i++) {
        const start = operation.points[i - 1];
        const end = operation.points[i];
        
        if (isPointNearLine(point, start, end, strokeWidth / 2)) {
          removeOperation(operation.id);
          break;
        }
      }
    });
  }, [operations, strokeWidth, removeOperation]);

  const handleAreaErase = useCallback((point: Point) => {
    const threshold = strokeWidth;
    operations.forEach(operation => {
      const isNearAnyPoint = operation.points.some(p => 
        Math.hypot(p.x - point.x, p.y - point.y) <= threshold
      );
      
      if (isNearAnyPoint) {
        removeOperation(operation.id);
      }
    });
  }, [operations, strokeWidth, removeOperation]);

  const handleQuickDelete = useCallback((point: Point) => {
    operations.forEach(operation => {
      const bounds = getElementBounds(operation);
      if (
        point.x >= bounds.x &&
        point.x <= bounds.x + bounds.width &&
        point.y >= bounds.y &&
        point.y <= bounds.y + bounds.height
      ) {
        removeOperation(operation.id);
      }
    });
  }, [operations, removeOperation]);

  const handleLassoStart = useCallback((point: Point) => {
    setLassoSelection({
      points: [point],
      isComplete: false
    });
  }, []);

  const handleLassoMove = useCallback((point: Point) => {
    setLassoSelection(prev => ({
      ...prev,
      points: [...prev.points, point]
    }));
  }, []);

  const handleLassoEnd = useCallback(() => {
    setLassoSelection(prev => {
      const selectedElements = getElementsInLasso(prev, operations);
      if (selectedElements.length > 0) {
        const shouldDelete = window.confirm(
          `Delete ${selectedElements.length} selected element(s)?`
        );
        if (shouldDelete) {
          removeOperations(selectedElements.map(el => el.id));
        }
      }
      return { points: [], isComplete: false };
    });
  }, [operations, removeOperations]);

  const handleErase = useCallback((point: Point) => {
    switch (currentTool) {
      case 'eraser':
        handlePrecisionErase(point);
        break;
      case 'lasso-eraser':
        handleLassoMove(point);
        break;
      case 'element-eraser':
        handleQuickDelete(point);
        break;
    }
  }, [
    currentTool,
    handlePrecisionErase,
    handleLassoMove,
    handleQuickDelete
  ]);

  return {
    handleErase,
    handleLassoStart,
    handleLassoEnd,
    lassoSelection
  };
};