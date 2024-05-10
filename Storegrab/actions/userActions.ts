export const loginRequest = (email: any, password: any) => ({
    type: 'LOGIN_REQUEST',
    payload: { email, password },
});

export const loginSuccess = (token: any) => ({
    type: 'LOGIN_SUCCESS',
    payload: token,
});

export const loginFailure = (error: any) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
});

export const registerRequest = (username:any, email: any, password: any) => ({
    type: 'REGISTER_REQUEST',
    payload: { username, email, password },
});

export const registerSuccess = () => ({
    type: 'REGISTER_SUCCESS',
});

export const registerFailure = (error: any) => ({
    type: 'REGISTER_FAILURE',
    payload: error,
});

export const logoutRequest = () => ({
    type: 'LOGOUT_REQUEST'
});

// Password Reset

export const sendOTPRequest = (email: any) => ({
    type: 'OTP_REQUEST',
    payload: { email },
});

export const verifyOTPRequest = (email: any, enteredOTP: any) => ({
    type: 'VERIFY_OTP_REQUEST',
    payload: { email, enteredOTP },
});

export const resetPasswordRequest = (email: any, newPassword:any, token:any) => ({
    type: 'PASSWORD_RESET_REQUEST',
    payload: { email, newPassword, token },
});