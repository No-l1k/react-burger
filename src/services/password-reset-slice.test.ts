import passwordResetReducer, {
    resetPasswordRequest,
    resetPasswordWithTokenRequest,initialState
} from './password-reset-slice';

describe('passwordResetSlice reducer', () => {


    it('should return the initial state', () => {
        expect(passwordResetReducer(undefined, { type: '' })).toEqual(initialState);
    });

    describe('resetPasswordRequest async thunk', () => {
        it('should handle resetPasswordRequest.pending', () => {
            const state = passwordResetReducer(initialState, { type: resetPasswordRequest.pending.type });
            expect(state).toEqual({ status: 'loading', error: null });
        });

        it('should handle resetPasswordRequest.fulfilled', () => {
            const state = passwordResetReducer(initialState, { type: resetPasswordRequest.fulfilled.type });
            expect(state).toEqual({ status: 'succeeded', error: null });
        });

        it('should handle resetPasswordRequest.rejected', () => {
            const state = passwordResetReducer(initialState, {
                type: resetPasswordRequest.rejected.type,
                payload: 'Ошибка сброса пароля',
            });
            expect(state).toEqual({ status: 'failed', error: 'Ошибка сброса пароля' });
        });
    });

    describe('resetPasswordWithTokenRequest async thunk', () => {
        it('should handle resetPasswordWithTokenRequest.pending', () => {
            const state = passwordResetReducer(initialState, { type: resetPasswordWithTokenRequest.pending.type });
            expect(state).toEqual({ status: 'loading', error: null });
        });

        it('should handle resetPasswordWithTokenRequest.fulfilled', () => {
            const state = passwordResetReducer(initialState, { type: resetPasswordWithTokenRequest.fulfilled.type });
            expect(state).toEqual({ status: 'succeeded', error: null });
        });

        it('should handle resetPasswordWithTokenRequest.rejected', () => {
            const state = passwordResetReducer(initialState, {
                type: resetPasswordWithTokenRequest.rejected.type,
                payload: 'Ошибка сброса пароля',
            });
            expect(state).toEqual({ status: 'failed', error: 'Ошибка сброса пароля' });
        });
    });
});