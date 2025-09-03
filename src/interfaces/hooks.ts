import { ApiResponse } from './api';

export interface UsePaginatedDataOptions<T> {
	fetchFunction: (page: number) => Promise<ApiResponse<T>>;
	initialPage?: number;
}

export interface UseFormReturn<T> {
	data: T;
	setData: (data: T) => void;
	updateField: <K extends keyof T>(field: K, value: T[K]) => void;
	reset: () => void;
}
