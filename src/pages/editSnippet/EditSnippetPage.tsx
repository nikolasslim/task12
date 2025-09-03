import React from 'react';
import EditSnippetForm from '@/modules/userSnippets/components/editSnippetForm/EditSnippetForm';

export default function EditSnippetPage() {
	return (
		<div className="edit-snippet-page">
			<div className="page-header">
				<EditSnippetForm />
			</div>
		</div>
	);
}
