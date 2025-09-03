import { useCallback } from 'react';
import { useAppDispatch, useLoginState, useUserInfo } from '@/store/hooks';
import { setAuthTrue, setAuthFalse } from '@/store/authSlice';
import { setUserInfo, resetUserInfo } from '@/store/userSlice';
import { signIn as signInApi } from '@/modules/signIn/api/signIn';
import { logout as logoutApi } from '@/modules/signIn/api/logout';
import { SignInPayload } from '@/interfaces/Auth';
import { authUtils } from '@/shared/utils/auth';
import { DeleteCurrentProfile } from '@/modules/user/api/deleteCurrentProfile';

export function useAuth() {
	const dispatch = useAppDispatch();
	const isAuthenticated = useLoginState();
	const user = useUserInfo();

	const signIn = useCallback(
		async (payload: SignInPayload) => {
			const response = await signInApi(payload);

			if (response.data) {
				dispatch(setAuthTrue());
				dispatch(setUserInfo(response.data));
				authUtils.saveUser(response.data);
			}

			return response;
		},
		[dispatch]
	);

	const logout = useCallback(async () => {
		try {
			await logoutApi();
		} finally {
			dispatch(setAuthFalse());
			dispatch(resetUserInfo());
			authUtils.clearAuth();
		}
	}, [dispatch]);

	const deleteUser = useCallback(async () => {
		try {
			await DeleteCurrentProfile();
		} finally {
			dispatch(setAuthFalse());
			dispatch(resetUserInfo());
			authUtils.clearAuth();
		}
	}, [dispatch]);

	return {
		user,
		isAuthenticated,
		signIn,
		logout,
		deleteUser,
	};
}
