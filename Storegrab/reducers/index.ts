import addressReducer from './addressReducer';
import locationReducer from './locationReducer';
import authReducer from './users/slice';
import cartReducer from './cartReducer';
import vendorReducer from './vendorReducer';
import orderReducer from './orderReducer';

export type StateType = {
  // Reducers types here
  auth: ReturnType<typeof authReducer>;
  location: ReturnType<typeof locationReducer>;
  address: ReturnType<typeof addressReducer>;
  cart: ReturnType<typeof cartReducer>;
  vendor: ReturnType<typeof vendorReducer>;
  orders: ReturnType<typeof orderReducer>;
};



const rootReducers = {
  auth: authReducer,
  location: locationReducer,
  address: addressReducer,
  cart: cartReducer,
  vendor: vendorReducer,
  order: orderReducer
};

export default rootReducers;