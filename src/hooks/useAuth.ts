import { useCallback } from 'react';
import { useAuthStore } from '../store/auth';
import { TEST_CREDENTIALS } from '../lib/constants';

export const useAuth = () => {
  const { setUser, setIsAuthenticated, setIsLoading } = useAuthStore();

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === TEST_CREDENTIALS.email && password === TEST_CREDENTIALS.password) {
        const user = {
          id: '1',
          email: TEST_CREDENTIALS.email,
          name: 'Demo User',
        };
        
        setUser(user);
        setIsAuthenticated(true);
        return { success: true };
      }
      
      return { success: false, error: 'Invalid credentials' };
    } finally {
      setIsLoading(false);
    }
  }, [setUser, setIsAuthenticated, setIsLoading]);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = {
        id: Date.now().toString(),
        email,
        name,
      };
      
      setUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  }, [setUser, setIsAuthenticated, setIsLoading]);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, [setUser, setIsAuthenticated]);

  return { login, signup, logout };
};