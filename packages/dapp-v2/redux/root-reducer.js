import { combineReducers } from '@reduxjs/toolkit';
import essentialsReducer from './essential/essential.slice';
//import spaceReducer from './spaces/spaces.slice';
import walletReducer from './wallet/wallet.slice';

export const rootReducer = combineReducers({
  essential: essentialsReducer,
  //spaces: spaceReducer,
  wallet: walletReducer,
});
