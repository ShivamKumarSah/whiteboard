export type Tool = 
  | 'select' 
  | 'pen'
  | 'highlighter'
  | 'freehand'
  | 'eraser' 
  | 'lasso-eraser'
  | 'element-eraser'
  | 'text'
  | 'shape'
  | 'line'
  | 'arrow'
  | 'elbow'
  | 'curved'
  | 'rectangle'
  | 'circle'
  | 'triangle'
  | 'diamond'
  | 'star'
  | 'chat'
  | 'callout';

export interface Point {
  x: number;
  y: number;
}

export interface DrawOperation {
  id: string;
  type: Tool;
  points: Point[];
  color: string;
  width: number;
  opacity?: number;
}

// ... rest of the types remain the same