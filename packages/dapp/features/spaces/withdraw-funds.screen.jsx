import { useState } from 'react';
import { Box, Text, HStack, VStack, Input, Button, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const WithdrawFundsScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');

  return (
    <Box flex={1} bg="muted.100" alignItems="center" p={4}>
      <Box w="100%" my={4} pl={4}>
        <Text>Withdraw to default account (cUSD)</Text>
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
            keyboardType="numeric"
            onChangeText={(text) => setAmount(text)}
            InputRightElement={<Text mr={2}>cUSD</Text>}
          />
        </HStack>
        <HStack bg="#fff" p={4} roundedTop="md" roundedBottom="2xl" justifyContent="space-between">
          <Button rounded="lg" variant="subtle">
            25%
          </Button>
          <Button rounded="lg" variant="subtle">
            50%
          </Button>
          <Button rounded="lg" variant="subtle">
            75%
          </Button>
          <Button rounded="lg" variant="subtle">
            100%
          </Button>
        </HStack>
      </VStack>
      <Box w="50%" mt="80%">
        <Button variant="subtle" rounded="2xl" onPress={() => navigation.navigate('PersonalHome')}>
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default WithdrawFundsScreen;
