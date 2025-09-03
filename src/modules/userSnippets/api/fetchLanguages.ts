import { apiClient } from '@/shared/api/axios';
import type { Language } from '@/interfaces/Snippet';

interface LanguagesResponse {
	data: string[];
}

export async function fetchLanguages(): Promise<Language[]> {
	const resp = await apiClient.get<LanguagesResponse>(`/snippets/languages`);

	return resp.data.data.map(name => ({ name }));
}
