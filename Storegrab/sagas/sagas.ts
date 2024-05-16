import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { put, takeLatest, call } from "redux-saga/effects";
import { UserType } from "../reducers/users/types";
import { loginSuccess, loginFailure, registerSuccess, registerFailure, logoutSuccess, logoutFailure, sendOTPSuccess, sendOTPFailure, verifyOTPSuccess, verifyOTPFailure, resetPasswordSuccess, resetPasswordFailure, addToCartSuccess, addToCartFailure, renewTokenSuccess, renewTokenFailure } from "../reducers/users/slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {  loginRequest } from "../actions/userActions";
import { updateVendorProductsFailure, updateVendorProductsSuccess } from "../reducers/vendorReducer";



function* login(action: any) {
  try {
    const response: AxiosResponse<UserType> = yield call(axios.post, 'http://localhost:3000/api/login', {
      email: action.payload.email,
      password: action.payload.password,
    });
    const token = response.data.token;
    const userData = response.data.userData;
    yield AsyncStorage.setItem('auth_token', token);
    yield put(loginSuccess({token, userData}));
    // Navigate to home screen or perform any other action
  } catch (error) {
    yield put(loginFailure(JSON.stringify(error)));
  }
}

function* register(action: any) {
  try {
    yield call(axios.post, 'http://localhost:3000/api/register', {
      username: action.payload.username,
      email: action.payload.email,
      password: action.payload.password,
    });
    yield put(registerSuccess());
    // Optionally, you can automatically login the user after registration
    // yield call(login, { payload: action.payload });
  } catch (error) {
    yield put(registerFailure(JSON.stringify(error)));
  }
}

function* logout(action: any) {
  try {
    yield AsyncStorage.setItem('auth_token', '');
    yield put(logoutSuccess());
    // Optionally, you can automatically login the user after registration
    // yield call(login, { payload: action.payload });
  } catch (error:any) {
    yield put(logoutFailure(JSON.stringify(error.message)));
  }
}



// Saga function to handle sending OTP
function* handleSendOTP(action: any) {
  try {

    const { email } = action.payload;
    yield call(axios.post, `${process.env.BASE_URL}/api/reset`, {
      email: email,
    });
    yield put(sendOTPSuccess());
  } catch (error: any) {
    yield put(sendOTPFailure(error.message));
  }
}



// Saga function to handle verifying OTP
function* handleVerifyOTP(action: any) {
  try {

    const { email, enteredOTP } = action.payload;
    const response: AxiosResponse<UserType> = yield call(axios.post, `${process.env.BASE_URL}/api/verify`, {
      email: email,
      enteredOTP: enteredOTP,
    });
    const token = response.data.token;
    yield put(verifyOTPSuccess(token));
  } catch (error: any) {
    yield put(verifyOTPFailure(error.message));
  }
}

// Saga function to handle resetting password
function* handleResetPassword(action: any) {
  try {
    const { email, newPassword, token } = action.payload;
    yield call(axios.post, `${process.env.BASE_URL}/api/password-reset`, {
      email: email,
      newPassword: newPassword
    },{ headers: { Authorization: `${token}` } });
    yield put(resetPasswordSuccess());
  } catch (error: any) {
    yield put(resetPasswordFailure(error.message));
  }
}

//update vendor products saga
function* handleVendorProductsSaga(action: any) {
  try {
    const { skuids, token } = action.payload;
    const response: AxiosResponse<UserType> = yield call(axios.post, `${process.env.BASE_URL}/inventory/getInventory`, {
      skuids: skuids
    },{ headers: { Authorization: `${token}` } });
    console.log(JSON.stringify(response.data.data))
    yield put(updateVendorProductsSuccess(response.data?.data));
  } catch (error: any) {
    yield put(updateVendorProductsFailure(error.message));
  }
}

// Define saga worker function
function* addToCartSaga(action: any) {
  try {
    const { userId, skuId, qty, token } = action.payload;
    const response: AxiosResponse<UserType> = yield call(axios.post, `${process.env.BASE_URL}/api/addToCart`,{userId:userId, skuId:skuId, qty: qty},{ headers: { Authorization: `${token}` } });
    console.log(JSON.stringify(response));
    yield put(addToCartSuccess(response.data));
  } catch (error:any) {
    yield put(addToCartFailure(error.response.data));
  }
}

// Define saga worker function
function* renewTokenSaga(action: any) {
  try {
    const response: AxiosResponse<UserType> = yield call(axios.post, `${process.env.BASE_URL}/api/renewToken`, {
      refreshToken: action.payload
    }, { headers: { Authorization: `${action.payload}` } });
    const token = response.data.token;
    const userData = response.data.userData;
    yield AsyncStorage.setItem('auth_token', token);
    yield put(renewTokenSuccess({token, userData}));
    // Navigate to home screen or perform any other action
  } catch (error) {
    yield put(renewTokenFailure(JSON.stringify(error)));
  }
}

// Generator function
export function* watchAuthUser() {
  yield takeLatest('LOGIN_REQUEST', login);
  yield takeLatest('REGISTER_REQUEST', register);
  yield takeLatest('LOGOUT_REQUEST', logout);
  yield takeLatest('OTP_REQUEST', handleSendOTP);
  yield takeLatest('VERIFY_OTP_REQUEST', handleVerifyOTP);
  yield takeLatest('PASSWORD_RESET_REQUEST', handleResetPassword);
  yield takeLatest('GET_PRODUCTS_REQUEST', handleVendorProductsSaga);
  yield takeLatest('ADD_TO_CART_REQUEST', addToCartSaga);
  yield takeLatest('RENEW_TOKEN_REQUEST',renewTokenSaga);
}