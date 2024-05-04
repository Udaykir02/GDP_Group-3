import { Dispatch } from 'redux';
import { MAP_REGION, DEFAULT_LOCATION, CHOOSEN_LOCATION, CHOOSEN_REGION, CHOOSEN_ADDRESS } from './types';

export const mapRegion = (data: any) => (dispatch: Dispatch) => {
	dispatch({
		type: MAP_REGION,
		payload: data
	});
};

export const defaultLocation = (data: any) => (dispatch: Dispatch) => {
	dispatch({
		type: DEFAULT_LOCATION,
		payload: data
	});
};

export const choosenLocation = (data: any) => (dispatch: Dispatch) => {
	dispatch({
		type: CHOOSEN_LOCATION,
		payload: data
	});
};

export const choosenRegion = (data: any) => (dispatch: Dispatch) => {
	dispatch({
		type: CHOOSEN_REGION,
		payload: data
	});
};

export const choosenAddress = (data: any) => (dispatch: Dispatch) => {
	dispatch({
		type: CHOOSEN_ADDRESS,
		payload: data
	});
};