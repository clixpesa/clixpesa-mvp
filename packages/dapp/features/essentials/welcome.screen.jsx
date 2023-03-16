import { Box, Heading, VStack, Button, Spacer } from 'native-base';

const WelcomeScreen = ({ navigation }) => (
  <Box flex={1} bg="white" alignItems="center" justifyContent="center">
    <Box width="85%" top="30%">
      <Heading textAlign="center" color="blueGray.800">
        Step into the future of money with Clixpesa
      </Heading>
    </Box>
    <Spacer maxH="70%" />
    <VStack space={3}>
      <Button
        rounded="3xl"
        minW="65%"
        _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
      >
        Create New Account
      </Button>
      <Button
        variant="subtle"
        rounded="3xl"
        minW="65%"
        _text={{ color: 'primary.700', fontWeight: 'semibold', mb: '0.5' }}
        onPress={() => navigation.navigate('importWallet')}
      >
        Use Existing Account
      </Button>
    </VStack>
  </Box>
);

export default WelcomeScreen;
