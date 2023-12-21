import { Box, VStack, Spinner, Text, Button } from 'native-base';
import { useEffect, useState, useLayoutEffect } from 'react';
import { CodeInput } from 'dapp/components';
import { PIN_BLOCKLIST } from 'dapp/config/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setUserToken } from 'dapp/config/usertoken';
import { createWallet, importWallet } from 'dapp/store/wallet/wallet.slice';
import { createAccount } from 'dapp/store/essential/essential.slice';
import { pendingWallet } from 'dapp/wallet';

export default function SetPasscodeScreen({ navigation }) {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.essential.userDetails);
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isCodeReady, setIsCodeReady] = useState(false);

  const handleOnSucess = (code) => {
    //setUserToken(code);
    setTimeout(() => {
      if (pendingWallet) {
        console.log('Is Pending Wallet');
        dispatch(createAccount());
        dispatch(importWallet(code));
      } else {
        console.log('creating account');
        dispatch(createAccount());
        dispatch(createWallet(code));
      }
    }, 500);
  };

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
    console.log('Code 1: ' + code);
    if (code1 === code) {
      console.log('Pin session is done');

      handleOnSucess(code);
      setCode1('');
      //setCode2('');
      setIsVerifying(false);
    } else {
      console.log('Pin does not match');
      setCode2('');
    }
  };

  useEffect(() => {
    if (isCodeReady) {
      setTimeout(() => {
        setUserToken(code2);
        onFullCode2(code2);
      }, 500);
    }
  }, [isCodeReady]);

  return (
    <Box flex={1} bg="muted.50" justifyContent="center">
      {isLoading ? (
        <VStack mx="20" space={3} alignItems="center">
          <Spinner size="lg" />
          <Text fontSize="md">Setting up Account...</Text>
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
                  Set a passcode
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
