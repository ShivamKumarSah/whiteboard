import { useCallback, useRef } from 'react';
import { useShapes } from './useShapes';

interface DrawOptions {
  tool: string;
  color: string;
  brushSize: number;
  scale: number;
  position: { x: number; y: number };
  onDrawingComplete: (imageData: ImageData) => void;
}

export const useDraw = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  options: DrawOptions
) => {
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const { drawShape } = useShapes();

  const getCanvasPoint = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left - options.position.x) / options.scale,
      y: (e.clientY - rect.top - options.position.y) / options.scale,
    };
  };

  const startDrawing = useCallback((e: React.MouseEvent) => {
    isDrawing.current = true;
    lastPos.current = getCanvasPoint(e);
  }, [options.scale, options.position]);

  const draw = useCallback((e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPos = getCanvasPoint(e);

    ctx.beginPath();
    ctx.strokeStyle = options.color;
    ctx.lineWidth = options.brushSize / options.scale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (options.tool === 'pencil') {
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(currentPos.x, currentPos.y);
      ctx.stroke();
    } else if (options.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(currentPos.x, currentPos.y);
      ctx.stroke();
      ctx.globalCompositeOperation = 'source-over';
    } else {
      // For shapes, we need to clear and redraw
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.putImageData(imageData, 0, 0);

      drawShape(ctx, {
        type: options.tool,
        startX: lastPos.current.x,
        startY: lastPos.current.y,
        endX: currentPos.x,
        endY: currentPos.y,
        color: options.color,
        strokeWidth: options.brushSize / options.scale,
      });
    }

    if (options.tool === 'pencil' || options.tool === 'eraser') {
      lastPos.current = currentPos;
    }
  }, [options.tool, options.color, options.brushSize, options.scale, options.position, drawShape]);

  const stopDrawing = useCallback(() => {
    if (isDrawing.current) {
      isDrawing.current = false;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      options.onDrawingComplete(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }
  }, [options.onDrawingComplete]);

  return {
    isDrawing: isDrawing.current,
    startDrawing,
    draw,
    stopDrawing,
  };
};