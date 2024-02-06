import { createWallet, importWallet, updateWalletAddress } from './wallet.slice';
import { setLoggedIn } from '../essential/essential.slice';
import { getPendingWallet } from 'dapp/wallet';

//import { setPrivateKey } from 'dapp/config/signer';

import { encryptWallet, generateWallet } from 'dapp/wallet';

export const walletListeners = (startListening) => {
  startListening({
    actionCreator: createWallet,
    effect: async (action, listenerApi) => {
      if (action.payload) {
        console.log('Creating and Storing Wallet');
        const passcode = action.payload;
        const wallet = await generateWallet();
        await encryptWallet(passcode, wallet);
        listenerApi.dispatch(updateWalletAddress(wallet.address));
        //setPrivateKey(wallet.privateKey);
        //listenerApi.dispatch(setLoggedIn(true));
      }
    },
  });
  startListening({
    actionCreator: importWallet,
    effect: async (action, listenerApi) => {
      console.log('Importing wallet from Mnemonic');
      const passcode = action.payload;
      const { importedWallet } = getPendingWallet();
      await encryptWallet(passcode, importedWallet);
      const currentAddr = listenerApi.getState().wallet.walletInfo.address;
      if (!currentAddr) {
        listenerApi.dispatch(updateWalletAddress(importedWallet.address));
        //setPrivateKey(importWallet.privateKey);
        listenerApi.dispatch(setLoggedIn(true));
      }
    },
  });

  startListening({
    actionCreator: updateWalletAddress,
    effect: async (action, listenerApi) => {},
  });
};
