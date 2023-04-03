import { useState } from 'react';
import {
  Box,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
  Actionsheet,
  useDisclose,
  Button,
  Pressable,
  FlatList,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const Divider = () => <Box w="100%" h={0.5} bg="muted.200" />;

const RecurringTransferScreen = ({ navigation }) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [amount, setAmount] = useState(0);
  const [schedule, setSchedule] = useState({
    repeat: 'Weekly',
    day: 'Monday',
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
            onSu
            InputRightElement={<Text mr={2}>cUSD</Text>}
          />
        </HStack>
        <HStack justifyContent="space-between" bg="#fff" p={4} roundedTop="md" roundedBottom="2xl">
          <Text>Repeat</Text>
          <Pressable onPress={onOpen}>
            <HStack space={2}>
              <Icon as={<MaterialIcons name="date-range" />} size="md" color="primary.700" />
              <Text>
                {schedule.repeat} {schedule.day === 'Everyday' ? null : `on ${schedule.day}`}
              </Text>
            </HStack>
          </Pressable>
        </HStack>
      </VStack>
      <Box w="50%" mt="80%">
        <Button variant="subtle" rounded="2xl" onPress={() => navigation.navigate('PersonalHome')}>
          Confirm
        </Button>
      </Box>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" px={4}>
            <Text fontWeight="semibold">Repeat</Text>
            <Text fontSize="xs" color="muted.500">
              {schedule.repeat} {schedule.day === 'Everyday' ? null : `on ${schedule.day}`}
            </Text>
            <HStack space={2} m={4} justifyContent="center">
              <Button
                variant="subtle"
                px={4}
                rounded="lg"
                onPress={() => setSchedule({ repeat: 'Daily', day: 'Everyday' })}
              >
                Daily
              </Button>
              <Button
                variant="subtle"
                rounded="lg"
                onPress={() => setSchedule({ repeat: 'Weekly', day: schedule.day })}
              >
                Weekly
              </Button>
              <Button
                variant="subtle"
                rounded="lg"
                onPress={() => setSchedule({ repeat: 'Monthly', day: schedule.day })}
              >
                Monthly
              </Button>
            </HStack>
          </Box>

          <Box w="90%" maxH={130}>
            <FlatList
              data={days}
              horizontal={false}
              keyExtractor={(item, index) => item + index}
              ItemSeparatorComponent={Divider}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Actionsheet.Item
                  alignItems="center"
                  onPress={() => setSchedule({ ...schedule, day: item })}
                >
                  {item}
                </Actionsheet.Item>
              )}
            />
          </Box>

          <Box w="60%" px={4} justifyContent="center" m={2}>
            <Button variant="subtle" rounded="2xl" onPress={() => onClose()}>
              Set
            </Button>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

export default RecurringTransferScreen;
