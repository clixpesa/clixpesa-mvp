import { Box, Text, VStack, Spacer, Button } from 'native-base';
import { CodeInput, ResendTimer } from 'dapp/components';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';

import { setUserDetails } from 'dapp/redux/essential/essential.slice';

export default function VerificationScreen({ navigation, route }) {
  const { phone, country, verificationId } = route.params;
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [codeReady, setCodeReady] = useState(false);

  const handleOnFullFill = async (code) => {
    setIsLoading(true);
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, code);
      const res = await auth().signInWithCredential(credential);
      dispatch(
        setUserDetails({
          id: res.user.uid,
          names: res.user.displayName,
          email: res.user.email,
          phone: res.user.phoneNumber,
          photoUri: res.user.photoURL,
          country: country,
        }),
      );
      navigation.navigate('setPasscode');
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  useEffect(() => {
    if (codeReady) {
      setTimeout(() => {
        handleOnFullFill(code);
      }, 500);
    }
  }, [codeReady]);

  return (
    <Box flex={1} bg="white" alignItems="center" justifyContent="center">
      <VStack space={3} mx={6} mt={10}>
        <Text fontSize="md" textAlign="center">
          Verify your phone number ({phone})
        </Text>
        <Text color="muted.500">
          A verification code has been sent to {phone}. Please enter the code below.
        </Text>
        <Box my={3} alignSelf="center">
          <CodeInput
            value={code}
            onTextChange={(code) => setCode(code)}
            onFulfill={(code) => {
              setCodeReady(true);
              setCode(code);
            }}
            autoFocus={true}
          />
        </Box>
        <ResendTimer seconds={55} onResend={() => console.log('Code resent')} />
      </VStack>
      <Spacer />
      <Button
        isLoading={isLoading}
        spinnerPlacement="end"
        isLoadingText="Verifying"
        variant="subtle"
        rounded="3xl"
        pr="4"
        minW="65%"
        my={10}
        _text={{
          color: 'primary.600',
          fontWeight: 'semibold',
          mb: '0.5',
        }}
        _spinner={{
          color: 'primary.700',
        }}
        onPress={(code) => handleOnFullFill(code)}
      >
        Set Passcode
      </Button>
    </Box>
  );
}
