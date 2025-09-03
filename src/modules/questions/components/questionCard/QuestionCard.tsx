import React from 'react';
import { useSelector } from 'react-redux';
import { QuestionCardProps } from '@/interfaces/Question';
import { QuestionCard as UIQuestionCard } from '@/ui/common';
import { RootState } from '@/store/store';

export default function QuestionCard({ question, onEdit }: QuestionCardProps) {
	const currentUser = useSelector((state: RootState) => state.userState);
	const isOwner = currentUser.id && String(currentUser.id) === String(question.user.id);

	return (
		<UIQuestionCard
			title={question.title}
			isResolved={question.isResolved}
			description={question.description}
			attachedCode={question.attachedCode}
			user={question.user}
			answers={question.answers}
			onEdit={isOwner && onEdit ? () => onEdit(question.id) : undefined}
		/>
	);
}
