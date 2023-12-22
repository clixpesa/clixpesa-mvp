import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { CurrentPotView, LoansInfoView, ActivitiesView } from 'dapp/spaces';
import { DummyScreen } from 'dapp/essentials';

const SpaceTabs = createMaterialTopTabNavigator();

export function SpaceTabsNavigator() {
  return (
    <SpaceTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: 18,
        },
        tabBarStyle: {
          backgroundColor: '#f5f5f5',
          shadowColor: 'transparent',
          marginHorizontal: 10,
        },
        tabBarPressColor: '#ffffff',
        tabBarIndicatorStyle: {
          backgroundColor: '#ffffff',
          height: 4,
          borderRadius: 5,
        },
      }}
    >
      <SpaceTabs.Screen
        name="pot"
        component={CurrentPotView}
        options={{ tabBarLabel: 'Current Pot' }}
      />
      <SpaceTabs.Screen name="loans" component={LoansInfoView} options={{ tabBarLabel: 'Loans' }} />
      <SpaceTabs.Screen
        name="activity"
        component={ActivitiesView}
        options={{ tabBarLabel: 'Activity' }}
      />
    </SpaceTabs.Navigator>
  );
}
