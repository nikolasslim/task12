import { useState, useCallback } from 'react';
import { UseFormReturn } from '@/interfaces/hooks';

export function useForm<T>(initialData: T): UseFormReturn<T> {
	const [data, setData] = useState<T>(initialData);

	const updateField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
		setData(prev => ({ ...prev, [field]: value }));
	}, []);

	const reset = useCallback(() => {
		setData(initialData);
	}, [initialData]);

	return {
		data,
		setData,
		updateField,
		reset,
	};
}
