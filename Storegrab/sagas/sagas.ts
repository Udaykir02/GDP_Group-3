import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { put, takeLatest, call } from "redux-saga/effects";
import { UserType } from "../reducers/users/types";
import { loginSuccess, loginFailure, registerSuccess, registerFailure, logoutSuccess, logoutFailure, sendOTPSuccess, sendOTPFailure, verifyOTPSuccess, verifyOTPFailure, resetPasswordSuccess, resetPasswordFailure, addToCartSuccess, addToCartFailure, renewTokenSuccess, renewTokenFailure, clearCart } from "../reducers/users/slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginRequest, resetRequest } from "../actions/userActions";
import { clearVendor, inventoryRequestSuccess, updateProducts, updateVendorProductsFailure, updateVendorProductsSuccess } from "../reducers/vendorReducer";
import { getOrdersSuccess, getOrdersFailure, placeOrderSuccess, placeOrderFailure, clearOrders } from "../reducers/orderReducer";
import { clearState, fetchInventoryAndVendorDetailsFailure, fetchInventoryAndVendorDetailsStart, fetchInventoryAndVendorDetailsSuccess } from "../reducers/searchReducer";
import { addUserCart, resetCart } from "../reducers/cartReducer";
import { clearLocation } from "../reducers/locationReducer";
import { clearAddresses } from "../reducers/addressReducer";



function* login(action: any) {
  try {
    const response: AxiosResponse<UserType> = yield call(axios.post, 'http://localhost:3000/api/login', {
      email: action.payload.email,
      password: action.payload.password,
    });
    const token = response.data.token;
    const userData = response.data.userData;
    yield AsyncStorage.setItem('auth_token', token);
    yield put(addUserCart(userData?.cart));
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
    yield put(resetRequest());
    yield put(resetCart());
    yield put(clearOrders());
    yield put(clearVendor());
    yield put(clearState());
    yield put(clearLocation());
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
    const { skuids, token, brand, categories, minPrice, maxPrice } = action.payload;
    const response: AxiosResponse<any> = yield call(axios.post, `${process.env.BASE_URL}/inventory/getInventory`, {
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

  } catch (error:any) {
    console.log(error)
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
    console.log('userData'+JSON.stringify(userData.cart))  
    yield put(addUserCart(userData?.cart));
    yield put(renewTokenSuccess({token, userData}));
    // Navigate to home screen or perform any other action
  } catch (error) {
    yield put(renewTokenFailure(JSON.stringify(error)));
  }
}

function* getOrdersSaga(action: any) {
  try {
    const response: AxiosResponse<UserType> = yield call(axios.post, `${process.env.BASE_URL}/order/orders`, {
      userId: action.payload
    }, { headers: { Authorization: `${action.payload}` } });
    const orders: any = response.data;
    console.log("--->orders_saga"+(JSON.stringify(orders)))
    for (let i = 0; i < orders.length; i++) {
      const element = orders[i]._id;
      console.log(element)
      
    }
    yield put(getOrdersSuccess(orders));
    // Navigate to home screen or perform any other action
  } catch (error) {
    yield put(getOrdersFailure(JSON.stringify(error)));
  }
}

function* placeOrderSaga(action: any) {
  try {
    console.log("hello")
    const response: AxiosResponse<any> = yield call(axios.post, `${process.env.BASE_URL}/stripe/place-order`, {
      userId: action.payload.userId, paymentIntentId: action.payload.paymentIntentId, vendorId: action.payload.vendorId, items: action.payload.items
    }, { headers: { Authorization: `${action.payload}` } });
    const order = response.data.order;

    console.log("order_details"+JSON.stringify(order))
    yield put(placeOrderSuccess(order));
    yield put(resetCart());
    // Navigate to home screen or perform any other action
  } catch (error) {
    console.log(error)
    yield put(placeOrderFailure(JSON.stringify(error)));
  }
}

function* fetchInventoryAndVendorDetailsSaga(action:any) {
  try {
    console.log(action.payload.searchText)
    const response: AxiosResponse<any> = yield call(axios.post, `${process.env.BASE_URL}/inventory/search`, {
      skuids: undefined, 
      minPrice: undefined,
      maxPrice: undefined, 
      categories: undefined, 
      brand:undefined ,
      searchTerm: action.payload.searchText
    }, { headers: { Authorization: `${action.payload.token}` } });
    const inventoryResult = response.data.inventoryResult;
    const vendorResult = response.data.vendorResult;
    yield put(fetchInventoryAndVendorDetailsSuccess({ inventoryData: inventoryResult, vendorData: vendorResult }));
  } catch (error:any) {
    yield put(fetchInventoryAndVendorDetailsFailure({ error: error.message }));
  }
}


function* handleInventoryQtySaga(action: any) {
  try {
    const response: AxiosResponse<any> = yield call(axios.post, `${process.env.BASE_URL}/inventory/getInventoryQuantity`, {
      skuIds: action.payload.skuIds
    }, { headers: { Authorization: `${action.payload.token}` } });

    yield put(inventoryRequestSuccess(response.data));
    // Navigate to home screen or perform any other action
  } catch (error) {
    console.log(error)
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
  yield takeLatest('RENEW_TOKEN_REQUEST', renewTokenSaga);
  yield takeLatest('GET_ORDERS_REQUEST', getOrdersSaga);
  yield takeLatest('PLACE_ORDER_REQUEST', placeOrderSaga);
  yield takeLatest('SEARCH_PRODUCTS_REQUEST', fetchInventoryAndVendorDetailsSaga);
  yield takeLatest('INVENTORY_REQUEST', handleInventoryQtySaga)
}