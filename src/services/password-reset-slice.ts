import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { resetPassword, resetPasswordWithToken } from './api';

interface PasswordResetState {
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: PasswordResetState = {
	status: 'idle',
	error: null,
};

export const resetPasswordRequest = createAsyncThunk(
	'password/reset',
	async (email: string) => {
		const data = await resetPassword(email);
		return data;
	}
);

export const resetPasswordWithTokenRequest = createAsyncThunk(
	'password/resetWithToken',
	async ({ password, token }: { password: string; token: string }) => {
		const data = await resetPasswordWithToken(password, token);
		return data;
	}
);

const passwordResetSlice = createSlice({
	name: 'passwordReset',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(resetPasswordRequest.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(resetPasswordRequest.fulfilled, (state) => {
				state.status = 'succeeded';
			})
			.addCase(resetPasswordRequest.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			})
			.addCase(resetPasswordWithTokenRequest.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(resetPasswordWithTokenRequest.fulfilled, (state) => {
				state.status = 'succeeded';
			})
			.addCase(resetPasswordWithTokenRequest.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});
	},
});

export default passwordResetSlice.reducer;
