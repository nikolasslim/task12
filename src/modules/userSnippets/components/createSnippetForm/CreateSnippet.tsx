import React, { useEffect, useState } from 'react';
import { fetchLanguages, createSnippet } from '@/modules/userSnippets';
import type { Language } from '@/interfaces/Snippet';
import '@/ui/common/SnippetForm.css';

export default function CreateSnippet() {
	const [selectedLanguage, setSelectedLanguage] = useState('');
	const [languages, setLanguages] = useState<Language[]>([]);
	const [snippetsCode, setSnippetsCode] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const load = async () => {
			try {
				const langs = await fetchLanguages();
				setLanguages(langs);
			} catch (e) {
				console.error('Failed to load languages', e);
			}
		};
		load();
	}, []);
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		if (!selectedLanguage || !snippetsCode.trim()) return;
		try {
			setIsLoading(true);
			await createSnippet({
				code: snippetsCode,
				language: selectedLanguage,
			});
			setSnippetsCode('');
			setSelectedLanguage('');
			console.log('Snippet created successfully');
		} catch (error) {
			console.error('Failed to create snippet', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="snippet-form">
			<h2>Create new snippet</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Language of your snippet </label>
					<select
						id="language"
						value={selectedLanguage}
						onChange={e => setSelectedLanguage(e.target.value)}
					>
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
						value={snippetsCode}
						onChange={e => setSnippetsCode(e.target.value)}
						placeholder="Enter your code here..."
						rows={15}
						disabled={isLoading}
						required
					/>
				</div>
				<div className="form-actions">
					<button type="submit" disabled={isLoading || !selectedLanguage || !snippetsCode.trim()}>
						{isLoading ? 'Creating…' : 'Create snippet'}
					</button>
				</div>
			</form>
		</div>
	);
}
