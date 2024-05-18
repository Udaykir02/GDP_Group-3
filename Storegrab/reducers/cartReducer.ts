// Import createSlice from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the cart
const initialState:any = {
  cart: []
};


// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addUserCart: (state, action) => {
      console.log("--->"+JSON.stringify(action.payload))
      state.cart = action.payload;
      console.log("--->newtoken"+JSON.stringify(state.cart))
    },
    addItemToCart: (state, action) => {
      const item = action.payload;
      state.cart.push(item);
    },
    removeItemFromCart: (state, action) => {
      const skuId = action.payload;
      state.cart = state.cart.filter((cartItem: any) => cartItem.skuId !== skuId);
    },
    updateItemInCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((cartItem:any) => cartItem.skuId === item.skuId);
      if (existingItem) {
        // Update item properties
        existingItem.qty = item.qty;
        existingItem.size = item.size;
        existingItem.price = item.price;
        // Update other properties if necessary
      }
    },
    clearCart: () => {
      return initialState;
    },
    resetCart: (state) => {
      state.cart = [];
    },
    increaseItemQuantity: (state, action) => {
      const skuId = action.payload;
      const existingItem = state.cart.find((cartItem:any) => cartItem.skuId === skuId);
      if (existingItem) {
        existingItem.qty += 1;
      }
    },
    decreaseItemQuantity: (state, action) => {
      const skuId = action.payload;
      const existingItem = state.cart.find((cartItem:any) => cartItem.skuId === skuId);
      if (existingItem && existingItem.qty > 1) {
        existingItem.qty -= 1;
      }
    },
  }
});

// Export actions
export const { addItemToCart, removeItemFromCart, updateItemInCart, clearCart, addUserCart, resetCart, increaseItemQuantity, decreaseItemQuantity } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
