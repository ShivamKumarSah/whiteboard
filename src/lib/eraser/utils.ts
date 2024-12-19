import type { Point, DrawOperation } from '../../types';
import type { ElementBounds, LassoSelection } from './types';

export const isPointInPath = (point: Point, pathPoints: Point[]): boolean => {
  let inside = false;
  for (let i = 0, j = pathPoints.length - 1; i < pathPoints.length; j = i++) {
    const xi = pathPoints[i].x, yi = pathPoints[i].y;
    const xj = pathPoints[j].x, yj = pathPoints[j].y;
    
    const intersect = ((yi > point.y) !== (yj > point.y))
        && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
};

export const getElementsInLasso = (
  lasso: LassoSelection,
  elements: DrawOperation[]
): DrawOperation[] => {
  if (!lasso.isComplete || lasso.points.length < 3) return [];

  return elements.filter(element => {
    const bounds = getElementBounds(element);
    const corners = [
      { x: bounds.x, y: bounds.y },
      { x: bounds.x + bounds.width, y: bounds.y },
      { x: bounds.x + bounds.width, y: bounds.y + bounds.height },
      { x: bounds.x, y: bounds.y + bounds.height }
    ];
    
    return corners.some(corner => isPointInPath(corner, lasso.points));
  });
};

export const getElementBounds = (element: DrawOperation): ElementBounds => {
  const points = element.points;
  const xs = points.map(p => p.x);
  const ys = points.map(p => p.y);
  
  return {
    id: element.id,
    type: element.type,
    x: Math.min(...xs),
    y: Math.min(...ys),
    width: Math.max(...xs) - Math.min(...xs),
    height: Math.max(...ys) - Math.min(...ys)
  };
};

export const isPointNearLine = (
  point: Point,
  lineStart: Point,
  lineEnd: Point,
  threshold: number
): boolean => {
  const A = point.x - lineStart.x;
  const B = point.y - lineStart.y;
  const C = lineEnd.x - lineStart.x;
  const D = lineEnd.y - lineStart.y;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let param = -1;

  if (lenSq !== 0) param = dot / lenSq;

  let xx, yy;

  if (param < 0) {
    xx = lineStart.x;
    yy = lineStart.y;
  } else if (param > 1) {
    xx = lineEnd.x;
    yy = lineEnd.y;
  } else {
    xx = lineStart.x + param * C;
    yy = lineStart.y + param * D;
  }

  const dx = point.x - xx;
  const dy = point.y - yy;

  return Math.sqrt(dx * dx + dy * dy) <= threshold;
};