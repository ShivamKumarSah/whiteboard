import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useWhiteboardStore } from '../store/whiteboard';
import type { Board } from '../types';

export const useBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { operations } = useWhiteboardStore();

  const saveBoard = useCallback(async (title: string = 'Untitled Board') => {
    setIsLoading(true);
    setError(null);

    try {
      // Generate thumbnail from canvas
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Draw operations on thumbnail canvas
      operations.forEach(op => {
        ctx.beginPath();
        ctx.strokeStyle = op.color;
        ctx.lineWidth = op.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (op.points.length > 0) {
          ctx.moveTo(op.points[0].x, op.points[0].y);
          op.points.forEach(point => {
            ctx.lineTo(point.x, point.y);
          });
        }
        ctx.stroke();
      });

      const thumbnail = canvas.toDataURL('image/png');

      const { data, error: saveError } = await supabase
        .from('boards')
        .insert([
          {
            title,
            content: operations,
            thumbnail,
          },
        ])
        .select()
        .single();

      if (saveError) throw saveError;
      return data as Board;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save board';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [operations]);

  const updateBoard = useCallback(async (id: string, title?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const updates: Partial<Board> = {
        content: operations,
      };
      
      if (title) {
        updates.title = title;
      }

      const { data, error: updateError } = await supabase
        .from('boards')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;
      return data as Board;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update board';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [operations]);

  const getBoard = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('boards')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;
      return data as Board;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch board';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    saveBoard,
    updateBoard,
    getBoard,
  };
};