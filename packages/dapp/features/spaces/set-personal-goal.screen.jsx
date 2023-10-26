import { useState } from 'react';
import { Box, Text, VStack, Button, HStack, Input, Icon, Stack, Pressable } from 'native-base';
import { useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

import { setPersonalGoal, setPersonalDeadline } from '../../store/spaces/spaces.slice';

export default function SetPersonalGoalScreen({ navigation, route }) {
  const [amount, setAmount] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setDeadline(selectedDate);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  return (
    <Box flex={1} bg="muted.100" alignItems="center" p={4}>
      <Box w="100%" my={4} pl={4}>
        <Text>Set an amount and deadline for your goal</Text>
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
            <Text fontWeight="semibold" fontSize="md">
              cUSD
            </Text>
            <Icon as={<MaterialIcons name="keyboard-arrow-down" />} size="lg" color="black" />
          </HStack>
          <Input
            textAlign="right"
            w={{ base: '75%' }}
            value={amount}
            onChangeText={(text) => setAmount(text)}
            keyboardType="numeric"
            InputRightElement={<Text mr={2}>cUSD</Text>}
          />
        </HStack>
        <HStack justifyContent="space-between" bg="#fff" p={4} roundedTop="md" roundedBottom="2xl">
          <Text>Deadline</Text>
          <Pressable onPress={showDatePickerModal}>
            <HStack space={2}>
              <Icon as={<MaterialIcons name="date-range" />} size="md" color="primary.700" />
              <Text>{deadline ? deadline.toLocaleDateString() : 'Set'}</Text>
            </HStack>
          </Pressable>
        </HStack>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={deadline || new Date()}
            mode="date"
            onChange={handleDateChange}
          />
        )}
      </VStack>
      <Stack space={3} mt="70%" w="50%">
        {!route.params?.edit && (
          <Button
            variant="subtle"
            rounded="3xl"
            _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => navigation.navigate('spareChange')}
          >
            Skip
          </Button>
        )}

        {!route.params?.edit ? (
          <Button
            rounded="3xl"
            _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => {
              navigation.navigate('spareChange');
              dispatch(setPersonalGoal(parseFloat(amount)));
              dispatch(setPersonalDeadline(deadline.toISOString()));
            }}
          >
            Continue
          </Button>
        ) : (
          <Button
            rounded="3xl"
            isDisabled={!amount || !deadline}
            _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => {
              navigation.navigate('Customize');
              dispatch(setPersonalGoal(parseFloat(amount)));
              dispatch(setPersonalDeadline(deadline.toISOString()));
            }}
          >
            Save
          </Button>
        )}
      </Stack>
    </Box>
  );
}
