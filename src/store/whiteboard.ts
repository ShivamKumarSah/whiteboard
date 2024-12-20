import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Tool, Point, DrawOperation } from '../types';

interface WhiteboardState {
  currentTool: Tool;
  currentColor: string;
  strokeWidth: number;
  operations: DrawOperation[];
  currentOperation: DrawOperation | null;
  scale: number;
  offset: Point;
  isDragging: boolean;
  lastMousePos: Point | null;
  history: DrawOperation[][];
  historyIndex: number;
}

interface WhiteboardActions {
  setTool: (tool: Tool) => void;
  setColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
  setScale: (scale: number) => void;
  setOffset: (offset: Point) => void;
  startOperation: (type: Tool, point: Point) => void;
  addPoint: (point: Point) => void;
  endOperation: () => void;
  undo: () => void;
  redo: () => void;
  startDragging: (point: Point) => void;
  updateDragging: (point: Point) => void;
  endDragging: () => void;
  removeOperation: (id: string) => void;
  removeOperations: (ids: string[]) => void;
}

export const useWhiteboardStore = create<WhiteboardState & WhiteboardActions>()(
  persist(
    (set, get) => ({
      // State
      currentTool: 'select',
      currentColor: '#000000',
      strokeWidth: 2,
      operations: [],
      currentOperation: null,
      scale: 1,
      offset: { x: 0, y: 0 },
      isDragging: false,
      lastMousePos: null,
      history: [],
      historyIndex: -1,

      // Actions
      setTool: (tool) => {
        if (tool === 'highlighter') {
          set({ currentTool: tool, strokeWidth: 8 });
        } else if (tool === 'pen') {
          set({ currentTool: tool, strokeWidth: 2 });
        } else {
          set({ currentTool: tool });
        }
      },

      setColor: (color) => set({ currentColor: color }),
      
      setStrokeWidth: (width) => set({ strokeWidth: width }),
      
      setScale: (scale) => set({ scale }),
      
      setOffset: (offset) => set({ offset }),

      startOperation: (type, point) => {
        if (get().currentOperation) return;

        const operation: DrawOperation = {
          id: crypto.randomUUID(),
          type,
          points: [point],
          color: get().currentColor,
          width: get().strokeWidth,
          opacity: type === 'highlighter' ? 0.5 : 1,
        };

        set({ currentOperation: operation });
      },

      addPoint: (point) => {
        const { currentOperation } = get();
        if (!currentOperation) return;

        set({
          currentOperation: {
            ...currentOperation,
            points: [...currentOperation.points, point],
          },
        });
      },

      endOperation: () => {
        const { currentOperation, operations, history, historyIndex } = get();
        if (!currentOperation) return;

        const newOperations = [...operations, currentOperation];
        const newHistory = [...history.slice(0, historyIndex + 1), newOperations];

        set({
          operations: newOperations,
          currentOperation: null,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });
      },

      removeOperation: (id) => {
        const { operations, history } = get();
        const newOperations = operations.filter(op => op.id !== id);
        const newHistory = [...history, newOperations];
        
        set({
          operations: newOperations,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });
      },

      removeOperations: (ids) => {
        const { operations, history } = get();
        const newOperations = operations.filter(op => !ids.includes(op.id));
        const newHistory = [...history, newOperations];
        
        set({
          operations: newOperations,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });
      },

      undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex < 0) return;

        set({
          operations: historyIndex > 0 ? history[historyIndex - 1] : [],
          historyIndex: historyIndex - 1,
        });
      },

      redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex >= history.length - 1) return;

        set({
          operations: history[historyIndex + 1],
          historyIndex: historyIndex + 1,
        });
      },

      startDragging: (point) => set({
        isDragging: true,
        lastMousePos: point,
      }),

      updateDragging: (point) => {
        const { lastMousePos, scale, offset } = get();
        if (!lastMousePos) return;

        const dx = (point.x - lastMousePos.x) / scale;
        const dy = (point.y - lastMousePos.y) / scale;

        set({
          offset: {
            x: offset.x + dx,
            y: offset.y + dy,
          },
          lastMousePos: point,
        });
      },

      endDragging: () => set({
        isDragging: false,
        lastMousePos: null,
      }),
    }),
    {
      name: 'whiteboard-storage',
      partialize: (state) => ({
        operations: state.operations,
        history: state.history,
        historyIndex: state.historyIndex,
      }),
    }
  )
);