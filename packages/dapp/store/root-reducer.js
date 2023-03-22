import { combineReducers } from '@reduxjs/toolkit';
import essentialReducer from './essentials/essential.slice';
import accountReducer from './account/account.slice';

export const rootReducer = combineReducers({
  essential: essentialReducer,
  account: accountReducer,
});
