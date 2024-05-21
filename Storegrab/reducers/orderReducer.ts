import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    orders: any[];
    error: string | null;
    loading: boolean
}

const initialState: State = {
    orders: [],
    error: null,
    loading: false
};
const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        getOrdersSuccess: (state, action: PayloadAction<any[]>) => {
            console.log(action.payload)
            state.orders = action.payload;
            state.loading = false;
        },
        getOrdersFailure: (state, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.loading = false;
        },
        placeOrderSuccess: (state, action: PayloadAction<any>) => {
            state.orders.push(action.payload)
            state.loading = false;
        },
        placeOrderFailure: (state, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearOrders: (state) => {
            state.orders = [];
            state.error = null; 
            state.loading = false;
        },
        updateCartLoading: (state) => {
            state.loading = true
        }
    },
});

export const {
    getOrdersSuccess,
    getOrdersFailure,
    placeOrderSuccess,
    placeOrderFailure,
    clearOrders,
    updateCartLoading
} = ordersSlice.actions;
export default ordersSlice.reducer;