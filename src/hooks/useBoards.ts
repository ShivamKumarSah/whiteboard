import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Board } from '../types';

export const useBoards = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBoards = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('boards')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setBoards(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch boards');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return {
    boards,
    isLoading,
    error,
    refetch: fetchBoards
  };
};