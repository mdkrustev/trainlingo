import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface UsePaginatedResult<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (newPage: number) => void;
  refresh: () => void;
}

export function usePaginatedRequest<T>(
  baseUrl: string,
  initialPage = 1,
  initialPageSize = 3
): UsePaginatedResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(initialPage);
  const [pageSize] = useState(initialPageSize);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [time, setTime] = useState<number>(Date.now());
  const searchParams = useSearchParams();
  const router = useRouter();
  


  const load = useCallback(

    
    async (currentTime: number, urlPage: string | null) => {
      
      const cacheed = true;

      setLoading(true);
      setError(null);
      if (urlPage && parseInt(urlPage))
        setPage(parseInt(urlPage))
      try {
        const requestUrl = `${baseUrl}?page=${urlPage || page}&limit=${pageSize}&v=${currentTime}`
        const response = await fetch(requestUrl, {
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
        setData(result.data);
        setTotalCount(result.totalCount || 0);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    },
    [baseUrl, page, pageSize]
  );

  useEffect(() => {
    console.log(time)
    load(time, searchParams.get('page'));
  }, [searchParams, time, load]);

  const changeUrl = (newPage:number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', newPage.toString());
    router.push(`?${searchParams.toString()}`);
  }
  const onPageChange = (newPage: number) => {
    changeUrl(newPage)
    setPage(newPage)
  }

  const refresh = () => {
    setTime(Date.now())
    changeUrl(1)
    setPage(1)
  }

  return { data, loading, error, page, pageSize, totalCount, onPageChange, refresh };
}