import React, { useState, useEffect } from 'react';
import Header from '@/components/header/Header';
import Aside from '@/components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import { SignInModal } from '@/modules/signIn';
import { useAuth } from '@/hooks';
import { SignInPayload } from '@/interfaces/Auth';
import { useLoginState } from '@/store/hooks';
import './MainLayoutContent.css';

export default function MainLayoutContent() {
	const { signIn } = useAuth();
	const [isSignInOpen, setIsSignInOpen] = useState(false);
	const isAuthenticated = useLoginState();

	useEffect(() => {
		if (isAuthenticated) {
			setIsSignInOpen(false);
		}
	}, [isAuthenticated]);

	const handleSignIn = async (payload: SignInPayload) => {
		await signIn(payload);
	};

	return (
		<>
			<Header onOpenSignIn={() => setIsSignInOpen(true)} />
			<div className="app-body">
				<Aside />
				<main className="app-content">
					<Outlet context={{ onOpenSignIn: () => setIsSignInOpen(true) }} />
				</main>
			</div>
			<SignInModal
				isOpen={isSignInOpen}
				onClose={() => setIsSignInOpen(false)}
				onSubmit={handleSignIn}
			/>
		</>
	);
}
