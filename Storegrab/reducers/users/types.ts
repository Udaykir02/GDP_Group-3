// Define the type for the user data received from the server
export interface UserType {
    token: string;
    userData: UserData
    // Add other user properties if needed
}

// Define the type for the login action payload
export interface LoginPayload {
    email: string;
    password: string;
}

export type AddressType = {
    country: String,
    street1: String,
    street2: String,
    city: String,
    state: String,
    zip: String
};

export type UserCartType  = {
    skuId: String,
    item: String,
    price: Number,
    qty: Number,
    size: {
      h: Number,
      l: Number,
      w: Number
    },
    features: String,
    categories: [String],
    image: String,
    description: String,
    brand: String
  }

export type UserData = {
    userId?: string, email?: string,fname?: string, lname?: string, emailVerified?: boolean, address?: AddressType, vendors?: [string], notificationActive?: boolean, vendorpreferences?: [String], userRecomendations?: [String], cart?: [UserCartType] | null
}

// Define the type for the login success action payload
export type LoginSuccessPayload = {
    token: string;
    userData: UserData

}; // Token is a string

// Define the type for the login failure action payload
export type LoginFailurePayload = string; // Error message is a string

export type RegisterFailurePayload = string

export type LogoutFailurePayload = string

export type VerifyOtpSuccessPayload = string