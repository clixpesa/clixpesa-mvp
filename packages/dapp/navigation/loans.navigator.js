import { Box, Text } from '@clixpesa/native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const LoansStack = createNativeStackNavigator();

const LoansScreen = () => {
  return (
    <Box flex={1} bg="primary.100" alignItems="center" justifyContent="center">
      <Text fontSize="xl">Loans Screen!</Text>
    </Box>
  );
};

export const LoansNavigator = () => {
  return (
    <LoansStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LoansStack.Screen name="Main" component={LoansScreen} />
    </LoansStack.Navigator>
  );
};
