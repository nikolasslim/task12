import './UserInfo.css';
import React from 'react';
import { useUserInfo } from '@/store/hooks';
import { useAuth, useUserStatistics } from '@/hooks';
import { LoadingSpinner } from '@/ui/common';
import ExitIcon from '@/svg/Exit';
import TrashIcon from '@/svg/delete';

export default function UserInfo() {
	const userInfo = useUserInfo();
	const { logout } = useAuth();
	const { deleteUser } = useAuth();
	const { profileData, isLoading, error } = useUserStatistics(userInfo?.id || '', userInfo);

	return (
		<div className="user-info-container">
			{!userInfo ? (
				<p>User not authenticated</p>
			) : isLoading ? (
				<LoadingSpinner text="Loading user data..." />
			) : error ? (
				<p>{error}</p>
			) : profileData ? (
				<>
					{profileData.statistic ? (
						<div className="user-stats">
							<span>
								<strong>Rating:</strong> {profileData.statistic.rating || 0}
							</span>
							<span>
								<strong>Snippets:</strong> {profileData.statistic.snippetsCount || 0}
							</span>
							<span>
								<strong>Comments:</strong> {profileData.statistic.commentsCount || 0}
							</span>
							<span>
								<strong>Likes:</strong> {profileData.statistic.likesCount || 0}
							</span>
							<span>
								<strong>Dislikes:</strong> {profileData.statistic.dislikesCount || 0}
							</span>
							<span>
								<strong>Questions:</strong> {profileData.statistic.questionsCount || 0}
							</span>
							<span>
								<strong>Correct answers:</strong> {profileData.statistic.correctAnswersCount || 0}
							</span>
							<span>
								<strong>Regular answers:</strong> {profileData.statistic.regularAnswersCount || 0}
							</span>
						</div>
					) : (
						<div className="user-stats">
							<p>Statistics not available</p>
						</div>
					)}

					<div className="avatar">
						<img src="/assets/img/profile-avatar.jpg" alt="avatar" className="avatar" />
					</div>

					<div className="controls">
						<span>{profileData.username}</span>
						<span>ID: {profileData.id}</span>
						<span>Role: {profileData.role}</span>
						<div className="controls-btns">
							<button className="exit" onClick={logout}>
								<ExitIcon />
							</button>
							<button className="delete" onClick={deleteUser}>
								<TrashIcon />
							</button>
						</div>
					</div>
				</>
			) : (
				<p>User data not found.</p>
			)}
		</div>
	);
}
