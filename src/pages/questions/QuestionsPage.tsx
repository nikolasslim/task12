import React from 'react';
import { QuestionsList } from '@/modules/questions';
import './QuestionsPage.css';

export default function QuestionsPage() {
	return (
		<div className="questions-page">
			<QuestionsList />
		</div>
	);
}
