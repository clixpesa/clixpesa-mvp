import { Box, Text, useDisclose } from 'native-base';
import { useEffect, useState } from 'react';
import { PasscodeActSheet } from 'dapp/components';
import { userToken } from 'dapp/utils';
import { getUserWallet, getSigner } from 'dapp/services';

export default function RecoveryPhraseScreen() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [seedPhrase, setSeedPhrase] = useState(
    'join exile know annual emotion chaos raw grain virtual legend link addict neutral access deer ozone scrub then mixture march profit zebra smooth churn',
  );
  const signer = getSigner();
  console.log('Signer', signer._mnemonic());

  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <Text mt={10} width="85%" textAlign="center" fontSize="md">
        Write down or copy these words in the right order and keep them somewhere safe.
      </Text>
      <Text
        mt={5}
        width="90%"
        textAlign="center"
        fontSize="lg"
        lineHeight="xl"
        color="blueGray.800"
        rounded="2xl"
        p={6}
        bg="white"
      >
        {seedPhrase}{' '}
      </Text>
      {/*<PasscodeActSheet isOpen={isOpen} onClose={onClose} />*/}
    </Box>
  );
}
