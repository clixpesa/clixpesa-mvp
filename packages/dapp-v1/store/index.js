import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';

import { essentialListeners } from './essential/essential.effects';
import { walletListeners } from './wallet/wallet.effects';
import { firestoreListeners } from './firestore/firestore.effects';

import { blockscoutApi } from 'dapp/services';

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware, blockscoutApi.middleware),
});

const listeners = [essentialListeners, walletListeners, firestoreListeners];
listeners.forEach((listener) => listener(listenerMiddleware.startListening));
