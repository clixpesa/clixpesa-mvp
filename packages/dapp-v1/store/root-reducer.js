import { combineReducers } from '@reduxjs/toolkit';
import essentialsReducer from './essential/essential.slice';

export const rootReducer = combineReducers({
  essential: essentialsReducer,

});
