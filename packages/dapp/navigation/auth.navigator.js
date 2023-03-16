import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { WelcomeScreen } from '../features/essentials';
import { ImportWalletScreen } from '../features/wallet';

const AuthStack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="Welcome">
      <AuthStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Group screenOptions={{ presentation: 'modal' }}>
        <AuthStack.Screen
          name="importWallet"
          component={ImportWalletScreen}
          options={{
            headerTitle: '',
          }}
        />
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};
