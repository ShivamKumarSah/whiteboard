import {
  MousePointer2,
  Pen,
  Type,
  Shapes,
  Eraser,
  Pencil,
  Minus,
  MoveUpRight,
  CornerUpRight,
  Redo,
  Square,
  Circle,
  Triangle,
  Diamond,
  Star,
  MessageSquare,
  ArrowBigRight,
  LassoSelect,
  Trash2,
} from 'lucide-react';
import type { Tool } from '../../../types';

export const MENU_ITEMS = [
  { id: 'select' as Tool, icon: MousePointer2, label: 'Select (V)', shortcut: 'v' },
  { id: 'pen' as Tool, icon: Pen, label: 'Freehand (P)', shortcut: 'p' },
  { id: 'text' as Tool, icon: Type, label: 'Text (T)', shortcut: 't' },
  { id: 'shape' as Tool, icon: Shapes, label: 'Shapes & Lines (S)', shortcut: 's' },
  { id: 'eraser' as Tool, icon: Eraser, label: 'Eraser (E)', shortcut: 'e' },
  { id: 'lasso-eraser' as Tool, icon: LassoSelect, label: 'Lasso Eraser (L)', shortcut: 'l' },
  { id: 'element-eraser' as Tool, icon: Trash2, label: 'Element Eraser', shortcut: 'del' },
] as const;

export const LINE_SHAPES = [
  { id: 'line' as Tool, icon: Minus, label: 'Straight Line' },
  { id: 'arrow' as Tool, icon: MoveUpRight, label: 'Arrow Line' },
  { id: 'elbow' as Tool, icon: CornerUpRight, label: 'Elbow Connector' },
  { id: 'curved' as Tool, icon: Redo, label: 'Curved Arrow' },
];

export const BASIC_SHAPES = [
  { id: 'rectangle' as Tool, icon: Square, label: 'Rectangle' },
  { id: 'circle' as Tool, icon: Circle, label: 'Circle' },
  { id: 'triangle' as Tool, icon: Triangle, label: 'Triangle' },
  { id: 'diamond' as Tool, icon: Diamond, label: 'Diamond' },
  { id: 'star' as Tool, icon: Star, label: 'Star' },
  { id: 'chat' as Tool, icon: MessageSquare, label: 'Chat Bubble' },
  { id: 'callout' as Tool, icon: ArrowBigRight, label: 'Callout' },
];

const createEraserCursor = (IconComponent: React.FC, size: number = 32) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eraser"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>
  `;
  return `url('data:image/svg+xml;base64,${btoa(svg)}') ${size / 2} ${size / 2}, auto`;
};

const createPenCursor = (IconComponent: React.FC, size: number = 32) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
  `;
  return `url('data:image/svg+xml;base64,${btoa(svg)}') ${size / 2} ${size / 2}, auto`;
};


export const CURSOR_STYLES: Record<Tool, string> = {
  select: 'default', // Arrow cursor
  pen: createPenCursor(Pencil), // Custom pen cursor
  text: 'text', // Text cursor
  shape: 'crosshair', // Crosshair cursor for shapes
  eraser: createEraserCursor(Eraser),
  line: 'crosshair', // Crosshair cursor for lines
  arrow: 'crosshair', // Crosshair for arrow lines
  elbow: 'crosshair', // Crosshair for elbow connectors
  curved: 'crosshair', // Crosshair for curved arrows
  rectangle: 'crosshair', // Crosshair for rectangles
  circle: 'crosshair', // Crosshair for circles
  triangle: 'crosshair', // Crosshair for triangles
  diamond: 'crosshair', // Crosshair for diamonds
  star: 'crosshair', // Crosshair for stars
  chat: 'crosshair', // Crosshair for chat bubbles
  callout: 'crosshair', // Crosshair for callouts
};