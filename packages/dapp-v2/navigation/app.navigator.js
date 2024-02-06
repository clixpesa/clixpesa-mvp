import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import {
  //HomeScreen,
  DummyScreen,
  AccountScreen,
  //EditProfileScreen
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
          <AppStack.Screen name="Account" component={DummyScreen} />
          {/*
          <AppStack.Screen
            name="depositFunds"
            component={DepositScreen}
            options={{ headerTitle: '' }}
          />
          <AppStack.Screen
            name="transferFunds"
            component={TransferFundsScreen}
            options={{ headerTitle: '' }}
          />
          <AppStack.Screen
            name="TxDetails"
            component={TxDetailsScreen}
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
            name="joinSpace"
            component={JoinSpaceScreen}
            options={{ headerTitle: 'Join a Space' }}
          />
          <AppStack.Screen
            name="createSpace"
            component={CreateSpaceScreen}
            options={{ headerTitle: 'Create a Space' }}
          />
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
