import React from 'react';
import { Box, Text } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SpacesNavigator } from './spaces.navigator';
import { LoansNavigator } from './loans.navigator';
import { AccountNavigator } from './account.navigator';

const HomeScreen = () => {
  return (
    <Box flex={1} bg="primary.100" alignItems="center" justifyContent="center">
      <Text fontSize="xl">Home Screen!</Text>
    </Box>
  );
};

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Spaces" component={SpacesNavigator} />
      <Tab.Screen name="Loans" component={LoansNavigator} />
      <Tab.Screen name="Account" component={AccountNavigator} />
    </Tab.Navigator>
  );
};
