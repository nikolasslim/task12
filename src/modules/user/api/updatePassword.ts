import { apiClient } from '@/shared/api/axios';
import { UpdatePasswordPayload, UpdatePasswordResponse } from '@/interfaces/User';

export async function updatePassword(
	payload: UpdatePasswordPayload
): Promise<UpdatePasswordResponse> {
	const response = await apiClient.patch<UpdatePasswordResponse>('/me/password', payload);
	return response.data;
}
