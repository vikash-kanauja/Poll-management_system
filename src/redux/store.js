
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import rollListSlice from './reducers/rollListSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    roles:rollListSlice,
  },
});
