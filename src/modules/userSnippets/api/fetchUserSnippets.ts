import { apiClient } from '@/shared/api/axios';
import { UserSnippet } from '@/interfaces/Snippet';
import { ApiResponse } from '@/interfaces/api';

export async function fetchUserSnippets(
	page: number = 1,
	userId?: string
): Promise<ApiResponse<UserSnippet>> {
	if (!userId) {
		throw new Error('User ID is required to fetch user snippets');
	}

	const response = await apiClient.get<ApiResponse<UserSnippet>>('/snippets', {
		params: {
			page,
			userId,
		},
	});

	return response.data;
}
