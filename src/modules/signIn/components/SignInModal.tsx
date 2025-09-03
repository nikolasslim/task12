import React, { useState } from 'react';
import Modal from '@/ui/modal/Modal';
import CustomInput from '@/ui/customInput/CustomInput';
import './SignInModal.css';
import RegisterModal from '@/modules/register/components/RegisterModal';
import { SignInModalProps } from '@/interfaces/UI';

export default function SignInModal({ isOpen, onClose, onSubmit, onOpenSignIn }: SignInModalProps) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isRegisterOpen, setIsRegisterOpen] = useState(false);
	const [formError, setFormError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!username || !password) return;

		setIsLoading(true);
		setFormError('');

		try {
			await onSubmit({ username, password });
			onClose();
		} catch {
			setFormError('Failed to sign in. Check your credentials.');
		} finally {
			setIsLoading(false);
		}
	};

	const openRegister = () => {
		onClose();
		setIsRegisterOpen(true);
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<h3 className="modal-title">Sign In</h3>
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
					<button type="button" className="link-button" onClick={openRegister}>
						No account? Register
					</button>
					{formError && <div className="custom-input-error form-error">{formError}</div>}
					<div className="modal-actions">
						<button type="button" className="nav-button" onClick={onClose} disabled={isLoading}>
							Cancel
						</button>
						<button type="submit" className="nav-button nav-button-primary" disabled={isLoading}>
							{isLoading ? 'Signing in...' : 'Sign In'}
						</button>
					</div>
				</form>
			</Modal>

			<RegisterModal
				isOpen={isRegisterOpen}
				onClose={() => setIsRegisterOpen(false)}
				onOpenSignIn={onOpenSignIn}
			/>
		</>
	);
}
