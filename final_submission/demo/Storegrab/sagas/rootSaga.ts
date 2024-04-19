import { all } from 'redux-saga/effects';
import {watchAuthUser} from './sagas';


// Root saga function
export default function* rootSaga() {
  yield all([
    watchAuthUser()
  ]);
}