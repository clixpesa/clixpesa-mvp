import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import { HomeScreen, DummyScreen, AccountScreen } from 'dapp/essentials';

const AppStack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Main" component={HomeScreen} options={{ headerShown: false }} />
      {
        <AppStack.Group screenOptions={{ presentation: 'modal' }}>
          <AppStack.Screen name="DummyModal" component={DummyScreen} />
          <AppStack.Screen name="AccountScreen" component={AccountScreen} />
        </AppStack.Group>
      }
    </AppStack.Navigator>
  );
}
