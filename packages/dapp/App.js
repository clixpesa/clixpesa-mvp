import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Box, Text } from 'native-base';
import { theme } from './theme';

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Box
        flex={1}
        bg="primary.100"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="xl">Hello, world!</Text>
      </Box>
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
}
