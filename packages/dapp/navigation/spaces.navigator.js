import React from 'react';
import { Box, Text } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SpacesHomeScreen } from '../features/spaces';

const SpacesStack = createNativeStackNavigator();

export const SpacesNavigator = () => {
  return (
    <SpacesStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SpacesStack.Screen name="Main" component={SpacesHomeScreen} />
    </SpacesStack.Navigator>
  );
};
