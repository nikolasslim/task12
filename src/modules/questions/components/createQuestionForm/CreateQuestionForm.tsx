import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './CreateQuestionForm.css';
import { createQuestion } from '@/modules/questions';
import { CreateQuestionPayload } from '@/interfaces';

export default function CreateQuestionForm() {
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [attachedCode, setAttachedCode] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!title.trim() || !description.trim()) {
			setError('Please fill in all required fields');
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const payload: CreateQuestionPayload = {
				title: title.trim(),
				description: description.trim(),
				attachedCode: attachedCode.trim(),
			};

			await createQuestion(payload);
			navigate('/questions');
		} catch {
			setError('Failed to create question');
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = () => {
		navigate('/questions');
	};

	return (
		<div className="create-question-form">
			<h2>Ask a Question</h2>

			{error && <div className="error-message">{error}</div>}


			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="title">Question Title *</label>
					<input
						id="title"
						type="text"
						value={title}
						onChange={e => setTitle(e.target.value)}
						placeholder="Enter your question title..."
						disabled={isLoading}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="description">Question Description *</label>
					<textarea
						id="description"
						value={description}
						onChange={e => setDescription(e.target.value)}
						placeholder="Describe your question in detail..."
						rows={5}
						disabled={isLoading}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="attachedCode">Attached Code (Optional)</label>
					<textarea
						id="attachedCode"
						value={attachedCode}
						onChange={e => setAttachedCode(e.target.value)}
						placeholder="Enter your code here..."
						rows={15}
						disabled={isLoading}
					/>
				</div>

				<div className="form-actions">
					<button type="submit" disabled={isLoading} className="submit-button">
						{isLoading ? 'Creating...' : 'Create Question'}
					</button>

					<button
						type="button"
						onClick={handleCancel}
						disabled={isLoading}
						className="cancel-button"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}
