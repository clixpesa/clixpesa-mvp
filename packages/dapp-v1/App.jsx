import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
//import auth from '@react-native-firebase/auth';

import { theme } from './theme';
import { Navigation } from './navigation';

export default function App() {
  /*function onAuthStateChanged(user) {
    if (user) {
      console.log('There is a user');
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);*/

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style="auto" />
      <Navigation />
    </NativeBaseProvider>
  );
}
