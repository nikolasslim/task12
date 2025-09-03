import LikeIcon from '@/svg/Like';
import React, { useState } from 'react';
import './SnippetFooter.css';
import DislikeIcon from '@/svg/Dislike';
import CommentIcon from '@/svg/Comment';
import { SnippetFooterPropsWithCallback } from '@/interfaces/UI';
import { markSnippet } from '@/modules/snippets/api/markSnippet';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function SnippetFooter({ snippet, onMarkUpdate }: SnippetFooterPropsWithCallback) {
	const [isLoading, setIsLoading] = useState(false);
	const currentUser = useSelector((state: RootState) => state.userState);

	const likesCount = snippet.marks?.filter(mark => mark.type === 'like').length || 0;
	const dislikesCount = snippet.marks?.filter(mark => mark.type === 'dislike').length || 0;

	const userMark = snippet.marks?.find(mark => mark.user.id === currentUser?.id);
	const userMarkType = userMark?.type;

	const handleMark = async (markType: 'like' | 'dislike' | 'none') => {
		if (isLoading) return;

		if (!currentUser?.id || currentUser.id === '') {
			return;
		}

		setIsLoading(true);
		try {
			await markSnippet(snippet.id, markType);

			if (onMarkUpdate) {
				onMarkUpdate(snippet.id, markType);
			}
		} catch {
		} finally {
			setIsLoading(false);
		}
	};

	const handleButtonClick = (e: React.MouseEvent, markType: 'like' | 'dislike' | 'none') => {
		e.stopPropagation();
		handleMark(markType);
	};

	return (
		<div className="snippet-footer">
			<div className="snippet-footer-left">
				<button
					className={`likes ${userMarkType === 'like' ? 'active' : ''}`}
					onClick={e => handleButtonClick(e, userMarkType === 'like' ? 'none' : 'like')}
					disabled={isLoading}
				>
					<LikeIcon width={15} /> {likesCount}
				</button>
				<button
					className={`dislikes ${userMarkType === 'dislike' ? 'active' : ''}`}
					onClick={e => handleButtonClick(e, userMarkType === 'dislike' ? 'none' : 'dislike')}
					disabled={isLoading}
				>
					<DislikeIcon width={15} /> {dislikesCount}
				</button>
			</div>
			<div className="snippet-footer-right">
				<div className="comments">
					<CommentIcon width={15} /> {snippet.comments?.length || 0}
				</div>
			</div>
		</div>
	);
}
