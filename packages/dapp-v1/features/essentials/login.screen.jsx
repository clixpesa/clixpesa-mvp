import { Box, Text, VStack, Avatar, Spinner } from 'native-base';
import { View } from 'react-native';
import { CodeInput } from 'dapp/components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setLoggedIn } from 'dapp/store/essential/essential.slice';
import { userToken } from 'dapp/config/usertoken';
import { saltyPasscode } from 'dapp/utils';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const { names, initials, phone } = useSelector((s) => s.essential.userDetails);
  const firstName = names ? names.split(' ')[0] : '**' + phone.slice(9, 13);
  const [code, setCode] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isCodeReady, setIsCodeReady] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleFullFill = (code) => {
    const token = saltyPasscode(code);
    if (token === userToken) {
      setIsValid(true);
      setLoading(true);
    } else {
      console.log('LoggedIn Failed');
      setIsValid(false);
      setLoading(false);
      setCode('');
    }
  };

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        dispatch(setLoggedIn(true));
      }, 500);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isCodeReady) {
      setTimeout(() => {
        handleFullFill(code);
      }, 500);
    }
  }, [isCodeReady]);

  return (
    <Box flex={1} bg="#fff" justifyContent="center">
      <VStack alignItems="center" space={3} mb={5}>
        <Avatar bgColor="primary.600" size="lg">
          {initials}
        </Avatar>
        <Text fontSize="md" mb="3">
          Welcome back, {firstName}
        </Text>
        {isLoading ? (
          <Spinner size="lg" />
        ) : (
          <CodeInput
            placeholder={
              <View
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 25,
                  backgroundColor: '#99F6E4',
                }}
              ></View>
            }
            mask={
              <View
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 25,
                  backgroundColor: '#0D9488',
                }}
              ></View>
            }
            maskDelay={300}
            password={true}
            autoFocus={true}
            cellStyle={null}
            cellStyleFocused={null}
            value={code}
            onTextChange={(code) => setCode(code)}
            onFulfill={(code) => {
              setCode(code);
              setIsCodeReady(true);
            }}
          />
        )}
        {isValid ? null : <Text>Forgot passcode? See how to reset here!</Text>}
      </VStack>
    </Box>
  );
}
