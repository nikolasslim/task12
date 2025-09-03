import React from 'react';
import './EditAccountForm.css';
import { useEditAccount } from '@/hooks';
import UsernameForm from './UsernameForm';
import PasswordForm from './PasswordForm';

export default function EditAccountForm() {
	const {
		currentUser,
		newUsername,
		setNewUsername,
		isLoading,
		error,
		success,
		oldPassword,
		setOldPassword,
		newPassword,
		setNewPassword,
		confirmPassword,
		setConfirmPassword,
		isPasswordLoading,
		passwordError,
		passwordSuccess,
		handleUsernameChange,
		handlePasswordChange,
	} = useEditAccount();

	return (
		<div className="edit-account-container">
			<h3 className="form-title">Edit your profile:</h3>

			<div className="form-sections">
				<UsernameForm
					currentUsername={currentUser.username}
					newUsername={newUsername}
					setNewUsername={setNewUsername}
					isLoading={isLoading}
					error={error}
					success={success}
					onSubmit={handleUsernameChange}
				/>

				<PasswordForm
					oldPassword={oldPassword}
					setOldPassword={setOldPassword}
					newPassword={newPassword}
					setNewPassword={setNewPassword}
					confirmPassword={confirmPassword}
					setConfirmPassword={setConfirmPassword}
					isLoading={isPasswordLoading}
					error={passwordError}
					success={passwordSuccess}
					onSubmit={handlePasswordChange}
				/>
			</div>
		</div>
	);
}
