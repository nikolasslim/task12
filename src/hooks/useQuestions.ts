import { useMemo } from 'react';
import { Question } from '@/interfaces/Question';
import { PaginationMeta } from '@/interfaces/Base';
import { fetchQuestions } from '@/modules/questions/api/fetchQuestions';
import { usePaginatedData } from './usePaginatedData';

export function useQuestions() {
	const fetchFunction = useMemo(() => (page: number) => fetchQuestions({ page }), []);

	const paginatedData = usePaginatedData({
		fetchFunction,
		initialPage: 1,
	});

	const questions = paginatedData.data;
	const meta = useMemo(() => {
		
		return questions.length > 0 ? {
			totalItems: questions.length,
			totalPages: paginatedData.totalPages,
			currentPage: paginatedData.currentPage,
			itemsPerPage: 10,
			sortBy: []
		} as PaginationMeta : null;
	}, [questions.length, paginatedData.totalPages, paginatedData.currentPage]);

	const resolvedCount = questions.filter(q => q.isResolved).length;
	const unresolvedCount = questions.length - resolvedCount;

	return {
		questions,
		meta,
		totalPages: paginatedData.totalPages,
		isLoading: paginatedData.isLoading,
		loadQuestions: paginatedData.goToPage,
		resolvedCount,
		unresolvedCount,
	};
}
