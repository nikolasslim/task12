import React from 'react';
import { useNavigate } from 'react-router-dom';

import Pagination from '@/ui/pagination/Pagination';
import { LoadingState } from '@/ui/common';
import './UserSnippetsList.css';
import { useUserSnippets } from '@/hooks';

export default function UserSnippetsList() {
	const navigate = useNavigate();
	const { snippets, isLoading, currentPage, totalPages, handlePageChange, error, loadSnippets } =
		useUserSnippets();

	const handleEditSnippet = (snippetId: string) => {
		navigate(`/posts/mine/edit/${snippetId}`);
	};

	const renderSnippets = () => (
		<>
			<div className="page-header">
				<h2>My Snippets ({snippets.length})</h2>
			</div>
			<div className="snippets-grid">
				{snippets.map(snippet => (
					<div key={snippet.id} className="snippet-card">
						<div className="snippet-header">
							<span className="language-badge">{snippet.language}</span>
							<span className="snippet-stats">{snippet.marks.length} marks</span>
							<button
								className="change-snippet-button"
								onClick={() => handleEditSnippet(snippet.id)}
							>
								Change snippet
							</button>
						</div>
						<div className="snippet-content">
							<pre className="code-preview">
								<code>{snippet.code}</code>
							</pre>
						</div>
						<div className="snippet-footer">
							<span className="snippet-id">ID: {snippet.id}</span>
							<span className="comments-count">{snippet.comments.length} comments</span>
						</div>
					</div>
				))}
			</div>

			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			)}
		</>
	);

	return (
		<div className="user-snippets-list">
			<LoadingState
				isLoading={isLoading}
				error={error}
				onRetry={loadSnippets}
				loadingText="Loading your snippets..."
				emptyText="No snippets yet. Start by creating your first snippet!"
			>
				{renderSnippets()}
			</LoadingState>
		</div>
	);
}
