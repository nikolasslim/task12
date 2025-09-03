import { apiClient } from '@/shared/api/axios';
import { CreateSnippetPayload } from '@/interfaces/Snippet';

export async function createSnippet(payload: CreateSnippetPayload): Promise<CreateSnippetPayload> {
	const response = await apiClient.post<CreateSnippetPayload>('/snippets', payload);
	return response.data;
}
