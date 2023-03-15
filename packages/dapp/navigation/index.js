import { NavigationContainer } from '@react-navigation/native';

import { AppNavigator } from './app.navigator';
import { AuthNavigator } from './auth.navigator';

export const Navigation = () => {
  const isLoggedIn = false;
  return (
    <NavigationContainer>{isLoggedIn ? <AppNavigator /> : <AuthNavigator />}</NavigationContainer>
  );
};
