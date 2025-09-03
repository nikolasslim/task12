import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSnippetById } from '@/modules/snippets/api/fetchSnippetById';
import type { SnippetDto, Language } from '@/interfaces/Snippet';
import { LoadingSpinner } from '@/ui/common';
import { fetchLanguages } from '@/modules/userSnippets';
import { updateSnippet } from '@/modules/userSnippets';
import '@/ui/common/SnippetForm.css';

export default function EditSnippetForm() {
	const { snippetId } = useParams();
	const [snippet, setSnippet] = useState<SnippetDto>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [languages, setLanguages] = useState<Language[]>([]);
	const [selectedLanguage, setSelectedLanguage] = useState('');
	const [code, setCode] = useState('');

	useEffect(() => {
		const load = async () => {
			if (!snippetId) return;
			try {
				setIsLoading(true);
				const data = await fetchSnippetById(snippetId);
				console.log(data);
				setSnippet(data);
				setSelectedLanguage(data.language );
				setCode(data.code );
			} catch (e) {
				setError('Failed to load snippet');
				console.error(e);
			} finally {
				setIsLoading(false);
			}
		};
		load();
	}, [snippetId]);

	useEffect(() => {
		const loadLanguages = async () => {
			try {
				const langs = await fetchLanguages();
				setLanguages(langs);
			} catch (e) {
				console.error('Failed to load languages', e);
			}
		};
		loadLanguages();
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!snippetId) return;
		if (!selectedLanguage || !code.trim()) return;
		try {
			setIsLoading(true);
			await updateSnippet(snippetId, { code, language: selectedLanguage });
			console.log('Snippet updated successfully');
		} catch (e) {
			console.error('Failed to update snippet', e);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className="snippet-form">
			<h2>Edit snippet</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Language of your snippet </label>
					<select id="language" value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)}>
						<option value="">Choose language:</option>
						{languages.map(language => (
							<option key={language.name} value={language.name}>
								{language.name}
							</option>
						))}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="code">Code:</label>
					<textarea
						id="code"
						value={code}
						onChange={e => setCode(e.target.value)}
						placeholder="Enter your code here..."
						rows={15}
						disabled={isLoading}
						required
					/>
				</div>
				<div className="form-actions">
					<button type="submit" disabled={isLoading || !selectedLanguage || !code.trim()}>
						{isLoading ? 'Saving…' : 'Save'}
					</button>
				</div>
			</form>
		</div>
	);
}
