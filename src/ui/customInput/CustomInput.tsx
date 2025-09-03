import React from 'react';
import './CustomInput.css';
import { CustomInputProps } from '@/interfaces/UI';

export default function CustomInput({ label, error, className = '', ...props }: CustomInputProps) {
	return (
		<div className={`custom-input-wrapper ${className}`}>
			{label && <label className="custom-input-label">{label}</label>}
			<input className="custom-input" {...props} />
			{error && <div className="custom-input-error">{error}</div>}
		</div>
	);
}
