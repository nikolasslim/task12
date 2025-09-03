import { apiClient } from '@/shared/api/axios';
import { User, UserWithStatistic } from '@/interfaces/User';

export async function fetchCurrentUserInfo(): Promise<User | null> {
	try {
		const response = await apiClient.get<User>('/auth/me');
		return response.data;
	} catch {
		return null;
	}
}

export async function fetchUserStatistics(userId: string): Promise<UserWithStatistic | null> {
	try {
		const response = await apiClient.get(`/users/${userId}/statistic`);

		return response.data.data;
	} catch {
		return null;
	}
}
