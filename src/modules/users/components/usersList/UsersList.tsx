import React, { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserWithStatistic } from '@/interfaces/User';
import { LoadingSpinner } from '@/ui/common';
import Pagination from '@/ui/pagination/Pagination';
import './UsersList.css';
import { fetchUsers } from '../../api/fetchUsers';
import { usePaginatedData } from '@/hooks';

export default function UsersList() {
	const navigate = useNavigate();

	const fetchFunction = useMemo(() => (page: number) => fetchUsers({ page }), []);

	const { data: users, isLoading, currentPage, totalPages, goToPage } = usePaginatedData({
		fetchFunction,
		initialPage: 1,
	});

	const getRoleDisplayName = useCallback((role: string) => {
		return role.charAt(0).toUpperCase() + role.slice(1);
	}, []);

	const handleUserClick = useCallback((userId: string) => {
		navigate(`/users/${userId}`);
	}, [navigate]);

	return (
		<div className="users-list">
			{isLoading ? (
				<LoadingSpinner text="Loading users..." />
			) : (
				<>
					<h2>Users ({users.length})</h2>

					<div className="users-table-container">
						<table className="users-table">
							<thead>
								<tr>
									<th>ID</th>
									<th>Username</th>
									<th>Role</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => (
									<tr key={user.id} onClick={() => handleUserClick(user.id)} className="user-row">
										<td>{user.id}</td>
										<td>{user.username}</td>
										<td>
											<span className={`role-badge role-${user.role}`}>
												{getRoleDisplayName(user.role)}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{totalPages > 1 && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={goToPage}
						/>
					)}
				</>
			)}
		</div>
	);
}
