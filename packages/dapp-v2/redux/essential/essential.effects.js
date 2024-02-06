import { createAccount } from './essential.slice';
import { createAccount as accountCreate, addWallet } from 'dapp/services/firestore.service';
import { generateWallet, encryptWallet } from 'dapp/wallet';
import { updateWalletAddress } from '../wallet/wallet.slice';
import { setUserToken } from 'dapp/config/usertoken';
//import { USER_STORE } from 'dapp/config/constants';
//import { isKeySet, setSigner } from 'dapp/config/signer';

export const essentialListeners = (startListening) => {
  startListening({
    actionCreator: createAccount,
    effect: async (action, listenerApi) => {
      // Create token
      setUserToken(action.payload);
      // create the account in firestore
      await accountCreate();
      console.log('createAccResp', createAccResp);
      // create a wallet
      const passcode = action.payload;
      const wallet = await generateWallet();
      const encWallet = await encryptWallet(passcode, wallet);
      console.log('encWallet', encWallet);
      listenerApi.dispatch(updateWalletAddress(wallet.address));
      //setPrivateKey(wallet.privateKey);
      // store the wallet in firestore
      await addWallet();
    },
  });
};
