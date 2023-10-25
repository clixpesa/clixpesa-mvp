import { useState } from 'react';
import {
  Box,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
  useDisclose,
  Button,
  Pressable,
} from 'native-base';
import { useDispatch } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';

import { ScheduleActionSheet } from '@dapp/components';
import { setRecurringTransfer } from '../../store/spaces/spaces.slice';

export default function RecurringTransferScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [schedule, setSchedule] = useState({
    day: 'Monday',
    occurrence: 'Monthly',
  });

  const { isOpen, onOpen, onClose } = useDisclose();
  const dispatch = useDispatch();

  const handleConfirm = () => {
    if (amount !== '') {
      dispatch(setRecurringTransfer(parseFloat(amount)));
      navigation.navigate('personalHome');
    }
  };

  return (
    <Box flex={1} bg="muted.100" alignItems="center" p={4}>
      <Box w="100%" my={4} pl={4}>
        <Text>On average, users with recurring transfers save twice as much as those without</Text>
      </Box>

      <VStack space={1} w="100%">
        <HStack
          bg="#fff"
          p={4}
          justifyContent="space-between"
          alignItems="center"
          roundedTop="2xl"
          roundedBottom="md"
        >
          <HStack alignItems="center">
            <Text fontWeight="semibold">cUSD</Text>
            <Icon as={<MaterialIcons name="keyboard-arrow-down" />} size="md" />
          </HStack>
          <Input
            w={{
              base: '75%',
              md: '25%',
            }}
            value={amount}
            onChangeText={(text) => setAmount(text)}
            keyboardType="numeric"
            InputRightElement={<Text mr={2}>cUSD</Text>}
          />
        </HStack>
        <HStack justifyContent="space-between" bg="#fff" p={4} roundedTop="md" roundedBottom="2xl">
          <Text>Repeat</Text>
          <Pressable onPress={onOpen}>
            <HStack space={2}>
              <Icon as={<MaterialIcons name="date-range" />} size="md" color="primary.700" />
              <Text>
                {schedule.occurrence} {schedule.occurrence === 'Daily' ? '' : `on ${schedule.day}`}
              </Text>
            </HStack>
          </Pressable>
        </HStack>
      </VStack>
      <Box w="50%" mt="80%">
        <Button variant="solid" rounded="2xl" onPress={handleConfirm}>
          Confirm
        </Button>
      </Box>
      <ScheduleActionSheet
        isOpen={isOpen}
        onClose={onClose}
        schedule={schedule}
        setSchedule={setSchedule}
        onSetSchedule={onClose}
      />
    </Box>
  );
}
