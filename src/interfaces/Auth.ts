import React from 'react';
import { BaseUser } from './Base';

export interface SignInPayload {
	username: string;
	password: string;
}

export interface AuthSuccessResponse {
	data: BaseUser;
	message: string;
}

export interface RegisterPayload {
	username: string;
	password: string;
	confirm: string;
}

export interface AuthInitializerProps {
	children: React.ReactNode;
}

export interface RegisterModalPropsWithSignIn {
	isOpen: boolean;
	onClose: () => void;
	onOpenSignIn?: () => void;
}

