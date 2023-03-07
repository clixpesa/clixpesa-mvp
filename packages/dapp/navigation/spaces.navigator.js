import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SpacesHomeScreen, CreateSpaceScreen, CustomizePersonalScreen } from '../features/spaces';

const SpacesStack = createNativeStackNavigator();

export const SpacesNavigator = () => {
  return (
    <SpacesStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SpacesStack.Screen name="Main" component={SpacesHomeScreen} />
      <SpacesStack.Screen name="CreateSpace" component={CreateSpaceScreen} />
      <SpacesStack.Screen name="CustomizePersonal" component={CustomizePersonalScreen} />
    </SpacesStack.Navigator>
  );
};
