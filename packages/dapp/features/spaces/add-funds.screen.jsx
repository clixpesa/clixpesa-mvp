import { useState } from 'react';
import { Box, Text, HStack, VStack, Input, Button, Icon } from 'native-base';
import { useDispatch } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';

import { addFunds } from '../../store/spaces/spaces.slice';

export default function AddFundsScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();

  return (
    <Box flex={1} bg="muted.100" alignItems="center" p={4}>
      <Box w="100%" my={4} pl={4}>
        <Text>One-time transfer</Text>
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
        <Button
          variant="subtle"
          rounded="2xl"
          onPress={() => {
            dispatch(addFunds(parseFloat(amount)));
            navigation.navigate('PersonalHome');
          }}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
}
