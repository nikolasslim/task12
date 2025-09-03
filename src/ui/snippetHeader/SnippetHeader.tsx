import React from 'react';
import ProfileIcon from '@/svg/Profile';
import CodeIcon from '@/svg/Code';
import './SnippetHeader.css';
import { SnippetHeaderProps } from '@/interfaces/Snippet';

export default function SnippetHeader({ snippet }: SnippetHeaderProps) {
	return (
		<div className="snippet-header">
			<div className="snippet-header-right">
				<ProfileIcon width={20} />
				<div className="snippet-username">{snippet.user.username}</div>
			</div>
			<div className="snippet-header-left">
				<CodeIcon width={20} />
				<div className="snippet-language">{snippet.language}</div>
			</div>
		</div>
	);
}
