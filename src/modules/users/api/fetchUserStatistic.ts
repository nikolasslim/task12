import { apiClient } from '@/shared/api/axios';
import { UserWithStatistic } from '@/interfaces/User';
import { ApiSingleResponse } from '@/interfaces/api';

export async function fetchUserStatistic(userId: string): Promise<UserWithStatistic> {
	const response = await apiClient.get<ApiSingleResponse<UserWithStatistic>>(`/users/${userId}/statistic`);
	return response.data.data;
}
