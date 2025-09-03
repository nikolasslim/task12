import React, { useState } from 'react';
import Modal from '@/ui/modal/Modal';
import CustomInput from '@/ui/customInput/CustomInput';

import { RegisterModalPropsWithSignIn } from '@/interfaces/Auth';
import './RegisterModal.css';
import { register } from '@/modules/register/api/register';

export default function RegisterModal({
	isOpen,
	onClose,
	onOpenSignIn,
}: RegisterModalPropsWithSignIn) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [formError, setFormError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!username || !password || !confirmPassword) return;
		if (password !== confirmPassword) return;

		setIsLoading(true);
		setFormError('');

		try {
			await register({ username, password, confirm: confirmPassword });
			onClose();
			onOpenSignIn?.();
		} catch {
			setFormError('Failed to register');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<h3 className="modal-title">Registration</h3>
			<form onSubmit={handleSubmit}>
				<CustomInput
					label="Login"
					type="text"
					value={username}
					onChange={e => setUsername(e.target.value)}
					required
				/>
				<CustomInput
					label="Password"
					type="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>
				<CustomInput
					label="Repeat password"
					type="password"
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
					required
				/>
				{formError && <div className="custom-input-error form-error">{formError}</div>}
				<div className="modal-actions">
					<button type="button" className="nav-button" onClick={onClose} disabled={isLoading}>
						Отмена
					</button>
					<button type="submit" className="nav-button nav-button-primary" disabled={isLoading}>
						{isLoading ? 'sending...' : 'Register'}
					</button>
				</div>
			</form>
		</Modal>
	);
}
