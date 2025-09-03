import React from 'react';
import { Answer, QuestionUser } from '@/interfaces/Question';
import './QuestionCard.css';

interface QuestionCardProps {
	title: string;
	isResolved: boolean;
	description?: string;
	attachedCode?: string;
	user: QuestionUser;
	answers: Answer[];
	onEdit?: () => void;
}

export default function QuestionCard({
	title,
	isResolved,
	description,
	attachedCode,
	user,
	answers,
	onEdit,
}: QuestionCardProps) {
	const correctAnswersCount = answers.filter((answer: Answer) => answer.isCorrect).length;

	return (
		<div className="question-card">
			<div className="question-header">
				<div className="question-title-section">
					<h3 className="question-title">{title}</h3>
					<span className={`status-badge ${isResolved ? 'resolved' : 'unresolved'}`}>
						{isResolved ? 'Resolved' : 'Unresolved'}
					</span>
				</div>
				<div className="question-meta">
					<div className="user-info">
						<img src="/assets/img/user.jpg" alt="User Avatar" className="user-avatar" />
						<div className="user-details">
							<span className="username">{user.username}</span>
							<span className={`role-badge role-${user.role}`}>
								{user.role.charAt(0).toUpperCase() + user.role.slice(1)}
							</span>
						</div>
					</div>
					{onEdit && (
						<button onClick={onEdit} className="edit-question-button">
							Edit
						</button>
					)}
				</div>
			</div>

			<div className="question-content">
				{description && (
					<div className="question-description">
						<p>{description}</p>
					</div>
				)}

				{attachedCode?.trim() && (
					<div className="question-code">
						<h4>Attached Code:</h4>
						<pre className="code-block">
							<code>{attachedCode}</code>
						</pre>
					</div>
				)}

				<div className="question-answers-info">
					<div className="answers-count">
						<span className="answers-number">{answers.length}</span>
						<span className="answers-label">{answers.length === 1 ? 'Answer' : 'Answers'}</span>
					</div>
					<div className="correct-answers">
						<span className="correct-count">{correctAnswersCount}</span>
						<span className="correct-label">Correct</span>
					</div>
				</div>
			</div>
		</div>
	);
}
