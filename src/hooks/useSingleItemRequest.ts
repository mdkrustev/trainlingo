import { useState, useEffect, useCallback } from 'react';

interface UseSingleItemResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
}

export function useSingleItemRequest<T>(
  baseUrl: string,
  id: string | null
): UseSingleItemResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const separator = baseUrl.includes('?') ? '&' : '?';
      const finalUrl = `${baseUrl}${separator}id=${encodeURIComponent(id)}`;

      console.log('Fetching single item from:', finalUrl);

      const response = await fetch(finalUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'default',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('Single item response:', result);

      setData(result.data || result); // поддържа и { data: ... }, и директен обект
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Fetch error for single item:', err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [baseUrl, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh: fetchData };
}