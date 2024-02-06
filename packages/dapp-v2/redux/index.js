import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';

import { essentialListeners } from './essential/essential.effects';
import { walletListeners } from './wallet/wallet.effects';
//import { firestoreListeners } from './firestore/firestore.effects';

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true, serializableCheck: false, immutableCheck: false }).prepend(
      listenerMiddleware.middleware,
    ),
});

const listeners = [essentialListeners, walletListeners];
listeners.forEach((listener) => listener(listenerMiddleware.startListening));
