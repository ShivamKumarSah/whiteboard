import { useState } from 'react';
import { saveBoard } from '../lib/board/saveBoard';
import type { DrawOperation } from '../types';

export const useSaveBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSaveBoard = async ({
    title,
    content,
  }: {
    title: string;
    content: DrawOperation[];
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await saveBoard(title, content);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save board';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveBoard: handleSaveBoard,
    isLoading,
    error
  };
};