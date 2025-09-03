import React, { useCallback } from 'react';
import CustomInput from '@/ui/customInput/CustomInput';
import { UsernameFormProps } from '@/interfaces/User';

export default function UsernameForm({
	currentUsername,
	newUsername,
	setNewUsername,
	isLoading,
	error,
	success,
	onSubmit,
}: UsernameFormProps) {
	const handleSubmit = useCallback((e: React.FormEvent) => {
		e.preventDefault();
		onSubmit();
	}, [onSubmit]);

	return (
		<div className="edit-section">
			<h3>Change your username:</h3>
			<p className="current-username">
				Current username: <strong>{currentUsername}</strong>
			</p>
			<form onSubmit={handleSubmit}>
				<CustomInput
					placeholder="New username"
					value={newUsername}
					onChange={e => setNewUsername(e.target.value)}
				/>
				{error && <p className="error-message">{error}</p>}
				{success && <p className="success-message">{success}</p>}
				<button type="submit" className="btn-save" disabled={isLoading}>
					{isLoading ? 'SAVING...' : 'SAVE'}
				</button>
			</form>
		</div>
	);
}
