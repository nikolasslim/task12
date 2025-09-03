import { apiClient } from '@/shared/api/axios';
import { SignInPayload, AuthSuccessResponse } from '@/interfaces/Auth';

export async function signIn(payload: SignInPayload): Promise<AuthSuccessResponse> {
	const response = await apiClient.post<AuthSuccessResponse>('/auth/login', payload);
	return response.data;
}
