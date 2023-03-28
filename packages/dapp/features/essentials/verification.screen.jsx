import { Text, Box, VStack, HStack, Pressable, Spacer } from 'native-base';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CodeInput } from '../../components';

const VerificationScreen = () => {
  const phoneNumber = useSelector((s) => s.account.userDetails.phoneNo);
  const [code, setCode] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoFill, setIsAutoFill] = useState(false);
  const verCode = '123456';

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
      //navigation.navigate('setPasscode');
      console.log(code);
    }
  };
  const handleAutoFullFill = (code) => {
    setIsLoading(false);
    setIsAutoFill(false);
    console.log(code);
  };
  return (
    <Box flex={1} bg="muted.50" alignItems="center">
      <VStack space={3} mx={6} mt={10}>
        <Text fontSize="md" mr={6}>
          Verifying your phonenumber ({phoneNumber})
        </Text>
        <Text color="muted.400">
          Keep calm, verification codes will be filled automatically from your SMS{' '}
        </Text>
        <Box my={3}>
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
            p={2}
            pt={1}
            borderRadius={8}
          >
            New OTP will be sent in 55s
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
    </Box>
  );
};

export default VerificationScreen;
