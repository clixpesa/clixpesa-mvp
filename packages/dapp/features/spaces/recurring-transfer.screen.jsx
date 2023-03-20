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
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const { isOpen, onOpen, onClose } = useDisclose();
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
            keyboardType="numeric"
            InputRightElement={<Text mr={2}>cUSD</Text>}
          />
        </HStack>
        <HStack justifyContent="space-between" bg="#fff" p={4} roundedTop="md" roundedBottom="2xl">
          <Text>Repeat</Text>
          <Pressable onPress={onOpen}>
            <HStack space={2}>
              <Icon as={<MaterialIcons name="date-range" />} size="md" color="primary.700" />
              <Text>Weekly on Mon</Text>
            </HStack>
          </Pressable>
        </HStack>
      </VStack>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" px={4}>
            <Text fontWeight="semibold">Repeat</Text>
            <Text fontSize="xs" color="muted.500">
              Weekly on Wednesday
            </Text>
            <HStack space={2} m={4} justifyContent="center">
              <Button variant="subtle" px={4} rounded="lg">
                Daily
              </Button>
              <Button variant="subtle" rounded="lg">
                Weekly
              </Button>
              <Button variant="subtle" rounded="lg">
                Monthly
              </Button>
            </HStack>
          </Box>

          <Box w="90%" h="40%">
            <FlatList
              data={days}
              horizontal={false}
              keyExtractor={(item, index) => item + index}
              ItemSeparatorComponent={Divider}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Actionsheet.Item alignItems="center">{item}</Actionsheet.Item>
              )}
            />
          </Box>

          <Box w="60%" px={4} justifyContent="center" m={2}>
            <Button
              variant="subtle"
              rounded="2xl"
              onPress={() => navigation.navigate('PersonalHome')}
            >
              Set
            </Button>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

export default RecurringTransferScreen;
