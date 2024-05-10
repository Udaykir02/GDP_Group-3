import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType, LoginPayload, LoginSuccessPayload, LoginFailurePayload, RegisterFailurePayload, LogoutFailurePayload, VerifyOtpSuccessPayload } from './types';

interface AuthState {
    token: string | null;
    error: string | null;
    loading: boolean;
    resetToken: string | null;
}

const initialState: AuthState = {
    token: null,
    error: null,
    loading: false,
    resetToken: null
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
            state.token = '';
            state.loading = false;
        },
        logoutFailure: (state, action: PayloadAction<LogoutFailurePayload>) => {
            state.loading = false;
            state.error = action.payload;
        },
        sendOTPSuccess: state => {
            state.loading = false;
            state.error = null;
        },
        sendOTPFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        verifyOTPSuccess: (state,action: PayloadAction<VerifyOtpSuccessPayload>) => {
            state.resetToken = action.payload;
            state.loading = false;
            state.error = null;
        },
        verifyOTPFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetPasswordSuccess: state => {
            state.loading = false;
            state.error = null;
        },
        resetPasswordFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Define reducers for registration success and failure if needed
    },
});

export const { loginSuccess, loginFailure, registerSuccess, registerFailure, logoutSuccess, logoutFailure, sendOTPSuccess, sendOTPFailure, verifyOTPSuccess, verifyOTPFailure, resetPasswordSuccess, resetPasswordFailure } = authSlice.actions;


export default authSlice.reducer;