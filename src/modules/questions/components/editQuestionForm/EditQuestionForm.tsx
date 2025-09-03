import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { LoadingSpinner } from '@/ui/common';
import { RootState } from '@/store/store';
import './EditQuestionForm.css';
import { fetchQuestionById, updateQuestion } from '@/modules/questions';
import { UpdateQuestionPayload } from '@/interfaces';
import CustomInput from '@/ui/customInput/CustomInput';

export default function EditQuestionForm() {
	const navigate = useNavigate();
	const { questionId } = useParams<{ questionId: string }>();
	const currentUser = useSelector((state: RootState) => state.userState);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [attachedCode, setAttachedCode] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingQuestion, setIsLoadingQuestion] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadQuestion = async () => {
			if (!questionId) {
				setError('Question ID is required');
				setIsLoadingQuestion(false);
				return;
			}

			try {
				setIsLoadingQuestion(true);
				setError(null);

				const question = await fetchQuestionById(questionId);

				if (!currentUser.id || String(currentUser.id) !== String(question.user.id)) {
					setError('You can only edit your own questions');
					setIsLoadingQuestion(false);
					return;
				}

				setTitle(question.title);
				setDescription(question.description);
				setAttachedCode(question.attachedCode || '');
			} catch {
				setError('Failed to load question');
			} finally {
				setIsLoadingQuestion(false);
			}
		};

		loadQuestion();
	}, [questionId, currentUser.id]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!questionId) {
			setError('Question ID is required');
			return;
		}

		if (!title.trim() || !description.trim()) {
			setError('Please fill in all required fields');
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const payload: UpdateQuestionPayload = {
				title: title.trim(),
				description: description.trim(),
				attachedCode: attachedCode.trim(),
			};

			await updateQuestion(questionId, payload);
			navigate('/questions');
		} catch {
			setError('Failed to update question');
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = () => {
		navigate('/questions');
	};

	if (isLoadingQuestion) {
		return <LoadingSpinner text="Loading question..." />;
	}

	return (
		<div className="edit-question-form">
			<h2>Edit Question</h2>

			{error && <div className="error-message">{error}</div>}

			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="title">Question Title *</label>
					<CustomInput
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
					<CustomInput
						id="description"
						value={description}
						onChange={e => setDescription(e.target.value)}
						placeholder="Describe your question in detail..."
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
						{isLoading ? 'Updating...' : 'Update Question'}
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
