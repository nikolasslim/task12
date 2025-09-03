import { apiClient } from '@/shared/api/axios';
import { CreateQuestionPayload, CreateQuestionResponse } from '@/interfaces/Question';

export async function createQuestion(
	payload: CreateQuestionPayload
): Promise<CreateQuestionResponse> {
	const response = await apiClient.post<CreateQuestionResponse>('/questions', payload);
	return response.data;
}
