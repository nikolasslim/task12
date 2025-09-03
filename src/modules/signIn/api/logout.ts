import { apiClient } from '@/shared/api/axios';

export async function logout(): Promise<void> {
	await apiClient.post('/auth/logout');
}
