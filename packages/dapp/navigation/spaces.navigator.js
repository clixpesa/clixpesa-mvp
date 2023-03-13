import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  SpacesHomeScreen,
  CreateSpaceScreen,
  CustomizePersonalScreen,
  SetPersonalGoalScreen,
  RecurringTransferScreen,
} from '../features/spaces';

const SpacesStack = createNativeStackNavigator();

export const SpacesNavigator = () => {
  return (
    <SpacesStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SpacesStack.Screen name="Main" component={SpacesHomeScreen} />
      <SpacesStack.Screen name="CreateSpace" component={CreateSpaceScreen} />
      <SpacesStack.Screen name="CustomizePersonal" component={CustomizePersonalScreen} />
      <SpacesStack.Screen name="SetPersonalGoal" component={SetPersonalGoalScreen} />
      <SpacesStack.Screen name="RecurringTransfer" component={RecurringTransferScreen} />
    </SpacesStack.Navigator>
  );
};
