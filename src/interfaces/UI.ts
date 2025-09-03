import React from 'react';
import { SignInPayload } from './Auth';

export interface SvgProps {
	width?: number;
	height?: number;
	fill?: string;
	className?: string;
	color?: string;
}

export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title?: string;
    closeOnOverlay?: boolean;
    className?: string;
}

export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	className?: string;
}

export interface HeaderProps {
	onOpenSignIn: () => void;
	onOpenRegister?: () => void;
}

export interface SignInModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (payload: SignInPayload) => void | Promise<void>;
	onOpenSignIn?: () => void;
}

export interface RegisterModalProps {
	isOpen: boolean;
	onClose: () => void;
	onOpenSignIn: () => void;
	onSuccess: () => void;
}

export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	className?: string;
}

export interface RequireAuthProps {
	children: React.ReactNode;
	onOpenSignIn: () => void;
}

export interface LoadingStateProps {
	isLoading: boolean;
	error: string | null;
	children: React.ReactNode;
	onRetry?: () => void;
	loadingText?: string;
	emptyText?: string;
}

export interface LoadingSpinnerProps {
	text?: string;
	size?: 'small' | 'medium' | 'large';
	className?: string;
}

export interface SnippetFooterPropsWithCallback {
	snippet: {
		id: string;
		marks?: Array<{
			type: 'like' | 'dislike' | 'none';
			user: { id: string };
		}>;
		comments?: Array<unknown>;
	};
	onMarkUpdate?: (snippetId: string, markType: 'like' | 'dislike' | 'none') => void;
}
