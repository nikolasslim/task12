export interface ApiResponse<T> {
	data: {
		data: T[];
		meta: {
			itemsPerPage: number;
			totalItems: number;
			currentPage: number;
			totalPages: number;
			sortBy: string[][];
		};
		links: {
			current: string;
			next?: string;
			last: string;
		};
	};
}

export interface ApiSingleResponse<T> {
	data: T;
}

export interface UpdateSnippetResponse {
	id: string;
	code: string;
	language: string;
	createdAt: string;
	updatedAt: string;
}
