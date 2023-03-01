import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-remix-icon';

import HomeScreen from '../features/essentials/screens/home.screen';

import { SpacesNavigator } from './spaces.navigator';
import { LoansNavigator } from './loans.navigator';
import { AccountNavigator } from './account.navigator';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: 'home-3-fill',
  Spaces: 'safe-2-fill',
  Loans: 'hand-coin-fill',
  Account: 'user-3-fill',
};

const screenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ color, size }) => (
      <Icon name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: '#2DD4BF',
    tabBarInactiveTintColor: '#115E59',
  };
};
export const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Spaces" component={SpacesNavigator} />
      <Tab.Screen name="Loans" component={LoansNavigator} />
      <Tab.Screen name="Account" component={AccountNavigator} />
    </Tab.Navigator>
  );
};
