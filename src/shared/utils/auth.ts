import { User } from '@/interfaces/User';

const USER_STORAGE_KEY = 'user';
const AUTH_STORAGE_KEY = 'isAuthenticated';

export const authUtils = {
	saveUser: (user: User) => {
		localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
		localStorage.setItem(AUTH_STORAGE_KEY, 'true');
	},

	getUser: (): User | null => {
		try {
			const userData = localStorage.getItem(USER_STORAGE_KEY);
			const isAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY);

			if (userData && isAuthenticated === 'true') {
				return JSON.parse(userData);
			}
			return null;
		} catch {
			return null;
		}
	},

	isAuthenticated: (): boolean => {
		return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
	},

	clearAuth: () => {
		localStorage.removeItem(USER_STORAGE_KEY);
		localStorage.removeItem(AUTH_STORAGE_KEY);
	},
};
