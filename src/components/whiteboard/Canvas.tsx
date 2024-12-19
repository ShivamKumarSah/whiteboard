import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useWhiteboardStore } from '../../store/whiteboard';
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
  }, [currentTool]);

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

  // Handle drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Apply transformations
    ctx.setTransform(scale, 0, 0, scale, offset.x, offset.y);

    // Draw background grid
    const gridSize = 20;
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1 / scale;

    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw all operations
    operations.forEach(op => drawOperation(ctx, op));
    if (currentOperation) {
      drawOperation(ctx, currentOperation);
    }
  }, [scale, offset, operations, currentOperation, drawOperation]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only handle left click

    const point = getCanvasPoint(e);

    if (e.altKey || currentTool === 'select') {
      startDragging(point);
    } else {
      startOperation(
        currentTool === 'eraser' ? 'erase' : 'draw',
        point
      );
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const point = getCanvasPoint(e);

    if (isDragging) {
      updateDragging(point);
    } else if (currentOperation) {
      addPoint(point);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      endDragging();
    } else if (currentOperation) {
      endOperation();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 touch-none cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
};