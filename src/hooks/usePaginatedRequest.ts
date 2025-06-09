import { useState, useEffect, useCallback } from 'react';

interface UsePaginatedResult<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  page: number;
  pageSize: number;
  pageCount: number;
  refresh: (newPage?: number) => void;
}

export function usePaginatedRequest<T>(
  baseUrl: string,
  initialPage = 1,
  initialPageSize = 10
): UsePaginatedResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(initialPage);
  const [pageSize] = useState(initialPageSize);
  const [pageCount, setPageCount] = useState<number>(0);

  const fetchData = useCallback(
    async (pageNumber: number) => {
      setLoading(true);
      try {
        // Конструиране на URL-то
        const separator = baseUrl.includes('?') ? '&' : '?';
        const finalUrl = `${baseUrl}${separator}page=${pageNumber}&pageSize=${pageSize}`;

        console.log('Fetching from:', finalUrl);

        const response = await fetch(finalUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        console.log('Response data:', result);

        // Осигури data и pageCount
        const dataArray = Array.isArray(result.data) ? result.data : Array.isArray(result) ? result : [];
        const totalPages = result.pageCount ?? result.totalPages ?? Math.ceil(dataArray.length / pageSize);

        setData(dataArray);
        setPageCount(totalPages); // Записваме pageCount
        setError(null);

        if (pageNumber !== page) {
          setPage(pageNumber);
        }
      } catch (err) {
        setError(err as Error);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    },
    [baseUrl, pageSize, page]
  );

  const refresh = useCallback(
    (newPage?: number) => {
      const targetPage = newPage ?? page;
      fetchData(targetPage);
    },
    [fetchData, page]
  );

  useEffect(() => {
    fetchData(initialPage);
  }, [fetchData, initialPage]);

  return { data, loading, error, page, pageSize, pageCount, refresh };
}