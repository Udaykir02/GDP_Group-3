import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducers from './reducers'; // Assuming rootReducers is defined in a separate file
import rootSaga from './sagas/rootSaga'; // Assuming rootSaga is defined in a separate file

// Create saga middleware instance
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store with middleware and reducers
const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
