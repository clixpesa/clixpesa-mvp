import { useState } from 'react';
import {
  Box,
  Text,
  Icon,
  VStack,
  Button,
  Stack,
  HStack,
  Input,
  Pressable,
  useDisclose,
} from 'native-base';

import { useSelector, useDispatch } from 'react-redux';
import { customAlphabet } from 'nanoid';
import { utils } from 'ethers';
import { MaterialIcons } from '@expo/vector-icons';

import { smartContractCall } from '@dapp/blockchain/blockchainHelper';
import { NativeTokens } from '@dapp/features/wallet/tokens';
import { config } from '@dapp/blockchain/config';
import { spacesIface } from '@dapp/blockchain/contracts';
import { ScheduleActionSheet, SuccessModal, SelectedContact } from '@dapp/components';
import { setCtbSchedule, setDisbSchedule, setGoalAmount } from '@dapp/store/spaces/spaces.slice';

export default function SetRoscaGoalScreen({ navigation, route }) {
  const [newRosca, setNewRosca] = useState({ address: '', authCode: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('cUSD');
  const spaceInfo = useSelector((state) => state.spaces.spaceInfo);

  const [contributionSchedule, setContributionSchedule] = useState({
    occurrence: spaceInfo.ctbOccurence,
    day: spaceInfo.ctbDay,
  });

  const [disbursementSchedule, setDisbursementSchedule] = useState({
    occurrence: spaceInfo.disbOccurence,
    day: spaceInfo.disbDay,
  });

  const members = useSelector((state) => state.spaces.selectedMembers);

  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclose();
  const dispatch = useDispatch();

  const {
    isOpen: isOpenContribution,
    onOpen: onOpenContribution,
    onClose: onCloseContribution,
  } = useDisclose();
  const {
    isOpen: isOpenDisbursment,
    onOpen: onOpenDisbursment,
    onClose: onCloseDisbursment,
  } = useDisclose();

  const setDisbursementScheduleAction = () => {
    dispatch(setDisbSchedule(disbursementSchedule));
  };

  const setContributionScheduleAction = () => {
    dispatch(setCtbSchedule(contributionSchedule));
  };

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
    // navigation.navigate('NextScreen');
  };

  const renderSelectedMembers = () =>
    members.map((member, index) => (
      <Box w="1/4">
        <SelectedContact
          index={index}
          key={member.name}
          nameInitials={member.name[0].toUpperCase()}
          fullName={member.name}
        />
      </Box>
    ));

  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <Box p={4}>
        <Text>Set amount contribution and disbursement schedule</Text>
      </Box>

      <VStack space={1}>
        <HStack bg="#fff" p={4} justifyContent="space-between" roundedTop="2xl">
          <HStack alignItems="center">
            <Text fontSize="md">cUSD</Text>
            <Icon as={<MaterialIcons name="keyboard-arrow-down" />} size="lg" color="black" />
          </HStack>
          <Input
            textAlign="right"
            w={{ base: '75%' }}
            size="md"
            value={amount}
            keyboardType="numeric"
            InputRightElement={<Text mr={2}>cUSD</Text>}
            onChangeText={(text) => {
              setAmount(text);
              dispatch(setGoalAmount(text));
            }}
          />
        </HStack>
        {/* <Text px={4} mb={3} fontSize="md" color="muted.400">
            Each member contributes{' '}
            {members.length > 0 ? (amount / (members.length + 1)).toFixed(2).toString() : 'some'}{' '}
            cUSD
          </Text> */}

        <HStack bg="white" p={4} justifyContent="space-between">
          <Text fontSize="md">Contribution Schedule</Text>
          <Pressable onPress={onOpenContribution}>
            <HStack space={2}>
              <Icon as={<MaterialIcons name="date-range" />} size="md" color="primary.800" />
              <Text color="primary.800" fontWeight="semibold">
                {contributionSchedule.occurrence}{' '}
                {contributionSchedule.occurrence === 'Daily'
                  ? ''
                  : `on ${contributionSchedule.day.slice(0, 3)}`}
              </Text>
            </HStack>
          </Pressable>
        </HStack>
        <HStack bg="white" p={4} justifyContent="space-between" roundedBottom="2xl">
          <Text fontSize="md">Disbursement Schedule</Text>
          <Pressable onPress={onOpenDisbursment}>
            <HStack space={2}>
              <Icon as={<MaterialIcons name="date-range" />} size="md" color="primary.800" />
              <Text color="primary.800" fontWeight="semibold">
                {disbursementSchedule.occurrence}{' '}
                {disbursementSchedule.occurrence === 'Daily'
                  ? ''
                  : `on ${disbursementSchedule.day.slice(0, 3)}`}
              </Text>
            </HStack>
          </Pressable>
        </HStack>
        <Stack py={2} w="96%">
          <Text px={4}>Members: {members.length}</Text>
          <HStack flexWrap="wrap">{renderSelectedMembers()}</HStack>
        </Stack>
      </VStack>

      <ScheduleActionSheet
        isOpen={isOpenContribution}
        onClose={onCloseContribution}
        schedule={contributionSchedule}
        setSchedule={setContributionSchedule}
        onSetSchedule={setContributionScheduleAction}
      />

      <ScheduleActionSheet
        isOpen={isOpenDisbursment}
        onClose={onCloseDisbursment}
        schedule={disbursementSchedule}
        setSchedule={setDisbursementSchedule}
        onSetSchedule={setDisbursementScheduleAction}
      />

      <SuccessModal
        isOpen={isOpen1}
        onClose={onClose1}
        message={`Rosca created successfully! \nInvite Code: ${newRosca.authCode}`}
        screen="RoscaHome"
        scrnOptions={{ roscaAddress: newRosca.address }}
      />

      <Stack w="50%" position="absolute" bottom={20} left="25%">
        <Button
          isLoading={isLoading}
          isLoadingText="Submitting"
          rounded="3xl"
          _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
          onPress={() => createRosca()}
        >
          Continue
        </Button>
      </Stack>
    </Box>
  );
}
