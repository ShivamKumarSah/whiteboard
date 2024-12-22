import type { Point } from '../../types';

export const getCanvasPoint = (
  e: MouseEvent,
  scale: number,
  offset: Point
): Point => ({
  x: (e.clientX - offset.x) / scale,
  y: (e.clientY - offset.y) / scale
});

export const snapToGrid = (point: Point, gridSize: number): Point => ({
  x: Math.round(point.x / gridSize) * gridSize,
  y: Math.round(point.y / gridSize) * gridSize
});

export const snapPoints = (points: Point[], threshold: number): Point[] => {
  if (points.length < 2) return points;
  
  const result = [...points];
  const last = result[result.length - 1];
  const first = result[0];
  
  // Snap end to start if close
  if (
    Math.abs(last.x - first.x) < threshold &&
    Math.abs(last.y - first.y) < threshold
  ) {
    result[result.length - 1] = first;
  }
  
  return result;
};