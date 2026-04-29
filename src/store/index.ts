import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './slices/userSlice';
import rootSaga from './saga/rootSaga';

// 1. Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// 2. Configure the store
export const store = configureStore({
  reducer: {
    users: userReducer,
  },
  // 3. Add saga middleware to the default middleware list
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// 4. Run the saga
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;