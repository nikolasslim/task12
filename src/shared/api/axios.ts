import axios from 'axios';

export const apiClient = axios.create({
	baseURL: '/api',
	headers: {
		Accept: 'application/json',
	},
	withCredentials: true,
});


apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		
		console.error('API Error:', error);
		
		
		
		return Promise.reject(error);
	}
);
