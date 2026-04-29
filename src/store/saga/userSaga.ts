import { call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure, addUserSuccess, addUserRequest, addUserFailure } from '../slices/userSlice';
import { User } from '../../types/user';
import { ToastAndroid } from 'react-native';

// 1. The Worker: Does the actual work
function* handleFetchUsers() {
  try {
    // Saga pauses here until axios finishes
    const response: AxiosResponse<User[]> = yield call(
      axios.get, 
      'https://jsonplaceholder.typicode.com/users'
    );
    
    // Success! Tell the store to save the data
    yield put(fetchUsersSuccess(response.data));
  } catch (error: any) {
    // Oops! Tell the store there was an error
    yield put(fetchUsersFailure(error.message));
  }
}

function* handleAddUser(action: ReturnType<typeof addUserRequest>) {
  try {
    // action.payload contains the { name, email } we sent from the UI
    const response: AxiosResponse<User> = yield call(
      axios.post,
      'https://jsonplaceholder.typicode.com/users',
      action.payload
    );

    // If successful, update the store with the response from the server
    yield put(addUserSuccess(response.data));
    ToastAndroid.showWithGravity('User Added Successfully!',ToastAndroid.SHORT,ToastAndroid.BOTTOM);
  } catch (error: any) {
    yield put(addUserFailure(error.message));
  }
}

// 2. The Watcher: Listens for the "fetchUsersRequest" action
export function* watchUserSaga() {
  yield takeLatest(fetchUsersRequest.type, handleFetchUsers);
  yield takeLatest(addUserRequest.type,handleAddUser)
}