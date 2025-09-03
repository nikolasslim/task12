import { UserSnippet } from '@/interfaces';
import { apiClient } from '@/shared/api/axios';

export default function fetchUsersSnippet(userId: string | number): Promise<UserSnippet> {
	const req = apiClient.get<UserSnippet>(`/snippets/${userId}`);
	return req.then(res => res.data);
}
