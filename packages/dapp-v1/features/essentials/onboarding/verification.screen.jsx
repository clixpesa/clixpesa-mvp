import { Box, HStack, Pressable, Text, VStack, Spacer, Button } from 'native-base';
import { CodeInput } from 'dapp/components';
import { useEffect, useState, useRef } from 'react';

export default function VerificationScreen({ navigation, route }) {
  const phoneNumber = route.params.phone;
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(55);
  const timerRef = useRef(timer);
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoFill, setIsAutoFill] = useState(false);
  const verCode = '786624';
  //TODO Check why codeState is not up todate on done loopCode

  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        setTimer(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    setIsAutoFill(true);
    let i = 0;
    function loopCode() {
      setTimeout(function () {
        i++;
        setCode(verCode.slice(0, i));
        if (i < verCode.length) {
          loopCode();
        } else {
          handleAutoFullFill(code);
        }
      }, 150);
    }
    loopCode();
    setIsLoading(true);
  }, []);

  const handleOnFullFill = (code) => {
    setIsLoading(false);
    if (code === verCode) {
      console.log('code is same');
      navigation.navigate('setPasscode');
    }
  };

  const handleAutoFullFill = (code) => {
    setIsLoading(false);
    setIsAutoFill(false);
    if (code === verCode) {
      //code is not same?!
      navigation.navigate('setPasscode');
    }
  };

  return (
    <Box flex={1} bg="white" alignItems="center" justifyContent="center">
      <VStack space={3} mx={6} mt={10}>
        <Text fontSize="md" textAlign="center">
          Verify your phone number ({phoneNumber})
        </Text>
        <Text color="muted.500">
          A verification code has been sent to {phoneNumber}. Please enter the code below.
        </Text>
        <Box my={3} alignSelf="center">
          <CodeInput
            value={code}
            onTextChange={(code) => setCode(code)}
            onFulfill={(code) => handleOnFullFill(code)}
          />
        </Box>
        <HStack>
          <Text
            bg="primary.100"
            color="primary.600"
            fontWeight="medium"
            px={3}
            py={1}
            borderRadius={8}
          >
            New OTP will be sent in {timer}s
          </Text>
          <Spacer />
          <Pressable onPress={() => console.log('Sent another text')}>
            <Text
              bg="primary.600"
              color="primary.100"
              fontWeight="medium"
              p={2}
              pt={1}
              borderRadius={8}
            >
              Send another
            </Text>
          </Pressable>
        </HStack>
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
