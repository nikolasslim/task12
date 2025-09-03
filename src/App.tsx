import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@/routes';
import { AuthInitializer } from '@/modules/auth/components/AuthInitializer';

export function App() {
	return (
		<BrowserRouter>
			<AuthInitializer>
				<AppRoutes />
			</AuthInitializer>
		</BrowserRouter>
	);
}
