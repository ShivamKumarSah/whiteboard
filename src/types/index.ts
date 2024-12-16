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