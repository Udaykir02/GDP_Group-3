// Define the type for the user data received from the server
export interface UserType {
    token: string;
    // Add other user properties if needed
}

// Define the type for the login action payload
export interface LoginPayload {
    email: string;
    password: string;
}

// Define the type for the login success action payload
export type LoginSuccessPayload = string; // Token is a string

// Define the type for the login failure action payload
export type LoginFailurePayload = string; // Error message is a string

export type RegisterFailurePayload = string

export type LogoutFailurePayload = string