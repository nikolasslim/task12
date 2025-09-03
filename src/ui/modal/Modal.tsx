import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import { ModalProps } from '@/interfaces/UI';

export default function Modal({
	isOpen,
	onClose,
	children,
	closeOnOverlay = true,
	className = '',
	title,
}: ModalProps) {
	const previousOverflowRef = useRef<string | null>(null);
	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				onClose();
			}
		}

		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown);
			previousOverflowRef.current = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			if (previousOverflowRef.current !== null) {
				document.body.style.overflow = previousOverflowRef.current;
			} else {
				document.body.style.overflow = '';
			}
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const modalRoot = document.getElementById('modal-root');
	if (!modalRoot) return null;

	const content = (
		<div
			className="modal-overlay"
			onClick={closeOnOverlay ? onClose : undefined}
		>
			<div
				className={`modal-container ${className}`}
				onClick={e => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-label={title}
			>
				<button className="modal-close" onClick={onClose} aria-label="Close modal">
					×
				</button>
				{children}
			</div>
		</div>
	);

	return ReactDOM.createPortal(content, modalRoot);
}
