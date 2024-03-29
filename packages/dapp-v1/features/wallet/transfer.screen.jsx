import {
  Box,
  FormControl,
  Text,
  VStack,
  Input,
  HStack,
  Button,
  Pressable,
  Spacer,
  useDisclose,
  Stack,
  Select,
  Avatar,
} from 'native-base';
import { useState, useRef } from 'react';
import { utils } from 'ethers';
import { SuccessModal } from 'dapp/components';
import { tranferFunds, tranferNativeToken } from 'dapp/contracts';
import { rates } from 'dapp/utils';

export default function TransferFundsScreen({ navigation, route }) {
  const amtInputRef = useRef();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('CUSD');
  const { isOpen, onOpen, onClose } = useDisclose();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const approxAmount =
    token === 'CUSD' ? (amount * rates.CUSDKES).toFixed(2) : (amount * rates.CELOKES).toFixed(2);
  let textSize = '5xl';
  if (amount.length > 6 && amount.length <= 8) {
    textSize = '4xl';
  } else if (amount.length >= 9) {
    textSize = '3xl';
  }

  const transferFunds = async () => {
    let tx;
    setIsLoading(true);
    if (token === 'CELO') {
      tx = await tranferNativeToken(recipient, amount);
      if (tx.status == 1) {
        setIsLoading(false);
        onOpen();
      }
    } else {
      tx = await tranferFunds(recipient, amount);
      if (tx.status == 1) {
        setIsLoading(false);
        onOpen();
      }
    }
  };

  const handleTxReceipt = async (txReceipt) => {};

  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <VStack width="95%" mt={3} space={1}>
        <Box
          bg="white"
          p={3}
          roundedTop="2xl"
          roundedBottom="md"
          borderWidth={1}
          borderColor="gray.100"
        >
          <FormControl.Label px={3}>Recipient</FormControl.Label>
          <Input
            placeholder="address"
            size="md"
            mt={2}
            value={recipient}
            onChangeText={(text) => setRecipient(text)}
          />
        </Box>
        <VStack
          bg="white"
          p={3}
          roundedTop="md"
          roundedBottom="2xl"
          borderWidth={1}
          borderColor="gray.100"
          space={2}
        >
          <Select placeholder="CUSD" onValueChange={(value) => setToken(value)}>
            <Select.Item label="CELO" value="CELO" />
            <Select.Item label="CUSD" value="CUSD" />
          </Select>
          {token === 'CELO' ? (
            <Text>Available: {(route.params.celoBal * 1).toFixed(4)} CELO</Text>
          ) : (
            <Text>Available: {(route.params.cusdBal * 1).toFixed(4)} CUSD</Text>
          )}
          <HStack justifyContent="space-between" alignItems="center">
            <Button variant="subtle" size="sm" rounded="full">
              MAX
            </Button>
            <Input
              position="absolute"
              alignSelf="center"
              right="25%"
              width="50%"
              variant="unstyled"
              placeholder=""
              size="2xl"
              textAlign="center"
              style={{ color: 'white' }}
              mt={2}
              caretHidden={true}
              ref={amtInputRef}
              keyboardType="phone-pad"
              value={amount}
              onChangeText={(amount) => setAmount(amount)}
            />
            <Pressable onPress={() => amtInputRef.current.focus()} width="55%">
              <Text fontSize={textSize} fontWeight="bold" textAlign="center">
                {amount ? (+amount).toLocaleString() : '0.00'}
              </Text>
            </Pressable>
            <Button variant="subtle" size="sm" rounded="full">
              MAX
            </Button>
          </HStack>
          <Text alignSelf="center" fontSize="md">
            ≈ {approxAmount} KES
          </Text>
        </VStack>
      </VStack>
      <Spacer />
      <Button
        isDisabled={amount && recipient ? false : true}
        isLoading={isLoading}
        rounded="3xl"
        pr="4"
        width="75%"
        mb="12"
        _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
        onPress={() => transferFunds()}
      >
        Send
      </Button>
      <SuccessModal
        isOpen={isOpen}
        onClose={onClose}
        message={`${(+amount).toFixed(2)} ${
          token === 'CUSD' ? 'CUSD' : 'CELO'
        } \nsuccessfully sent to \n${recipient}`}
        screen="Main"
        scrnOptions={{ isSuccess }}
      />
    </Box>
  );
}
