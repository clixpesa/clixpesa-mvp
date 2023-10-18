import { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  Spacer,
  Button,
  Stack,
  HStack,
  Input,
  Pressable,
  useDisclose,
  Flex,
} from 'native-base';

import { useSelector, useDispatch } from 'react-redux';
import { customAlphabet } from 'nanoid';
import { utils } from 'ethers';

import { smartContractCall } from '@dapp/blockchain/blockchainHelper';
import { NativeTokens } from '@dapp/features/wallet/tokens';
import { config } from '@dapp/blockchain/config';
import { spacesIface } from '@dapp/blockchain/contracts';
import { ScheduleActSheet, SuccessModal, SelectedContact } from '@dapp/components';
import { setCtbSchedule, setDisbSchedule, setGoalAmount } from '@dapp/store/spaces/spaces.slice';

export default function SetRoscaGoalScreen({ navigation, route }) {
  const [newRosca, setNewRosca] = useState({ address: '', authCode: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSetCtb, setIsSetCtb] = useState(false);
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('cUSD');
  const spaceInfo = useSelector((state) => state.spaces.spaceInfo);
  const [schedule, setSchedule] = useState({
    day: spaceInfo.ctbDay,
    occurrence: spaceInfo.ctbOccurence,
  });

  const members = useSelector((state) => state.spaces.selectedMembers);

  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclose();
  const { isOpen, onOpen, onClose } = useDisclose();
  const dispatch = useDispatch();

  const thisToken = NativeTokens.find((Token) => Token.symbol === token);
  const nanoid = customAlphabet('1234567890ABCDEF', 10);

  const createRosca = async () => {
    setIsLoading(true);
    const authCode = nanoid();
    const ctbAmount = utils
      .parseUnits(spaceInfo.ctbAmount.toString(), thisToken.decimals)
      .toString();
    const goalAmount = utils
      .parseUnits(spaceInfo.goalAmount.toString(), thisToken.decimals)
      .toString();
    try {
      let txData = {
        token: config.contractAddresses['StableToken'],
        roscaName: spaceInfo.name,
        imageLink: spaceInfo.imgLink,
        authCode,
        goalAmount,
        ctbAmount,
        ctbDay: spaceInfo.ctbDay,
        ctbOccur: spaceInfo.ctbOccurence,
        disbDay: spaceInfo.disbDay,
        disbOccur: spaceInfo.disbOccurence,
      };
      const txReceipt = await smartContractCall('Spaces', {
        method: 'createRosca',
        methodType: 'write',
        params: [Object.values(txData)],
      });
      handleTxResponse(txReceipt);
    } catch (e) {
      console.log(e);
    }
  };

  const handleTxResponse = (txReceipt) => {
    setIsLoading(false);
    const { data, topics } = txReceipt.logs.find(
      (el) => el.address === config.contractAddresses['Spaces'],
    );
    const results = spacesIface.parseLog({ data, topics });
    if (results) {
      const roscaDetails = {
        address: results.args.roscaAddress,
        roscaName: results.args[2][1],
        goalAmount: utils.formatUnits(results.args[2][4], thisToken.decimals),
        goalAmountPaid: 0,
        ctbDay: results.args[2][6],
        ctbOccur: results.args[2][7],
        authCode: results.args[2][3],
      };
      setNewRosca(roscaDetails);
      onOpen1();
    }
  };

  const renderSelectedMembers = () =>
    members.map((member) => (
      <SelectedContact
        key={member.name}
        nameInitials={member.name[0].toUpperCase()}
        fullName={member.name}
      />
    ));

  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <VStack space={3}>
        <Text mx={4} mt={8}>
          Set an amount, contribution and disbursement schedule
        </Text>
        <Stack mx={2} space={1}>
          <Box bg="white" roundedTop="xl" roundedBottom="md" borderWidth={1} borderColor="gray.100">
            <HStack m={3} space="xl">
              <Text fontSize="lg" py={3} pl={4} fontWeight="semibold">
                cUSD
              </Text>
              <Input
                py={2}
                textAlign="right"
                minW="2/3"
                placeholder="0.00"
                size="lg"
                keyboardType="numeric"
                InputRightElement={
                  <Text fontSize="md" fontWeight="medium" pr={3}>
                    cUSD
                  </Text>
                }
                value={amount}
                onChangeText={(amount) => setAmount(amount)}
                onClose={() => dispatch(setGoalAmount(amount))}
                onSubmitEditing={() => dispatch(setGoalAmount(amount))}
              />
            </HStack>
            <Text px={4} mb={3}>
              Each member contributes:{' '}
              {members.length > 0 ? (amount / (members.length + 1)).toFixed(2).toString() : 'some'}{' '}
              cUSD
            </Text>
          </Box>
          <HStack
            bg="white"
            py={3}
            px={4}
            justifyContent="space-between"
            rounded="md"
            borderWidth={1}
            borderColor="gray.100"
          >
            <Text fontSize="md">Contribution Schedule:</Text>
            <Pressable onPress={onOpen} onPressOut={() => setIsSetCtb(true)}>
              {spaceInfo.ctbDay !== 'every' ? (
                <Text color="primary.600" fontSize="md">
                  {spaceInfo.ctbOccurence} on {spaceInfo.ctbDay.slice(0, 3)}
                </Text>
              ) : (
                <Text color="primary.600" fontSize="md">
                  Everyday
                </Text>
              )}
            </Pressable>
          </HStack>
          <HStack
            bg="white"
            p={4}
            pt={3}
            justifyContent="space-between"
            roundedTop="md"
            roundedBottom="xl"
            borderWidth={1}
            borderColor="gray.100"
          >
            <Text fontSize="md">Disbursement Schedule:</Text>
            <Pressable onPress={onOpen} onPressOut={() => setIsSetCtb(false)}>
              {spaceInfo.disbDay !== 'every' ? (
                <Text color="primary.600" fontSize="md">
                  {spaceInfo.disbOccurence} on {spaceInfo.disbDay.slice(0, 3)}
                </Text>
              ) : (
                <Text color="primary.600" fontSize="md">
                  Everyday
                </Text>
              )}
            </Pressable>
          </HStack>
          <Stack py={2}>
            <Text px={4}>Members: You + {members.length}</Text>
            <Flex flexDir="row" flexWrap="wrap" py={2}>
              {renderSelectedMembers()}
            </Flex>
          </Stack>
        </Stack>
        <ScheduleActSheet
          title="Schedule"
          isOpen={isOpen}
          onClose={onClose}
          schedule={schedule}
          setSchedule={setSchedule}
          setCtbSchedule={setCtbSchedule}
          setDisbSchedule={setDisbSchedule}
          isSetCtb={isSetCtb}
        />
        <SuccessModal
          isOpen={isOpen1}
          onClose={onClose1}
          message={`Rosca created successfully! \nInvite Code: ${newRosca.authCode}`}
          screen="RoscaHome"
          scrnOptions={{ roscaAddress: newRosca.address }}
        />
        <Spacer />
        <Button
          isLoading={isLoading}
          isLoadingText="Submitting"
          position="absolute"
          bottom={10}
          left="20%"
          rounded="3xl"
          w="60%"
          _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
          onPress={() => createRosca()}
        >
          Continue
        </Button>
      </VStack>
    </Box>
  );
}
