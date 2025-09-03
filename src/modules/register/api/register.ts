import { apiClient } from '@/shared/api/axios';
import { RegisterPayload } from '@/interfaces/Auth';

export async function register(payload: RegisterPayload): Promise<String> {
	const response = await apiClient.post<String>('/register', payload);
	return response.data;
}
