import { all, fork } from 'redux-saga/effects';
import { watchUserSaga } from './userSaga';

export default function* rootSaga() {
  yield all([
    fork(watchUserSaga),
    // fork(otherSagas here...)
  ]);
}