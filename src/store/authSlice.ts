import { createSlice } from '@reduxjs/toolkit';

const authInitialState: { value: boolean } = {
	value: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState: authInitialState,

	reducers: {
		setAuthTrue: state => {
			state.value = true;
		},
		setAuthFalse: state => {
			state.value = false;
		},
	},
});

export const { setAuthFalse, setAuthTrue } = authSlice.actions;
export default authSlice.reducer;
