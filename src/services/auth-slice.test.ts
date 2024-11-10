import authReducer, {
    registerRequest,
    loginRequest,
    logoutRequest,
    getUserDataRequest,
    updateUserDataRequest,
    initialState,
} from './auth-slice';

describe('authSlice reducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, { type: "" })).toEqual(initialState);
    });

    describe('registerRequest async thunk', () => {
        it('should handle registerRequest.pending', () => {
            const state = authReducer(initialState, { type: registerRequest.pending.type });
            expect(state).toEqual({ ...initialState, loading: 'loading' });
        });

        it('should handle registerRequest.fulfilled', () => {
            const state = authReducer(initialState, { type: registerRequest.fulfilled.type });
            expect(state).toEqual({ ...initialState, loading: 'succeeded', isAuthenticated: true });
        });

        it('should handle registerRequest.rejected', () => {
            const state = authReducer(initialState, {
                type: registerRequest.rejected.type,
                payload: 'Ошибка регистрации',
            });
            expect(state).toEqual({ ...initialState, loading: 'failed', error: 'Ошибка регистрации' });
        });
    });

    describe('loginRequest async thunk', () => {
        it('should handle loginRequest.pending', () => {
            const state = authReducer(initialState, { type: loginRequest.pending.type });
            expect(state).toEqual({ ...initialState, loading: 'loading' });
        });

        it('should handle loginRequest.fulfilled', () => {
            const mockAuthResponse = { accessToken: 'mockAccessToken', refreshToken: 'mockRefreshToken' };
            const state = authReducer(initialState, {
                type: loginRequest.fulfilled.type,
                payload: mockAuthResponse,
            });
            expect(state).toEqual({
                ...initialState,
                loading: 'succeeded',
                isAuthenticated: true,
                accessToken: mockAuthResponse.accessToken,
                refreshToken: mockAuthResponse.refreshToken,
            });
        });

        it('should handle loginRequest.rejected', () => {
            const state = authReducer(initialState, {
                type: loginRequest.rejected.type,
                payload: 'Ошибка входа',
            });
            expect(state).toEqual({ ...initialState, loading: 'failed', error: 'Ошибка входа' });
        });
    });

    describe('logoutRequest async thunk', () => {
        it('should handle logoutRequest.pending', () => {
            const state = authReducer(initialState, { type: logoutRequest.pending.type });
            expect(state).toEqual({ ...initialState, loading: 'loading' });
        });

        it('should handle logoutRequest.fulfilled', () => {
            const modifiedState = {
                ...initialState,
                isAuthenticated: true,
                accessToken: 'mockAccessToken',
                refreshToken: 'mockRefreshToken',
            };
            const state = authReducer(modifiedState, { type: logoutRequest.fulfilled.type });
            expect(state).toEqual({ ...initialState, loading: 'succeeded' });
        });

        it('should handle logoutRequest.rejected', () => {
            const state = authReducer(initialState, {
                type: logoutRequest.rejected.type,
                payload: 'Ошибка выхода',
            });
            expect(state).toEqual({ ...initialState, loading: 'failed', error: 'Ошибка выхода' });
        });
    });

    describe('getUserDataRequest async thunk', () => {
        it('should handle getUserDataRequest.pending', () => {
            const state = authReducer(initialState, { type: getUserDataRequest.pending.type });
            expect(state).toEqual({ ...initialState, loading: 'loading' });
        });

        it('should handle getUserDataRequest.fulfilled', () => {
            const mockUser = { name: 'John Doe', email: 'john@example.com' };
            const state = authReducer(initialState, {
                type: getUserDataRequest.fulfilled.type,
                payload: mockUser,
            });
            expect(state).toEqual({
                ...initialState,
                loading: 'succeeded',
                isAuthenticated: true,
                user: mockUser,
                initialUser: mockUser,
            });
        });

        it('should handle getUserDataRequest.rejected', () => {
            const state = authReducer(initialState, {
                type: getUserDataRequest.rejected.type,
                payload: 'Ошибка получения данных пользователя',
            });
            expect(state).toEqual({
                ...initialState,
                loading: 'failed',
                error: 'Ошибка получения данных пользователя',
            });
        });
    });

    describe('updateUserDataRequest async thunk', () => {
        it('should handle updateUserDataRequest.pending', () => {
            const state = authReducer(initialState, { type: updateUserDataRequest.pending.type });
            expect(state).toEqual({ ...initialState, loading: 'loading' });
        });

        it('should handle updateUserDataRequest.fulfilled', () => {
            const updatedUser = { name: 'Jane Doe', email: 'jane@example.com' };
            const state = authReducer(initialState, {
                type: updateUserDataRequest.fulfilled.type,
                payload: updatedUser,
            });
            expect(state).toEqual({
                ...initialState,
                loading: 'succeeded',
                user: updatedUser,
            });
        });

        it('should handle updateUserDataRequest.rejected', () => {
            const state = authReducer(initialState, {
                type: updateUserDataRequest.rejected.type,
                payload: 'Ошибка обновления данных пользователя',
            });
            expect(state).toEqual({
                ...initialState,
                loading: 'failed',
                error: 'Ошибка обновления данных пользователя',
            });
        });
    });
});