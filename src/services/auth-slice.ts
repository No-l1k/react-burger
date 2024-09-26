import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const AUTH_API_URL = 'https://norma.nomoreparties.space';

interface AuthState {
	isAuthenticated: boolean;
	resetPasswordStatus: 'idle' | 'loading' | 'success' | 'failed';
	error: string | null;
}

const initialState: AuthState = {
	isAuthenticated: false,
	resetPasswordStatus: 'idle',
	error: null,
};

export const resetPasswordRequest = createAsyncThunk(
	'auth/resetPassword',
	async (email: string) => {
		try {
			const response = await fetch(`${AUTH_API_URL}/api/password-reset`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});

			const data = await response.json();

			return data;
		} catch (error) {
			console.error('Ошибка при сбросе пароля:', error);
			throw error;
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(resetPasswordRequest.pending, (state) => {
				state.resetPasswordStatus = 'loading';
				state.error = null;
			})
			.addCase(resetPasswordRequest.fulfilled, (state) => {
				state.resetPasswordStatus = 'success';
			})
			.addCase(resetPasswordRequest.rejected, (state, action) => {
				state.resetPasswordStatus = 'failed';
				state.error = action.error.message || 'Ошибка при запросе';
			});
	},
});

export default authSlice.reducer;
