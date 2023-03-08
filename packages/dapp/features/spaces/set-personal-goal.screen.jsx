import { Box, Text, VStack, Button, HStack, Input, Icon, Stack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const SetPersonalGoalScreen = () => {
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
            keyboardType="numeric"
            InputRightElement={<Text mr={2}>cUSD</Text>}
          />
        </HStack>
        <HStack justifyContent="space-between" bg="#fff" p={4} roundedTop="md" roundedBottom="2xl">
          <Text>Deadline</Text>
          <HStack space={2}>
            <Icon as={<MaterialIcons name="date-range" />} size="md" color="primary.700" />
            <Text>Set</Text>
          </HStack>
        </HStack>
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
          onPress={() => navigation.navigate('PersonalHome')}
        >
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default SetPersonalGoalScreen;
