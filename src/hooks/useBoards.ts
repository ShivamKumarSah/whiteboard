import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Board } from '../types';

export const useBoards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMyBoards = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('boards')
        .select('*')
        .order('last_accessed', { ascending: false });

      if (error) throw error;
      return data as Board[];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch boards');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getRecentBoards = useCallback(async (limit = 5) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('boards')
        .select('*')
        .order('last_accessed', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as Board[];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch recent boards');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createBoard = useCallback(async (title: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('boards')
        .insert([{ title, content: [] }])
        .select()
        .single();

      if (error) throw error;
      return data as Board;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create board');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateBoard = useCallback(async (id: string, updates: Partial<Board>) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('boards')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Board;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update board');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteBoard = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('boards')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete board');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    getMyBoards,
    getRecentBoards,
    createBoard,
    updateBoard,
    deleteBoard,
  };
};