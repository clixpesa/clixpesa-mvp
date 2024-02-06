import firestore from '@react-native-firebase/firestore';
import { store } from 'dapp/store';
import { userToken } from 'dapp/config/usertoken';
import { walletsListCache } from 'dapp/wallet';

export async function createAccount() {
  console.log('Creating Account in Firestore');
  const userDetails = store.getState().essential.userDetails;
  console.log('userDetails', userDetails);
  const userData = { ...userDetails, token: userToken };
  if (userDetails.phone === '' && !userToken) {
    throw new Error('Problem with user details');
  }
  try {
    await firestore()
      .collection('Users')
      .doc(userDetails.id)
      .set({
        ...userData,
      });
  } catch (error) {
    console.error(error);
  }
}

export async function getAccount() {}

export async function updateAccount() {}

export async function deleteAccount() {}

export async function addWallet() {
  console.log('Adding Wallet to Firestore');
  const userId = store.getState().essential.userDetails.id;
  const walletData = Object.values(walletsListCache)[0];
  if (!walletData || !userId) {
    throw new Error('Problem with wallet details');
  }
  try {
    await firestore()
      .collection('Users')
      .doc(userId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          documentSnapshot.ref
            .collection('Wallets')
            .doc(walletData.address)
            .set({
              ...walletData,
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
}
