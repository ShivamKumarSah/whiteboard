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
      const { data, error: saveError } = await supabase
        .from('boards')
        .insert([
          {
            title,
            content: operations,
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

  const getMyBoards = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('boards')
        .select('*')
        .order('last_accessed', { ascending: false });

      if (fetchError) throw fetchError;
      return data as Board[];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch boards';
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getRecentBoards = useCallback(async (limit: number = 5) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('boards')
        .select('*')
        .order('last_accessed', { ascending: false })
        .limit(limit);

      if (fetchError) throw fetchError;
      return data as Board[];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch recent boards';
      setError(message);
      return [];
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
    getMyBoards,
    getRecentBoards,
  };
};