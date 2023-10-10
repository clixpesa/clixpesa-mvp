import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';

import { theme } from './theme';
import { Navigation } from './navigation';

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style="auto" />
      <Navigation />
    </NativeBaseProvider>
  );
}
