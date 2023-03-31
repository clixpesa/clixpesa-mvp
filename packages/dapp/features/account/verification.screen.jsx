import { Text, Box, VStack, HStack, Pressable, Spacer } from 'native-base';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CodeInput } from '../../components';
import { useSendMessageMutation } from '../../services/africasTalking';
import { customAlphabet } from 'nanoid';
import * as Clipboard from 'expo-clipboard';

const VerificationScreen = () => {
  const phoneNumber = useSelector((s) => s.account.userDetails.phoneNo);
  const [sendMessage, { isLoading, data }] = useSendMessageMutation();
  const [code, setCode] = useState('');
  const [verCode, setVerCode] = useState('123456');
  const [copiedCode, setCopiedCode] = useState('');
  const [isAutoFill, setIsAutoFill] = useState(false);
  const nanoid = customAlphabet('1234567890', 6);

  useEffect(() => {
    sendNewCode();
  }, []);

  if (data && data.SMSMessageData.Recipients[0].status === 'Success' && !isAutoFill) {
    console.log('Checking for copied code');
    setTimeout(() => {
      handleOnCopyCode();
    }, 10000);
  }

  const handleOnCopyCode = () => {
    const regexp = /C#(\d{6})/g;
    const regexp2 = /(\d{6})/g;
    Clipboard.getStringAsync()
      .then((newCode) => {
        let i = 0;
        if (newCode.length === 8 && regexp.test(newCode)) {
          newCode = newCode.slice(2, 8);
          if (newCode !== copiedCode && regexp2.test(newCode)) {
            setCopiedCode(newCode);
            loopCode(i, newCode);
            setIsAutoFill(true);
            console.log(`Copied: ${newCode}`);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loopCode = (i, copiedCode) => {
    setTimeout(function () {
      i++;
      setCode(copiedCode.slice(0, i));
      if (i < copiedCode.length) {
        loopCode(i, copiedCode);
      }
    }, 150);
  };

  const handleOnFullFill = () => {
    if (code === verCode) {
      //navigation.navigate('setPasscode');
      console.log(`On Full ${code}`);
    }
  };

  if (code.length === 6) {
    console.log(`Code: ${code}`);
    handleOnFullFill();
  }

  const sendNewCode = () => {
    const sent = nanoid();
    let formData = new FormData();
    formData.append('username', 'sandbox');
    formData.append('to', '+254722345677');
    formData.append('message', `C#${sent} is your Clixpesa verification code.`);
    formData.append('from', 'Clixpesa');
    setVerCode(sent);
    sendMessage(formData);
    if (isAutoFill) {
      setIsAutoFill(false);
    }
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
