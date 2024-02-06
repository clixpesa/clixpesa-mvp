import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import Icon from 'react-native-remix-icon';
import { Box, Text, Avatar, Pressable, HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import {
  //HomeScreen,
  DummyScreen,
  //AccountScreen
} from 'dapp/essentials';
//import { SpacesLandingScreen, SpaceHomeScreen } from 'dapp/spaces';

const Tab = createBottomTabNavigator();

export function BottomTabs() {
  const hasSpaces = false;
  return (
    <Tab.Navigator screenOptions={TabScreenOptions}>
      <Tab.Screen name="Home" component={DummyScreen} options={{ headerTitle: 'Clixpesa' }} />
      <Tab.Screen name="Spaces" component={hasSpaces ? DummyScreen : DummyScreen} />
      {/* <Tab.Screen name="Loans" component={LoansStack} /> */}
      <Tab.Screen name="Account" component={DummyScreen} />
    </Tab.Navigator>
  );
}

const HeaderRightIcons = () => {
  const navigation = useNavigation();
  return (
    <HStack space="5" mr="3">
      <Pressable
        onPress={() => navigation.navigate('DummyModal')}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <Icon size={24} name="donut-chart-fill" />
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('DummyModal')}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <Icon size={24} name="star-fill" />
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('DummyModal')}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <Icon size={24} name="notification-4-fill" />
      </Pressable>
    </HStack>
  );
};

const AccPressable = () => {
  const { initials } = useSelector((s) => s.essential.userDetails);
  const navigation = useNavigation();
  return (
    // fix avatar text color to primary.700
    <Pressable
      onPress={() => navigation.navigate('Account')}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Avatar bg="primary.200" ml="2" size="sm" _text={{ color: 'primary.800' }}>
        {initials}
      </Avatar>
    </Pressable>
  );
};

// Path: navigation/bottom.tabs.js
const TabIcons = {
  Home: ['home-3-fill', 'home-3-line'],
  Spaces: ['safe-2-fill', 'safe-2-line'],
  //Loans: ['hand-coin-fill', 'hand-coin-line'],
  Account: ['user-3-fill', 'user-3-line'],
};

const TabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused }) => {
    const [iconFill, iconLine] = TabIcons[route.name];
    return (
      <Box bg={focused ? 'primary.200' : '#ffffff'} rounded="2xl" px="5" py="1" mt="1">
        <Icon name={focused ? iconFill : iconLine} size={22} color="#0F766E" key={route.name} />
      </Box>
    );
  },
  tabBarLabel: () => {
    return (
      <Text fontSize="xs" color="primary.900" key={route.name} mb="1">
        {route.name}
      </Text>
    );
  },
  headerLeft: () => <AccPressable />,
  headerRight: () => <HeaderRightIcons />,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    height: 60,
  },
});
