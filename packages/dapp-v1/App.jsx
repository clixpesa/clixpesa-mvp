import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { NativeBaseProvider } from 'native-base';
import * as SplashScreen from 'expo-splash-screen';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { connectToProvider } from 'dapp/config/provider';
import { USER_STORE, WALLETS_STORE } from 'dapp/config/constants';
import { getUserDetails } from './services';
import { setHasAccount, setUserDetails, setIsConnected } from './store/essential/essential.slice';
import { updateWalletAddress } from './store/wallet/wallet.slice';
import { setUserTokenFrom } from 'dapp/config/usertoken';
import { setPrivateKey } from 'dapp/config/signer';
import { getWallets } from 'dapp/wallet';
import { decryptDataWtoken } from 'dapp/utils';

import { theme } from './theme';
import { Navigation } from './navigation';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    //LogBox.ignoreAllLogs();
  }, []);
  useEffect(() => {
    async function initProvider() {
      try {
        await connectToProvider();
        dispatch(setIsConnected(true));
      } catch (e) {
        console.log('Unable to connect to provider', e);
        dispatch(setIsConnected(false));
      }
    }
    initProvider();
  }, []);
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        auth().onAuthStateChanged(async (user) => {
          if (user) {
            const userDetails = await getUserDetails(USER_STORE);
            const wallet = (await getWallets())[0];
            if (userDetails.token && wallet) {
              setUserTokenFrom(userDetails.token);
              const key = await decryptDataWtoken(wallet.enPrivateKey, userDetails.token);
              setPrivateKey(key);
              dispatch(setHasAccount(true)); //Evaluate for stability
              dispatch(
                setUserDetails({
                  userId: user.uid,
                  userName: user.displayName,
                  userEmail: user.email,
                  userPhone: user.phoneNumber,
                  userPhoto: user.photoURL,
                }),
              );
              dispatch(updateWalletAddress(wallet.address));
            }
          } else {
            dispatch(setIsConnected(false));
          }
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  if (!isReady) {
    return null;
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <StatusBar style="auto" />
        <Navigation />
      </NativeBaseProvider>
    );
  }
}
