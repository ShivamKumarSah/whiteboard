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

export interface User {
  id: string;
  email: string;
  name: string;
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
  thumbnail?: string;
  created_at: string;
  updated_at: string;
  owner_id: string;
  is_template: boolean;
  is_public: boolean;
  last_accessed: string;
}

export interface BoardCollaborator {
  board_id: string;
  user_id: string;
  role: 'viewer' | 'editor';
  created_at: string;
}