import React from 'react';
import { UserSnippetsList } from '@/modules/userSnippets';

export default function MineSnippetsPage() {
	return (
		<div className="mine-snippets-page">
			<UserSnippetsList />
		</div>
	);
}
