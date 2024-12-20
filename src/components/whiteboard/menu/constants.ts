import {
  MousePointer2,
  Pen,
  Type,
  Shapes,
  Eraser,
  Pencil,
  Highlighter,
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
  XCircle,
} from 'lucide-react';
import type { Tool } from '../../../types';

export const MENU_ITEMS = [
  { id: 'select' as Tool, icon: MousePointer2, label: 'Select (V)', shortcut: 'v' },
  { id: 'freehand' as Tool, icon: Pen, label: 'Freehand (F)', shortcut: 'f' },
  { id: 'text' as Tool, icon: Type, label: 'Text (T)', shortcut: 't' },
  { id: 'shape' as Tool, icon: Shapes, label: 'Shapes & Lines (S)', shortcut: 's' },
  { id: 'eraser' as Tool, icon: Eraser, label: 'Eraser Tools (E)', shortcut: 'e' },
] as const;

export const FREEHAND_TOOLS = [
  { id: 'pen' as Tool, icon: Pencil, label: 'Pen' },
  { id: 'highlighter' as Tool, icon: Highlighter, label: 'Highlighter' },
] as const;

export const LINE_SHAPES = [
  { id: 'line' as Tool, icon: Minus, label: 'Straight Line' },
  { id: 'arrow' as Tool, icon: MoveUpRight, label: 'Arrow Line' },
  { id: 'elbow' as Tool, icon: CornerUpRight, label: 'Elbow Connector' },
  { id: 'curved' as Tool, icon: Redo, label: 'Curved Arrow' },
] as const;

export const BASIC_SHAPES = [
  { id: 'rectangle' as Tool, icon: Square, label: 'Rectangle' },
  { id: 'circle' as Tool, icon: Circle, label: 'Circle' },
  { id: 'triangle' as Tool, icon: Triangle, label: 'Triangle' },
  { id: 'diamond' as Tool, icon: Diamond, label: 'Diamond' },
  { id: 'star' as Tool, icon: Star, label: 'Star' },
  { id: 'chat' as Tool, icon: MessageSquare, label: 'Chat Bubble' },
  { id: 'callout' as Tool, icon: ArrowBigRight, label: 'Callout' },
] as const;

export const BRUSH_SIZES = [
  { id: 'small', label: 'Small', size: 2 },
  { id: 'medium', label: 'Medium', size: 4 },
  { id: 'large', label: 'Large', size: 8 },
] as const;

const createEraserCursor = (size: number = 20) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="${size/2 - 2}" stroke="black" fill="rgba(255,255,255,0.5)"/>
      <circle cx="12" cy="12" r="${size/2 - 1}" stroke="white"/>
    </svg>
  `;
  return `url('data:image/svg+xml;base64,${btoa(svg)}') ${size/2} ${size/2}, auto`;
};

export const CURSOR_STYLES: Record<Tool, string> = {
  select: 'default',
  pen: 'crosshair',
  highlighter: 'crosshair',
  freehand: 'crosshair',
  text: 'text',
  shape: 'crosshair',
  eraser: createEraserCursor(20),
  'lasso-eraser': 'crosshair',
  'element-eraser': `url('data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>')}') 12 12, auto`,
  line: 'crosshair',
  arrow: 'crosshair',
  elbow: 'crosshair',
  curved: 'crosshair',
  rectangle: 'crosshair',
  circle: 'crosshair',
  triangle: 'crosshair',
  diamond: 'crosshair',
  star: 'crosshair',
  chat: 'crosshair',
  callout: 'crosshair',
};