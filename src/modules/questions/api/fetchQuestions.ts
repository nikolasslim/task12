import { apiClient } from '@/shared/api/axios';
import { Question, FetchQuestionsParams } from '@/interfaces/Question';
import { ApiResponse } from '@/interfaces/api';

export async function fetchQuestions(
	params: FetchQuestionsParams = {}
): Promise<ApiResponse<Question>> {
	const { page = 1 } = params;
	const response = await apiClient.get<ApiResponse<Question>>(`/questions?page=${page}`);
	return response.data;
}