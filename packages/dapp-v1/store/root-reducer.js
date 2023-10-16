import { combineReducers } from '@reduxjs/toolkit';
import essentialsReducer from './essential/essential.slice';
import walletReducer from './wallet/wallet.slice';

import { blockscoutApi } from 'dapp/services';

export const rootReducer = combineReducers({
  essential: essentialsReducer,
  wallet: walletReducer,
  [blockscoutApi.reducerPath]: blockscoutApi.reducer,
});
