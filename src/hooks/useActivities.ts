import { Activity } from '@/lib/types/activity';
import { useCallback, useEffect, useState } from 'react';

interface UseActivitiesOptions {
  limit?: number;
  entityType?: string;
  entityId?: string;
  userId?: string;
}

export function useActivities(options: UseActivitiesOptions = {}) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  const fetchActivities = useCallback(async () => {
    if (loading || isUnauthorized) return;

    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: (options.limit || 10).toString(),
        ...(options.entityType && { entityType: options.entityType }),
        ...(options.entityId && { entityId: options.entityId }),
        ...(options.userId && { userId: options.userId }),
      });

      const response = await fetch(`/api/activities?${params}`);
      
      if (response.status === 401) {
        setIsUnauthorized(true);
        setHasMore(false);
        throw new Error('Unauthorized');
      }

      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }

      const data = await response.json();
      
      if (page === 1) {
        setActivities(data);
      } else {
        setActivities((prev) => [...prev, ...data]);
      }

      setHasMore(data.length === (options.limit || 10));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [options.entityId, options.entityType, options.limit, options.userId, page, loading, isUnauthorized]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore && !isUnauthorized) {
      setPage((p) => p + 1);
    }
  }, [loading, hasMore, isUnauthorized]);

  return {
    activities,
    loading,
    error,
    hasMore,
    loadMore,
    isUnauthorized,
  };
} 