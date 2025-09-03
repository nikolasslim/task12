import React from 'react';
import SnippetHeader from '@/ui/snippetHeader/SnippetHeader';
import { SnippetBody } from '@/ui/snippetBody/SnippetBody';
import SnippetFooter from '@/ui/snippetFooter/SnippetFooter';
import { SnippetProps } from '@/interfaces/Snippet';
import './Snippet.css';

export default function Snippet({ snippet, onClick, onMarkUpdate }: SnippetProps) {
	return (
		<div
			className="snippet-container"
			onClick={onClick}
		>
			<SnippetHeader snippet={snippet} />
			<SnippetBody snippet={snippet} />
			<SnippetFooter snippet={snippet} onMarkUpdate={onMarkUpdate} />
		</div>
	);
}
