import { Box, Text, HStack, VStack, Switch, Button } from 'native-base';
import Icon from 'react-native-remix-icon';

const SpareChangeScreen = ({ navigation }) => (
  <Box flex={1} bg="muted.100" alignItems="center" p={4}>
    <Box w="100%" my={4} pl={4}>
      <Text>
        We'll round up the spare change from your Clixpesa payments and place it in this space
      </Text>
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
        <HStack alignItems="center" space={2}>
          <Box bg="primary.100" rounded="full" p={2}>
            <Icon name="coins-line" size={24} color="#0F766E" />
          </Box>
          <Text fontWeight="semibold">Spare change x1</Text>
        </HStack>
        <Switch defaultIsChecked />
      </HStack>
      <VStack bg="#fff" p={4} space={2} roundedTop="md" roundedBottom="2xl">
        <Text>Spare change accelerator</Text>
        <HStack space={2}>
          <Box bg="primary.600" rounded="lg" p={2}>
            <Text color="white">x1</Text>
          </Box>
          <Box bg="primary.100" rounded="lg" p={2}>
            <Text>x2</Text>
          </Box>
          <Box bg="primary.100" rounded="lg" p={2}>
            <Text>x3</Text>
          </Box>
          <Box bg="primary.100" rounded="lg" p={2}>
            <Text>x4</Text>
          </Box>
          <Box bg="primary.100" rounded="lg" p={2}>
            <Text>x5</Text>
          </Box>
          <Box bg="primary.100" rounded="lg" p={2}>
            <Text>x10</Text>
          </Box>
        </HStack>
      </VStack>
    </VStack>
    <Button
      variant="subtle"
      rounded="2xl"
      mt="80%"
      w="60%"
      onPress={() => navigation.navigate('RecurringTransfer')}
    >
      Continue
    </Button>
  </Box>
);

export default SpareChangeScreen;
