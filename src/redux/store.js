
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import rollListSlice from './reducers/rollListSlice';
import pollListReducer from './reducers/pollListReducer';
import optionReducer from './reducers/optionReducer';
import userListReducer from './reducers/userListReducer';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    roles: rollListSlice,
    pollList: pollListReducer,
    option: optionReducer,
    userList:userListReducer,
  },
});
