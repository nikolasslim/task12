import { BaseUser, PaginatedResponse, FetchParams, BaseEntityResponse } from './Base';

export interface Answer {
	id: string;
	content: string;
	isCorrect: boolean;
	user: QuestionUser;
	createdAt: string;
}

export type QuestionUser = BaseUser;

export interface Question {
	id: string;
	title: string;
	description: string;
	attachedCode?: string;
	user: QuestionUser;
	answers: Answer[];
	isResolved: boolean;
	createdAt: string;
	updatedAt: string;
}

export type QuestionsResponse = PaginatedResponse<Question>;

export type FetchQuestionsParams = FetchParams;

export interface QuestionCardProps {
	question: Question;
	onEdit?: (questionId: string) => void;
}

export interface CreateQuestionPayload {
	title: string;
	description: string;
	attachedCode: string;
}

export interface CreateQuestionResponse extends BaseEntityResponse {
	title: string;
	description: string;
	attachedCode: string;
}

export interface UpdateQuestionPayload {
	title: string;
	description: string;
	attachedCode: string;
}

export interface UpdateQuestionResponse extends BaseEntityResponse {
	title: string;
	description: string;
	attachedCode: string;
}
