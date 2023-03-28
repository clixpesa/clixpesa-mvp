import { combineReducers } from '@reduxjs/toolkit';
import essentialReducer from './essentials/essential.slice';
import accountReducer from './account/account.slice';
import { africasTalkingApi } from '../services/africastalking';

export const rootReducer = combineReducers({
  essential: essentialReducer,
  account: accountReducer,
  africasTalkingApi: africasTalkingApi.reducer,
});
