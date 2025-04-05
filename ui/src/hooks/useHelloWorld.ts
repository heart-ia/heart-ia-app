/**
 * Custom hook for fetching the Hello World data from the API
 */
import { useQuery } from '@tanstack/react-query';
import { fetchHelloWorld } from '@/services/api';

export function useHelloWorld() {
  return useQuery({
    queryKey: ['helloWorld'],
    queryFn: fetchHelloWorld,
  });
}