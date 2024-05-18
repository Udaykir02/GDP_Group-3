import addressReducer from './addressReducer';
import locationReducer from './locationReducer';
import authReducer from './users/slice';
import cartReducer from './cartReducer';
import vendorReducer from './vendorReducer';
import orderReducer from './orderReducer';
import searchReducer from './searchReducer';

export type StateType = {
  // Reducers types here
  auth: ReturnType<typeof authReducer>;
  location: ReturnType<typeof locationReducer>;
  address: ReturnType<typeof addressReducer>;
  usercart: ReturnType<typeof cartReducer>;
  vendor: ReturnType<typeof vendorReducer>;
  orders: ReturnType<typeof orderReducer>;
  search: ReturnType<typeof searchReducer>;
};



const rootReducers = {
  auth: authReducer,
  location: locationReducer,
  address: addressReducer,
  usercart: cartReducer,
  vendor: vendorReducer,
  order: orderReducer,
  search: searchReducer,
};

export default rootReducers;