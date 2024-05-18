// inventorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    inventoryData: [],
    vendorData: [],
    loading: false,
    error: null,
}

const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {
        fetchInventoryAndVendorDetailsStart(state, action) {
            state.loading = true;
            state.error = null;
        },
        fetchInventoryAndVendorDetailsSuccess(state, action) {
            state.inventoryData = action.payload.inventoryData;
            state.vendorData = action.payload.vendorData;
            state.loading = false;
            state.error = null;
        },
        fetchInventoryAndVendorDetailsFailure(state, action) {
            state.loading = false;
            state.error = action.payload.error;
        },
        clearState(state) { 
            state.inventoryData = [];
            state.vendorData = [];
            state.loading = false;
            state.error = null;
        }
    },
});

export const {
    fetchInventoryAndVendorDetailsStart,
    fetchInventoryAndVendorDetailsSuccess,
    fetchInventoryAndVendorDetailsFailure,
    clearState
} = searchSlice.actions;

export default searchSlice.reducer;
