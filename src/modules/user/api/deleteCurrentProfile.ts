import { apiClient } from '@/shared/api/axios';

export async function DeleteCurrentProfile(): Promise<void> {
	const resp = await apiClient.delete('/me');
}
