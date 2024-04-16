import authReducer from './users/slice'
export type StateType = {
  // Reducers types here
  auth: ReturnType<typeof authReducer>;
};



const rootReducers = {
  auth: authReducer,
};

export default rootReducers;