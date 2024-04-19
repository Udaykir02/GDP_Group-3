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
