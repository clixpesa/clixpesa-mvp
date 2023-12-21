import { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Box, Text, Icon, VStack, Button, Stack, HStack, Input, useDisclose } from 'native-base';

import { useSelector, useDispatch } from 'react-redux';
import { customAlphabet } from 'nanoid';

import { utils } from 'ethers';
import { MaterialIcons } from '@expo/vector-icons';

import { smartContractCall } from '@dapp/blockchain/blockchainHelper';
import { NativeTokens } from '@dapp/features/wallet/tokens';
import { config } from '@dapp/blockchain/config';
import { spacesIface } from '@dapp/blockchain/contracts';

import {
  ScheduleActionSheet,
  SuccessModal,
  SelectedContact,
  ErrorModal,
  ScheduleComponent,
} from '@dapp/components';

import { setCtbSchedule, setDisbSchedule, setGoalAmount } from '@dapp/store/spaces/spaces.slice';
import { setThisRosca } from '../../store/spaces/spaces.slice';

export default function SetRoscaGoalScreen() {
  const [newRosca, setNewRosca] = useState({ address: '', authCode: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('cUSD');
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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
    try {
      setIsLoading(true);
      const authCode = nanoid();
      const ctbAmount = utils
        .parseUnits(spaceInfo.ctbAmount.toString(), thisToken.decimals)
        .toString();
      const goalAmount = utils
        .parseUnits(spaceInfo.goalAmount.toString(), thisToken.decimals)
        .toString();
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

      if (txReceipt) {
        handleTxResponse(txReceipt);
      } else {
        throw new Error('Transaction receipt is not available');
      }
    } catch (e) {
      setIsLoading(false);
      setIsErrorModalOpen(true);
      setErrorMessage(e.message);
    }
  };

  async function handleTxResponse(txReceipt) {
    try {
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
        setIsLoading(false);
        setIsSuccessModalOpen(true);
        setThisRosca(roscaDetails);
        setNewRosca(roscaDetails);
      }
    } catch (e) {
      setIsLoading(false);
      setIsErrorModalOpen(true);
      setErrorMessage(e.message);
    }
  }

  const renderSelectedMembers = () =>
    members.map((member, index) => {
      const w = members.length >= 4 ? '1/4' : '1/3';
      return (
        <Box w={w} key={index}>
          <SelectedContact
            index={index}
            key={member.name}
            nameInitials={member.name[0].toUpperCase()}
            fullName={member.name}
          />
        </Box>
      );
    });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
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

          <ScheduleComponent
            title="Contribution Schedule"
            schedule={contributionSchedule}
            onPress={onOpenContribution}
          />
          <ScheduleComponent
            title="Disbursement Schedule"
            schedule={disbursementSchedule}
            onPress={onOpenDisbursment}
            isLast
          />

          <Stack py={2} w="95%">
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
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          message={`Rosca created successfully! \nInvite Code: ${newRosca.authCode}`}
          screen="RoscaHome"
          scrnOptions={{ roscaAddress: newRosca.address }}
        />

        <ErrorModal
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
          message={errorMessage}
        />

        {!isSuccessModalOpen && !isErrorModalOpen && (
          <Stack w="50%" position="absolute" bottom={20} left="25%">
            {!isSuccessModalOpen && !isErrorModalOpen && (
              <Button
                isDisabled={amount === '' || members.length === 0}
                isLoading={isLoading}
                isLoadingText="Submitting"
                rounded="3xl"
                _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
                onPress={createRosca}
              >
                Continue
              </Button>
            )}
          </Stack>
        )}
      </Box>
    </KeyboardAvoidingView>
  );
}
