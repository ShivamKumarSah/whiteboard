import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useWhiteboardStore } from '../../store/whiteboard';
import { useEraser } from '../../hooks/useEraser';
import { CURSOR_STYLES } from './menu/constants';

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    currentTool,
    currentColor,
    strokeWidth,
    operations,
    currentOperation,
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

  const {
    handleErase,
    handleLassoStart,
    handleLassoEnd,
    lassoSelection
  } = useEraser();

  const getCanvasPoint = useCallback((e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left - offset.x) / scale,
      y: (e.clientY - rect.top - offset.y) / scale,
    };
  }, [scale, offset]);

  // Update cursor style dynamically
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.cursor = CURSOR_STYLES[currentTool] || 'default';
    }
  }, [currentTool, strokeWidth]);

  const drawOperation = useCallback((ctx: CanvasRenderingContext2D, operation: typeof currentOperation) => {
    if (!operation || operation.points.length < 2) return;

    ctx.beginPath();
    ctx.strokeStyle = operation.color;
    ctx.lineWidth = operation.width / scale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (operation.type === 'erase') {
      ctx.globalCompositeOperation = 'destination-out';
    }

    ctx.moveTo(operation.points[0].x, operation.points[0].y);
    for (let i = 1; i < operation.points.length; i++) {
      ctx.lineTo(operation.points[i].x, operation.points[i].y);
    }
    ctx.stroke();

    if (operation.type === 'erase') {
      ctx.globalCompositeOperation = 'source-over';
    }
  }, [scale]);

  // Draw lasso selection
  const drawLassoSelection = useCallback((ctx: CanvasRenderingContext2D) => {
    if (lassoSelection.points.length < 2) return;

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#4f46e5';
    ctx.lineWidth = 1 / scale;
    ctx.setLineDash([5 / scale, 5 / scale]);
    
    ctx.moveTo(lassoSelection.points[0].x, lassoSelection.points[0].y);
    lassoSelection.points.forEach((point, i) => {
      if (i > 0) ctx.lineTo(point.x, point.y);
    });
    
    if (lassoSelection.isComplete) {
      ctx.closePath();
      ctx.fillStyle = 'rgba(79, 70, 229, 0.1)';
      ctx.fill();
    }
    
    ctx.stroke();
    ctx.restore();
  }, [lassoSelection, scale]);

  // Handle drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.setTransform(scale, 0, 0, scale, offset.x, offset.y);

    // Draw all operations
    operations.forEach(op => drawOperation(ctx, op));
    if (currentOperation) {
      drawOperation(ctx, currentOperation);
    }

    // Draw lasso selection if active
    if (currentTool === 'lasso-eraser') {
      drawLassoSelection(ctx);
    }
  }, [
    scale,
    offset,
    operations,
    currentOperation,
    drawOperation,
    drawLassoSelection,
    currentTool
  ]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only handle left click

    const point = getCanvasPoint(e);

    if (e.altKey || currentTool === 'select') {
      startDragging(point);
    } else if (currentTool.includes('eraser')) {
      if (currentTool === 'lasso-eraser') {
        handleLassoStart(point);
      } else {
        handleErase(point);
      }
    } else {
      startOperation(currentTool, point);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const point = getCanvasPoint(e);

    if (isDragging) {
      updateDragging(point);
    } else if (currentTool.includes('eraser')) {
      handleErase(point);
    } else if (currentOperation) {
      addPoint(point);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      endDragging();
    } else if (currentTool === 'lasso-eraser') {
      handleLassoEnd();
    } else if (currentOperation) {
      endOperation();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 touch-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
};