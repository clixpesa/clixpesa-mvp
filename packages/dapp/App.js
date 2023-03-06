import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';

import { Navigation } from './navigation';

import { theme } from './theme';

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Navigation />
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
}
