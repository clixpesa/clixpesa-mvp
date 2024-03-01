import {
  setUserDetails,
  addUserDetailsToken,
  setLoggedIn,
  updateUserDetails,
  changeUserToken,
  createPendingWallet,
  setHasAccount,
  setIsConnected,
  setSignered,
} from './essential.slice';
import {
  addUserData,
  addUserToken,
  getUserData,
  getUserWallet,
  storeUserDetails,
  modifyUserDetails,
  updateUserData,
  generateWallet,
  generateWalletFromMnemonic,
  encryptWallet,
  addUserWallet,
  setSigner,
  connectToProvider,
} from 'dapp/services';

import { LOCAL_STORAGE_KEY } from 'dapp/config';

export const essentialListeners = (startListening) => {
  startListening({
    actionCreator: setUserDetails,
    effect: async (action, listenerApi) => {
      const userData = listenerApi.getState().essential.userDetails;
      addUserData(userData);
    },
  });
  startListening({
    actionCreator: createPendingWallet,
    effect: async (action, listenerApi) => {
      if (!action.payload) {
        generateWallet();
      } else {
        generateWalletFromMnemonic(action.payload);
      }
    },
  });
  startListening({
    actionCreator: addUserDetailsToken,
    effect: async (action, listenerApi) => {
      const userId = listenerApi.getState().essential.userDetails.id;
      await addUserToken(action.payload, userId);
      const userData = await getUserData(userId);
      if (userData.token === action.payload) {
        console.log('User Token added successfully');
        await storeUserDetails(LOCAL_STORAGE_KEY, userData);
        //encrypt wallet
        const encryptedWallet = encryptWallet(action.payload);
        await addUserWallet(encryptedWallet, userId);
        //Add check for wallet
        setSigner(encryptedWallet.enPrivateKey);
        listenerApi.dispatch(setHasAccount({ state: true, address: encryptedWallet.address }));
        listenerApi.dispatch(setLoggedIn(true));
      }
    },
  });
  startListening({
    actionCreator: updateUserDetails,
    effect: async (action, listenerApi) => {
      const userDetails = listenerApi.getState().essential.userDetails;
      await updateUserData(userDetails);
      const userData = await getUserData(userDetails.id);
      await modifyUserDetails(LOCAL_STORAGE_KEY, userData);
    },
  });
  startListening({
    actionCreator: changeUserToken,
    effect: async (action, listenerApi) => {
      const userId = listenerApi.getState().essential.userDetails.id;
      await addUserToken(action.payload, userId);
      const userData = await getUserData(userId);
      if (userData.token === action.payload) {
        await modifyUserDetails(LOCAL_STORAGE_KEY, userData);
        console.log('User Token updated successfully');
        listenerApi.dispatch(setLoggedIn(false));
      }
    },
  }); /*
  startListening({
    predicate: (action) => action.type === 'essential/setIsConnected' && action.payload === true,
    effect: async (action, listenerApi) => {
      const userWallet = await getUserWallet(listenerApi.getState().essential.userDetails.id); //Fix refetching wallet
      if (listenerApi.getState().essential.isConnected) {
        if (userWallet) {
          setSigner(userWallet.enPrivateKey);
          listenerApi.dispatch(setSignered(true));
        } else {
          console.warn('No wallet found');
          listenerApi.dispatch(setSignered(false));
        }
      } else {
        try {
          console.log('Retrying Connecting to provider');
          await connectToProvider();
          listenerApi.dispatch(setIsConnected(true));
        } catch (e) {
          console.log('Unable to connect to provider', e);
          listenerApi.dispatch(setIsConnected(false));
        }
      }
    },
  });*/
};
