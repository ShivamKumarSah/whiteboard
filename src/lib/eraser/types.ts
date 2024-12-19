import type { Point } from '../../types';

export interface EraseOperation {
  type: 'precision' | 'area' | 'quick';
  points: Point[];
  size: number;
}

export interface LassoSelection {
  points: Point[];
  isComplete: boolean;
}

export interface ElementBounds {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
}