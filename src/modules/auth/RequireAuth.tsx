import React, { useEffect } from 'react';
import { useLoginState } from '@/store/hooks';
import { RequireAuthProps } from '@/interfaces/UI';
import { LoadingSpinner } from '@/ui/common';

export default function RequireAuth({ children, onOpenSignIn }: RequireAuthProps) {
	const isAuthenticated = useLoginState();

	useEffect(() => {
		if (!isAuthenticated) {
			onOpenSignIn();
		}
	}, [isAuthenticated, onOpenSignIn]);

	if (!isAuthenticated) {
		return (
			<div className="require-auth-loading">
				<LoadingSpinner text="Authenticating..." />
			</div>
		);
	}

	return <>{children}</>;
}
