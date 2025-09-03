import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserStatistic } from '../../api/fetchUserStatistic';
import { UserWithStatistic } from '@/interfaces/User';
import { LoadingSpinner, StatCard } from '@/ui/common';
import './UserProfile.css';

export default function UserProfile() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [user, setUser] = useState<UserWithStatistic | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!id) return;

		const loadUserStatistic = async () => {
			setIsLoading(true);
			try {
				const userData = await fetchUserStatistic(id);
				setUser(userData);
			} finally {
				setIsLoading(false);
			}
		};

		loadUserStatistic();
	}, [id]);

	const getRoleDisplayName = useCallback((role: string | undefined) => {
		if (!role) return 'Unknown';
		return role.charAt(0).toUpperCase() + role.slice(1);
	}, []);

	const formatNumber = useCallback((num: number) => {
		return num.toLocaleString();
	}, []);

	const statisticsData = useMemo(() => [
		{ icon: '📝', title: 'Snippets', value: user?.statistic?.snippetsCount || 0 },
		{ icon: '⭐', title: 'Rating', value: user?.statistic?.rating || 0 },
		{ icon: '💬', title: 'Comments', value: user?.statistic?.commentsCount || 0 },
		{ icon: '👍', title: 'Likes', value: user?.statistic?.likesCount || 0 },
		{ icon: '👎', title: 'Dislikes', value: user?.statistic?.dislikesCount || 0 },
		{ icon: '❓', title: 'Questions', value: user?.statistic?.questionsCount || 0 },
		{ icon: '✅', title: 'Correct Answers', value: user?.statistic?.correctAnswersCount || 0 },
		{ icon: '💭', title: 'Regular Answers', value: user?.statistic?.regularAnswersCount || 0 },
	], [user?.statistic]);

	const handleBackClick = useCallback(() => {
		navigate('/users');
	}, [navigate]);




	return (
		<div className="user-profile">
			{isLoading ? (
				<LoadingSpinner text="Loading user information..." />
			) : user ? (
				<>
					<div className="profile-header">
						<button onClick={handleBackClick} className="back-button">
							← Back to Users
						</button>
						<h1>User Profile</h1>
					</div>

					<div className="profile-card">
						<div className="profile-info">
							<div className="user-avatar">
								<img src="/assets/img/user.jpg" alt="User Avatar" />
							</div>
							<div className="user-details">
								<h2>{user.username}</h2>
								<p className="user-id">ID: {user.id}</p>
								<span className={`role-badge role-${user.role}`}>
									{getRoleDisplayName(user.role)}
								</span>
							</div>
						</div>

						<div className="statistics-grid">
							{statisticsData.map((stat, index) => (
								<StatCard
									key={index}
									icon={stat.icon}
									title={stat.title}
									value={stat.value}
									formatValue={formatNumber}
								/>
							))}
						</div>
					</div>
				</>
			) : null}
		</div>
	);
}
