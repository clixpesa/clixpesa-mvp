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
  Avatar,
  useDisclose,
} from 'native-base';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { blockscoutKey, stableToken } from 'dapp/config/appconfig';
//import { getBalance, createSpace } from '../interactions';
import { ethers } from 'ethers';

import {
  setCtbSchedule,
  setDisbSchedule,
  setGoalAmount,
  setUserSpaces,
  setHasSpaces,
  setRoscaDetails,
} from 'dapp/store/spaces/spaces.slice';

import { ScheduleActSheet, SuccessModal } from 'dapp/components';
import { generateId } from 'dapp/utils';

export default function SetSpaceGoalScreen({ navigation }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');
  const spaceInfo = useSelector((state) => state.spaces.spaceInfo);

  const [authCode, setAuthCode] = useState('');
  const [schedule, setSchedule] = useState({
    day: spaceInfo.ctbDay,
    occurrence: spaceInfo.ctbOccurence,
  });
  const [isSetCtb, setIsSetCtb] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclose();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setAuthCode(generateId());
  }, []);

  useEffect(() => {
    dispatch(setGoalAmount(amount));
  }, [amount]);
  /*
  const createRosca = async () => {
    let txData = {
      token: stableToken,
      roscaName: spaceInfo.name,
      imageLink: spaceInfo.imgLink,
      authCode,
      goalAmount: ethers.utils.parseUnits(spaceInfo.goalAmount.toString(), 18).toString(),
      ctbAmount: ethers.utils.parseUnits(spaceInfo.ctbAmount.toString(), 18).toString(),
      ctbDay: spaceInfo.ctbDay,
      ctbOccur: spaceInfo.ctbOccurence,
      disbDay: spaceInfo.disbDay,
      disbOccur: spaceInfo.disbOccurence,
    };
    const result = await createSpace(txData);
    setTimeout(() => {
      setIsLoading(true);
    }, 2000);
    if (result) {
      console.log(result);
      setIsSuccess(true);
      onOpen1();
      dispatch(setHasSpaces(true));
      dispatch(setRoscaDetails(result));
      setIsLoading(false);
    }
  };*/

  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <VStack space={3}>
        <Text mx={6} mt={16} fontSize="md">
          Set an amount, contribution and {'\n'}disbursment schedule
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
                maxW="75%"
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
                //onClose={() => dispatch(setGoalAmount(amount))}
                //onSubmitEditing={() => dispatch(setGoalAmount(amount))}
              />
            </HStack>
            <Text px={5} mb={3}>
              Each member contributes:{' '}
              {spaceInfo.membersCount > 0
                ? (amount / spaceInfo.membersCount).toFixed(2).toString()
                : '0'}{' '}
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
            <Text fontSize="md">Disbursment Schedule:</Text>
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
          <Stack py={3} px={4}>
            <Text fontSize="md">
              Members: You + {spaceInfo.membersCount ? spaceInfo.membersCount - 1 : '0'} others
            </Text>
          </Stack>
        </Stack>
        <ScheduleActSheet
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
          message={
            isSuccess
              ? `Rosca created successfully! \nInvite Code: ${authCode}`
              : `Rosca creation Failed! \n${errorMessage}`
          }
          screen="spaceHome"
          scrnOptions={{ isSuccess }}
        />
        <Spacer />
        <Stack alignItems="center" space={3} mb={10}>
          <Button
            isLoading={isLoading}
            isLoadingText="Submitting"
            rounded="3xl"
            w="60%"
            _text={{ color: 'text.50', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => {
              //createRosca();
              //dispatch(setUserSpaces(userAddress));
            }}
          >
            Continue
          </Button>
        </Stack>
      </VStack>
    </Box>
  );
}
