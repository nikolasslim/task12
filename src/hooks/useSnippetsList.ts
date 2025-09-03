import { useState, useEffect } from 'react';
import { SnippetDto } from '@/interfaces/Snippet';
import { fetchSnippets } from '@/modules/snippets/api/FetchSnippets';

export function useSnippetsList(
	currentPage: number = 1,
	onTotalPagesChange?: (totalPages: number) => void
) {
	const [snippets, setSnippets] = useState<SnippetDto[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const controller = new AbortController();
		setIsLoading(true);
		setError('');

		fetchSnippets(currentPage)
			.then(response => {
				if (controller.signal.aborted) return;
				const snippetsData = response?.data?.data || [];
				const totalPages = response?.data?.meta?.totalPages || 0;

				setSnippets(snippetsData);
				if (totalPages && onTotalPagesChange) {
					onTotalPagesChange(totalPages);
				}
			})
			.catch(err => {
				if (controller.signal.aborted) return;
				console.error('Error fetching snippets:', err);
				setError('Failed to load snippets');
			})
			.finally(() => {
				if (controller.signal.aborted) return;
				setIsLoading(false);
			});

		return () => controller.abort();
	}, [currentPage, onTotalPagesChange]);

	return { snippets, isLoading, error, setSnippets };
}
