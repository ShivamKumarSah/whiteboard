import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { DrawOperation } from '../types';

interface SaveBoardOptions {
  title: string;
  content: DrawOperation[];
  generateThumbnail?: boolean;
}

export const useSaveBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateThumbnailFromOperations = (operations: DrawOperation[]): string => {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Set white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw operations
    operations.forEach(op => {
      if (op.points.length < 2) return;

      ctx.beginPath();
      ctx.strokeStyle = op.color;
      ctx.lineWidth = op.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.moveTo(op.points[0].x, op.points[0].y);
      op.points.forEach(point => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    });

    return canvas.toDataURL('image/png');
  };

  const saveBoard = async ({ title, content, generateThumbnail = true }: SaveBoardOptions) => {
    setIsLoading(true);
    setError(null);

    try {
      const thumbnail = generateThumbnail ? generateThumbnailFromOperations(content) : null;

      const { data, error: saveError } = await supabase
        .from('boards')
        .insert([
          {
            title: title || 'Untitled Board',
            content,
            thumbnail,
          }
        ])
        .select()
        .single();

      if (saveError) throw saveError;
      return { success: true, data };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save board';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveBoard,
    isLoading,
    error
  };
};