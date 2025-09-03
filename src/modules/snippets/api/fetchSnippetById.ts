import { SnippetDto } from '@/interfaces/Snippet';
import { ApiSingleResponse } from '@/interfaces/api';
import { apiClient } from '@/shared/api/axios';

export async function fetchSnippetById(id: string | number): Promise<SnippetDto> {
	const res = await apiClient.get<ApiSingleResponse<SnippetDto>>(`/snippets/${id}`);
	return res.data.data;
}
