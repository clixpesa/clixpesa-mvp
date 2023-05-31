import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  SpacesHomeScreen,
  CreateSpaceScreen,
  CustomizePersonalScreen,
  SetPersonalGoalScreen,
  RecurringTransferScreen,
  SpareChangeScreen,
  PersonalHomeScreen,
  AddFundsScreen,
  WithdrawFundsScreen,
  CustomizePScreen,
  SelectContactsScreen,
} from '../features/spaces';

const SpacesStack = createNativeStackNavigator();

export const SpacesNavigator = () => {
  return (
    <SpacesStack.Navigator
      screenOptions={{
        presentation: 'modal',
        tabBarHideOnKeyboard: true,
      }}
    >
      <SpacesStack.Screen name="Main" component={SpacesHomeScreen} />
      <SpacesStack.Screen name="CreateSpace" component={CreateSpaceScreen} />
      <SpacesStack.Screen name="CustomizePersonal" component={CustomizePersonalScreen} />
      <SpacesStack.Screen name="SetPersonalGoal" component={SetPersonalGoalScreen} />
      <SpacesStack.Screen name="RecurringTransfer" component={RecurringTransferScreen} />
      <SpacesStack.Screen name="SpareChange" component={SpareChangeScreen} />
      <SpacesStack.Screen name="PersonalHome" component={PersonalHomeScreen} />
      <SpacesStack.Screen name="AddFunds" component={AddFundsScreen} />
      <SpacesStack.Screen name="WithdrawFunds" component={WithdrawFundsScreen} />
      <SpacesStack.Screen name="Customize" component={CustomizePScreen} />
      <SpacesStack.Screen name="SelectContacts" component={SelectContactsScreen} />
    </SpacesStack.Navigator>
  );
};
