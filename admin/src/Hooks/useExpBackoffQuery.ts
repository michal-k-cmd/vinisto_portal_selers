import { useEffect, useRef, useState } from 'react';
import { QueryKey, useQuery, UseQueryResult } from '@tanstack/react-query';

interface ExponentialBackoffQueryOptions {
	maxRefetches?: number;
	baseInterval?: number;
	refetchMultiplier?: number[];
	resetTrigger?: any;
}

function useExponentialBackoffQuery<TData = unknown>(
	queryKey: QueryKey,
	queryFn: () => Promise<TData>,
	options: ExponentialBackoffQueryOptions
): UseQueryResult<TData> {
	const {
		maxRefetches = 3,
		baseInterval = 1000,
		refetchMultiplier = [1, 2, 5],
		resetTrigger,
	} = options;

	const [refetchCount, setRefetchCount] = useState(0);
	const timerRef = useRef<number | null>(null);

	const { data, refetch } = useQuery<TData>(queryKey, queryFn, {
		enabled: false,
	});

	useEffect(() => {
		if (refetchCount < maxRefetches) {
			const interval = baseInterval * (refetchMultiplier[refetchCount] || 1);
			timerRef.current = window.setTimeout(() => {
				refetch();
				setRefetchCount((count) => count + 1);
			}, interval);
		}

		return () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current);
			}
		};
	}, [refetchCount, refetch, maxRefetches, baseInterval, refetchMultiplier]);

	useEffect(() => {
		setRefetchCount(0);
	}, [resetTrigger]);

	return { data, refetch } as UseQueryResult<TData>;
}

export default useExponentialBackoffQuery;
