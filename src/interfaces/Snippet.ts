import { BaseUser, PaginatedResponse } from './Base';

export interface UserSnippet {
	id: string;
	code: string;
	language: string;
	marks: MarkDto[];
	user: BaseUser;
	comments: CommentDto[];
}

export interface CreateSnippetPayload {
	code: string;
	language: string;
}

export interface Language {
	name: string;
}

export interface SnippetPostProps {
	snippetId: string | number;
	snippet?: SnippetDto;
}

export interface MarkDto {
	id: string;
	type: 'like' | 'dislike' | 'none';
	user: BaseUser;
}

export interface SnippetDto {
	id: string;
	code: string;
	language: string;
	marks: MarkDto[];
	user: BaseUser;
	comments: CommentDto[];
}

export interface CommentDto {
	id: string;
	content: string;
}

export type PaginatedSnippetsResponse = PaginatedResponse<SnippetDto>;

export interface SnippetProps {
	snippet: SnippetDto;
	onClick?: () => void;
	onMarkUpdate?: (snippetId: string, markType: 'like' | 'dislike' | 'none') => void;
}

export interface SnippetHeaderProps {
	snippet: SnippetDto;
}

export interface SnippetBodyProps {
	snippet: SnippetDto;
}

export interface SnippetFooterProps {
	snippet: SnippetDto;
}

export interface SnippetsListProps {
	currentPage?: number;
	onTotalPagesChange?: (totalPages: number) => void;
}
