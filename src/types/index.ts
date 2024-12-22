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
  text?: string;
  fontSize?: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
}

export interface User {
  id: string;
  email: string;
  display_name?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Board {
  id: string;
  title: string;
  content: DrawOperation[];
  created_at: string;
  updated_at: string;
  owner_id: string;
}