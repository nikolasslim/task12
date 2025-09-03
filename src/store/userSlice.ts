import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/interfaces/User';

const userInitialState: User = {
	id: '',
	role: '',
	username: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState: userInitialState,

	reducers: {
		setUserInfo: (state, action: PayloadAction<User>) => {
			state.id = action.payload.id;
			state.role = action.payload.role;
			state.username = action.payload.username;
		},
		resetUserInfo: state => {
			state.id = userInitialState.id;
			state.role = userInitialState.role;
			state.username = userInitialState.username;
		},
	},
});

export const { setUserInfo, resetUserInfo } = userSlice.actions;
export default userSlice.reducer;
