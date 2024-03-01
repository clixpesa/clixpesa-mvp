import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import {
  DummyScreen,
  AccountScreen,
  EditProfileScreen,
  ChangePasscodeScreen,
  RecoveryPhraseScreen,
} from 'dapp/essentials';
//import { TxDetailsScreen, DepositScreen, TransferFundsScreen } from 'dapp/wallet';
//import { JoinSpaceScreen, CreateSpaceScreen, SetSpaceGoalScreen } from 'dapp/spaces';
import { BottomTabs } from './bottom.tabs';

const AppStack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
      {
        <AppStack.Group screenOptions={{ presentation: 'modal' }}>
          <AppStack.Screen
            name="DummyModal"
            component={DummyScreen}
            options={{ headerTitle: '' }}
          />
          <AppStack.Screen name="Account" component={AccountScreen} />

          <AppStack.Screen
            name="depositFunds"
            component={DummyScreen}
            options={{ headerTitle: '' }}
          />
          <AppStack.Screen
            name="transferFunds"
            component={DummyScreen}
            options={{ headerTitle: '' }}
          />
          <AppStack.Screen
            name="TxDetails"
            component={DummyScreen}
            options={{
              headerTitle: '',
            }}
          />
          <AppStack.Screen
            name="editProfile"
            component={EditProfileScreen}
            options={{ headerTitle: 'Edit Profile' }}
          />
          <AppStack.Screen
            name="changePasscode"
            component={ChangePasscodeScreen}
            options={{ headerTitle: 'Change Passcode' }}
          />
          <AppStack.Screen
            name="getRecoveryPhrase"
            component={RecoveryPhraseScreen}
            options={{ headerTitle: 'Recovery Phrase' }}
          />
          <AppStack.Screen
            name="joinSpace"
            component={DummyScreen}
            options={{ headerTitle: 'Join a Space' }}
          />
          <AppStack.Screen
            name="createSpace"
            component={DummyScreen}
            options={{ headerTitle: 'Create a Space' }}
          />
          {/*
          <AppStack.Screen
            name="setSpaceGoal"
            component={SetSpaceGoalScreen}
            options={{ headerTitle: 'Set a Goal' }}
          />*/}
        </AppStack.Group>
      }
    </AppStack.Navigator>
  );
}
