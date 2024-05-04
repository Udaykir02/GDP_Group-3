import { Dispatch } from 'redux';
import { USER_ADDRESSES, UPDATE_ADDRESS, EDIT_ADDRESS, DELETE_ADDRESS } from './types';

export const userAddresses = (data: any) => (dispatch: Dispatch) => {
	dispatch({
		type: USER_ADDRESSES,
		payload: data
	});
};

export const updateAddress = (data: any) => (dispatch: Dispatch) => {
	dispatch({
		type: UPDATE_ADDRESS,
		payload: data
	});
};

export const editAddress = (data: any) => (dispatch: Dispatch) => {
	dispatch({
		type: EDIT_ADDRESS,
		payload: data
	});
};

export const deleteAddress = (data: any) => (dispatch: Dispatch) => {
	dispatch({
		type: DELETE_ADDRESS,
		payload: data
	});
};
