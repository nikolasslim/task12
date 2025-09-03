import { apiClient } from '@/shared/api/axios';
import { UpdateProfilePayload, User } from '@/interfaces/User';

export async function updateProfile(payload: UpdateProfilePayload): Promise<User> {
	const response = await apiClient.patch<User>('/me', payload);
	return response.data;
}
