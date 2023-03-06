import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AccountScreen from '../features/account/account.screen';

const AccountStack = createNativeStackNavigator();

export const AccountNavigator = () => {
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AccountStack.Screen name="Main" component={AccountScreen} />
    </AccountStack.Navigator>
  );
};
