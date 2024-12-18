import { 
  MousePointer2, 
  Pen, 
  Type, 
  Shapes,
  Eraser,
  ArrowRight, 
  ArrowRightFromLine,
  CornerRightDown,
  ArrowUpRight,
  Square,
  Circle,
  Triangle,
  Diamond,
  Star,
  MessageSquare,
  ArrowUpCircle,
} from 'lucide-react';
import type { Tool } from '../../../types';

export const MENU_ITEMS = [
  { id: 'select' as Tool, icon: MousePointer2, label: 'Select (V)', shortcut: 'v' },
  { id: 'pen' as Tool, icon: Pen, label: 'Freehand (P)', shortcut: 'p' },
  { id: 'text' as Tool, icon: Type, label: 'Text (T)', shortcut: 't' },
  { id: 'shape' as Tool, icon: Shapes, label: 'Shapes & Lines (S)', shortcut: 's' },
  { id: 'eraser' as Tool, icon: Eraser, label: 'Eraser (E)', shortcut: 'e' },
] as const;

export const LINE_SHAPES = [
  { id: 'line' as Tool, icon: ArrowRight, label: 'Straight Line' },
  { id: 'arrow' as Tool, icon: ArrowRightFromLine, label: 'Arrow Line' },
  { id: 'elbow' as Tool, icon: CornerRightDown, label: 'Elbow Connector' },
  { id: 'curved' as Tool, icon: ArrowUpRight, label: 'Curved Arrow' },
];

export const BASIC_SHAPES = [
  { id: 'rectangle' as Tool, icon: Square, label: 'Rectangle' },
  { id: 'circle' as Tool, icon: Circle, label: 'Circle' },
  { id: 'triangle' as Tool, icon: Triangle, label: 'Triangle' },
  { id: 'diamond' as Tool, icon: Diamond, label: 'Diamond' },
  { id: 'star' as Tool, icon: Star, label: 'Star' },
  { id: 'chat' as Tool, icon: MessageSquare, label: 'Chat Bubble' },
  { id: 'callout' as Tool, icon: ArrowUpCircle, label: 'Callout' },
];