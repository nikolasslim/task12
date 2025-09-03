import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUserInfo } from '@/store/userSlice';
import { updateProfile } from '@/modules/user/api/updateProfile';
import { updatePassword } from '@/modules/user/api/updatePassword';

export function useEditAccount() {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector(state => state.userState);

	const [newUsername, setNewUsername] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isPasswordLoading, setIsPasswordLoading] = useState(false);
	const [passwordError, setPasswordError] = useState('');
	const [passwordSuccess, setPasswordSuccess] = useState('');

	const resetUsernameState = () => {
		setError('');
		setSuccess('');
		setNewUsername('');
	};

	const resetPasswordState = () => {
		setPasswordError('');
		setPasswordSuccess('');
		setOldPassword('');
		setNewPassword('');
		setConfirmPassword('');
	};

	const handleUsernameChange = async () => {
		if (!newUsername.trim()) {
			setError('Username cannot be empty');
			return;
		}

		if (newUsername === currentUser.username) {
			setError('New username must be different from current');
			return;
		}

		setIsLoading(true);
		resetUsernameState();

		try {
			const response = await updateProfile({ username: newUsername.trim() });
			dispatch(setUserInfo(response));
			setSuccess('Username updated successfully!');
		} catch {
			setError('Failed to update username');
		} finally {
			setIsLoading(false);
		}
	};

	const handlePasswordChange = async () => {
		if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
			setPasswordError('All password fields are required');
			return;
		}

		if (newPassword !== confirmPassword) {
			setPasswordError('New password and confirmation do not match');
			return;
		}

		if (newPassword.length < 6) {
			setPasswordError('New password must be at least 6 characters long');
			return;
		}

		setIsPasswordLoading(true);
		resetPasswordState();

		try {
			await updatePassword({
				oldPassword: oldPassword.trim(),
				newPassword: newPassword.trim(),
			});
			setPasswordSuccess('Password updated successfully!');
		} catch {
			setPasswordError('Failed to update password');
		} finally {
			setIsPasswordLoading(false);
		}
	};

	return {
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
	};
}
