import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Box, Text } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen = () => {
  return (
    <Box flex={1} bg="primary.100" alignItems="center" justifyContent="center">
      <Text fontSize="xl">Home Screen!</Text>
    </Box>
  );
};

const SettingsScreen = () => {
  return (
    <Box flex={1} bg="primary.100" alignItems="center" justifyContent="center">
      <Text fontSize="xl">Settings Screen!</Text>
    </Box>
  );
};

const SpacesScreen = () => {
  return (
    <Box flex={1} bg="primary.100" alignItems="center" justifyContent="center">
      <Text fontSize="xl">Spaces Screen!</Text>
    </Box>
  );
};

const Stack = createNativeStackNavigator();

import { theme } from './theme';

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Spaces" component={SpacesScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
