import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
	registerUser,
	loginUser,
	logoutUser,
	getUserData,
	updateUserData,
} from './api';
import { AuthResponse, LogoutResponse, User } from '../utils/types';

interface AuthState {
	isAuthenticated: boolean;
	loading: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
	accessToken: string | null;
	refreshToken: string | null;
	user: User | null;
	initialUser: User | null;
}

type RootState = {
	auth: AuthState;
};

export const initialState: AuthState = {
	isAuthenticated: !!localStorage.getItem('accessToken'),
	loading: 'idle',
	error: null,
	accessToken: localStorage.getItem('accessToken'),
	refreshToken: localStorage.getItem('refreshToken'),
	user: null,
	initialUser: null,
};

export const registerRequest = createAsyncThunk<
	AuthResponse,
	{ email: string; password: string; name: string },
	{ rejectValue: string }
>(
	'auth/register',
	async ({
		email,
		password,
		name,
	}: {
		email: string;
		password: string;
		name: string;
	}) => {
		const data = await registerUser(email, password, name);
		return data;
	}
);

export const loginRequest = createAsyncThunk<
	AuthResponse,
	{ email: string; password: string },
	{ rejectValue: string }
>(
	'auth/login',
	async ({ email, password }: { email: string; password: string }) => {
		const data = await loginUser(email, password);
		localStorage.setItem('refreshToken', data.refreshToken);
		localStorage.setItem('accessToken', data.accessToken);
		return data;
	}
);

export const getUserDataRequest = createAsyncThunk<
	User,
	void,
	{ state: RootState; rejectValue: string }
>('auth/getUserData', async (_, thunkAPI) => {
	const state = thunkAPI.getState();
	const accessToken =
		state.auth.accessToken || localStorage.getItem('accessToken');

	if (!accessToken) {
		return thunkAPI.rejectWithValue('No access token found');
	}

	const response = await getUserData(accessToken);
	return response.user;
});

export const updateUserDataRequest = createAsyncThunk<
	User,
	{ name: string; email: string },
	{ state: RootState; rejectValue: string }
>(
	'auth/updateUserData',
	async (userData: { name: string; email: string }, thunkAPI) => {
		const state = thunkAPI.getState();
		const accessToken =
			state.auth.accessToken || localStorage.getItem('accessToken');

		if (!accessToken) {
			return thunkAPI.rejectWithValue('No access token found');
		}

		const response = await updateUserData(accessToken, userData);
		return response.user;
	}
);

export const logoutRequest = createAsyncThunk<
	LogoutResponse,
	void,
	{ rejectValue: string }
>('auth/logout', async () => {
	const data = await logoutUser();
	localStorage.removeItem('refreshToken');
	localStorage.removeItem('accessToken');
	return data;
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerRequest.pending, (state) => {
				state.loading = 'loading';
				state.error = null;
			})
			.addCase(registerRequest.fulfilled, (state) => {
				state.loading = 'succeeded';
				state.isAuthenticated = true;
			})
			.addCase(
				registerRequest.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					state.loading = 'failed';
					state.error = action.payload || 'Ошибка регистрации';
				}
			)
			.addCase(loginRequest.pending, (state) => {
				state.loading = 'loading';
				state.error = null;
			})
			.addCase(
				loginRequest.fulfilled,
				(state, action: PayloadAction<AuthResponse>) => {
					state.loading = 'succeeded';
					state.isAuthenticated = true;
					state.accessToken = action.payload.accessToken;
					state.refreshToken = action.payload.refreshToken;
				}
			)
			.addCase(
				loginRequest.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					state.loading = 'failed';
					state.error = action.payload || 'Ошибка входа';
				}
			)
			.addCase(logoutRequest.pending, (state) => {
				state.loading = 'loading';
				state.error = null;
			})
			.addCase(logoutRequest.fulfilled, (state) => {
				state.loading = 'succeeded';
				state.isAuthenticated = false;
				state.accessToken = null;
				state.refreshToken = null;
			})
			.addCase(
				logoutRequest.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					state.loading = 'failed';
					state.error = action.payload || 'Ошибка выхода';
				}
			)
			.addCase(getUserDataRequest.pending, (state) => {
				state.loading = 'loading';
				state.error = null;
			})
			.addCase(getUserDataRequest.fulfilled, (state, action) => {
				state.loading = 'succeeded';
				state.isAuthenticated = true;
				state.error = null;
				state.user = action.payload;
				state.initialUser = action.payload;
			})
			.addCase(
				getUserDataRequest.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					state.loading = 'failed';
					state.error =
						action.payload || 'Ошибка получения данных пользователя';
				}
			)
			.addCase(updateUserDataRequest.pending, (state) => {
				state.loading = 'loading';
				state.error = null;
			})
			.addCase(updateUserDataRequest.fulfilled, (state, action) => {
				state.loading = 'succeeded';
				state.user = action.payload;
				state.error = null;
			})
			.addCase(
				updateUserDataRequest.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					state.loading = 'failed';
					state.error =
						action.payload || 'Ошибка обновления данных пользователя';
				}
			);
	},
});

export default authSlice.reducer;
