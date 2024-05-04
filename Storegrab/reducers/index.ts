import addressReducer from './addressReducer';
import locationReducer from './locationReducer';
import authReducer from './users/slice'
export type StateType = {
  // Reducers types here
  auth: ReturnType<typeof authReducer>;
  location: ReturnType<typeof locationReducer>;
  address: ReturnType<typeof addressReducer>;
};



const rootReducers = {
  auth: authReducer,
  location: locationReducer,
  address: addressReducer,
};

export default rootReducers;