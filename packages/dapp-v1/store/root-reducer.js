import { combineReducers } from '@reduxjs/toolkit';
import essentialsReducer from './essential/essential.slice';
import walletReducer from './wallet/wallet.slice';

export const rootReducer = combineReducers({
  essential: essentialsReducer,
  wallet: walletReducer,
});
