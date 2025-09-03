import { apiClient } from '@/shared/api/axios';
import { UpdateQuestionPayload, UpdateQuestionResponse } from '@/interfaces/Question';

export async function updateQuestion(
	questionId: string,
	payload: UpdateQuestionPayload
): Promise<UpdateQuestionResponse> {
	const response = await apiClient.patch<UpdateQuestionResponse>(
		`/questions/${questionId}`,
		payload
	);
	return response.data;
}
