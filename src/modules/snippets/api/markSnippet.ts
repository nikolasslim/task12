import { apiClient } from '@/shared/api/axios';
import { MarkDto } from '@/interfaces/Snippet';

export async function markSnippet(
	snippetId: string | number,
	markType: MarkDto['type']
): Promise<MarkDto> {
	const response = await apiClient.post<MarkDto>(`/snippets/${snippetId}/mark`, {
		mark: markType,
	});

	return response.data;
}
