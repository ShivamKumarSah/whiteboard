import { supabase } from '../supabase';

export const createProfile = async (userId: string, name: string) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .insert([
        {
          id: userId,
          name,
          display_name: name,
        }
      ]);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to create profile'
    };
  }
};

export const getProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('name, display_name, avatar_url')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to fetch profile'
    };
  }
};