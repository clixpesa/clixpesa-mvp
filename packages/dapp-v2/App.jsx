import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Box, Text } from 'native-base';

import { theme } from './theme';
import { Navigation } from './navigation';

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Navigation />
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
}
