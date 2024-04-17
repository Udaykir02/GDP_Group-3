import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { put, takeLatest, call } from "redux-saga/effects";
import { UserType } from "../reducers/users/types";
import { loginFailure, loginSuccess, logoutFailure, logoutSuccess, registerFailure, registerSuccess } from "../reducers/users/slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginRequest } from "../actions/userActions";



function* login(action: any) {
    try {
        const response: AxiosResponse<UserType> = yield call(axios.post, 'http://localhost:3000/api/login', {
            email: action.payload.email,
            password: action.payload.password,
        });
        const token = response.data.token;
        yield AsyncStorage.setItem('auth_token', token);
        yield put(loginSuccess(token));
        // Navigate to home screen or perform any other action
    } catch (error) {
        yield put(loginFailure(JSON.stringify(error)));
    }
}

function* register(action:any) {
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

  function* logout(action:any) {
    try {
        yield AsyncStorage.setItem('auth_token', '');
        yield put(logoutSuccess());
      // Optionally, you can automatically login the user after registration
      // yield call(login, { payload: action.payload });
    } catch (error) {
      yield put(logoutFailure(JSON.stringify(error)));
    }
  }
  

// Generator function
export function* watchAuthUser() {
    yield takeLatest('LOGIN_REQUEST', login);
    yield takeLatest('REGISTER_REQUEST', register);
    yield takeLatest('LOGOUT_REQUEST', logout)
}