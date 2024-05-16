import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    orders: any[];
    error: string | null;
}

const initialState: State = {
    orders: [],
    error: null
};
const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        getOrdersSuccess: (state, action: PayloadAction<any[]>) => {
            state.orders = action.payload;
        },
        getOrdersFailure: (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        },
        placeOrderSuccess: (state, action: PayloadAction<any>) => {
            state.orders.push(action.payload)
        },
        placeOrderFailure: (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        },
    },
});

export const {
    getOrdersSuccess,
    getOrdersFailure,
    placeOrderSuccess,
    placeOrderFailure,
} = ordersSlice.actions;
export default ordersSlice.reducer;