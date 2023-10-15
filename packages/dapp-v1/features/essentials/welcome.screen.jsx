import { Box, VStack, Button, Heading, Spacer } from 'native-base';
import firestore from '@react-native-firebase/firestore';

export default function WelcomeScreen({ navigation }) {
  const addUserDeatils = () => {
    firestore()
      .collection('Users')
      .doc('XiIFItRYFtdM2VuARU4monKZKSw2')
      .get()
      .then((documentSnapshot) => {
        console.log('User exists: ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          documentSnapshot.ref
            .collection('Wallets')
            .doc('wallet2')
            .set({
              address: '0x123456789',
              bal: 30,
            })
            .then(() => {
              console.log('Wallet added!');
            });
        }
      });
  };
  return (
    <Box flex={1} bg="#fff" alignItems="center" justifyContent="flex-end">
      <Box width="75%" mt="3/4">
        <Heading textAlign="center" color="coolGray.700">
          Step into the future of money with Clixpesa
        </Heading>
      </Box>
      <Spacer />
      <VStack alignItems="center" space={3} mb="10">
        <Button
          rounded="3xl"
          pr="4"
          minW="75%"
          _text={{ fontWeight: 'semibold', mb: '0.5' }}
          onPress={() => navigation.navigate('signup')}
        >
          Create New Account
        </Button>
        <Button
          variant="subtle"
          rounded="3xl"
          pr="4"
          minW="75%"
          _text={{ color: 'primary.700', fontWeight: 'semibold', mb: '0.5' }}
          onPress={() => addUserDeatils()} //navigation.navigate('importWallet')}
        >
          Use Existing Account
        </Button>
      </VStack>
    </Box>
  );
}
