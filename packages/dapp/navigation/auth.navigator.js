import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { VerificationScreen, WelcomeScreen } from '../features/essentials';
import { ImportWalletScreen } from '../features/wallet';
import { SetUserDetailsScreen } from '../features/account';

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
        <AuthStack.Screen
          name="setUserDetails"
          component={SetUserDetailsScreen}
          options={{
            headerTitle: '',
          }}
        />
        <AuthStack.Screen
          name="verifyPhoneNo"
          component={VerificationScreen}
          options={{
            headerTitle: '',
          }}
        />
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};
