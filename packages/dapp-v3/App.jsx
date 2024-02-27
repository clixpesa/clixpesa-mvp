import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import * as SplashScreen from 'expo-splash-screen';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserDetails, getUserToken, getUserWallet } from 'dapp/services';
import { LOCAL_STORAGE_KEY } from 'dapp/config';
import { setUserTokenFrom } from 'dapp/utils';
import {
  setHasAccount,
  setUserDetailsOnLogin,
  createPendingWallet,
} from 'dapp/redux/essential/essential.slice';
//import auth from '@react-native-firebase/auth'; add Signing Check for user

import { theme } from './theme';
import { Navigation } from './navigation';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        const { token, ...userData } = await getUserDetails(LOCAL_STORAGE_KEY);
        if (!!userData.id) {
          const storedToken = await getUserToken(userData.id);
          const userWallet = await getUserWallet(userData.id);
          if (storedToken === token && userWallet) {
            setUserTokenFrom(token);
            dispatch(setHasAccount({ state: true, address: userWallet.address }));
            dispatch(setUserDetailsOnLogin(userData));
          }
        } else {
          dispatch(createPendingWallet());
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!isReady) {
    return null;
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <Navigation />
        <StatusBar style="auto" />
      </NativeBaseProvider>
    );
  }
}
