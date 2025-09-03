import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import userReducer from './userSlice';

const authPersistConfig = {
	key: 'auth',
	storage,
	whitelist: ['value'],
};

const userPersistConfig = {
	key: 'user',
	storage,
	whitelist: ['id', 'role', 'username'],
};

export const store = configureStore({
	reducer: {
		authState: persistReducer(authPersistConfig, authReducer),
		userState: persistReducer(userPersistConfig, userReducer),
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
			},
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
