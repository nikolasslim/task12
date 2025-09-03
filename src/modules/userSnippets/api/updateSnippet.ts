import { apiClient } from '@/shared/api/axios';
import { CreateSnippetPayload } from '@/interfaces/Snippet';
import { UpdateSnippetResponse } from '@/interfaces/api';

export async function updateSnippet(
	snippetId: string | number,
	payload: CreateSnippetPayload
): Promise<UpdateSnippetResponse> {
	const res = await apiClient.patch<UpdateSnippetResponse>(`/snippets/${snippetId}`, payload);
	return res.data;
}
