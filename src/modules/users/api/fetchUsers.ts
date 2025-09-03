import { apiClient } from '@/shared/api/axios';
import { UserWithStatistic, FetchUsersParams } from '@/interfaces/User';
import { ApiResponse } from '@/interfaces/api';

export async function fetchUsers(
	params: FetchUsersParams = {}
): Promise<ApiResponse<UserWithStatistic>> {
	const { page = 1, limit = 10 } = params;
	const response = await apiClient.get<ApiResponse<UserWithStatistic>>(
		`/users?page=${page}&limit=${limit}`
	);
	return response.data;
}
