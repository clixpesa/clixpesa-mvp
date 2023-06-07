import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';

import { essentialListeners } from './essential/essential.effects';
import { walletListeners } from './wallet/wallet.effects';
//import { userListeners } from './user/user.effects';
import { spacesListeners } from './spaces/spaces.effects';
//import { loansListeners } from '../features/microloans/loansEffects';

import { blockscoutApi } from '@dapp/services/blockscout';
import { newsdataApi } from '@dapp/services/newsdata';

// Create listener middleware
const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      listenerMiddleware.middleware,
      blockscoutApi.middleware,
      newsdataApi.middleware,
    ),
});

// Add listeners
const listeners = [essentialListeners, walletListeners, spacesListeners];
listeners.forEach((listener) => listener(listenerMiddleware.startListening));
