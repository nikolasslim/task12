import { useState, useEffect, useCallback } from 'react';
import { UsePaginatedDataOptions } from '@/interfaces/hooks';

export function usePaginatedData<T>({
	fetchFunction,
	initialPage = 1,
}: UsePaginatedDataOptions<T>) {
	const [data, setData] = useState<T[]>([]);
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [totalPages, setTotalPages] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const loadData = useCallback(
		async (page: number) => {
			try {
				setIsLoading(true);
				setError('');
				
				const response = await fetchFunction(page);
				const itemsData = response.data?.data || [];
				const totalPages = response.data?.meta?.totalPages || 0;

				setData(itemsData);
				setTotalPages(totalPages);
				setCurrentPage(page);
			} catch {
				setError('Failed to load data');
			} finally {
				setIsLoading(false);
			}
		},
		[fetchFunction]
	);

	useEffect(() => {
		loadData(initialPage);
	}, [loadData, initialPage]);

	const goToPage = useCallback(
		(page: number) => {
			if (page >= 1 && page <= totalPages) {
				loadData(page);
			}
		},
		[loadData, totalPages]
	);

	return {
		data,
		currentPage,
		totalPages,
		isLoading,
		error,
		loadData,
		goToPage,
	};
}
