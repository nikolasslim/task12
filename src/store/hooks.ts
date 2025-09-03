import { useSelector, useDispatch } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useLoginState = () => {
	const authState = useAppSelector((state: RootState) => state.authState.value);
	return authState;
};

export const useUserInfo = () => {
	const userInfo = useAppSelector((state: RootState) => state.userState);
	return userInfo;
};
