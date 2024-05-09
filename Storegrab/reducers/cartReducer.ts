import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  cartitems: [],
  orderitems: [],
  orders: [],
  moreorders: true,
  lastorder: {},
  order_refreshing: false,
  favourites: [],
  morefavourites: true,
  lastfavourite: {},
  fav_refreshing: false  
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initialCart(state, action) {
      state.cartitems = action.payload;
    },
    initialOrder(state, action) {
      state.orderitems = action.payload;
    },
    removeOrder(state, action) {
      state.orderitems.splice(action.payload, 1);
    },
    changeOrder(state, action) {
      state.orderitems[action.payload.index] = action.payload.data;
    },
    addOrder(state, action) {
      state.orderitems.unshift(action.payload);
    },
    addItem(state, action) {
      state.cartitems.push(action.payload);
    },
    removeItem(state, action) {
      state.cartitems.splice(action.payload, 1);
    },
    removeUnits(state, action) {
      state.cartitems.splice(action.payload, 1);
    },
    removeUnits2(state, action) {
      const { index, units, total } = action.payload;
      state.cartitems[index].units = units;
      state.cartitems[index].total = total;
    },
    addOrders(state, action) {
      state.orders = action.payload;
    },
    updateOrders(state, action) {
      state.orders.push(action.payload);
    },
    ordersPagination(state, action) {
      state.lastorder = action.payload.lastorder;
      state.moreorders = action.payload.moreorders;
    },
    ordersRefreshing(state, action) {
      state.order_refreshing = action.payload;
    },
    ordersFavourite(state, action) {
      state.orders[action.payload.index].favourite = action.payload.value;
    },
    addFavourites(state, action) {
      state.favourites = action.payload;
    },
    updateFavourites(state, action) {
      state.favourites.push(action.payload);
    },
    favouritesPagination(state, action) {
      state.lastfavourite = action.payload.lastorder;
      state.morefavourites = action.payload.moreorders;
    },
    favRefreshing(state, action) {
      state.fav_refreshing = action.payload;
    },
    addFavourite(state, action) {
      state.favourites.unshift(action.payload);
    },
    removeFavourite(state, action) {
      state.favourites.splice(action.payload, 1);
    }		
  }
});

export const {
  initialCart,
  initialOrder,
  removeOrder,
  changeOrder,
  addOrder,
  addItem,
  removeItem,
  removeUnits,
  removeUnits2,
  addOrders,
  updateOrders,
  ordersPagination,
  ordersRefreshing,
  ordersFavourite,
  addFavourites,
  updateFavourites,
  favouritesPagination,
  favRefreshing,
  addFavourite,
  removeFavourite
} = cartSlice.actions;

export default cartSlice.reducer;
