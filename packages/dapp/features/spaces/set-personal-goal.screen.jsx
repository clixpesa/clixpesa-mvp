import { useState } from 'react';
import { Box, Text, VStack, Button, HStack, Input, Icon, Stack, Pressable } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

const SetPersonalGoalScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
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
          <Text>Deadline</Text>
          <Pressable onPress={showDatepicker}>
            <HStack space={2}>
              <Icon as={<MaterialIcons name="date-range" />} size="md" color="primary.700" />
              <Text>{date.toLocaleDateString()}</Text>
            </HStack>
          </Pressable>
        </HStack>
        {show && (
          <DateTimePicker testID="dateTimePicker" value={date} mode={mode} onChange={onChange} />
        )}
      </VStack>
      <Stack space={3} mt="70%" w="50%">
        <Button
          variant="subtle"
          rounded="3xl"
          _text={{ color: 'primary.600', fontWeight: 'semibold', mb: '0.5' }}
        >
          Skip
        </Button>
        <Button
          rounded="3xl"
          _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
          onPress={() => navigation.navigate('SpareChange')}
        >
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default SetPersonalGoalScreen;
