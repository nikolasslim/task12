import { BaseUser, PaginationMeta, PaginationLinks } from './Base';

export type User = BaseUser;

export interface UserStatistic {
	snippetsCount: number;
	rating: number;
	commentsCount: number;
	likesCount: number;
	dislikesCount: number;
	questionsCount: number;
	correctAnswersCount: number;
	regularAnswersCount: number;
}

export interface UserWithStatistic extends BaseUser {
	statistic?: UserStatistic;
}

export type UserWithStatistics = UserWithStatistic;

export type CurrentUserInfo = User;

export interface UsersResponse {
	data: User[];
	meta: PaginationMeta;
	links: PaginationLinks;
}

export interface FetchUsersParams {
	page?: number;
	limit?: number;
}

export interface UpdatePasswordPayload {
	oldPassword: string;
	newPassword: string;
}

export interface UpdatePasswordResponse {
	message: string;
}

export interface UpdateProfilePayload {
	username: string;
}

export interface EditAccountFormProps {
	className?: string;
}

export interface UsernameFormProps {
	currentUsername: string;
	newUsername: string;
	setNewUsername: (value: string) => void;
	isLoading: boolean;
	error: string;
	success: string;
	onSubmit: () => void;
}

export interface PasswordFormProps {
	oldPassword: string;
	setOldPassword: (value: string) => void;
	newPassword: string;
	setNewPassword: (value: string) => void;
	confirmPassword: string;
	setConfirmPassword: (value: string) => void;
	isLoading: boolean;
	error: string;
	success: string;
	onSubmit: () => void;
}
