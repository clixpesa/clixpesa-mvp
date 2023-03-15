import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { WelcomeScreen } from '../features/essentials';

const AuthStack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    </AuthStack.Navigator>
  );
};
