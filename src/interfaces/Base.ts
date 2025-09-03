export interface BaseUser {
	id: string;
	username: string;
	role: string;
}

export interface PaginationMeta {
	itemsPerPage: number;
	totalItems: number;
	currentPage: number;
	totalPages: number;
	sortBy: string[][];
}

export interface PaginationLinks {
	current: string;
	next?: string;
	last: string;
}

export interface FetchParams {
	page?: number;
	limit?: number;
}

export interface PaginatedResponse<T> {
	data: T[];
	meta: PaginationMeta;
	links: PaginationLinks;
}

export interface BaseEntityResponse {
	id: string;
	createdAt: string;
	updatedAt: string;
}
