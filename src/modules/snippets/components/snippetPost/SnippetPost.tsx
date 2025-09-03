import React from 'react';
import Snippet from '@/components/snippet /Snippet';
import { MarkDto, SnippetPostProps } from '@/interfaces/Snippet';
import { LoadingSpinner } from '@/ui/common';
import './SnippetPost.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useSnippet } from '@/hooks';

export default function SnippetPost({ snippetId, snippet: initialSnippet }: SnippetPostProps) {
	const currentUser = useSelector((state: RootState) => state.userState);
	const { snippet, isLoading, error, setSnippet } = useSnippet(snippetId, initialSnippet);

	const handleMarkUpdate = (snippetId: string, markType: 'like' | 'dislike' | 'none') => {
		if (!snippet || snippet.id !== snippetId) return;

		const filteredMarks = snippet.marks.filter(mark => mark.user.id !== currentUser.id);

		if (markType === 'none') {
			setSnippet({ ...snippet, marks: filteredMarks });
			return;
		}

		const newMark: MarkDto = {
			id: Date.now().toString(),
			type: markType,
			user: {
				id: currentUser.id,
				username: currentUser.username,
				role: currentUser.role,
			},
		};

		setSnippet({ ...snippet, marks: [...filteredMarks, newMark] });
	};

	return (
		<div className="postContainer">
			{isLoading ? (
				<LoadingSpinner text="Loading snippet..." />
			) : error ? (
				<p className="error-message">{error}</p>
			) : !snippet ? (
				<p>Not found</p>
			) : (
				<>
					<Snippet snippet={snippet} onMarkUpdate={handleMarkUpdate} />

					<div className="commentsSection">
						<h3 className="commentsTitle">Comments</h3>
						{snippet.comments.map(comment => (
							<div key={comment.id} className="commentItem">
								<div className="commentContent">{comment.content}</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}
