import { useCallback } from 'react';

interface ShapeOptions {
  type: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  strokeWidth: number;
}

export const useShapes = () => {
  const drawShape = useCallback((ctx: CanvasRenderingContext2D, options: ShapeOptions) => {
    const { type, startX, startY, endX, endY, color, strokeWidth } = options;
    
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = strokeWidth;

    switch (type) {
      case 'rectangle':
        ctx.rect(startX, startY, endX - startX, endY - startY);
        break;
      case 'circle':
        const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        break;
      case 'line':
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        break;
      case 'triangle':
        ctx.moveTo(startX, endY);
        ctx.lineTo((startX + endX) / 2, startY);
        ctx.lineTo(endX, endY);
        ctx.closePath();
        break;
      case 'arrow':
        const angle = Math.atan2(endY - startY, endX - startX);
        const headLength = 20;
        
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.lineTo(
          endX - headLength * Math.cos(angle - Math.PI / 6),
          endY - headLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(endX, endY);
        ctx.lineTo(
          endX - headLength * Math.cos(angle + Math.PI / 6),
          endY - headLength * Math.sin(angle + Math.PI / 6)
        );
        break;
    }

    ctx.stroke();
  }, []);

  return { drawShape };
};