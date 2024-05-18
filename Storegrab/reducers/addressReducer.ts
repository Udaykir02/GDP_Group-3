import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  addresses: any[];
}

const initialState: State = {
  addresses: [],
};

const addressSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    setUserAddresses: (state, action: PayloadAction<any[]>) => {
      state.addresses = action.payload;
    },
    updateAddress: (state, action: PayloadAction<any>) => {
      state.addresses.push(action.payload);
    },
    editAddress: (state, action: PayloadAction<{ index: number; data: any }>) => {
      const { index, data } = action.payload;
      state.addresses[index] = data;
    },
    deleteAddress: (state, action: PayloadAction<number>) => {
      state.addresses.splice(action.payload, 1);
    },
    clearAddresses: (state) => {
      state.addresses = [];
    }
  },
});

export const {
  setUserAddresses,
  updateAddress,
  editAddress,
  deleteAddress,
  clearAddresses
} = addressSlice.actions;
export default addressSlice.reducer;