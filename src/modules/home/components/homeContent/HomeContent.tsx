import React, { useState } from 'react';
import Favicon from '@/svg/Favicon';
import Pagination from '@/ui/pagination/Pagination';
import SnippetsList from '@/modules/snippets/components/snippetsList/SnippetsList';
import './HomeContent.css';

export default function HomeContent() {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className="home-page">
			<h2>Welcome to codelang!</h2>
			<Favicon width={40} height={20} />
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
			<SnippetsList currentPage={currentPage} onTotalPagesChange={setTotalPages} />
		</div>
	);
}
