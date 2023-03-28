import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';

import { accountListeners } from './account/account.effects';

import { africasTalkingApi } from '../services/africastalking';

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware, africasTalkingApi.middleware),
});

//Listeners
accountListeners(listenerMiddleware.startListening);
