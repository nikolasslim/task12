import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SnippetBodyProps } from '@/interfaces/Snippet';
import './SnippetBody.css';

export const SnippetBody = ({ snippet }: SnippetBodyProps) => {
	const normalizedLanguage = (snippet.language ?? 'text').toLowerCase();
	return (
		<SyntaxHighlighter
			language={normalizedLanguage}
			style={vscDarkPlus}
			showLineNumbers={true}
			wrapLines={true}
			className="snippet-body"
		>
			{snippet.code}
		</SyntaxHighlighter>
	);
};
