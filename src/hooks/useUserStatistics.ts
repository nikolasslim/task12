import { useState, useEffect } from 'react';
import { User, UserWithStatistic } from '@/interfaces/User';
import { fetchUserStatistics } from '@/modules/user/api/fetchCurrentUserData';

export function useUserStatistics(userId: string, userInfo?: User | null) {
	const [profileData, setProfileData] = useState<UserWithStatistic | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!userId || !userInfo) return;

		const loadUserStatistics = async () => {
			setIsLoading(true);
			setError('');

			try {
				const statisticData = await fetchUserStatistics(userId);

				if (statisticData && statisticData.statistic) {
					setProfileData(statisticData);
				} else {
					setProfileData({
						...userInfo,
						statistic: undefined,
					});
				}
			} catch {
				setError('Failed to load user statistics');

				setProfileData({
					...userInfo,
					statistic: undefined,
				});
			} finally {
				setIsLoading(false);
			}
		};

		loadUserStatistics();
	}, [userId, userInfo]);

	return { profileData, isLoading, error };
}
