import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import Icon from 'react-native-remix-icon';
import { Box, Text, Avatar, Pressable, HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export function HeaderRightIcons() {
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
}

export function AccPressable() {
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
}
