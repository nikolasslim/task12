import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { LoadingStateProps } from '@/interfaces/UI';
import './LoadingState.css';

export const LoadingState: React.FC<LoadingStateProps> = ({
	isLoading,
	error,
	children,
	onRetry,
	loadingText = 'Loading...',
}) => {
	if (isLoading) {
		return <LoadingSpinner text={loadingText} />;
	}

	if (error) {
		return (
			<div className="error-container">
				<p className="error-message">{error}</p>
				{onRetry && (
					<button onClick={onRetry} className="retry-button">
						Try Again
					</button>
				)}
			</div>
		);
	}

	return <>{children}</>;
};
