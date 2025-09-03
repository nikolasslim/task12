import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { UserSnippet } from '@/interfaces/Snippet';
import { fetchUserSnippets } from '@/modules/userSnippets/api/fetchUserSnippets';
import { RootState } from '@/store/store';
import { usePaginatedData } from './usePaginatedData';

export function useUserSnippets() {
	const currentUser = useSelector((state: RootState) => state.userState);

	const fetchFunction = useMemo(
		() => (page: number) => {
			if (!currentUser.id) {
				throw new Error('User not authenticated');
			}
			return fetchUserSnippets(page, currentUser.id);
		},
		[currentUser.id]
	);

	const paginatedData = usePaginatedData({
		fetchFunction,
		initialPage: 1,
	});

	return {
		snippets: paginatedData.data,
		isLoading: paginatedData.isLoading,
		error: paginatedData.error,
		loadSnippets: paginatedData.loadData,
		currentPage: paginatedData.currentPage,
		totalPages: paginatedData.totalPages,
		handlePageChange: paginatedData.goToPage,
	};
}
