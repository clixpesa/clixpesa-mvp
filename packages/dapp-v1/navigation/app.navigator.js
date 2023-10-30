import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import { HomeScreen, DummyScreen, AccountScreen, EditProfileScreen } from 'dapp/essentials';
import { TxDetailsScreen, DepositScreen, TransferFundsScreen } from 'dapp/wallet';
import { HeaderRightIcons, AccPressable } from './bottom.tabs';

const AppStack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Main"
        component={HomeScreen}
        options={{
          headerLeft: () => <AccPressable />,
          headerRight: () => <HeaderRightIcons />,
          headerTitle: ' Clixpesa',
        }}
      />
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
        </AppStack.Group>
      }
    </AppStack.Navigator>
  );
}
