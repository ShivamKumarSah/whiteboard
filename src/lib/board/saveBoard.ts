import { supabase } from '../supabase';
import type { DrawOperation } from '../../types';

export const generateThumbnail = (operations: DrawOperation[]): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Set white background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Scale operations to fit thumbnail
  const scale = 0.2;
  ctx.scale(scale, scale);

  // Draw operations
  operations.forEach(op => {
    if (op.points.length < 2) return;

    ctx.beginPath();
    ctx.strokeStyle = op.color;
    ctx.lineWidth = op.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = op.opacity ?? 1;

    ctx.moveTo(op.points[0].x, op.points[0].y);
    op.points.forEach(point => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
  });

  return canvas.toDataURL('image/png');
};

export const saveBoard = async (title: string, operations: DrawOperation[]) => {
  try {
    const thumbnail = generateThumbnail(operations);

    const { data, error } = await supabase
      .from('boards')
      .insert([
        {
          title: title || 'Untitled Board',
          content: operations,
          thumbnail,
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to save board';
    return { success: false, error: message };
  }
};