import { apiClient } from '@/shared/api/axios';
import { Question } from '@/interfaces/Question';
import { ApiSingleResponse } from '@/interfaces/api';

export async function fetchQuestionById(questionId: string): Promise<Question> {
	const response = await apiClient.get<ApiSingleResponse<Question>>(`/questions/${questionId}`);
	return response.data.data;
}
