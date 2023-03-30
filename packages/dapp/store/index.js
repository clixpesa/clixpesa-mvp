import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
//import { rootReducer } from './root-reducer';

//import { accountListeners } from './account/account.effects';
import { africasTalkingApi } from '../services/africasTalking';

import essentialReducer from './essentials/essential.slice';
import accountReducer from './account/account.slice';

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    essential: essentialReducer,
    account: accountReducer,
    africasTalkingApi: africasTalkingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware, africasTalkingApi.middleware),
});

//Listeners
//accountListeners(listenerMiddleware.startListening);
