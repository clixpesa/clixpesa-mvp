import { NavigationContainer } from '@react-navigation/native';

import { AppNavigator } from './app.navigator';
import { AuthNavigator } from './auth.navigator';

export const Navigation = () => {
  const isLoggedIn = true;
  return (
    <NavigationContainer>{isLoggedIn ? <AppNavigator /> : <AuthNavigator />}</NavigationContainer>
  );
};
