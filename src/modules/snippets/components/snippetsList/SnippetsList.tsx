import React, { useState, useCallback } from 'react';
import Snippet from '@/components/snippet /Snippet';
import './SnippetsList.css';
import { SnippetsListProps, SnippetDto } from '@/interfaces/Snippet';
import SnippetPost from '@/modules/snippets/components/snippetPost/SnippetPost';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useSnippetsList } from '@/hooks';
import { LoadingState } from '@/ui/common';

export default function SnippetsList({ currentPage = 1, onTotalPagesChange }: SnippetsListProps) {
	const [selectedSnippet, setSelectedSnippet] = useState<SnippetDto | null>(null);
	const currentUser = useSelector((state: RootState) => state.userState);
	const { snippets, isLoading, error, setSnippets } = useSnippetsList(
		currentPage,
		onTotalPagesChange
	);

	const handleMarkUpdate = useCallback((snippetId: string, markType: 'like' | 'dislike' | 'none') => {
		setSnippets(prevSnippets =>
			prevSnippets.map(snippet => {
				if (snippet.id !== snippetId) return snippet;

				const marksWithoutCurrent = snippet.marks.filter(mark => mark.user.id !== currentUser.id);
				
				if (markType === 'none') {
					return { ...snippet, marks: marksWithoutCurrent };
				}

				const newMark = {
					id: Date.now().toString(),
					type: markType,
					user: {
						id: currentUser.id,
						username: currentUser.username,
						role: currentUser.role,
					},
				};

				return { ...snippet, marks: [...marksWithoutCurrent, newMark] };
			})
		);
	}, [currentUser, setSnippets]);

	const handleSnippetClick = useCallback((snippet: SnippetDto) => {
		setSelectedSnippet(snippet);
	}, []);

	if (selectedSnippet) {
		return (
			<div>
				<SnippetPost snippetId={selectedSnippet.id} snippet={selectedSnippet} />
			</div>
		);
	}

	return (
		<div className="snippets-list">
			<LoadingState
				isLoading={isLoading}
				error={error}
				loadingText="Loading snippets..."
				emptyText="No snippets available"
			>
				{snippets.map(snippet => (
					<Snippet
						key={snippet.id}
						snippet={snippet}
						onClick={() => handleSnippetClick(snippet)}
						onMarkUpdate={handleMarkUpdate}
					/>
				))}
			</LoadingState>
		</div>
	);
}
