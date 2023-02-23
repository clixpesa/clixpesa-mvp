import React from 'react';
import { Box, Text } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SpacesStack = createNativeStackNavigator();

const SpacesScreen = () => {
  return (
    <Box flex={1} bg="primary.100" alignItems="center" justifyContent="center">
      <Text fontSize="xl">Spaces Screen!</Text>
    </Box>
  );
};

export const SpacesNavigator = () => {
  return (
    <SpacesStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SpacesStack.Screen name="Main" component={SpacesScreen} />
    </SpacesStack.Navigator>
  );
};
