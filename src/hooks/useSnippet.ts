import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SnippetDto } from '@/interfaces/Snippet';
import { fetchSnippetById } from '@/modules/snippets/api/fetchSnippetById';

export function useSnippet(snippetId: string | number, initialSnippet?: SnippetDto) {
	const location = useLocation();
	const hintedSnippet = (location.state as { snippet?: SnippetDto })?.snippet;
	const [snippet, setSnippet] = useState<SnippetDto | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!snippetId) return;

		const existingSnippet = initialSnippet || hintedSnippet;
		if (existingSnippet) {
			setSnippet(existingSnippet);
			return;
		}

		setIsLoading(true);
		fetchSnippetById(snippetId)
			.then(setSnippet)
			.catch(e => setError(e?.message ?? 'Failed to load'))
			.finally(() => setIsLoading(false));
	}, [snippetId, initialSnippet, hintedSnippet]);

	return { snippet, isLoading, error, setSnippet };
}
