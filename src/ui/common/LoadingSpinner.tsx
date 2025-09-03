import React from 'react';
import { LoadingSpinnerProps } from '@/interfaces/UI';
import './LoadingSpinner.css';

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
	text = 'Loading...',
	className = '',
}) => {
	return (
		<div className={`loading-spinner-container ${className}`}>
			<div className="loading-spinner"></div>
			<p className="loading-text">{text}</p>
		</div>
	);
};
