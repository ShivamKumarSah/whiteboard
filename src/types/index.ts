export type Tool = 
  | 'select' 
  | 'pen' 
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
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Whiteboard {
  id: string;
  name: string;
  lastModified: Date;
  createdBy: string;
  collaborators: string[];
  type: 'recent' | 'shared' | 'archived';
  thumbnail?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface SearchResultType {
  id: string;
  name: string;
  type: string;
}