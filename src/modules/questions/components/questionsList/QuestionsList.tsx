import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestions } from '@/hooks';
import { LoadingState } from '@/ui/common';
import QuestionCard from '../questionCard/QuestionCard';
import Pagination from '@/ui/pagination/Pagination';
import './QuestionsList.css';

export default function QuestionsList() {
	const navigate = useNavigate();
	const { questions, meta, isLoading, loadQuestions, resolvedCount, unresolvedCount } =
		useQuestions();

	const handleEditQuestion = (questionId: string) => {
		navigate(`/questions/edit/${questionId}`);
	};

	const renderQuestions = () => (
		<>
			<div className="questions-header">
				<h2>Questions ({meta?.totalItems || 0})</h2>
				<div className="questions-stats">
					<span className="resolved-count">{resolvedCount} Resolved</span>
					<span className="unresolved-count">{unresolvedCount} Unresolved</span>
				</div>
			</div>

			<div className="questions-grid">
				{Array.isArray(questions) &&
					questions.map(question => (
						<QuestionCard key={question.id} question={question} onEdit={handleEditQuestion} />
					))}
			</div>

			{meta && (
				<Pagination
					currentPage={meta.currentPage || 1}
					totalPages={meta.totalPages || 1}
					onPageChange={loadQuestions}
				/>
			)}
		</>
	);

	return (
		<div className="questions-list">
			<LoadingState
				isLoading={isLoading}
				error={null}
				loadingText="Loading questions..."
				emptyText="No questions available"
			>
				{renderQuestions()}
			</LoadingState>
		</div>
	);
}
