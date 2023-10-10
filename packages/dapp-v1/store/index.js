import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';

import { essentialListeners } from './essential/essential.effects';

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      listenerMiddleware.middleware,
    ),
});

const listeners = [essentialListeners];
listeners.forEach((listener) => listener(listenerMiddleware.startListening));
