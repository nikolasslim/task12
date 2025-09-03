import { apiClient } from '@/shared/api/axios';
import { SnippetDto } from '@/interfaces/Snippet';
import { ApiResponse } from '@/interfaces/api';

export async function fetchSnippets(page: number = 1): Promise<ApiResponse<SnippetDto>> {
	const response = await apiClient.get<ApiResponse<SnippetDto>>('/snippets', {
		params: { page },
	});
	return response.data;
}
