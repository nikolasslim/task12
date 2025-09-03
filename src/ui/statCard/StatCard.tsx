import React from 'react';
import './StatCard.css';

interface StatCardProps {
	icon: string;
	title: string;
	value: number;
	formatValue?: (value: number) => string;
}

export default function StatCard({ icon, title, value, formatValue }: StatCardProps) {
	const displayValue = formatValue ? formatValue(value) : value.toLocaleString();

	return (
		<div className="stat-card">
			<div className="stat-icon">{icon}</div>
			<div className="stat-content">
				<h3>{title}</h3>
				<p className="stat-number">{displayValue}</p>
			</div>
		</div>
	);
}
