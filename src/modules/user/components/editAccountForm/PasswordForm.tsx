import React, { useCallback } from 'react';
import CustomInput from '@/ui/customInput/CustomInput';
import { PasswordFormProps } from '@/interfaces/User';

export default function PasswordForm({
	oldPassword,
	setOldPassword,
	newPassword,
	setNewPassword,
	confirmPassword,
	setConfirmPassword,
	isLoading,
	error,
	success,
	onSubmit,
}: PasswordFormProps) {
	const handleSubmit = useCallback((e: React.FormEvent) => {
		e.preventDefault();
		onSubmit();
	}, [onSubmit]);

	return (
		<div className="edit-section">
			<h3>Change your password:</h3>
			<form onSubmit={handleSubmit}>
				<CustomInput
					placeholder="Old password"
					type="password"
					value={oldPassword}
					onChange={e => setOldPassword(e.target.value)}
				/>
				<CustomInput
					placeholder="New password"
					type="password"
					value={newPassword}
					onChange={e => setNewPassword(e.target.value)}
				/>
				<CustomInput
					placeholder="Confirm password"
					type="password"
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
				/>
				{error && <p className="error-message">{error}</p>}
				{success && <p className="success-message">{success}</p>}
				<button type="submit" className="btn-save" disabled={isLoading}>
					{isLoading ? 'CHANGING...' : 'CHANGE PASSWORD'}
				</button>
			</form>
		</div>
	);
}
