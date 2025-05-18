import { useCallback } from 'react';

/**
 * Hook to manage localStorage with error handling.
 * @param key The localStorage key to manage
 */
// 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useLocalStorage<T = any>(key: string) {
  // Get value from localStorage
  const getLocal = useCallback((): T | null => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error getting localStorage key "${key}":`, error);
      return null;
    }
  }, [key]);

  // Set value in localStorage
  const setLocal = useCallback((value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  // Remove value from localStorage
  const removeLocal = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  return { getLocal, setLocal, removeLocal };
} 