
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import rollListSlice from './reducers/rollListSlice';
import pollreducer from './reducers/pollSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    roles:rollListSlice,
    polls:pollreducer
  },
});
