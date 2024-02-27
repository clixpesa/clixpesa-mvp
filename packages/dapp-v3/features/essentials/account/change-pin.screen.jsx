import { Box, VStack, Spinner, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { CodeInput } from 'dapp/components';
import { PIN_BLOCKLIST } from 'dapp/config';
import { useDispatch, useSelector } from 'react-redux';
import { setUserToken, userToken } from 'dapp/utils';
import { changeUserToken } from 'dapp/redux/essential/essential.slice';

export default function ChangePasscodeScreen({ navigation }) {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.essential.userDetails);
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isCodeReady, setIsCodeReady] = useState(false);

  const onFullCode1 = (code) => {
    if (isPinValid(code)) {
      setIsVerifying(true);
      console.log('Pin is Valid');
    } else {
      console.log('Pin is Invalid');
      setCode1('');
    }
  };
  const onFullCode2 = (code) => {
    if (code1 === code) {
      console.log('Pin session is done');
      setCode1('');
      if (code2) setUserToken(code2);
      setCode2('');
      setIsVerifying(false);
      if (userToken) {
        dispatch(changeUserToken(userToken));
      }
    } else {
      console.log('Pin does not match');
      setCode2('');
    }
  };

  useEffect(() => {
    if (isCodeReady) {
      setTimeout(() => {
        onFullCode2(code2);
      }, 500);
    }
  }, [isCodeReady]);

  return (
    <Box flex={1} bg="muted.50" justifyContent="center">
      {isLoading ? (
        <VStack mx="20" space={3} alignItems="center">
          <Spinner size="lg" />
          <Text fontSize="md">Changing Passcode...</Text>
        </VStack>
      ) : (
        <>
          {isVerifying ? (
            <Box>
              <Box mx="10">
                <Text fontSize="md" mb="3">
                  Re-enter the passcode
                </Text>
                <Text mb="3">Please input the passcode again to confirm.</Text>
                <CodeInput
                  value={code2}
                  autoFocus={true}
                  password={true}
                  onTextChange={(code) => setCode2(code)}
                  onFulfill={(code) => {
                    setIsLoading(true);
                    setCode2(code);
                    setIsCodeReady(true);
                  }}
                />
              </Box>

              <Text fontSize="xs" mx="10" mt="5">
                You will use this passcode to authorize transactions and sign into your account.
                Please keep it safe.
              </Text>
            </Box>
          ) : (
            <Box>
              <Box mx="10">
                <Text fontSize="md" mb="3">
                  Change passcode
                </Text>
                <Text mb="3">
                  You will use this passcode to authorize transactions and sign into your account.
                  Please keep it safe.
                </Text>
                <CodeInput
                  value={code1}
                  password={true}
                  autoFocus={true}
                  onTextChange={(code) => setCode1(code)}
                  onFulfill={(code) => onFullCode1(code)}
                />
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

function isPinValid(pin) {
  return /^\d{6}$/.test(pin) && !PIN_BLOCKLIST.includes(pin);
}
