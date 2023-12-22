import { Box, Text, Input, FormControl, Stack, Button, Spacer, useDisclose } from 'native-base';
import { useState } from 'react';

import { SuccessModal } from 'dapp/components';
import { isValidAddress } from 'dapp/utils';

export default function JoinSpaceScreen() {
  const [spaceAddr, setSpaceAddr] = useState('');
  const [spaceAuthCode, setSpaceAuthCode] = useState('');
  const { isOpen, onOpen, onClose } = useDisclose();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinSpace = async () => {
    setIsLoading(true);
    //const res = await joinSpace(spaceAddr, spaceAuthCode);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      if (isValidAddress(spaceAddr)) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
        setErrorMessage('Invalid Space Address');
      }
      onOpen();
    }, 2000);
  };

  return (
    <Box flex={1} bg="white" alignItems="center">
      <FormControl alignItems="center" mt={10}>
        <Stack space={2} w="80%">
          <Stack mt={2}>
            <FormControl.Label>Space Address</FormControl.Label>
            <Input
              bg="white"
              p={3}
              placeholder="0xf56gS...7832"
              rounded="2xl"
              size="lg"
              value={spaceAddr}
              onChangeText={(text) => setSpaceAddr(text)}
            />
          </Stack>
          <Stack mt={2}>
            <FormControl.Label>Space Auth Code</FormControl.Label>
            <Input
              bg="white"
              p={3}
              placeholder="ABCD1234"
              rounded="2xl"
              size="lg"
              value={spaceAuthCode}
              onChangeText={(text) => setSpaceAuthCode(text)}
            />
          </Stack>
        </Stack>
      </FormControl>
      <SuccessModal
        isOpen={isOpen}
        onClose={onClose}
        message={
          isSuccess
            ? `Request sent successfully! \nInvite Code: ${spaceAuthCode}`
            : `Request failed gracefully! \n${errorMessage}`
        }
        screen="Spaces"
        scrnOptions={{ isSuccess }}
      />
      <Spacer />
      <Button
        rounded="3xl"
        isLoading={isLoading}
        pr="4"
        minW="75%"
        _text={{ fontWeight: 'semibold', mb: '0.5' }}
        mb={10}
        onPress={() => handleJoinSpace()}
      >
        Send Request
      </Button>
    </Box>
  );
}
