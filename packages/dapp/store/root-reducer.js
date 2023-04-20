import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/user.slice';
import spacesReducer from './spaces/spaces.slice';

export const rootReducer = combineReducers({
  user: userReducer,
  spaces: spacesReducer,
});
