import firestore from '@react-native-firebase/firestore';
import { addWallet, updateWallet, addUser, updateUser } from './firestore.slice';
import { getWallets } from 'dapp/wallet';
import { userToken } from 'dapp/config/usertoken';

export const firestoreListeners = (startListening) => {
  startListening({
    actionCreator: addUser,
    effect: async (action, listenerApi) => {
      const userDetails = listenerApi.getState().essential.userDetails;
      const userData = { ...userDetails, token: userToken };
      if (userDetails.phone === '' && !userToken) {
        throw new Error('Problem getting user details');
      }
      firestore()
        .collection('Users')
        .doc(userDetails.id)
        .set({
          ...userData,
        })
        .then(() => {
          console.log('User added!');
          listenerApi.dispatch(addWallet());
        });
    },
  });

  startListening({
    actionCreator: addWallet,
    effect: async (action, listenerApi) => {
      console.log('Adding Wallet to Firestore');
      const userId = listenerApi.getState().essential.userDetails.id;
      const wallet = (await getWallets())[0];
      console.log('Updating wallet address', userId, wallet.address);
      if (!userId || !wallet) {
        throw new Error('Problem getting user details');
      }
      firestore()
        .collection('Users')
        .doc(userId)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            documentSnapshot.ref
              .collection('Wallets')
              .doc(wallet.address)
              .set({
                ...wallet,
              })
              .then(() => {
                console.log('Wallet added!');
              });
          }
        });
    },
  });
};
