import firestore from '@react-native-firebase/firestore';

export async function addUserData(userData) {
  console.log('Adding User Data');
  if (!userData.id || !userData.phone) {
    throw new Error('User Data is incomplete');
  }
  try {
    await firestore()
      .collection('Users')
      .doc(userData.id)
      .set({ ...userData, token: null });
  } catch (error) {
    console.log('Error adding user data', error);
  }
}

export async function addUserToken(userToken, userId) {
  console.log('Adding User Token');
  if (!userToken) {
    throw new Error('User Token is missing');
  }
  try {
    await firestore().collection('Users').doc(userId).update({ token: userToken });
  } catch (error) {
    console.log('Error adding user token', error);
  }
}

export async function addUserWallet(wallet, userId) {
  console.log('Adding User Wallet');
  if (!wallet) {
    throw new Error('Wallet is missing');
  }
  try {
    await firestore().collection('Users').doc(userId).update({ wallet });
  } catch (error) {
    console.log('Error adding user wallet', error);
  }
}

export async function getUserWallet(userId) {
  console.log('Getting User Wallet');
  try {
    const user = await firestore().collection('Users').doc(userId).get();
    return user.data().wallet;
  } catch (error) {
    console.log('Error getting user wallet', error);
  }
}

export async function getUserToken(userId) {
  console.log('Getting User Token');
  try {
    const user = await firestore().collection('Users').doc(userId).get();
    return user.data().token;
  } catch (error) {
    console.log('Error getting user token', error);
  }
}

export async function getUserData(userId) {
  console.log('Getting User Data');
  try {
    const user = await firestore().collection('Users').doc(userId).get();
    return user.data();
  } catch (error) {
    console.log('Error getting user data', error);
  }
}

export async function updateUserData(userData) {
  console.log('Updating User Details');
  if (!userData.id || !userData.phone) {
    throw new Error('User Data is incomplete');
  }
  try {
    await firestore().collection('Users').doc(userData.id).update(userData);
  } catch (error) {
    console.log('Error updating user details', error);
  }
}
