import { useCallback } from 'react';
import { useAuthStore } from '../store/auth';
import { supabase } from '../lib/supabase';
import { createProfile, getProfile } from '../lib/auth/profile';

export const useAuth = () => {
  const { setUser, setIsAuthenticated, setIsLoading } = useAuthStore();

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        const profile = await getProfile(data.user.id);
        
        setUser({
          id: data.user.id,
          email: data.user.email!,
          name: profile.data?.name || data.user.email!.split('@')[0],
        });
        setIsAuthenticated(true);
        return { success: true };
      }

      return { success: false, error: 'No user data returned' };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  }, [setUser, setIsAuthenticated, setIsLoading]);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Create profile
        const result = await createProfile(data.user.id, name);
        if (!result.success) {
          return { success: false, error: result.error };
        }

        setUser({
          id: data.user.id,
          email: data.user.email!,
          name,
        });
        setIsAuthenticated(true);
        return { success: true };
      }

      return { success: false, error: 'No user data returned' };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  }, [setUser, setIsAuthenticated, setIsLoading]);

  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setIsAuthenticated(false);
    }
    return { success: !error, error: error?.message };
  }, [setUser, setIsAuthenticated]);

  return { login, signup, logout };
};