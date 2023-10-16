import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import { HomeScreen, DummyScreen, AccountScreen } from 'dapp/essentials';
import { TxDetailsScreen } from 'dapp/wallet';
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
          <AppStack.Screen name="DummyModal" component={DummyScreen} />
          <AppStack.Screen name="AccountScreen" component={AccountScreen} />
          <AppStack.Screen
            name="TxDetails"
            component={TxDetailsScreen}
            options={{
              headerTitle: '',
            }}
          />
        </AppStack.Group>
      }
    </AppStack.Navigator>
  );
}
