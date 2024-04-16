import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType, LoginPayload, LoginSuccessPayload, LoginFailurePayload, RegisterFailurePayload, LogoutFailurePayload } from './types';

interface AuthState {
    token: string | null;
    error: string | null;
    loading: boolean;
}

const initialState: AuthState = {
    token: null,
    error: null,
    loading: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<LoginSuccessPayload>) => {
            state.token = action.payload;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<LoginFailurePayload>) => {
            state.error = action.payload;
        },
        registerSuccess: (state) => {
            state.loading = false;
        },
        registerFailure: (state, action: PayloadAction<RegisterFailurePayload>) => {
            state.loading = false;
            state.error = action.payload;
        },
        logoutSuccess: (state) => {
            console.log(state)
            state.token = '',
            state.loading = false;
            console.log(state)
        },
        logoutFailure: (state, action: PayloadAction<LogoutFailurePayload>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Define reducers for registration success and failure if needed
    },
});

export const { loginSuccess, loginFailure, registerSuccess, registerFailure, logoutSuccess, logoutFailure } = authSlice.actions;


export default authSlice.reducer;