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

  const fetchData = async (pageNumber: number, cacheed: boolean) => {
    setLoading(true);
    try {
      const separator = baseUrl.includes('?') ? '&' : '?';
      const finalUrl = `${baseUrl}${separator}page=${pageNumber}&pageSize=${pageSize}`;

      console.log('Fetching from:', finalUrl);

      const response = await fetch(finalUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: cacheed ? 'force-cache' : 'default'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('Response data:', result);

      const dataArray = Array.isArray(result.data)
        ? result.data
        : Array.isArray(result)
        ? result
        : [];

      const totalPages =
        result.pageCount ?? result.totalPages ?? Math.ceil(dataArray.length / pageSize);

      setData(dataArray);
      setPageCount(totalPages);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const refresh = useCallback(
    (newPage?: number) => {
      const targetPage = newPage ?? page;
      setPage(targetPage); // trigger useEffect
      fetchData(targetPage, false)
    },
    [page]
  );

  useEffect(() => {
    fetchData(page, true);
    console.log(page)
  }, [page, baseUrl, pageSize]);

  return { data, loading, error, page, pageSize, pageCount, refresh };
}
