import React from 'react';
import PaginationArrow from '@/svg/PaginationArrow';
import './Pagination.css';
import { PaginationProps } from '@/interfaces';

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	className = '',
}: PaginationProps) {
	const canGoPrev = currentPage > 1;
	const canGoNext = currentPage < totalPages;

	const isValidPage = (v: number) =>
		Number.isInteger(v) && v >= 1 && v <= totalPages;

	const commitPage = (v: number) => {
		if (!Number.isNaN(v) && isValidPage(v) && v !== currentPage) {
			onPageChange(v);
		}
	};

	const handlePrevPage = () => {
		if (canGoPrev) {
			commitPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (canGoNext) {
			commitPage(currentPage + 1);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		if (isValidPage(value)) {
			commitPage(value);
		}
	};

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			const value = Number(e.currentTarget.value);
			commitPage(value);
		}
	};

	return (
		<div className={`pagination ${className}`}>
			<button
				className="pagination-button pagination-left-button"
				onClick={handlePrevPage}
				disabled={!canGoPrev}
			>
				<PaginationArrow width={15} height={20} />
			</button>

			<input
				className="pagination-page-number-input"
				type="number"
				min={1}
				max={totalPages}
				value={currentPage}
				onChange={handleInputChange}
				onKeyDown={handleInputKeyDown}
			/>

			<span className="pagination-total">из {totalPages}</span>

			<button
				className="pagination-button pagination-right-button"
				onClick={handleNextPage}
				disabled={!canGoNext}
			>
				<PaginationArrow width={15} height={20} />
			</button>
		</div>
	);
}
