import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setAuthTrue, setAuthFalse } from '@/store/authSlice';
import { setUserInfo, resetUserInfo } from '@/store/userSlice';
import { fetchCurrentUserInfo } from '@/modules/user/api/fetchCurrentUserData';
import { authUtils } from '@/shared/utils/auth';
import { LoadingSpinner } from '@/ui/common';
import { AuthInitializerProps } from '@/interfaces/Auth';
import './AuthInitializer.css';

export const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
	const dispatch = useAppDispatch();
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		const initializeAuth = async () => {
			try {
				const storedUser = authUtils.getUser();

				if (storedUser && authUtils.isAuthenticated()) {
					dispatch(setAuthTrue());
					dispatch(setUserInfo(storedUser));
					setIsInitialized(true);
					return;
				}

				const userData = await fetchCurrentUserInfo();

				if (userData) {
					dispatch(setAuthTrue());
					dispatch(setUserInfo(userData));

					authUtils.saveUser(userData);
				} else {
					dispatch(setAuthFalse());
					dispatch(resetUserInfo());
				}
			} catch (error) {
				console.error('Auth initialization failed:', error);
				dispatch(setAuthFalse());
				dispatch(resetUserInfo());
			} finally {
				setIsInitialized(true);
			}
		};

		initializeAuth();
	}, [dispatch]);

	if (!isInitialized) {
		return (
			<div className="auth-initializer">
				<LoadingSpinner text="Initializing..." />
			</div>
		);
	}

	return <>{children}</>;
};
