import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

//Screens
import {
  WelcomeScreen,
  DummyScreen,
  SignUpScreen,
  //RestoreScreen,
  VerificationScreen,
  SetPasscodeScreen,
  //StagingScreen,
  //UserDetailsScreen,
  //LoginScreen,
  //ImportWalletScreen,
} from 'dapp/essentials';

const AuthStack = createNativeStackNavigator();

export function AuthNavigator() {
  const hasAccount = false; //useSelector((s) => s.essential.hasAccount);
  return (
    <AuthStack.Navigator initialRouteName="Welcome">
      {hasAccount ? (
        <AuthStack.Screen name="Login" component={DummyScreen} options={{ headerShown: false }} />
      ) : (
        <AuthStack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
      )}

      <AuthStack.Group screenOptions={{ presentation: 'modal' }}>
        <AuthStack.Screen
          name="DummyModal"
          component={DummyScreen}
          options={{ headerTitle: 'Comming Soon' }}
        />
        <AuthStack.Screen
          name="signup"
          component={SignUpScreen}
          options={{ headerTitle: 'Sign Up' }}
        />
        {/*
        <AuthStack.Screen
          name="importWallet"
          component={ImportWalletScreen}
          options={{ headerTitle: 'Restore Account' }}
        />
        <AuthStack.Screen
          name="restore"
          component={RestoreScreen}
          options={{ headerTitle: 'Link wallet' }}
        />*/}
        <AuthStack.Screen
          name="verifyPhoneNo"
          component={VerificationScreen}
          options={{ headerTitle: 'Verification' }}
        />
        <AuthStack.Screen
          name="setPasscode"
          component={SetPasscodeScreen}
          options={{ headerTitle: 'Set Passcode' }}
        />
        {/*
        <AuthStack.Screen
          name="Staging"
          component={StagingScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="getUserDetails"
          component={UserDetailsScreen}
          options={{ headerTitle: 'Your Details' }}
        />
        
        
        
        */}
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
}
